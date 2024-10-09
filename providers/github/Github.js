import { auth, storedb } from "@/config/config";
import {
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "sonner";

const handleGithubSignIn = async ()=>{
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(storedb, `users`, user.uid), {
        email: user.email,
        uid: user.uid,
        name: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified || false, // Note: This might be undefined for Google sign-in
        phoneNumber: user.phoneNumber || null, // Note: Google sign-in does not provide phoneNumber
        providerId: result.providerId,
        role: "user",
      });
      toast.success(`${user.displayName} signed in successfully`);
    } catch (err) {
      toast.error(err.message);
    }
  }

export default handleGithubSignIn;