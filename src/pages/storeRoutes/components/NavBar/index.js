import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CartWidget from '../CartWidget';
import { NavLink } from 'react-router-dom';
import './style.css';

const NavBar = ({logo, link, colapsable, col1, col2}) => {

  return (
    <>
    <Container fluid>
      <Row>
        <ul className='nav'>
          <Col xs={12} md={12} className='brand-header'>
            <NavLink to={'/'} className={({isActive}) => 'link' + (isActive ? ' currentLink' : '')}>
              <li className='nav-item-brand'><img  className='logo' src={logo} alt='Logo'/></li>
            </NavLink>
          </Col>
          <Col xs={4} md={4}>
            <NavLink to={'/cart'} className={({isActive}) => 'link' + (isActive ? ' currentLink' : '')}>
              <li className='nav-item'><CartWidget /></li>            
            </NavLink>
          </Col>
          <Col xs={4} md={4}>
            <li className='nav-item'>
              <NavDropdown as='div' title={colapsable} id="basic-nav-dropdown">
                <NavLink to={`/cat/all`} className={({isActive}) => 'link' + (isActive ? ' currentLink' : '')}>
                  <NavDropdown.Item href="/cat/all">Ver todo</NavDropdown.Item>
                </NavLink>
                <hr/>
                <NavLink to={`/cat/${col1}`} className={({isActive}) => 'link' + (isActive ? ' currentLink' : '')}>
                  <NavDropdown.Item href={`/cat/${col1}`}>{col1}</NavDropdown.Item>
                </NavLink>
                <NavLink to={`/cat/${col2}`} className={({isActive}) => 'link' + (isActive ? ' currentLink' : '')}>
                  <NavDropdown.Item href={`/cat/${col2}`}>{col2}</NavDropdown.Item>
                </NavLink>
              </NavDropdown>
            </li>
          </Col>
          <Col xs={4} md={4}>
            <NavLink to={'/order'} className={({isActive}) => 'link' + (isActive ? ' currentLink' : '')}>
              <li className='nav-item'>{link}</li>
            </NavLink>
          </Col>             
        </ul>
      </Row>
    </Container>
    </>
  )
}

export default NavBar;