import React from 'react'
import Layout from "../components/Layout";
import HeadSeo from "../components/HeadSeo";
import { DiscussionEmbed } from "disqus-react";
const Feedback = () => {
  return (
   <>
   <HeadSeo title="Đóng góp ý kiến 💬"/>
   <Layout>
       <div className="flex justify-center items-center text-center w-full max-w-6xl min-h-screen pt-16 lg:pt-28">
       <DiscussionEmbed
              shortname="cong-cu"
              config={{
                url: "https://congcu.vercel.app/feedback/",
                image: "https://cdn.123job.vn/123job/uploads/2020/03/27/2020_03_27______7083e76e3e7c82dcb004c44d11443dc3.jpeg",
                identifier:1,
                title: "Đóng góp ý kiến",
                language: "vi", //e.g. for Traditional Chinese (Taiwan)
              }}
            />
       </div>
   </Layout>
   </>
  )
}

export default Feedback