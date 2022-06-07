import React from "react";
import Layout from "../components/Layout";
import TitlePage from "../components/PageComponents/TitlePage";
import moment from 'moment';
import Moment from 'react-moment';
import HeadSeo from "../components/HeadSeo";
const TextNotes = () => {
  const [TextNotes,setTextNotes] = React.useState('')
  let date = new Date();
  let dateTimeNow = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  React.useEffect(() => {
    if(typeof window !== 'undefined'){
      if(localStorage.getItem('textNotes')){
        setTextNotes(JSON.parse(localStorage.getItem('textNotes')))
      }else{
        let textNotesData =JSON.stringify({
          date: moment(dateTimeNow).format('DD-MM-YYYY, h:mm a'),
          textNotes: TextNotes
        })
        localStorage.setItem('textNotes',textNotesData)
      }
    }
  },[]);
  const handleChange = (e) => {
    let textNotesData = JSON.stringify({
      date:  moment(dateTimeNow).format('DD-MM-YYYY, h:mm a'),
      textNotes: e.target.value
    })
    setTextNotes(JSON.parse(textNotesData))
    localStorage.setItem('textNotes',textNotesData)
  }
  return (
    <>
    <HeadSeo title="Ghi Chú 📝" />
      <Layout>
      <TitlePage>Ghi chú văn bản</TitlePage>
        <div className="  max-w-5xl p-3 border border-black bg-white m-auto">
        <span>
          Hiện tại:  <Moment format={"DD-MM-YYYY, h:mm:ss a"} interval={1000}/>
            </span>
          <textarea  onChange={handleChange} spellCheck="true" value={TextNotes.textNotes} placeholder="Nhập nội dung" rows={20}   className="w-full outline-none border min-h-250 border-black p-3 min-h-fit text-lg textMono"/>
          <div className="flex justify-between items-center">
            <span>Thay đổi lần cuối lúc: {TextNotes.date}</span>
            <span>{TextNotes?.textNotes?.length}</span>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default TextNotes;
