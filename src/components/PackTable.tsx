import React, {useEffect, useState,useContext} from 'react';
import { Table,UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {fetchWithAuth} from "../services/fetch";
import Loading from "./Loading";
import MainContext from "../services/MainContext";
import {Link, RouteComponentProps} from "react-router-dom";
import {Problem} from "../types";
import {parseJwt} from "../services/functions";
import {Tokens,DecodeToken,Solved} from '../types';
import { useTranslation } from 'react-i18next';



const PackTable = (props: RouteComponentProps<any>) => {
  const {t} = useTranslation();

  const [table,setTable] = useState<any>([]);
  const [sort,setSort] = useState<string>(t('table.sort-method'));
  const [solved,setSolved] = useState<Solved[]>([]);

  const Context = useContext(MainContext);

  useEffect(() => {
    Context.setTitle(t('sideBar.pack'));
    fetchWithAuth(`main/packs/${props.match.params.id}`,{
      headers: {
        'Accept': 'application/json',
      }
    }).then(res => res.json())
        .then(json => {
          Context.setTitle(t('sideBar.pack') + " " + json.name);
          setTable(json)
          const user: Tokens = JSON.parse(localStorage.getItem("cutie-py-token") as string);
          const token: DecodeToken = parseJwt(user.access);
          fetchWithAuth(`main/problems/solved_by/${token.user_id}`,{
            headers: {
              'Accept': 'application/json',
            }
          })
              .then(res => res.json())
              .then(json => setSolved(json))
              .catch(e => console.error(e));
        })
        .catch(e => console.error(e))
  },[]);

  const sortBy = (item: string) => {
    setSort(item);
    let sortedArray;
    if(item.toLowerCase() === 'hard') {
      sortedArray = table.problems.sort((a:Problem,b:Problem) => {
        return +b.complexity - +a.complexity;
      })
    }else {
      sortedArray = table.problems.sort((a:Problem,b:Problem) => {
        return +a.complexity - +b.complexity;
      })
    }
    setTable({...table,problems: sortedArray});
  }

  return (
      <>
        <UncontrolledDropdown className="mb-3 d-flex justify-content-end align-items-center">
          <p className="mb-0 mr-3">{t('table.sort')}</p>
          <DropdownToggle caret className="text-capitalize">
            {sort}
          </DropdownToggle>
          <DropdownMenu>
            {[t('table.hard'),t('table.easy')].map((item: any,idx: number) => (
                <DropdownItem className="text-capitalize" key={idx} onClick={() => sortBy(item)}>{item}</DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
        {table && table.problems ? (
            <Table striped>
              <thead>
              <tr>
                <th>#</th>
                <th>{t('sideBar.pack')}</th>
                <th>{t('table.complexity')}</th>
                <th>{t('table.date-created')}</th>
              </tr>
              </thead>
              <tbody>
              {table.problems.map((item: Problem,idx: number) => {
                const date = new Date(item.created);
                const id = solved.find(x => x.problem === item.id);
                return (
                    <tr
                        key={idx}
                        style={{background: (((solved && solved.length) ? (id && id.is_solved ? id.is_solved : false) : false) ? "#8FD5A6" : idx % 2 === 0 ? "#e3e3e3" : "#efefef")}}
                      >
                      <td>{idx + 1}</td>
                      <td><Link to={`/problem/${item.id}`}>{item.title}</Link></td>
                      <td>{item.complexity}</td>
                      <td>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</td>
                    </tr>
                )
              })}
              </tbody>
            </Table>
        ) : (
            <div className="d-flex justify-content-center"><Loading /></div>
        )}
      </>
  )
};

export default PackTable;
