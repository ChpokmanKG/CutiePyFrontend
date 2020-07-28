import React, {ReactNode, useEffect} from 'react';
import { useState } from "react";
import {Redirect} from "react-router";
import AuthContext from "./AuthContext";
import {parseJwt} from "../services/functions";
import {saveToken} from "../services/fetch";


type Props = {
  children: ReactNode
}

const AuthContextWrapper = (props: Props) => {

  const [token,setToken] = useState<any>();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('cutie-py-token') as string);
    setToken(token);
  },[]);

  const changeToken = (token: any) => {
    const parsedToken = parseJwt(token.access);
    parsedToken.refresh = token.refresh;
    parsedToken.access = token.access;
    saveToken((JSON.stringify(parsedToken)))
    setToken(parsedToken)
  };

  if(!JSON.parse(localStorage.getItem('cutie-py-token') as string) && (window.location.pathname !== '/' && window.location.pathname !== '/register')) return <Redirect to={'/'} />

  return (
      <AuthContext.Provider value={{token,setToken: changeToken}}>
        {props.children}
      </AuthContext.Provider>
  )

}

export default AuthContextWrapper;
