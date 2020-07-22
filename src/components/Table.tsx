import React, {useEffect, useState,useContext} from 'react';
import {Button, Table} from 'reactstrap';
import {Link, RouteComponentProps} from 'react-router-dom';
import {fetchWithAuth} from '../services/fetch';
import {Pack,Problem,Submissions} from '../types';
import Loading from "./Loading";
import MainContext from "../services/MainContext";
import {parseJwt} from "../services/functions";
import {Tokens,DecodeToken,Solved} from '../types';
import { useTranslation } from 'react-i18next';


const MainTable: any = (props: RouteComponentProps<any>) => {

  const [table,setTable] = useState<any>([]);
  const [solved,setSolved] = useState<Solved[]>([]);
  const Context = useContext(MainContext);
  const {t} = useTranslation();


  const fetchData = (endpoint: string):void => {
    fetchWithAuth(`${endpoint}`,{
      headers: {
        'Accept': 'application/json',
      }
    })
        .then(res => res.json())
        .then(res => setTable(res))
        .catch(e => console.error(e))
  }

  useEffect(() => {
    setTable([]);
    const path: Array<string> = window.location.pathname.split('/');
    fetchData("main"+props.location.pathname);

    if(path[1] === 'problems') {
      const user:Tokens = JSON.parse(localStorage.getItem("cutie-py-token") as string);
      const token: DecodeToken = parseJwt(user.access);
      console.log(token.user_id);
      fetchWithAuth(`main/problems/solved_by/${token.user_id}`,{
        headers: {
          'Accept': 'application/json',
        }
      })
          .then(res => res.json())
          .then(json => setSolved(json))
          .catch(e => console.error(e));
    }

  },[props.location.pathname]);

  const showTable = () => {
    const path = window.location.pathname.split('/');
    Context.setTitle(t('sideBar.packs'))
    if(((path[1] === 'packs' || path[1] === '') && path[2] === undefined) && table.length) {
      return table.map((item: Pack,idx:number) => (
          <tr key={idx}>
            <td>{idx + 1}</td>
            <td><Link to={`/packs/${item.id}`}>{item.name}</Link></td>
            <td>1</td>
            <td>11.10.2020</td>
          </tr>
      ))
    }
    else if((path[1] === 'packs' && path[2] !== undefined) && table.problems) {
      Context.setTitle(t('sideBar.pack') + " " + table.name);
      return table.problems.map((item: Problem, idx: number) => {
        const date = new Date(item.created);
        const id = solved.find(x => x.problem === item.id);
        return (
            <tr
                key={idx}
                style={{background: (((solved && solved.length) ? (id && id.is_solved ? id.is_solved : false) : false) ? "#8FD5A6" : "#e3e3e3")}}>
              <td>{idx + 1}</td>
              <td><Link to={`/problem/${item.id}`}>{item.title}</Link></td>
              <td>{item.complexity}</td>
              <td>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</td>
            </tr>
        )
      })
    }
    else if((path[1] === 'problems' && table) && table.length) {
      Context.setTitle(t('sideBar.problems'));
      return table.map((item: Problem, idx: number) => {
        const date = new Date(item.created);
        const id = solved.find(x => x.problem === item.id);
        return (
            <tr
                key={idx}
                style={{background: (((solved && solved.length) ? (id && id.is_solved ? id.is_solved : false) : false) ? "#8FD5A6" : idx % 2 === 0 ? "#e3e3e3" : "#efefef")}}>
              <td>{idx + 1}</td>
              <td><Link to={`/problem/${item.id}`}>{item.title}</Link></td>
              <td>{item.complexity}</td>
              <td>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</td>
            </tr>
        )
      })
    }
    else if(path[1] === 'files' && path[2] === undefined) {
      Context.setTitle(t('sideBar.submissions'));
      let count:number = table.length;
      return table.map((item: Submissions) => {
        const date = new Date(item.created);
        return (
            <tr key={count}>
              <td>{count--}</td>
              <td><Link to={`/files/${item.number}`}>{item.number}</Link></td>
              <td><Link to={`/problem/${item.problem}`}>{item.problem_title}</Link></td>
              <td className={item.status}>{item.status}</td>
              <td>{date.getDate()}.{date.getMonth()}.{date.getFullYear()}</td>
            </tr>
        )
      })
    }
  };
  const showTableHead = () => {
    if(props.location.pathname.split('/')[1] === 'files' && props.location.pathname.split('/')[2] === undefined) {
      return (
          <tr>
            <th>#</th>
            <th>{t('table.submission')}</th>
            <th>{t('table.problem')}</th>
            <th>{t('table.status')}</th>
            <th>{t('table.date-created')}</th>
          </tr>
      )
    } else {
      return (
          <tr>
            <th>#</th>
            <th>{t('sideBar.pack')}</th>
            <th>{t('table.complexity')}</th>
            <th>{t('table.date-created')}</th>
          </tr>
      )
    }
  }

  const getPack = () => {
    fetchWithAuth(`main/app/`,{
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({pack: props.match.params.id})
    })
        .then(res => res.json())
        .then(json => {
          if(json.error) {
            return alert(json.error);
          }
          alert("We have received your application.")
        })
        .catch(e => console.error(e))
  };

  if(typeof table.detail === 'string') {
    if(localStorage.getItem('cutie-py-token')) {
      return (
          <div className="w-100 d-flex justify-content-around align-items-center mt-3">
            <p className={"mb-0"}>
              You don't have permission
            </p>
            <Button onClick={getPack}>
              Get this pack
            </Button>
          </div>
      )
    }
    return (
        <div className="w-100 d-flex justify-content-around align-items-center mt-3">
          <p className={"mb-0"}>
            You are not authorized!
          </p>
          <Link to={'/'}>
            <Button>
              Sign in
            </Button>
          </Link>
        </div>
    )
  }

  return (
      <Table striped>
        {(table && table.length) || ((table && table.problems) && table.problems) ? (
            <thead>
            {showTableHead()}
            </thead>
        ) : (
            <div className={"w-100 text-center"}>
              <Loading />
            </div>
        )}
        <tbody>
        {showTable()}
        </tbody>
      </Table>
  )
}

export default MainTable;
