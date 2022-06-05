import React from "react";
import { MenuAlt4Icon } from "@heroicons/react/outline";

const SecondPercentFormula = () => {
  const [inputOne, setInputOne] = React.useState(null);
  const [inputTwo, setInputTwo] = React.useState(null);
  const [result, setResult] = React.useState(0);

  React.useEffect(() => {
    console.log(inputOne, inputTwo);

    setResult(inputOne && inputTwo ? (inputOne * 100) / inputTwo : 0);
  }, [inputOne, inputTwo]);
  return (
    <div className="w-full border mb-6 textMono p-4 border-black bg-white forcus:shadow-blog-l hover:shadow-blog-l focus:translate-y-blog-4m ease-in duration-200">
      <h1 className="mb-2 text-lg font-semibold">
        Tính x là bao nhiêu % của a:
      </h1>
      <div className="flex flex-wrap m-auto items-center">
        <div className="w-full mb-3 md:mb-0 md:w-1/3 md:mr-4">
          <input
            onChange={(value) => setInputOne(value.target.value)}
            type="number"
            className="w-full  px-3 py-3 border outline-none   border-black"
            placeholder="Nhập x%"
          />
        </div>
        <span className="text-lg mb-3 md:mb-0">là bao nhiêu % của</span>
        <div className="w-full md:w-1/3 ">
          <input
            onChange={(value) => setInputTwo(value.target.value)}
            type="number"
            className="w-full px-3 py-3 border outline-none border-black"
            placeholder="Nhập a"
          />
        </div>
      </div>
      <div className="flex mt-3 items-center">
        <MenuAlt4Icon className="w-6 h-6" />
        <span className="text-3xl ml-3">{result} %</span>
      </div>
    </div>
  );
};

export default SecondPercentFormula;
