import React from 'react'
import Layout from "../components/Layout";
import HeadSeo from "../components/HeadSeo";
const About = () => {
  return (
   <>
    <HeadSeo title="Giới thiệu 💅"/>
   <Layout>
       <div className="flex justify-center items-center text-center w-full min-h-screen">
           <span className="textMono block font-medium text-4xl ">There&apos;s nothing here!</span>
       </div>
   </Layout>
   </>
  )
}

export default About