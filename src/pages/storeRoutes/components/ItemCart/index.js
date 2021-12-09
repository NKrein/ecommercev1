import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Counter from '../Counter';
import './style.css';

const ItemCart = ({ product, setId, setNoId, handlerRemove, productId, onAdd, onSub, count }) => {

  return (
    <Container fluid>
      <Row className='itemCart'>
        <Col>
          <img src={product.item.img} alt="item" />
        </Col>
        <Col>
          <h3>{product.item.name}</h3>
        </Col>
        <Col>
          <p>Cantidad:</p>
          <Counter stock={product.item.stock} onAdd={onAdd} onSub={onSub} count={count} />
        </Col>
        <Col>
          <p>Precio:</p>
          <p><b>AR$ {product.item.price * product.quant}</b></p>
        </Col>
        <Col>
          {productId ?
            <div>
              <p>¿Estás seguro/a?</p>
              <button onClick={handlerRemove}>Si</button>
              <button onClick={setNoId}>No</button>
            </div> :
            <div>
              <button onClick={setId}>Quitar</button>
              <Link to={`/item/${product.item.id}`}>
                <button>Ver Detalles</button>
              </Link>
            </div>
          }
        </Col>
      </Row>
    </Container>
  );
}

export default ItemCart;