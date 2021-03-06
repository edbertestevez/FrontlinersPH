import React, { useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'gatsby-plugin-firebase';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';

import SiteIcon from '@assets/svg/frontlinersph.svg';
import AuthButton from '@components/auth-button';
import style from './styles.module.css';

const Header = ({ siteTitle }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const login = async () => {
    setLoading(true);
    const provider = new firebase.auth.FacebookAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await firebase.auth().signOut();
    setLoading(false);
  };

  return (
    <Navbar light expand="md" className={style.transparentNavbar}>
      <Container>
        <NavbarBrand className={style.siteTitle} href="/">
          <SiteIcon width="200px" height="50px" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <AuthButton loading={loading} onLogin={login} onLogout={logout} />
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
