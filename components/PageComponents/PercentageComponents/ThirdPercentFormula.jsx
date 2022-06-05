import React from "react";
import { MenuAlt4Icon } from "@heroicons/react/outline";

const ThirdPercentFormula = () => {
  const [inputOne, setInputOne] = React.useState(0);
  const [inputTwo, setInputTwo] = React.useState(0);
  const [selected, setSelected] = React.useState('up');
  const [result, setResult] = React.useState(0);

  React.useEffect(() => {
   
    if(selected === "up") {
      var upResult = inputTwo + (inputTwo * inputOne / 100);
      setResult(inputOne  && inputOne  ? upResult : 0);
    }else if(selected === "down") {
      setResult(inputOne  && inputOne  ? (inputTwo - (inputTwo * inputOne / 100)) : 0);
    }
  }, [inputOne, inputTwo, selected]);
  return (
    <div className="w-full border mb-6 textMono p-4 border-black bg-white forcus:shadow-blog-l hover:shadow-blog-l focus:translate-y-blog-4m ease-in duration-200">
      <h1 className="mb-2 text-lg font-semibold">
        Tính phần trăm của giá trị thay đổi:
      </h1>
      <div className="flex flex-wrap m-auto items-center">
        <div className="w-full mb-3 md:mb-0 flex items-center md:w-1/4 mr-4">
          <input
            onChange={(value) => setInputOne(parseInt(value.target.value))}
            type="number"
            className="w-full  px-3 py-3 border outline-none   border-black"
            placeholder="Nhập x%"
          />
          <span className="text-lg ml-3">%</span>
        </div>


          <select
            onChange={(value) => setSelected(value.target.value)}
            className="px-3 py-4 w-full mb-3 md:mb-0 md:w-44 outline-none bg-white border border-black"
          >
            <option value="up">Tăng</option>
            <option value="down">Giảm</option>
          </select>
      
        <div className=" md:w-1/4 mb-3 md:mb-0 flex items-center">
          <span className="text-lg mx-3">của</span>
          <input
            onChange={(value) => setInputTwo(parseInt(value.target.value))}
            type="number"
            className="w-full px-3 py-3 border outline-none border-black"
            placeholder="Nhập a"
          />
        </div>
        <div className="flex items-center">
          <MenuAlt4Icon className="w-6 h-6 md:ml-3" />
          <span className="text-3xl ml-3">{result}</span>
        </div>
      </div>
    </div>
  );
};

export default ThirdPercentFormula;
