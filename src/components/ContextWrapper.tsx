import React,{ReactNode,useState} from 'react';
import MainContext from "../services/MainContext";

type Props = {
  children: ReactNode
}

const ContextWrapper = (props: Props) => {

  const [title,setTitle] = useState<string>('');

  const changeTitle = (text:string):void => {
    setTitle(text);
  }

  return (
      <MainContext.Provider value={{title, setTitle: changeTitle}}>
        {props.children}
      </MainContext.Provider>
  )
};

export default ContextWrapper;
