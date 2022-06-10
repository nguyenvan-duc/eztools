import React from 'react'
import Editor from "@monaco-editor/react";

const EditorComponent = ({language,theme,value,height,width,options,onChange}) => {
  return (
    <div>
      <Editor
      theme={theme}
      defaultLanguage={language}
      value={value}
      height={height}
      width={width}
      options={options}
      onChange={onChange}
    />
    </div>
  )
}

export default EditorComponent