import React, {useEffect, useState,useContext} from 'react';
import {Button, Table} from 'reactstrap';
import {Link, RouteComponentProps} from 'react-router-dom';
import {fetchWithAuth} from '../services/fetch';
import {Pack,Problem,Submissions} from '../types';
import Loading from "./Loading";
import MainContext from "../services/MainContext";

const MainTable: any = (props: RouteComponentProps<any>) => {

  const [table,setTable] = useState<any>([]);
  const Context = useContext(MainContext);

  useEffect(() => {
    setTable([]);
    const path: Array<string> = window.location.pathname.split('/');
    if(path[1] !== 'leaderboard') {
      fetchWithAuth(`main${props.location.pathname}`,{
        headers: {
          'Accept': 'application/json',
        }
      })
          .then(res => res.json())
          .then(res => setTable(res))
          .catch(e => console.error(e))
    }else {
      fetchWithAuth(`api/jwtauth/user/`,{
        headers: {
          'Accept': 'application/json',
        }
      })
          .then(res => res.json())
          .then(res => setTable(res))
          .catch(e => console.error(e))
    }

  },[props.location.pathname]);

  const showTable = () => {
    const path = window.location.pathname.split('/');
    Context.setTitle("Packs")
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
        Context.setTitle("Pack " + table.name);
        return table.problems.map((item: Problem, idx: number) => {
          const date = new Date(item.created);
          return (
              <tr key={idx} style={{background: (item.is_solved ? "#8FD5A6" : "#e3e3e3")}}>
                <td>{idx + 1}</td>
                <td><Link to={`/problem/${item.id}`}>{item.title}</Link></td>
                <td>{item.complexity}</td>
                <td>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</td>
              </tr>
          )
        })
      }
      else if((path[1] === 'problems' && table) && table.length) {
        Context.setTitle("Problems");
        return table.map((item: Problem, idx: number) => {
          const date = new Date(item.created);
          return (
              <tr key={idx} style={{background: (item.is_solved ? "#8FD5A6" : "#e3e3e3")}}>
                <td>{idx + 1}</td>
                <td><Link to={`/problem/${item.id}`}>{item.title}</Link></td>
                <td>{item.complexity}</td>
                <td>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</td>
              </tr>
          )
        })
      }
      else if(path[1] === 'files' && path[2] === undefined) {
        Context.setTitle("Submissions");
        let count:number = table.length;
        return table.map((item: Submissions) => {
          const date = new Date(item.created);
          return (
              <tr key={count}>
                <td>{count--}</td>
                <td><Link to={`/files/${item.number}`}>{item.number}</Link></td>
                <td><Link to={`/problem/${item.problem}`}>{item.problem_title}</Link></td>
                <td>{item.status}</td>
                <td>{date.getDate()}.{date.getMonth()}.{date.getFullYear()}</td>
              </tr>
          )
        })
      }
      else if(path[1] === 'leaderboard' && (table && table.length)) {
        Context.setTitle('Leaderboard');
        return table.map((item: any,idx: number) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.user}</td>
              <td>{item.points}</td>
            </tr>
        ))
      }
  };
  const showTableHead = () => {
    if(props.location.pathname.split('/')[1] === 'files' && props.location.pathname.split('/')[2] === undefined) {
      return (
          <tr>
            <th>#</th>
            <th>Submission</th>
            <th>Problem</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
      )
    }else if(props.location.pathname.split('/')[1] === 'leaderboard') {
      return (
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Points</th>
          </tr>
      )
    }
    else {
      return (
          <tr>
            <th>#</th>
            <th>Pack</th>
            <th>Complexity</th>
            <th>Date created</th>
          </tr>
      )
    }
  }

  if(typeof table.detail === 'string') {
    Context.setTitle("Submissions")
    return (
        <div className="w-100 d-flex justify-content-around align-items-center mt-3">
          <p className={"mb-0"}>
            You are not authorized or you don't have permission
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
