import React, {useEffect} from 'react';
import {Container, Row,Col} from "reactstrap";
import Header from "../components/Header";



const Main: React.FC = () => {

  useEffect(() => {
    document.body.className = "bg-white-custom"
  },[])

  return (
      <Container>
        <Row>
          <Col md={12}>
            <Header />
          </Col>
        </Row>
      </Container>
  )
};

export default Main;
