import { useState } from "react";
import Layout from '../components/Layout';
import axios from 'axios';
import FormData from 'form-data';
import HeadSeo from "../components/HeadSeo";
import TitlePage from "../components/PageComponents/TitlePage";
import { Toaster ,toast } from "react-hot-toast";
const RemoveBg = () => {
  const [imagePath, setImagePath] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event) => {
    event.preventDefault();
    setImagePath("")
    setImageUrl("")
    if (typeof window !== "undefined") {
      if (event.target.files.length !== 0) {
        if (!event.target.files[0]) {
          toast.error("Không có file nào được chọn");
          return false;
        }
        if (!event.target.files[0].name.match(/\.(jpg|jpeg|png)$/)) {
          toast.error("Chỉ chấp nhận file ảnh");
          return false;
        }else{
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagePath(reader.result);
            }
          }
          reader.readAsDataURL(event.target.files[0])
        }
      }
    }

  };

  const uploadImage = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", imagePath);
    formData.append("upload_preset", "sbczhuu1");
    axios.post("https://api.cloudinary.com/v1_1/dduc7th-dec/image/upload", formData).then(res => {
      if (res.status === 200) {
        axios({
          url: `https://api.remove.bg/v1.0/removebg`,
          method: "post",
          data: {
            image_url: res.data.url,
            size: "auto",
            format: "auto",
            type: "auto",
          },
          headers: {
            "X-Api-Key": "UdYma8BuC6NtEuBPibyxf2bu",
          },
          responseType: "blob",
          encoding: null,
        })
          .then((response) => {
            setIsLoading(false);
            setImagePath(URL.createObjectURL(response.data));
            setImageUrl(URL.createObjectURL(response.data));
            toast.success("Thành công 🙏");
          })
          .catch((e) => {
            toast.error("Lỗi 😿");
            setIsLoading(false);
          });
      }
    })
  }

  return (
    <>
    <Toaster/>
      <Layout>
        <HeadSeo title="Xóa nền ✂️" />
        <div className="pt-16 lg:pt-28">
          <TitlePage>Xóa Nền</TitlePage>
          <div className="lg:max-w-lg max-w-7xl  bg-white p-5 m-auto border border-black">
            <label
              htmlFor="file-upload"
              className="relative py-2 px-8  border border-black  bg-white flex justify-center items-center cursor-pointer hover:shadow-blog-l hover:translate-y-blog-4m hover:translate-x-blog-4p  ease-in duration-200"
            >
              {imagePath ? (<span>Chọn ảnh khác</span>) : <span>Chọn ảnh</span>}

              <input
                type="file"
                onChange={handleChange}
                accept=".png, .jpg, .jpeg"
                id="file-upload"
                name="file-upload"
                className="sr-only"
              />
            </label>
            {imagePath && (
              <>

                <div className="border border-black mt-3">
                  <img src={imagePath} alt="" className="w-full object-contain" />
                </div>
              </>

            )}
            {imageUrl && (
              <a download href={imageUrl}>
                <div className="py-3 mt-3 w-full border hover:bg-indigo-500 hover:text-white border-black text-center">Download 🙉</div>
              </a>
            )}

            {imagePath && !imageUrl && (
              <button disabled={isLoading} onClick={uploadImage} className="w-full py-3 border border-black mt-3 hover:bg-black hover:text-white">
                {isLoading ? (
                  <div>
                    <svg role="status" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">

                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                    </svg>
                    Đang thực hiện🙈...
                  </div>
                ) : (<>Thực hiện </>)}

              </button>
            )}

          </div>
        </div>
        {/* <div className="flex justify-center items-center text-center w-full min-h-screen">
           <span className="textMono block font-medium text-4xl ">Đang Làm Nè =.=</span>
       </div> */}
      </Layout>
    </>
  )
}

export default RemoveBg