"use client";
import { auth, storedb } from "@/config/config";
import {
    signInWithPopup,
    GoogleAuthProvider,
  } from "firebase/auth";


import { setDoc, doc } from "firebase/firestore";
import { toast } from "sonner";

const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(doc(storedb, `users`, user.uid), {
      email: user.email,
      uid: user.uid,
      name: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified, // Note: This might be undefined for Google sign-in
      phoneNumber: user.phoneNumber, // Note: Google sign-in does not provide phoneNumber
      providerId: user.providerId,
      role: "user",
    });

    return toast.success(`${user.displayName} signed in successfully`);
  } catch (err) {
    return toast.error(err.message);
  }
};

export default handleGoogleSignIn