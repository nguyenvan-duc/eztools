import React from "react";
import Footer from "./Footer";
import Siderbar from "./Siderbar";

const Layout = (props) => {
  return (
    <>
      <div className="flex flex-no-wrap">
        <Siderbar />
        <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
            {props.children}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
