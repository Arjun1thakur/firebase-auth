
import { auth, storedb } from "@/config/config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "sonner";
const forgetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.info("Password reset email sent. Please check your inbox.");
    } catch (err) {
      toast.error(err.message);
    }
  };

const handleSignup = async (email,password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);
      await addDoc(collection(storedb, "users"), {
        email: user.email,
        uid: user.uid,
        name: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        providerId: user.providerId,
        role: "user",
      });

      toast.info("Email verification sent! Please check your inbox.");
    } catch (err) {
      toast.error(err.message);
    }
  };
  
  const handleLogin = async (email,password) =>{
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      if (user.emailVerified) {
        toast.success("Login successful!");
      } else {
        toast.info("Please verify your email.");
      }
    } catch (err) {
      toast.error(err.message);
    }
    return <></>;
  };


  export { forgetPassword, handleSignup, handleLogin };