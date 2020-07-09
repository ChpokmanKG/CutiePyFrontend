import React, { useEffect, useState} from 'react';
import {
  Container,
  Row,
  Col,
  Form, FormGroup, Input, Button,
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import LoginRegisterHeader from '../components/LoginRegisterHeader';
import {Redirect} from 'react-router-dom';
import {getTokenData} from "../services/fetch";
import Loading from "../components/Loading";

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
    localStorage.removeItem('cutie-py-token')
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
                <p className="h4">Feed</p>

                <div className="news-wrap">
                  {[1,1,1,1].map((item,idx) => (
                      <Card key={idx} className={"mb-3"}>
                        <CardBody>
                          <CardTitle className="font-weight-bold mb-2">Card title</CardTitle>
                          <CardText className="text-muted mb-0">Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                          <p className="m-0 text-right news-author">by dimashmello 06/10/2020</p>
                        </CardBody>
                      </Card>
                  ))}
                </div>

              </div>

            </Col>

            <Col md={6} className="d-flex align-items-center justify-content-center">

              <Form className="bg-white w-75 p-3 shadow rounded" onSubmit={formSubmit}>
                <p className={"text-center mb-2 form__title"}>Cutie py</p>
                <p className={"text-center "}>Sign in form</p>
                <FormGroup>
                  <Input type="text" value={data.username} onChange={(e) => inputChange(e,"username")} placeholder="Username" required/>
                </FormGroup>
                <FormGroup>
                  <Input type="password" value={data.password} onChange={(e) => inputChange(e,"password")} placeholder="Password" required/>
                </FormGroup>
                <Button block className="text-uppercase">
                  log in
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
