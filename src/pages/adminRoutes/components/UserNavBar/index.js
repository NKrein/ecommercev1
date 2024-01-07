import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import { Col, Container, NavDropdown, Row } from 'react-bootstrap';
import './style.css';

const UserNavBar = ({ colapsable, col1, col2 }) => {

  const { currentUser, logOut } = useContext(AuthContext);

  if (currentUser) {
    return (
      <Container fluid>
        <Row>
          <div className='AdminNav'>
            <Col>
              <h1 className='brandTitle'>Panel</h1>
            </Col>
            <Col>
              <NavLink to={'/admin/dashboard'} activeClassName='currentLink' className='link'>
                Dashboard
              </NavLink>
            </Col>
            <Col>
              <NavDropdown as='div' title={colapsable} id="basic-nav-dropdown">
                <NavLink to={'/admin/passwordReset'} activeClassName='currentLink' className='link'>
                  <NavDropdown.Item href='false'>{col1}</NavDropdown.Item>
                </NavLink>
                <NavLink to={'/admin/userAdmin'} activeClassName='currentLink' className='link'>
                  <NavDropdown.Item href='false'>{col2}</NavDropdown.Item>
                </NavLink>
              </NavDropdown>
            </Col>
            <Col>
              <button onClick={logOut} className='navBtn'>Cerrar sesión</button>
            </Col>
          </div>
        </Row>
      </Container>
    )
  } else {
    return (
      <Container fluid>
        <Row>
          <div className='nav'>
            <Col>
              <h1 className='brandTitle'>Dharma Panel</h1>
            </Col>
          </div>
        </Row>
      </Container>
    )
  }

}

export default UserNavBar;