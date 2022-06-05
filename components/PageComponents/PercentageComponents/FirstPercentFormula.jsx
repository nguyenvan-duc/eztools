import React from 'react';
import { MenuAlt4Icon } from '@heroicons/react/outline';

const FirstPercentFormula = () => {
  const [inputOne, setInputOne] = React.useState(0);
  const [inputTwo, setInputTwo] = React.useState(0);
  const [result, setResult] = React.useState(0);

  React.useEffect(() => {
    setResult(inputTwo * inputOne / 100);
  },[inputOne, inputTwo])
  return (
    <div className="w-full border mb-6 textMono p-4 border-black bg-white forcus:shadow-blog-l hover:shadow-blog-l focus:translate-y-blog-4m ease-in duration-200">
      <h1 className="mb-2 text-lg font-semibold">Tính %x của a:</h1>
      <div className="flex   flex-wrap  items-center">
        <div className="w-full md:w-1/3 md:mr-4">
          <input onChange={value => setInputOne(value.target.value)} type="number" className="w-full  px-3 py-3 border outline-none   border-black" placeholder="Nhập x%"/>
        </div>
        <span className="text-lg ">% của</span>
        <div className="w-full md:w-1/3 md:mx-4">
          <input onChange={value => setInputTwo(value.target.value)} type="number" className="w-full px-3 py-3 border outline-none border-black" placeholder="Nhập a" />
        </div>
        <span><MenuAlt4Icon className="w-6 h-6"/></span>
        <span className="ml-4 text-3xl">{result}</span>
      </div>
    </div>
  )
}

export default FirstPercentFormula