import React, {useEffect, useState,useContext} from 'react';
import { Table,UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {fetchWithAuth} from "../services/fetch";
import Loading from "./Loading";
import MainContext from "../services/MainContext";
import { useTranslation } from 'react-i18next';


const LeaderBoardTable: React.FC = () => {

  const [table,setTable] = useState([]);
  const [userType,setUserType] = useState({type: 'All',code: 'All'});
  const [loading,setLoading] = useState(false);
  const Context = useContext(MainContext);
  const {t} = useTranslation();

  const fetchData = (end: string) => {
    setLoading(false);
    fetchWithAuth(end,{
      headers: {
        'Accept': 'application/json',
      }
    })
        .then(res => res.json())
        .then(json => {
          setLoading(true);
          setTable(json)
        })
        .catch(e => console.error(e))
  }

  useEffect(() => {
    Context.setTitle(t('sideBar.leaderboard'))
    fetchData('api/jwtauth/user/');
  },[]);

  useEffect(() => {
    if(userType.type === 'All') {
      fetchData('api/jwtauth/user/');
      return
    }
    fetchData(`api/jwtauth/user/?status=${userType.code}`);
  },[userType.type]);

    return (
        <>
          <UncontrolledDropdown className="mb-3 d-flex justify-content-end align-items-center">
            <p className="mb-0 mr-3">Filter by </p>
            <DropdownToggle caret>
              {userType.type}
            </DropdownToggle>
            <DropdownMenu>
              {[{type: 'Marathon',code: 'MP'},{type: 'Student',code: 'NS'},{type: 'All',code: 'All'}].map((item: any,idx: number) => (
                  <DropdownItem key={idx} onClick={() => setUserType(item)}>{item.type}</DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
          {(table && table.length) && loading ? (
              <Table striped>
                <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Points</th>
                </tr>
                </thead>
                <tbody>
                {table.map((item:any,idx: number) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{item.user}</td>
                      <td>{item.points}</td>
                    </tr>
                ))}
                </tbody>
              </Table>
          ) : (
              <div className="d-flex justify-content-center"><Loading /></div>
          )}
        </>
    )
};

export default LeaderBoardTable;
