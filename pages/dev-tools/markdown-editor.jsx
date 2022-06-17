import React from "react";
import Navbar from "../../components/DevPageComponents/Navbar";
import EditorComonent from "../../components/PageComponents/EditorComponent";
import dynamic from "next/dynamic";
import { marked } from "marked";
import HeadSeo from "../../components/HeadSeo";
const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});
const Markdowneditor = () => {
  const [value, setValue] = React.useState("");
  const [loadFile, setLoadFile] = React.useState(false);
  const handleChange = (event) => {
    if (typeof window !== "undefined") {
      if (event.target.files.length !== 0) {
        setLoadFile(true);
        console.log(event.target.files[0]);
        fetch(URL.createObjectURL(event.target.files[0]))
          .then((res) => {
            return res.text();
          })
          .then((text) => {
            let textNotesData = JSON.stringify({
              markdownValue: text,
            });
            setValue(JSON.parse(textNotesData));
            localStorage.setItem("Markdown7THDEC", textNotesData);
          }).finally(() => {
            setLoadFile(false);
          });
      }
    }
  };
  const downloadMarkdownFile = (e) => {
    e.preventDefault();
    const element = document.createElement("a");
    const file = new Blob([value.markdownValue], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "markdown-from-7thdec.md";
    document.body.appendChild(element);
    element.click();
  };
  //   React.useEffect(() => {
  //     const markdown = compiler(value, { slugify: str => str });
  //     console.log(marked(value));
  //   },[value])
  const exportHtml = (e) => {
    e.preventDefault();
    const element = document.createElement("a");
    const file = new Blob([marked(value.markdownValue)], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "html-from-7thdec.html";
    document.body.appendChild(element);
    element.click();
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("Markdown7THDEC")) {
        setValue(JSON.parse(localStorage.getItem("Markdown7THDEC")));
      } else {
        let textNotesData = JSON.stringify({
          markdownValue: value,
        });
        localStorage.setItem("Markdown7THDEC", textNotesData);
      }
    }
  }, []);
  const handleChangeMD = (e) => {
    let textNotesData = JSON.stringify({
      markdownValue: e,
    });
    setValue(JSON.parse(textNotesData));
    localStorage.setItem("Markdown7THDEC", textNotesData);
  };
  return (
    <>
      <HeadSeo title="Markdown Editor" />
      <Navbar />
      <div>
        <div className="px-6 h-12 flex items-center">
          <label
            htmlFor="file-upload"
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 mr-10"
          >
            <span>Import Markdown</span>
            <input
              onChange={handleChange}
              type="file"
              accept=".md"
              id="file-upload"
              name="file-upload"
              className="sr-only"
            />
          </label>
          <button
            onClick={downloadMarkdownFile}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 mr-3"
          >
            Export Markdown
          </button>
          <button
            onClick={exportHtml}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 mr-3"
          >
            Export Html
          </button>
          {/* <button
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 mr-3"
          >
            Export PDF
          </button> */}
          {loadFile && (
            <div>
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
        <div className="flex flex-wrap">
          <div className="w-full border-t pt-2 md:w-1/2">
            <EditorComonent
              theme="light"
              value={value.markdownValue}
              height={"90vh"}
              language="markdown"
              onChange={(value) => handleChangeMD(value)}
            />
          </div>
          <div className="w-full pt-2 px-2 border-t max-h-[90vh] overflow-y-auto md:w-1/2 preview">
            <MarkdownPreview height={"90vh"} source={value.markdownValue} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Markdowneditor;
