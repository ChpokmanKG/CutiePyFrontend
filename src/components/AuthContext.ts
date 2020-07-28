import {createContext} from "react";

const AuthContext = createContext({
  token: null,
  setToken: (token: any) => {}
});

export default AuthContext;
