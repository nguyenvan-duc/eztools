import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Siderbar from "../components/Siderbar";
import { promisify } from "util";
import Layout from "../components/Layout";
import HeadSeo from "../components/HeadSeo";
export default function Home() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    console.log(images);
  }, [images]);
  const handleSubmit = () => {
    console.log(images);
  };
  return (
    <>
    <HeadSeo title={"home"}/>
      <Layout>
        <div className="w-full h-full rounded border-dashed border-2 border-gray-300">
          <input
            value={images}
            multiple
            onChange={(e) => setImages(e.target.value)}
            className="border px-3 py-2 "
            type="file"
          />
        </div>
        <button onClick={handleSubmit}>submit</button>
      </Layout>
    </>
  );
}
