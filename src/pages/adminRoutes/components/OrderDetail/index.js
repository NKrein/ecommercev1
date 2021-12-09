import React from 'react';
import { Alert, Col, Container, Row, Button } from 'react-bootstrap';
import './style.css';

const OrderDetail = ({ order, timeAgo, handleSent }) => {

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={6} className='orderInfo'>
          <h3>Cliente: <b>{order.buyer.name}</b></h3>
          <p>Fecha: {order.date.toDate().toString()} <b>(hace {timeAgo(order.date)})</b></p>
          <p>Dirección: <b>{order.buyer.address} (CP: {order.buyer.pc})</b></p>
          <p>Id: <b>{order.id}</b></p>
          <p>Total: <b>${order.total}</b></p>
          <Alert variant={order.paid ? 'success' : 'danger'}>
            {order.paid ? 'Pagado' : 'No pagado'}
          </Alert>
        </Col>
        <Col xs={12} md={6} className='orderProduct'>
          <h3>Productos</h3>
          {order.items.map(prod =>
            <Container fluid>
              <Row>
                <Col>
                  <img src={prod.item.img} alt={`img ${prod.item.name}`} />
                </Col>
                <Col>
                  <p>{prod.item.name} ({prod.quant})</p>
                </Col>
              </Row>
            </Container>
          )}
        </Col>
        <Col xs={12} md={{ span: 8, offset: 2 }} className='orderSend'>
          <p>Estado del envío</p>
          <Alert variant={order.sent ? 'success' : 'warning'}>
            {order.sent ? 'Envío preparado' : 'Envío no preparado'}
          </Alert>
          <Button variant='brand' onClick={handleSent}>
            {order.sent ? 'Deshacer envío' : 'Marcar como preparado'}
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default OrderDetail;