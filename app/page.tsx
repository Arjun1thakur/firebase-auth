"use client"
import Image from "next/image";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "@/config/config";

export default function Home() {

  const logout = () => {
    signOut(auth);
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={logout}>Logout</button>
    </div>
  );
}
