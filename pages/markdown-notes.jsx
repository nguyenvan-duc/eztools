import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import Layout from "../components/Layout";
import TitlePage from "../components/PageComponents/TitlePage";
import moment from "moment";
import Moment from "react-moment";
import dynamic from "next/dynamic";
import mermaid from "mermaid";
import Link from "next/link";
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);
const mdMermaid = `The following are some examples of the diagrams, charts and graphs that can be made using Mermaid and the Markdown-inspired text specific to it. 
\`\`\`mermaid
graph TD
A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
\`\`\`
\`\`\`mermaid
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
\`\`\`
`;

const randomid = () => parseInt(String(Math.random() * 1e15), 10).toString(36);

const Code = ({ inline, children = [], className, ...props }) => {
  const demoid = useRef(`dome${randomid()}`);
  const code = getCode(children);
  const demo = useRef(null);
  useEffect(() => {
    if (demo.current) {
      try {
        const str = mermaid.render(
          demoid.current,
          code,
          () => null,
          demo.current
        );
        // @ts-ignore
        demo.current.innerHTML = str;
      } catch (error) {
        // @ts-ignore
        demo.current.innerHTML = error;
      }
    }
  }, [code, demo]);

  if (
    typeof code === "string" &&
    typeof className === "string" &&
    /^language-mermaid/.test(className.toLocaleLowerCase())
  ) {
    return (
      <code ref={demo}>
        <code id={demoid.current} style={{ display: "none" }} />
      </code>
    );
  }
  return <code className={String(className)}>{children}</code>;
};

const getCode = (arr = []) =>
  arr
    .map((dt) => {
      if (typeof dt === "string") {
        return dt;
      }
      if (dt.props && dt.props.children) {
        return getCode(dt.props.children);
      }
      return false;
    })
    .filter(Boolean)
    .join("");
const MarkdownNotes = () => {
  const [TextNotes, setTextNotes] = React.useState("");
  let date = new Date();
  let dateTimeNow = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("textNotesMarkdown")) {
        setTextNotes(JSON.parse(localStorage.getItem("textNotesMarkdown")));
      } else {
        let textNotesData = JSON.stringify({
          date: moment(dateTimeNow).format("DD-MM-YYYY, h:mm a"),
          textNotes: TextNotes,
        });
        localStorage.setItem("textNotesMarkdown", textNotesData);
      }
    }
  }, []);
  const handleChange = (e) => {
    let textNotesData = JSON.stringify({
      date: moment(dateTimeNow).format("DD-MM-YYYY, h:mm a"),
      textNotes: e,
    });
    console.log(textNotesData);
    setTextNotes(JSON.parse(textNotesData));
    localStorage.setItem("textNotesMarkdown", textNotesData);
  };
  return (
    <>
      <Layout>
        <TitlePage>Ghi chú markdown</TitlePage>
        <div className="w-full text-center mb-2">
          <Link href={"https://www.markdownguide.org/cheat-sheet/"}>
            <a
              target={"_blank"}
              className="text-center text-base underline text-indigo-600"
            >
              Hướng đẫn markdown
            </a>
          </Link>
        </div>
        <div className="  max-w-5xl p-3 border border-black bg-white m-auto">
          <span>
            Hiện tại:{" "}
            <Moment format={"DD-MM-YYYY, h:mm:ss a"} interval={1000} />
          </span>
          <div className="my-3">
            <MDEditor
              height={500}
              value={TextNotes.textNotes}
              onChange={handleChange}
              previewOptions={{
                components: {
                  code: Code,
                },
              }}
            />
          </div>

          <div className="flex justify-between items-center">
            <span>Thay đổi lần cuối lúc: {TextNotes.date}</span>
            <span>{TextNotes?.textNotes?.length}</span>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default MarkdownNotes;
