import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import './style.css';

const Footer = ({ logo, linkInstagram, linkFacebook, linkWhatsapp, linkEmail }) => {
  return (
    <footer>
      <Container fluid>
        <Row className='footer'>
          <Col xs={12} sm={6} md={4}>
            <ul>
              <li>-Secciones-</li>
              <li><NavLink to={'/'} className='link'>Home</NavLink></li>
              <li><NavLink to={'/order'} className={({isActive}) => 'link' + (isActive ? ' currentLink' : '')}>Pedido</NavLink></li>
              <li><NavLink to={'/Cart'} className={({isActive}) => 'link' + (isActive ? ' currentLink' : '')}>Carrito</NavLink></li>
            </ul>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <ul>
              <li>-Redes-</li>
              <li><Link to={{ pathname: linkInstagram }} className='link' target="_blank">Instagram</Link></li>
              <li><Link to={{ pathname: linkFacebook }} className='link' target="_blank">Facebook</Link></li>
              <li><Link to={{ pathname: linkWhatsapp }} className='link' target="_blank">WhatsApp</Link></li>
              <li><Link to={{ pathname: linkEmail }} className='link' target="_blank">E-mail</Link></li>
            </ul>
          </Col>
          <Col xs={12} sm={12} md={4}>
          <Link to={'/'}><img className='logo' src={logo} alt='Logo'/></Link>
          </Col>
          <Col xs={12} sm={12} md={12}>
            <p className='copyright'>Todos los derechos reservados | Copyright © 2021 Dharma Diseños | <Link to={{ pathname: 'https://nkrein.com' }} className='currentLink' target="_blank">Desarrollo por NKrein</Link></p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer