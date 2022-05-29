import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import NavbarLink from "./DataComponents/Navbar.json";
import _ from "lodash";
const navigation = [
  { name: "Trang Chủ", href: "/", current: true },
  { name: "Giới Thiệu", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  return (
    <Disclosure as="nav" className="blog w-full fixed lg:hidden z-30">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 bg-white border-b border-black  sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          <div className="md:flex md:justify-end">
            <Disclosure.Panel className="lg:hidden bg-white border md:w-80   border-black mt-2">
              <div className="px-2 pt-2 pb-3 space-y-1 mt-2">
                {navigation.map((item,index) => (
                  <Disclosure.Button
                    key={index}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? "border-l border-black" : "text-gray-800",
                      "block px-3 py-2  text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                <hr className="my-6 border-gray-200 dark:border-gray-600" />
                {NavbarLink.map((item, index) => (
                  <div key={index}>
                    <h2 className="text-lg ml-2 font-medium">{item.title}</h2>
                    {item.items.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "border-l border-black"
                            : "text-gray-800",
                          "block px-3 py-2 ml-2  text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                ))}
              </div>
            </Disclosure.Panel>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
