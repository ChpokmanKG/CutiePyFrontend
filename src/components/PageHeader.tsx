import React,{useEffect,useState,useContext} from 'react';
import {withRouter,RouteComponentProps} from 'react-router-dom';
import {url} from '../services/fetch';
import MainContext from "../services/MainContext";

interface Tokens {
  access: string,
  expires_in: string,
  refresh: string
}

interface DecodeToken {
  exp: number,
  jti: string,
  token_type: string,
  user_id: number
}

interface User {
  email: string,
  username: string
}

const parseJwt = (token: any): DecodeToken => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const PageHeader: any = () => {

  const Context = useContext(MainContext);
  const [user,setUser] = useState<User>({
    email: '',
    username: '',
  });

  useEffect(() => {
    const tokens: Tokens = JSON.parse(localStorage.getItem("cutie-py-token") as string);
    if(tokens !== null) {
      const decodeToken: DecodeToken = parseJwt(tokens.access);
      fetch(`${url}/api/jwtauth/user/${decodeToken.user_id}`)
          .then(res => res.json())
          .then(json => setUser(json))
          .catch(e => console.error(e))
    }else setUser({username: "anonymous",email: "anonymous@mail.ru"})

    return function cleanUp() {
      setUser({username: "anonymous",email: "anonymous@mail.ru"})
    }
  },[]);

  return (
      <div className="w-100 d-flex justify-content-between align-items-center mt-3 mb-3">

        <p className="pack-title mb-0">{Context.title}</p>

        <div className="user d-flex align-items-center">
          <div className="mr-2">
            <img className="user__image rounded-circle"
                 src="https://instagram.fhel4-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/82159802_186252155862293_8101768247139752125_n.jpg?_nc_ht=instagram.fhel4-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=36aXjhAQu7oAX-swlZZ&oh=090fe9e7ee6b3563feb750b0e653737b&oe=5F1260D8"
                 alt=""/>
          </div>
          <div>
            <p className="mb-0 user__name">{user.username}</p>
            <p className="mb-0 user__rank">{user.email}</p>
          </div>
        </div>

      </div>
  )
}

const PageHeaderWrap = (props: RouteComponentProps<any>) => {
  if(props.location.pathname !== '/' && props.location.pathname !== '/register') {
    return <PageHeader />
  }else return null;
};

export default withRouter(PageHeaderWrap);
