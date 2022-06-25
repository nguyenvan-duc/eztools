import { useState, useRef, Fragment } from "react";
import HeadSeo from "../components/HeadSeo";
import Layout from "../components/Layout";
import { createWorker } from "tesseract.js";
import preprocessImage from "../utils/preprocess";
import { toast, Toaster } from "react-hot-toast";
import { Listbox, Transition } from "@headlessui/react";
import TitlePage from "../components/PageComponents/TitlePage";
import MobileDisplay from "../components/MobileDisplay";
import {
  CheckIcon,
  SelectorIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
const langs = [
  {
    id: 1,
    name: "Tiếng Việt",
    value: "vie",
    flag: "https://cdn-icons-png.flaticon.com/512/197/197473.png",
  },
  {
    id: 2,
    name: "English",
    value: "eng",
    flag: "https://cdn-icons-png.flaticon.com/512/323/323310.png",
  },
  {
    id: 3,
    name: "Japanese",
    value: "jpn",
    flag: "https://cdn-icons-png.flaticon.com/512/197/197604.png",
  },
  {
    id: 4,
    name: "Chinese",
    value: "chi_tra",
    flag: "https://cdn-icons-png.flaticon.com/512/197/197375.png",
  },
  {
    id: 5,
    name: "Korean",
    value: "kor",
    flag: "https://cdn-icons-png.flaticon.com/512/197/197582.png",
  },
];
const ImageToText = () => {
  const [selected, setSelected] = useState(langs[0]);
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const worker = createWorker();
  const handleChange = (event) => {
    event.preventDefault();
    if (typeof window !== "undefined") {
      if (event.target.files.length !== 0) {
        setImagePath(window.URL?.createObjectURL(event.target.files[0]));
      }
    }
  };
  const tesseract = () => {
    if (imagePath == null || imagePath == "" || imagePath.length == 0) {
      toast.error("Vui Lòng Chọn Ảnh.");
    } else {
      setText("");
      const canvas = canvasRef.current;
      canvas.width = 2500;
      canvas.height = 3000;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(imageRef.current, 0, 0);
      ctx.putImageData(preprocessImage(canvas), 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg");
      const data = (async () => {
        await worker.load();
        await worker.loadLanguage(`${selected.value}`);
        await worker.initialize(`${selected.value}`);
        const {
          data: { text },
        } = await worker.recognize(`${dataUrl}`);
        setText(text);
        if (text === "") {
        }
        await worker.terminate();
      })();
      toast.promise(data, {
        loading: "Đang Chuyển Đổi💅...",
        success: <b>Đã Hoàn Thành Chuyển Đổi! 😽</b>,
        error: <b>Vui Lòng Thử Lại 😿</b>,
      });
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    tesseract();
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const clearData = async (e) => {
    setText("");
    setImagePath("");
    canvasRef = null;
    imageRef = null;
  };
  return (
    <>
      <Toaster reverseOrder={false} />
      <HeadSeo
        title="Chuyển Đổi Hình Ảnh Sang Văn Bản"
        img="https://res.cloudinary.com/blogcuaduc/image/upload/v1641128846/cua-toi/lrb6bfewy7uxne53w4fn.png"
      />
      <Layout>
        <MobileDisplay>
          <div className="mt-16">
            <TitlePage>Chuyển Đổi Hình Ảnh Sang Văn Bản</TitlePage>
          </div>

          <div className="max-w-5 mb-3 flex justify-center pr-8 items-center">
            <label
              htmlFor="file-upload"
              className="relative py-2 px-8  border border-black  bg-white flex justify-center items-center cursor-pointer hover:shadow-blog-l hover:translate-y-blog-4m hover:translate-x-blog-4p  ease-in duration-200"
            >
              <span>Chọn Ảnh</span>
              <input
                onChange={handleChange}
                onClick={clearData}
                type="file"
                accept=".png, .jpg, .jpeg"
                id="file-upload"
                name="file-upload"
                className="sr-only"
              />
            </label>
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <Listbox.Label className="flex text-sm mx-2  font-medium text-gray-700">
                    Chọn Ngôn Ngữ :
                  </Listbox.Label>
                  <div className="mt-1 relative">
                    <Listbox.Button className="relative bg-white border border-gray-900  shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <span className="flex items-center">
                        <img
                          src={selected.flag}
                          alt=""
                          className="flex-shrink-0 h-6 w-6 rounded-full"
                        />
                        <span className="ml-3 block truncate">
                          {selected.name}
                        </span>
                      </span>
                      <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 border border-black py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {langs.map((lang) => (
                          <Listbox.Option
                            key={lang.id}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? "text-white bg-indigo-600"
                                  : "text-gray-900",
                                "cursor-default select-none relative py-2 pl-3 pr-9"
                              )
                            }
                            value={lang}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <img
                                    src={lang.flag}
                                    alt=""
                                    className="flex-shrink-0 h-6 w-6 rounded-full"
                                  />
                                  <span
                                    className={classNames(
                                      selected ? "font-semibold" : "font-normal",
                                      "ml-3 block truncate"
                                    )}
                                  >
                                    {lang.name}
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? "text-white" : "text-indigo-600",
                                      "absolute inset-y-0 right-0 flex items-center pr-4"
                                    )}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
            {imagePath && (
              <button
                className="px-3 ml-3 py-2 mt-1 bg-white border border-black  hover:shadow-blog-l hover:translate-y-blog-4m hover:translate-x-blog-4p  ease-in duration-200"
                onClick={handleClick}
              >
                Chuyển đổi 🚀
              </button>
            )}
          </div>
          <div className="max-w-5xl m-auto relative  border border-black bg-white p-3">
            {imagePath ? (
              <img
                alt={imagePath}
                src={imagePath}
                ref={imageRef}
                className="w-full h-full object-contain  md:object-cover"
                role="img"
              />
            ) : (
              <div className=" h-60 textMono flex justify-center items-center">
                <span>Zui lòng chọn ảnh 🐱</span>
              </div>
            )}
          </div>
          {text && (
            <div className="max-w-5xl border border-black p-3 bg-white m-auto mt-3">
              <h3 className="text-center my-2 font-normal text-lg textMono">Có thể sẽ bị sai chính tả, vui lòng soát lại.</h3>
              <textarea
                rows={20}
                className="w-full text-lg border-gray-500 outline-none border p-3"
                value={text}
                onChange={(value) => setText(value.target.value)}
              />
            </div>
          )}

          <div className="max-w-5xl overflow-hidden hidden m-auto ">
            <canvas ref={canvasRef}></canvas>
          </div>
        </MobileDisplay>
      </Layout>
    </>
  );
};

export default ImageToText;
