import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../../context/CartContext';
import cartIcon from '../../../../images/cart.svg';
import './style.css';

const Item = ({ product, id }) => {

  const { isInCart } = useContext(CartContext);

  return (
    <li className='productItem' style={{ backgroundImage: `url(${product.img})` }}>
      <Container>
        <Row className='productItemInfo'>
          <Col xs={12}>
            <h2>{product.name}</h2>
          </Col>
          <Col xs md={12}>
            <p><b>AR$ {product.price}</b></p>
          </Col>
          <Col xs md={12}>
            <Link to={`/item/${id}`}>
              {isInCart(id) ? <button style={{ color: 'white', backgroundColor: '#8fa382', border: '4px solid white' }}><img style={{WebkitFilter: 'invert(100%)'}} src={cartIcon} alt="icono carrito" /></button> : <button>Ver más</button>}
            </Link>
          </Col>
        </Row>
      </Container>
    </li>
  )
}

export default Item;