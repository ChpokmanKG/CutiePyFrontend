import React,{useState} from 'react';
import {
  Button,
  Container, Form,
  FormGroup,
  Input,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import LoginRegisterHeader from '../components/LoginRegisterHeader';
import {url} from '../services/fetch';
import {Redirect} from "react-router";

interface NewUser {
  email: string,
  username: string,
  password: string,
  password2: string,
  status: string
}

const Register: React.FC = () => {

  const [userData,setUserData] = useState<NewUser>({
    username: '',
    email: '',
    password: '',
    password2: '',
    status: 'Marathon'
  });
  const [redirect,setRedirect] = useState<boolean>(false);

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string):void => {
    setUserData({...userData, [fieldName]: event.target.value});
  }

  const formSubmit = (event: React.FormEvent):void => {
    event.preventDefault();
    if(userData.password === userData.password2) {
      fetch(`${url}/api/jwtauth/register/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password,
          password2: userData.password2,
          status: userData.status === 'Marathon' ? "MP" : "NS"
        })
      }).then(res => setRedirect(!redirect))
    }else {
      alert("Пароли не совпадают!")
    }
  };

  if(!redirect) {
    return (<>
      <Container>
        <LoginRegisterHeader />
        <div className="w-100" style={{height: 'calc(100vh - 56px)'}}>
          <Container>
            <Row className={"justify-content-center align-items-center"} style={{height: 'calc(100vh - 56px)'}}>
              <Col md={5}>
                <Form className="bg-white mx-auto w-75 p-3 shadow rounded form" onSubmit={formSubmit}>
                  <p className={"text-center mb-2 form__title"}>Cutie py</p>
                  <p className={"text-center "}>Sign up form</p>
                  <FormGroup>
                    <Input type="email" required value={userData.email} placeholder="email" onChange={(e) => inputChange(e,'email')}/>
                  </FormGroup>
                  <FormGroup>
                    <UncontrolledDropdown>
                      <DropdownToggle color="faded" caret className="w-100 border rounded text-left text-muted shadow-none">
                        {userData.status}
                      </DropdownToggle>
                      <DropdownMenu>
                        {['Marathon','Student'].map((item,idx) => (
                            <DropdownItem onClick={(e: React.MouseEvent<HTMLButtonElement>) => setUserData({...userData, status: e.currentTarget.innerText})} key={idx}>{item}</DropdownItem>
                        ))}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </FormGroup>
                  <FormGroup>
                    <Input type="text" required value={userData.username} placeholder="Username" onChange={(e) => inputChange(e, 'username')}/>
                  </FormGroup>
                  <FormGroup>
                    <Input type="password" required value={userData.password} placeholder="Password" onChange={(e) => inputChange(e,'password')}/>
                  </FormGroup>
                  <FormGroup>
                    <Input type="password" required value={userData.password2} placeholder="Confirm password" onChange={(e) => inputChange(e,'password2')}/>
                  </FormGroup>
                  <Button block className="text-uppercase">
                    submit
                  </Button>
                  <div className={"text-center mt-3"}>
                    Have an account? Log in
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </>)
  }else return <Redirect to={'/'}/>
};

export default Register;
