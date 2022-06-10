import React from "react";
import NavbarData from "../DataComponents/Navbar.json";
import Link from "next/link";
const Navbar = () => {
  const [navbarData, setNavbarData] = React.useState(NavbarData[2]);
  return (
    <nav className="bg-gray-800 py-2.5 dark:bg-gray-800">
      <div className="flex px-6 flex-wrap justify-between items-center mx-auto">
        <Link href={"/"}>
          <a className="flex items-center">
            <span className="self-center textMono text-xl font-semibold whitespace-nowrap text-white">
              7TH.DEC <span className="text-sm">Developer tools</span>
            </span>
          </a>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Link href={"/"}>
                <a
                  className="block py-2 pr-4 pl-3 text-white  rounded md:bg-transparent md:p-0"
                  aria-current="page"
                >
                  Home
                </a>
              </Link>
            </li>
            {navbarData.items.map((item, index) => (
              <li key={index}>
                <Link  href={item.href}>
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-white  rounded md:bg-transparent  md:p-0 "
                    aria-current="page"
                  >
                    {item.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
