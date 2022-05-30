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
        <div className="bg-codecademy w-full">
          <div className="container min-h-screen  mx-auto py-10  w-11/12 px-6">
            {props.children}
          </div>  
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
