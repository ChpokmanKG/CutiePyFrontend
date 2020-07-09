import React from 'react';
import {
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  FormGroup, Input, Button, Form
} from "reactstrap";
import userIcon from '../assets/icons/userRe.png';
import lockIcon from '../assets/icons/lockRe.png';
import FirstLogo from '../assets/icons/whiteLogo.png';

const Login: React.FC = () => {

  return (
      <div className={"login-wrap"}>
        <Container className={"pb-4"}>
          <Row>
            <Col md={12} className="d-flex align-items-center justify-content-between pt-3 pb-3">
              <img src={FirstLogo} alt=""/>
              <UncontrolledDropdown>
                <DropdownToggle color={"faded"} className="shadow-none text-light" caret>
                  RU
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>RU</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
          </Row>
          <Row className="justify-content-end mt-5 pt-5">
            <Col md={5}>
              <Form className="bg-white p-3 shadow login-wrap__form-wrap pb-4 pl-4 pr-4">
                <p className={"text-center text-uppercase login-wrap__form-title font-weight-bold mt-4"}>авторизация</p>
                <FormGroup className={"position-relative"}>
                  <img src={userIcon} className="position-absolute" alt="user-png"/>
                  <Input type="text"
                         // value={""}
                         className="font-italic pl-5 shadow-sm border-0"
                      // onChange={(e) => inputChange(e,"username")}
                         placeholder="Имя пользователя" required/>
                </FormGroup>
                <FormGroup className={"position-relative"}>
                  <img src={lockIcon} className="position-absolute" alt="lock icon"/>
                  <Input type="password"
                         // value={""}
                         className="font-italic pl-5 shadow-sm border-0"
                      // onChange={(e) => inputChange(e,"password")}
                         placeholder="Пароль" required/>
                </FormGroup>
                <Button block className="text-uppercase font-weight-bold login-wrap__form-button mb-3">
                  Войти
                </Button>
                <div className={"w-100 d-flex justify-content-center mb-2"}>
                  <a href={"/register"}>Регистрация</a>
                </div>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col md={12} className={"mb-3 mt-3"}>
              <p className="h2 login-wrap__blog-title text-uppercase font-weight-bold text-light">Блог</p>
            </Col>
            <Col md={4} className={"d-flex login-wrap__card"}>
              <div className="w-40 login-wrap__card-wrap pt-3 pb-3 d-flex align-items-center">
                <p className="mb-0 login-wrap__card-title font-weight-bold text-uppercase text-light text-center">начало курса</p>
              </div>
              <div className="w-60 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1593526613712-7b4b9a707330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" className="img-fluid"/>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
  )
}

export default Login;
