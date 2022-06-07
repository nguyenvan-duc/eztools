import React from 'react'
import Layout from '../components/Layout';
import axios from 'axios';
import path from 'path';
import FormData from 'form-data';
const RemoveBg = () => {

  const fetchData = async () => {
 
  }
  React.useEffect(() => {
    fetchData();
  },[])
  return (
      <>
      <Layout>
      <div className="flex justify-center items-center text-center w-full min-h-screen">
           <span className="textMono block font-medium text-4xl ">Đang Làm Nè =.=</span>
       </div>
      </Layout>
      </>
  )
}

export default RemoveBg