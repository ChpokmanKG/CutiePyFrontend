import React,{useEffect,useState,useContext} from 'react';
import {withRouter,RouteComponentProps} from 'react-router-dom';
import {url} from '../services/fetch';
import MainContext from "../services/MainContext";
import userImage from '../assets/images/user.png';
import {DecodeToken,Tokens} from "../types";
import {parseJwt} from '../services/functions';

interface User {
  profile_picture: string;
  email: string,
  username: string,
  attempts: string,
  first_name: string,
  last_name: string,
  points: string,
  problems_failed: number,
  problems_passed: number,
  rank: number,
  status: any,
}

const PageHeader: any = () => {

  const Context = useContext(MainContext);
  const [user,setUser] = useState<User>({
    email: '',
    username: '',
    attempts: '',
    first_name: '',
    profile_picture: '',
    last_name: '',
    points: '',
    problems_failed: 0,
    problems_passed: 0,
    rank: 0,
    status: '',
  });

  useEffect(() => {
    const tokens: Tokens = JSON.parse(localStorage.getItem("cutie-py-token") as string);
    if(tokens !== null) {
      const decodeToken: DecodeToken = JSON.parse(localStorage.getItem('cutie-py-token') as string);
      fetch(`${url}/api/jwtauth/user/${decodeToken.user_id}`)
          .then(res => res.json())
          .then(json => setUser(json))
          .catch(e => console.error(e))
    }else setUser({...user,username: "anonymous",email: "anonymous@mail.ru"})

    return function cleanUp() {
      setUser({...user,username: "anonymous",email: "anonymous@mail.ru"})
    }
  },[]);

  return (
      <div className="w-100 d-flex justify-content-between align-items-center mt-3 mb-3">

        <p className="pack-title mb-0">{Context.title}</p>

        <div className="user d-flex align-items-center">
          <div className="mr-2">
            <img className="user__image rounded-circle"
                 src={user.profile_picture ? user.profile_picture : userImage}
                 alt="user`s avatar"
                 />
          </div>
          <div>
            <p className="mb-0 user__name">{user.username}</p>
            <p className="mb-0 user__rank">{user.rank ? `Rank: ${user.rank}` : "Loading"}</p>
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
