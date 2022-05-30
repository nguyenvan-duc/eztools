import React from "react";
import HeadSeo from "../components/HeadSeo";
import Layout from "../components/Layout";

const QrCode = () => {
  return (
    <>
      <HeadSeo title="Tạo QR Code" />
      <Layout>
        <div className="pt-16 lg:pt-28">
          <div className="flex flex-row   m-auto max-w-5xl  ">
            <div className="w-3/5 h-full  flex justify-center items-center">
              <input
                className="py-3 textMono text-lg px-3 w-4/5 outline-none border border-black mt-3"
                placeholder="Nhập đường dẫn"
              />
            </div>
            <div className="w-2/5 h-full relative flex flex-col justify-center items-center">
              <div className="transition ease-in duration-200 absolute z-20 top-3/3 left-1/2">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="mr-2 animate-spin"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                </svg>
              </div>
              <div className=" blur-sm  flex flex-col justify-center items-center h-64 border  w-64 mt-10 mb-5 bg-white border-black">
                qrcode here
              </div>
              <button className="px-3 py-1 border border-black hover:bg-black hover:text-white">
                Tải về
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default QrCode;
