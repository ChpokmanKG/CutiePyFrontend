import React, {useState} from 'react';
import {Navbar, NavbarToggler, Collapse, Nav, NavItem, NavLink, Col} from 'reactstrap';
import Packs from '../assets/icons/box.svg';
import Problems from '../assets/icons/addon.svg';
import Submissions from '../assets/icons/plane.svg';
import Leaders from '../assets/icons/leaders.svg';
import Logout from '../assets/icons/logout.svg';
import {Link,withRouter,RouteComponentProps} from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Sidebar: any = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {t} = useTranslation();
  const toggle = ():void => setIsOpen(!isOpen);

  return (
      <Col md={2} xs={4} sm={4} className="pl-0">
        <section className='sidebar h-100 align-items-center d-flex' style={{maxHeight: window.innerHeight,position: 'sticky',top: 0}}>
          <Navbar color='faded' expand='xs' className="flex-column justify-content-between h-100">
            <Link to={"/packs"}>
              <p className="h2 sidebar__title mt-3">Cutie py</p>
            </Link>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav vertical navbar>
                <NavItem>
                  <Link to="/packs" className="mb-3 text-light d-inline-block">
                    <img className="sidebar__image" src={Packs} alt="packs" />
                    <span className="ml-2">{t('sideBar.packs')}</span>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/problems" className="mb-3 text-light d-inline-block">
                    <img className="sidebar__image" src={Problems} alt="Problems" />
                    <span className="ml-2">{t('sideBar.problems')}</span>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/files" className="mb-3 text-light d-inline-block">
                    <img className="sidebar__image" src={Submissions} alt="Submissions" />
                    <span className="ml-2">{t('sideBar.submissions')}</span>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/leaderboard" className="mb-3 text-light d-inline-block">
                    <img className="sidebar__image" src={Leaders} alt="Submissions" />
                    <span className="ml-2">{t('sideBar.leaderboard')}</span>
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
            <NavItem className="w-100">
              <NavLink tag={"span"}>
                <Link to={'/'}>
                  <img className="sidebar__image" src={Logout} alt="Logout" />
                  <span className="ml-2 text-light">{t('sideBar.logout')}</span>
                </Link>
              </NavLink>
            </NavItem>
          </Navbar>
        </section>
      </Col>
  )
};

const SideBarWrap = (props: RouteComponentProps<any>) => {
  if(props.location.pathname !== '/' && props.location.pathname !== '/register') {
    return <Sidebar />
  }else return null;
}

export default withRouter(SideBarWrap);
