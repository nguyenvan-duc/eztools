import React from "react";
import Layout from "../components/Layout";
import TitlePage from "../components/PageComponents/TitlePage";

const TextNotes = () => {
  const [TextNotes,setTextNotes] = React.useState('')
  React.useEffect(() => {
    if(typeof window !== 'undefined'){
      if(localStorage.getItem('textNotes')){
        setTextNotes(localStorage.getItem('textNotes'))
      }else{
        localStorage.setItem('textNotes',TextNotes)
      }
    }
  },[]);
  const handleChange = (e) => {
    setTextNotes(e.target.value)
    localStorage.setItem('textNotes',e.target.value)
  }
  return (
    <>
      <Layout>
      <TitlePage>Ghi chú văn bản</TitlePage>
        <div className="  max-w-5xl p-3 border border-black bg-white m-auto">
          <textarea  onChange={handleChange} spellCheck="true" value={TextNotes} placeholder="Nhập nội dung" rows={20}   className="w-full outline-none border min-h-250 border-black p-3 min-h-fit text-lg textMono"/>
        </div>
      </Layout>
    </>
  );
};

export default TextNotes;
