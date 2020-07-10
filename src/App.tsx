import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Sidebar from './components/SideBar';
import PageHeaderWrap from './components/PageHeader';
import MainTable from './components/Table';
import Problem from './pages/Problem';
import LoginPage from './pages/Login';
import Register from "./pages/Register";
import Solution from './pages/Solution';
import ContextWrapper from "./components/ContextWrapper";
import LeaderBoardTable from "./components/LeaderBoardTable";



const App: React.FC = () => {

  return (
    <BrowserRouter>
      <ContextWrapper>
      <Container fluid style={{ height: '100vh' }}>
        <Row style={{ height: '100vh' }}>
          <Sidebar />
          <Col md={10} className={"mx-auto"}>
            <Container>
              <PageHeaderWrap />
              <Switch>
                <Route exact path={"/"} component={LoginPage}/>
                <Route exact path={"/register"} component={Register}/>
                <Route exact path={'/packs'} component={MainTable}/>
                <Route exact path={'/packs/:id'} component={MainTable}/>
                <Route exact path={'/problems/'} component={MainTable}/>
                <Route exact path={'/problem/:id'} component={Problem}/>
                <Route exact path={'/files/'} component={MainTable}/>
                <Route exact path={'/leaderboard'} component={LeaderBoardTable}/>
                <Route exact path={'/files/:id'} component={Solution}/>
              </Switch>
            </Container>
          </Col>
        </Row>
      </Container>
      </ContextWrapper>
    </BrowserRouter>
  )
}

export default App;
