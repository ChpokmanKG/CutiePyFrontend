import React, {useEffect, useState,useContext} from 'react';
import { Table,UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {fetchWithAuth} from "../services/fetch";
import Loading from "./Loading";
import MainContext from "../services/MainContext";
import {Link, RouteComponentProps} from "react-router-dom";
import {Problem} from "../types";



const PackTable = (props: RouteComponentProps<any>) => {

  const [table,setTable] = useState<any>([]);
  const [sort,setSort] = useState<string>('Choose sort method');
  const Context = useContext(MainContext);


  useEffect(() => {
    Context.setTitle("Pack");
    fetchWithAuth(`main/packs/${props.match.params.id}`,{
      headers: {
        'Accept': 'application/json',
      }
    }).then(res => res.json())
        .then(json => {
          Context.setTitle("Pack " + json.name);
          setTable(json)
        })
        .catch(e => console.error(e))
  },[]);

  const sortBy = (item: string) => {
    setSort(item);
    let sortedArray;
    if(item === 'complexity') {
      sortedArray = table.problems.sort((a:Problem,b:Problem) => {
        return +b.complexity - +a.complexity;
      })
      console.log('complexity',sortedArray);
    }else {
      sortedArray = table.problems.sort((a:Problem,b:Problem) => {
        return +a.complexity - +b.complexity;
      })
      console.log('lightness',sortedArray);
    }
    setTable({...table,problems: sortedArray});
  }

  return (
      <>
        <UncontrolledDropdown className="mb-3 d-flex justify-content-end align-items-center">
          <p className="mb-0 mr-3">Sort by</p>
          <DropdownToggle caret className="text-capitalize">
            {sort}
          </DropdownToggle>
          <DropdownMenu>
            {['complexity','lightness'].map((item: any,idx: number) => (
                <DropdownItem className="text-capitalize" key={idx} onClick={() => sortBy(item)}>{item}</DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
        {table && table.problems ? (
            <Table striped>
              <thead>
              <tr>
                <th>#</th>
                <th>Pack</th>
                <th>Complexity</th>
                <th>Date created</th>
              </tr>
              </thead>
              <tbody>
              {table.problems.map((item: Problem,idx: number) => {
                const date = new Date(item.created);
                return (
                    <tr key={idx}>
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
