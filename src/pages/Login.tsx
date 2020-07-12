import React, { useEffect, useState} from 'react';
import {
  Container,
  Row,
  Col,
  Form, FormGroup, Input, Button,
  Card, CardBody,
  CardTitle
} from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';
import LoginRegisterHeader from '../components/LoginRegisterHeader';
import {Redirect} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {getTokenData} from "../services/fetch";
import Loading from "../components/Loading";
import {url} from '../services/fetch';

interface UserLogin {
  username: string,
  password: string,
}

const LoginPage: React.FC = () => {

  const user: UserLogin = {
    username: '',
    password: '',
  };

  const [data,setData] = useState<UserLogin>(user);
  const [redirect,setRedirect] = useState<boolean>(false);
  const [loading,setLoading] = useState<boolean>(false);
  const [blog,setBlog] = useState<any>([]);
  const {t} = useTranslation();

  const formSubmit = (event: React.FormEvent):void => {
    event.preventDefault();
    setLoading(true);
    getTokenData(data.username, data.password)
        .then(json => {
          console.log(json)
          setRedirect(!redirect)
        })
        .catch(() => {
          setData(user);
          setLoading(false);
          alert("Данные введены не верно");
        })
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string):void => {
    setData({...data, [field]: event.target.value});
  }

  useEffect(() => {
    localStorage.removeItem('cutie-py-token');
    fetch(url + "/main/blog/")
        .then(res => res.json())
        .then(json => setBlog(json))
        .catch(e => console.error(e))
  },[]);

  return (
    redirect ? (<Redirect to={'/packs'} />) : (
        <Container>
          {loading &&
          <div
            className='w-100 h-100 position-fixed bg-white d-flex justify-content-center align-items-center'
            style={{top: 0,left: 0,zIndex: 1000}}>
            <Loading />
          </div>}
          <LoginRegisterHeader />
          <Row style={{height: "calc(100vh - 56px)"}}>

            <Col md={6} className="d-flex align-items-center justify-content-center">

              <div className="w-75">
                <p className="h4">
                  {t('loginPage.newsTitle')}
                </p>

                <div className="news-wrap">
                  {blog.length ? blog.map((item: any,idx: number) => {
                    const date = new Date(item.date_created);
                    return (
                        <Card key={idx} className={"mb-3"}>
                          <CardBody>
                            <CardTitle className="font-weight-bold mb-2">{item.title}</CardTitle>
                            {ReactHtmlParser(item.content)}
                            <p className="m-0 text-right news-author">
                              by {item.created_by}
                              {String(date.getDate()).length === 1 ? `0${date.getDate()}` : " " + date.getDate()}
                              /
                              {String(date.getMonth()).length === 1 ? `0${date.getMonth()}` : date.getMonth()}
                              /
                              {date.getFullYear()}
                            </p>
                          </CardBody>
                        </Card>
                    )
                  }) : <div className="d-flex justify-content-center align-items-center"><Loading /></div>}
                </div>

              </div>

            </Col>

            <Col md={6} className="d-flex align-items-center justify-content-center">

              <Form className="bg-white w-75 p-3 shadow rounded" onSubmit={formSubmit}>
                <p className={"text-center mb-2 form__title"}>{t('common.cutie')}</p>
                <p className={"text-center "}>{t('loginPage.sign_form')}</p>
                <FormGroup>
                  <Input type="text" value={data.username} onChange={(e) => inputChange(e,"username")} placeholder={t('common.username')} required/>
                </FormGroup>
                <FormGroup>
                  <Input type="password" value={data.password} onChange={(e) => inputChange(e,"password")} placeholder={t('common.password')} required/>
                </FormGroup>
                <Button block className="text-uppercase">
                  {t('common.login')}
                </Button>
              </Form>
            </Col>
          </Row>
          <Row>

          </Row>
        </Container>
    )
  )
}

export default LoginPage;
