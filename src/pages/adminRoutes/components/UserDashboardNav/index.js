import React from 'react';
import { useContext } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import './style.css';

const UserDashboardNav = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect expand="md" bg="brand" variant="light" style={{ display: !currentUser && 'none' }}>
      <Container fluid>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className='dashboardNav'>
            <NavLink to={'/admin/dashboard/products'} activeClassName='currentLink' className='link'>
              Administrar productos
            </NavLink>

            <NavLink to={'/admin/dashboard/product/new'} activeClassName='currentLink' className='link'>
              Nuevo producto
            </NavLink>

            <NavLink to={'/admin/dashboard/orders'} activeClassName='currentLink' className='link'>
              Ver pedidos
            </NavLink>

            <NavLink to={'/admin/dashboard/buyers'} activeClassName='currentLink' className='link'>
              Clientes
            </NavLink>

            <NavLink to={'/admin/dashboard/specialOrders'} activeClassName='currentLink' className='link'>
              Pedidos Especiales
            </NavLink>

            <NavLink to={'/admin/dashboard/suggestions'} activeClassName='currentLink' className='link'>
              Experiencias
            </NavLink>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>)
}

export default UserDashboardNav;