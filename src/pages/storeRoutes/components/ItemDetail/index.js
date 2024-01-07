import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Counter from '../Counter';
import './style.css';


const ItemDetail = ({ product, onAdd, onSub, count, handlerAdd, handlerRemove, getCount, isInCart }) => {

  return (
    <Container fluid>
      <Row className='itemDetail'>
        <Col xs={12} md={6}>
          <img src={product.img} className='img-fluid' alt="item" />
        </Col>
        <Col xs={12} md={6} className='itemDetailInfo'>
          <h2>{product.name}</h2>
          <p>Medida: <b>{product.category}</b></p>
          <p>Descripción: {product.description}</p>
          <p>Precio: <b>AR$ {product.price}</b></p>
          <p>Stock: {product.stock > 0? <b>{product.stock}</b> : <b>No disponible</b>} </p>
          <p>Id: {product.id}</p>
          {
            (getCount || isInCart(product.id)) ?
              <div>
                <p>Agregaste {getCount} {getCount > 1 ? "acuarelas" : "acuarela"} {product.name} al carrito!</p>
                <Link to={'/cart'}><button>Terminar compra</button></Link>
                <Link to={'/'}><button>Quiero más!</button></Link>
                <button onClick={handlerRemove}>Quitar del Carrito</button>
              </div> :
              product.stock > 0 ?
                <div>
                  <Counter stock={product.stock} onAdd={onAdd} onSub={onSub} count={count} />
                  <button onClick={handlerAdd}>Agregar al carrito</button>
                </div> :
                <div>
                  <Link to={'/order'}><button>No hay stock, ¡hace tu pedido!</button></Link>
                  <Link to={'/'}><button>Ir al inicio</button></Link>
                </div>
          }
        </Col>
      </Row>
    </Container>

  )
}

export default ItemDetail;