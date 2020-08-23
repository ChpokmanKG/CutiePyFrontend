import React from 'react';
import MonacoEditor from "react-monaco-editor";
import { EditorType } from '../types';
// import "monaco-editor";
import 'monaco-editor/esm/vs/editor/editor.main'

const Editor = ({code, onChange,lang}: EditorType) => {

  const options = {
    selectOnLineNumbers: true,
    colorDecorators: true,
    copyWithSyntaxHighlighting: true,
  };

  return (
      <MonacoEditor
          width="100%"
          height="400"
          language={lang}
          theme="vs-dark"
          value={code}
          options={options}
          onChange={onChange}
      />
  )
};

export default Editor;
