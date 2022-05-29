import React from "react";
import Link from "next/link";
import NavbarLink from "./DataComponents/Navbar.json";


const siderbarLink = [
  {
    name: "Trang chủ",
    href: "/",
    icon: "",
  },
  {
    name: "Giới thiệu",
    href: "/about",
    icon: "",
  },
];
const Siderbar = () => {
  return (
    <div>
      <div className="hidden flex-col w-64  lg:flex  px-4 py-8 min-h-screen bg-white border-r  border-black dark:bg-gray-800 dark:border-gray-600">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
          7TH.DEC
        </h2>

        <div className="relative mt-6">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </span>

          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-black dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 focus:ring-opacity-40 focus:outline-none focus:ring"
            placeholder="Search"
          />
        </div>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            {siderbarLink.map((item, index) => (
              <Link href={item.href} key={index}>
                <a className="flex items-center px-2 hover:underline hover:px-4 py-2 mt-5 text-gray-800 transition-colors duration-200 transform     dark:hover:text-gray-200 hover:text-gray-900">
                  {item.name}
                </a>
              </Link>
            ))}
            <hr className="my-6 border-gray-200 dark:border-gray-600" />

            {NavbarLink.map((item, index) => (
              <div key={index}>
                <h2 className="text-lg font-medium">{item.title}</h2>
                {item.items.map((itemlink, index) => (
                  <Link href={itemlink.href} key={index}>
                    <a className="flex items-center px-2 hover:underline hover:px-4 py-2 mt-5 text-gray-800 transition-colors duration-200 transform     dark:hover:text-gray-200 hover:text-gray-900">
                      {itemlink.name}
                    </a>
                  </Link>
                ))}
                <hr className="my-6 border-gray-200 dark:border-gray-600" />
              </div>
            ))}
            <a
              href="https://policies.google.com/privacy"
              className="flex items-center px-2 hover:underline hover:px-4 py-2 mt-3 text-gray-600 transition-colors duration-200 transform  dark:text-gray-400  dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
            >
              Privacy Polic
            </a>
            <a
              href="https://policies.google.com/terms"
              className="flex items-center px-2 hover:underline hover:px-4 py-2 mt-3 text-gray-600 transition-colors duration-200 transform  dark:text-gray-400  dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
            >
              Terms of Service
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Siderbar;
