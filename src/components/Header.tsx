import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import logo from '../assets/icons/firstLogo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = ():void => setIsOpen(!isOpen);

  return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>
            <img src={logo} alt=""/>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  RU
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            {/*<NavbarText>Simple Text</NavbarText>*/}
            <b className={"text-uppercase"}>войти</b>
          </Collapse>
        </Navbar>
      </div>
  );
}

export default Header;
