import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="shadow-md bg-white font-sans tracking-wide fixed w-full z-50">
      <section className="flex items-center lg:justify-center flex-wrap gap-5 relative py-3 px-10 border-gray-200 border-b lg:min-h-[80px] max-lg:min-h-[60px]">
        <Link href="/">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/creator-ab9ab.appspot.com/o/uploads%2Ffirebase.png?alt=media&token=8c884972-f6c2-4d1c-8e57-1f1eb06ad2d1"
            alt="logo"
            className="md:w-[50px] w-[40px] cursor-pointer"
          />
        </Link>

        <div className="space-x-6 md:absolute md:right-10 flex items-center max-md:ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            width="20px"
            height="20px"
            viewBox="0 0 512 512">
            <path
              d="M449.643 0H62.357C27.973 0 0 27.973 0 62.357v387.285C0 484.027 27.973 512 62.357 512H260.86c8.349 0 15.118-6.769 15.118-15.118v-183.31c0-8.349-6.769-15.118-15.118-15.118h-54.341v-43.033h54.341c8.349 0 15.118-6.769 15.118-15.118v-61.192c0-33.116 26.942-60.058 60.059-60.058h52.433v43.033h-52.433c-9.387 0-17.025 7.639-17.025 17.026v61.192c0 8.349 6.769 15.118 15.118 15.118h54.341v43.033H334.13c-8.349 0-15.118 6.769-15.118 15.118v183.31c0 8.349 6.769 15.118 15.118 15.118h115.513C484.027 512 512 484.027 512 449.643V62.357C512 27.973 484.027 0 449.643 0zm32.121 449.643c0 17.712-14.409 32.122-32.122 32.122H349.246V328.69h54.341c8.349 0 15.118-6.769 15.118-15.118v-73.268c0-8.349-6.769-15.118-15.118-15.118h-54.341v-32.864h54.341c8.349 0 15.118-6.769 15.118-15.118v-73.268c0-8.349-6.769-15.118-15.118-15.118h-67.551c-49.788 0-90.294 40.506-90.294 90.294v46.074h-54.341c-8.349 0-15.118 6.769-15.118 15.118v73.268c0 8.349 6.769 15.118 15.118 15.118h54.341v153.074H62.357c-17.712 0-32.122-14.409-32.122-32.122V62.357c0-17.712 14.409-32.122 32.122-32.122h387.285c17.712 0 32.122 14.409 32.122 32.122v387.286z"
              data-original="#000000"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            width="20px"
            height="20px"
            viewBox="0 0 409.61 409.61">
            <path
              d="M307.205 0h-204.8C46.09 0 .005 46.085.005 102.4v204.81c0 56.3 46.085 102.4 102.4 102.4h204.8c56.315 0 102.4-46.1 102.4-102.4V102.4c0-56.315-46.085-102.4-102.4-102.4zm68.265 307.21c0 37.632-30.612 68.265-68.265 68.265h-204.8c-37.637 0-68.265-30.633-68.265-68.265V102.4c0-37.642 30.628-68.265 68.265-68.265h204.8c37.653 0 68.265 30.623 68.265 68.265v204.81z"
              data-original="#000000"
            />
            <circle cx="315.755" cy="93.865" r="25.6" data-original="#000000" />
            <path
              d="M204.805 102.4c-56.566 0-102.4 45.839-102.4 102.4 0 56.54 45.834 102.41 102.4 102.41 56.55 0 102.4-45.87 102.4-102.41 0-56.561-45.85-102.4-102.4-102.4zm0 170.675c-37.699 0-68.265-30.566-68.265-68.275s30.566-68.265 68.265-68.265 68.265 30.556 68.265 68.265-30.566 68.275-68.265 68.275z"
              data-original="#000000"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            width="20px"
            height="20px"
            viewBox="0 0 682.667 682.667">
            <defs>
              <clipPath id="a" clipPathUnits="userSpaceOnUse">
                <path d="M0 512h512V0H0Z" data-original="#000000" />
              </clipPath>
            </defs>
            <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
              <path
                d="M140.008 89h-30c-11.046 0-20 8.954-20 20v186c0 11.046 8.954 20 20 20h30c11.045 0 20-8.954 20-20V109c0-11.046-8.955-20-20-20m-13.991 257C103.311 346 85 364.368 85 387.003 85 409.632 103.311 428 126.017 428c22.616 0 40.977-18.368 40.977-40.997 0-22.635-18.361-41.003-40.977-41.003M402 89h-29c-11.046 0-20 8.954-20 20v90.341c0 26.121-1.164 59.726-37.092 59.726-36.429 0-43.908-28.47-43.908-57.856V109c0-11.046-8.954-20-20-20h-28c-11.046 0-20 8.954-20 20v186c0 11.046 8.954 20 20 20h28c11.046 0 20-8.954 20-20v-10.741h.065c9.334 17.708 32.19 34.741 66.249 34.741C409.186 319 422 274.002 422 213.336V109c0-11.046-8.954-20-20-20"
                data-original="#000000"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="40"
                d="M492 80c0-33.137-26.863-60-60-60H80c-33.137 0-60 26.863-60 60v352c0 33.137 26.863 60 60 60h352c33.137 0 60-26.863 60-60V181"
                data-original="#000000"
              />
            </g>
          </svg>
          <Link href={"/register"} className="inline-block border-gray-300 border-l-2 pl-6 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24">
              <circle cx="10" cy="7" r="6" data-original="#000000" />
              <path
                d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                data-original="#000000"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* <div className="flex flex-wrap py-3.5 px-10 overflow-x-auto">
        <div
          id="collapseMenu"
          className="w-full max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50">
          <button
            id="toggleClose"
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 fill-black"
              viewBox="0 0 320.591 320.591">
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"></path>
            </svg>
          </button>

          <ul className="lg:flex lg:justify-center lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="mb-6 hidden max-lg:block">
              <a href="/">
                <img
                  src="https://readymadeui.com/readymadeui.svg"
                  alt="logo"
                  className="w-36"
                />
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3">
              <a
                href="/"
                className="hover:text-[#007bff] text-[#007bff] font-bold text-[15px] block">
                Home
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3">
              <a
                href="/"
                className="hover:text-[#007bff] text-gray-500 font-bold text-[15px] block">
                Team
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3">
              <a
                href="/"
                className="hover:text-[#007bff] text-gray-500 font-bold text-[15px] block">
                Feature
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3">
              <a
                href="/"
                className="hover:text-[#007bff] text-gray-500 font-bold text-[15px] block">
                Blog
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3">
              <a
                href="/"
                className="hover:text-[#007bff] text-gray-500 font-bold text-[15px] block">
                About
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3">
              <a
                href="/"
                className="hover:text-[#007bff] text-gray-500 font-bold text-[15px] block">
                Contact
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3">
              <a
                href="/"
                className="hover:text-[#007bff] text-gray-500 font-bold text-[15px] block">
                Source
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3">
              <a
                href="/"
                className="hover:text-[#007bff] text-gray-500 font-bold text-[15px] block">
                Store
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3">
              <a
                href="/"
                className="hover:text-[#007bff] text-gray-500 font-bold text-[15px] block">
                Fashion
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3">
              <a
                href="/"
                className="hover:text-[#007bff] text-gray-500 font-bold text-[15px] block">
                Partner
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3">
              <a
                href="/"
                className="hover:text-[#007bff] text-gray-500 font-bold text-[15px] block">
                More
              </a>
            </li>
          </ul>
        </div>

        <div className="flex ml-auto lg:hidden">
          <button id="toggleOpen">
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div> */}
    </header>
  );
};

export default Header;
