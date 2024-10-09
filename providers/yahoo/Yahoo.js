import { auth, storedb } from "@/config/config";
import {
  signInWithPopup,
  OAuthProvider,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";


const handleYahooSignIn =  async () => {
    const provider = new OAuthProvider('yahoo.com');
   
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      const userDoc = await getDoc(doc(storedb, "users", user.uid));
      if (!userDoc.exists()) {
        // Create a new user document
        await setDoc(doc(storedb, "users", user.uid), {
          email: user.email,
          uid: user.uid,
          name: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified || false,
          phoneNumber: user.phoneNumber || null,
          providerId: result.providerId,
          role: "user",
        });
      }
      toast.success(`${user.displayName} signed in successfully`);
    } catch (err) {
      // Handle errors
      toast.error(err.message);
    }
  };

export default handleYahooSignIn