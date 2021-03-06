import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Siderbar from "./Siderbar";

const Layout = (props) => {
  return (
    <>
    <Navbar/>
      <div className="flex  flex-no-wrap">
        <Siderbar />
        <div className="bg-codecademy lg:border-l border-black w-full">
          <div className=" min-h-screen  mx-auto py-10  w-11/12">
            {props.children}
          </div>  
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
