import React, {useEffect, useState} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import i18next from "i18next";
import Sidebar from './components/SideBar';
import PageHeaderWrap from './components/PageHeader';
import MainTable from './components/Table';
import Problem from './pages/Problem';
import LoginPage from './pages/Login';
import Register from "./pages/Register";
import Solution from './pages/Solution';
import ContextWrapper from "./components/ContextWrapper";
import LeaderBoardTable from "./components/LeaderBoardTable";
import PackTable from './components/PackTable';
import AuthContextWrapper from "./components/AuthWrapper";

const App: React.FC = () => {

  const [lang,setLang] = useState<boolean>(true);

  const changeLang = () => {
    setLang(act => !act);
  }

  useEffect(() => {
    i18next.changeLanguage(lang ? "en" : "ru");
  },[lang])

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
                <AuthContextWrapper>
                  <Route exact path={"/"} component={LoginPage}/>
                  <Route exact path={"/register"} component={Register}/>
                  <Route exact path={'/packs'} component={MainTable}/>
                  <Route exact path={'/packs/:id'} component={PackTable}/>
                  <Route exact path={'/problems/'} component={MainTable}/>
                  <Route exact path={'/problem/:id'} component={Problem}/>
                  <Route exact path={'/files/'} component={MainTable}/>
                  <Route exact path={'/leaderboard'} component={LeaderBoardTable}/>
                  <Route exact path={'/files/:id'} component={Solution}/>
                </AuthContextWrapper>
              </Switch>
            </Container>
          </Col>
        </Row>
        <div onClick={changeLang} className={"position-fixed d-flex justify-content-center align-items-center to-top-button rounded-circle shadow"}>
          {lang ? "en" : "ru"}
        </div>
      </Container>
      </ContextWrapper>
    </BrowserRouter>
  )
}

export default App;
