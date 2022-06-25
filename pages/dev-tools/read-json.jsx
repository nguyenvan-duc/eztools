import React, { Fragment } from 'react'
import dynamic from "next/dynamic";
import { Dialog, Transition } from '@headlessui/react'
const ReactJson = dynamic(() => import("react-json-view"), {
    ssr: false,
});
import Navbar from "../../components/DevPageComponents/Navbar";
import HeadSeo from "../../components/HeadSeo";
import { toast, Toaster } from "react-hot-toast";
import { isEmpty } from 'lodash';
import MobileDisplay from '../../components/MobileDisplay'

const ReadJson = () => {
    const [value, setValue] = React.useState(null)
    const [load, setLoad] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false)
    const [url, setUrl] = React.useState('')


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    const initialValues = {

        email: "jesse@jesse.com",
        address: [
            {
                street: "",
                number: 70
            }
        ],
        options: "value 1",
        radio: "op3",
        accept: true
    };
    const handleChange = async (event) => {
        if (typeof window !== "undefined") {
            if (event.target.files.length !== 0) {
                setLoad(true);
                console.log(event.target.files[0]);
                await fetch(URL.createObjectURL(event.target.files[0]))
                    .then((res) => {
                        return res.json();
                    })
                    .then((json) => {
                        setValue(json)
                    }).finally(() => {
                        setLoad(false);
                    });
            }
        }
    };
    const handleReadUrl = async (event) => {
        if (!isEmpty(url)) {
            setLoad(true);
            setIsOpen(false);
            await fetch(url)
                .then((res) => {
                    return res.json();
                })
                .then((json) => {
                    setValue(json)
                }).finally(() => {
                    setLoad(false);
                }).catch(err => {
                    toast.error("no result or url invalid.")
                });
        } else {
            toast.error("please enter url.")
        }
    }
    return (
        <>
            <HeadSeo title="Read Json" />
            <Navbar />
            <Toaster />
            <MobileDisplay>
                <div className="bg-gray-700 min-h-screen py-20">
                    <div className='flex max-w-6xl m-auto'>
                        <label
                            htmlFor="file-upload"
                            className='px-3 py-2 mb-2 bg-gray-200 hover:bg-gray-300'
                        >
                            <span>Read from json file</span>
                            <input
                                onChange={handleChange}
                                type="file"
                                accept=".json"
                                id="file-upload"
                                name="file-upload"
                                className="sr-only"
                            />
                        </label>
                        <button onClick={openModal} className='px-3 py-2 mb-2 bg-gray-200 hover:bg-gray-300 ml-2'>Read from api</button>
                        {load && (
                            <div className='ml-2'>
                                <svg
                                    role="status"
                                    className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                            </div>
                        )}
                    </div>
                    <div className=" max-w-6xl max-h-screen overflow-y-auto m-auto border p-3 bg-gray-200">
                        <ReactJson
                            name={true}
                            displayObjectSize={true}
                            displayDataTypes={false}
                            enableClipboard={true}
                            IndentWidth={3}
                            collapsed={1}
                            src={!value ? initialValues : value} theme="summerfruit:inverted" />
                    </div>
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeModal}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black bg-opacity-25" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Enter url
                                            </Dialog.Title>
                                            <div>
                                                <input onChange={value => setUrl(value.target.value)} className='py-2 px-2 bg-gray-200 w-full mt-2 outline-none' placeholder='paste url here' type='url' />
                                            </div>
                                            <div className="mt-4 flex">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={closeModal}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex ml-2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={handleReadUrl}
                                                >
                                                    Read now!
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            </MobileDisplay>

        </>
    )
}

export default ReadJson