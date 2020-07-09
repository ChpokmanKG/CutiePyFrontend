import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import {Link} from "react-router-dom";
import React, {useState} from "react";


const LoginRegisterHeader: React.FC = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
      <Navbar color="faded" light expand="md">
        <NavbarBrand tag="span">
          <Link to="/">
            Cutie Py
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag="span">
                <Link to="/register">
                  Register
                </Link>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
  )
}

export default LoginRegisterHeader;
