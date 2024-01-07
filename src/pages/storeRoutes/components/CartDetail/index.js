import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import BuyerModalContainer from '../../containers/BuyerModalContainer';
import './style.css';


const CartDetail = ({ quant, price, clearAll, setClearAll, removeAll, setUserInfo }) => {

  return (
    <Container fluid>
      <Row className='CartDetail'>
        <Col xs={{ span: 12, order: 3 }} md={{ span: 4, order: 1 }}>
          <p className='CartMessage'>Que el <span>Arte</span> siempre te encuentre <span>Cerca</span>!</p>
        </Col>
        <Col xs={{ span: 12, order: 2 }} md={{ span: 4, order: 2 }}>
          {clearAll ?
            <div>
              <p>¿Estás seguro/a?</p>
              <button onClick={removeAll}>Si</button>
              <button onClick={() => { setClearAll(false) }}>No</button>
            </div> :
            <div>
              <button onClick={() => { setClearAll(true) }}>Limpiar Carrito</button>
              <Link to={'/'}>
                <button>Seguir comprando</button>
              </Link>
            </div>
          }
        </Col>
        <Col xs={{ span: 12, order: 1 }} md={{ span: 4, order: 3 }} className='totalCart'>
          <p>Cantidad total: <span>{quant}</span></p>
          <p>Precio total: <span>AR$ {price}</span></p>
        </Col>
        <Col xs={{ span: 12, order: 4 }} md={{ span: 4, order: 5, offset: 8 }}>
          <BuyerModalContainer setUserInfo={setUserInfo} />
        </Col>
      </Row>
    </Container>
  );
}

export default CartDetail;