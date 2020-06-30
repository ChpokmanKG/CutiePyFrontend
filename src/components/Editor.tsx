import React,{useEffect} from 'react';
import MonacoEditor from "react-monaco-editor";
import { EditorType } from '../types';
import "monaco-editor";

function getRandomInt(min:number, max:number):number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Editor = ({code, onChange}: EditorType) => {

  const options = {
    selectOnLineNumbers: true,
    colorDecorators: true,
    copyWithSyntaxHighlighting: true,
  };

  useEffect(() => {
    const phrases = ['#Good luck!', '#You can do it!','#You\'re on the right way'];
    if (onChange) {
      onChange(phrases[getRandomInt(0, phrases.length)]);
    }
  },[]);

  return (
      <MonacoEditor
          width="100%"
          height="400"
          language="python"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={onChange}
      />
  )
};

export default Editor;
