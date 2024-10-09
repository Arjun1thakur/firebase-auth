"use client";
import React, { useEffect, useState } from "react";
import { auth, storedb } from "@/config/config";
import {
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import handleGoogleSignIn from "@/providers/google/Google";
import { useRouter } from "next/navigation";
import { onAuthStateChanged,RecaptchaVerifier,OAuthProvider, signInWithPhoneNumber } from "firebase/auth";
import {forgetPassword, handleSignup, handleLogin } from "@/providers/email/Email";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
import handleGithubSignIn from "@/providers/github/Github";
import handleTwitterSignIn from "@/providers/twitter/Twitter";
import { getFacebookLoginStatus,initFacebookSdk,fbLogin } from "@/config/facebooksdk";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [islogin, setIslogin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  auth.languageCode = 'en';
  const configureCaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            console.log('reCAPTCHA solved, allow OTP request.');
          },
          'expired-callback': () => {
            console.log('reCAPTCHA expired');
          },
        },
        auth
      );
    }
  };

  const MicrosoftAuth =  async () => {
      const provider = new OAuthProvider('microsoft.com');
      
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log('User:', result);
  
        // You can save the user info to your Firestore or Realtime Database if needed
      } catch (error) {
        console.error('Error during sign-in:', error);
      }
    };

  const requestOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    configureCaptcha();

    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    setLoading(true);

    const credential = window.confirmationResult
      .confirm(otp)
      .then((result) => {
        const user = result.user;
        console.log('User authenticated:', user);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const providerId = user.providerData[0]?.providerId;
  
        if (providerId === "password") {
          if (user.emailVerified) {
            router.push("/");
          }
        } else {
          router.push("/");
        }
      }
    });
  
    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [router]);
  
  







  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(storedb, `users`, user.uid), {
        email: user.email,
        uid: user.uid,
        name: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        providerId: user.providerId,
        role: "user",
      });

      router.push("/");
    } catch (err) {
      toast.error(err.message);
    }
  };



  
  return (
    <div className="font-[sans-serif] bg-gray-50 flex items-center md:h-screen p-4">
      <div className="w-full max-w-4xl max-md:max-w-xl mx-auto">
        <div className="bg-white grid md:grid-cols-2 gap-16 w-full sm:p-8 p-6 shadow-md rounded-md overflow-hidden">
          <div className="max-md:order-1 space-y-6">
            <div className="md:mb-16 mb-8">
              <h3 className="text-gray-800 text-2xl font-bold">
                Instant Access
              </h3>
              <button
                type="button"
                className="text-black font-bold"
                onClick={() => setIslogin(!islogin)}>
                Mode : {islogin ? "Register" : "Login"}
              </button>
            </div>

            <div className="flex flex-wrap gap-6 ">
              <button
                onClick={handleFacebookSignIn}
                type="button"
                className=" p-2.5 flex items-center justify-center rounded-md text-white text-base tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22px"
                  fill="#fff"
                  className="inline shrink-0"
                  viewBox="0 0 167.657 167.657">
                  <path
                    d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z"
                    data-original="#010002"
                  />
                </svg>
              </button>
              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="p-2.5 flex items-center justify-center rounded-md text-gray-800 text-base tracking-wider font-semibold border-none outline-none bg-gray-100 hover:bg-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22px"
                  fill="#fff"
                  className="inline shrink-0"
                  viewBox="0 0 512 512">
                  <path
                    fill="#fbbd00"
                    d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                    data-original="#fbbd00"
                  />
                  <path
                    fill="#0f9d58"
                    d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                    data-original="#0f9d58"
                  />
                  <path
                    fill="#31aa52"
                    d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                    data-original="#31aa52"
                  />
                  <path
                    fill="#3c79e6"
                    d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                    data-original="#3c79e6"
                  />
                  <path
                    fill="#cf2d48"
                    d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                    data-original="#cf2d48"
                  />
                  <path
                    fill="#eb4132"
                    d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                    data-original="#eb4132"
                  />
                </svg>
              </button>
              <button
                onClick={handleGithubSignIn}
                type="button"
                className="p-2.5 flex items-center justify-center rounded-md text-white text-base tracking-wider font-semibold border-none outline-none bg-black hover:bg-[#333]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22px"
                  fill="#fff"
                  className="inline shrink-0" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
              </button>
              <button
                onClick={handleGithubSignIn}
                type="button"
                className="p-2.5 flex items-center justify-center rounded-md text-white text-base tracking-wider font-semibold border-none outline-none bg-black hover:bg-[#333]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22px"
                  fill="#fff"
                  className="inline shrink-0"
                  viewBox="0 0 22.773 22.773">
                  <path
                    d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z"
                    data-original="#000000"
                  />
                </svg>
              </button>
              <button
                onClick={handleTwitterSignIn}
                type="button"
                className="p-2.5 flex items-center justify-center rounded-md text-white text-base tracking-wider font-semibold border-none outline-none bg-black hover:bg-[#333]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22px"
                  fill="#fff"
                  className="inline shrink-0" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
              
              </button>
              <button
                onClick={MicrosoftAuth}
                type="button"
                className="p-2.5 flex items-center justify-center rounded-md text-white text-base tracking-wider font-semibold border-none outline-none bg-black hover:bg-[#333]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22px"
                  fill="#fff"
                  className="inline shrink-0" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
              
              </button>
            </div>
          </div>

          <div className="w-full">
            <div className="mb-8">
              {islogin ? (
                <h3 className="text-gray-800 text-2xl font-bold">Register</h3>
              ) : (
                <h3 className="text-gray-800 text-2xl font-bold">Login</h3>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email Id
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white border border-gray-300 w-full text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter email"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4"
                    viewBox="0 0 682.667 682.667">
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path
                          d="M0 512h512V0H0Z"
                          data-original="#000000"></path>
                      </clipPath>
                    </defs>
                    <g
                      clipPath="url(#a)"
                      transform="matrix(1.33 0 0 -1.33 0 682.667)">
                      <path
                        fill="none"
                        strokeMiterlimit="10"
                        strokeWidth="40"
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                        data-original="#000000"></path>
                      <path
                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                        data-original="#000000"></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white border border-gray-300 w-full text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter password"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    onClick={() => setShowPassword(!showPassword)}
                    className="w-4 h-4 absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128">
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"></path>
                  </svg>
                </div>
              </div>
              {/* <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md"
                />
                <label
                  htmlFor="remember-me"
                  className="text-gray-800 ml-3 block text-sm">
                  I accept the{" "}
                  <a
                    href="/"
                    className="text-blue-600 font-semibold hover:underline ml-1">
                    Terms and Conditions
                  </a>
                </label>
              </div> */}
            </div>

            <div className="!mt-8">
              {islogin ? (
                <button
                  onClick={()=>handleSignup(email,password)}
                  type="button"
                  className="w-full py-2.5 px-4 text-sm tracking-wider font-semibold rounded-md bg-blue-600 hover:bg-blue-700 text-white focus:outline-none">
                  Create Account
                </button>
              ) : (
                <button
                  onClick={()=>handleLogin(email,password)}
                  type="button"
                  className="w-full py-2.5 px-4 text-sm tracking-wider font-semibold rounded-md bg-blue-600 hover:bg-blue-700 text-white focus:outline-none">
                  Sign in
                </button>
              )}
            </div>
            
            <button onClick={()=>forgetPassword(email)} className="text-gray-800 w-full hover:underline duration-150 text-sm mt-6 text-center">
              forgot password?
            </button>

            {!verificationId ? (
        <form onSubmit={requestOtp}>
          <label>
            Enter Phone Number:
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1234567890"
            />
          </label>
          <div id="recaptcha-container"></div>
          <button type="submit" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Request OTP'}
          </button>
        </form>
      ) : (
        <form onSubmit={verifyOtp}>
          <label>
            Enter OTP:
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Verifying OTP...' : 'Verify OTP'}
          </button>
        </form>
      )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
