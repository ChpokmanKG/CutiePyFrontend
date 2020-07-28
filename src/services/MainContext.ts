import {createContext} from "react";

const MainContext = createContext({
  title: '',
  setTitle: (text: string) => {},
});

export default MainContext;
