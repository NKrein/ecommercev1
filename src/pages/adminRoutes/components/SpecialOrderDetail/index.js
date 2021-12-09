import React from 'react';
import { Alert, Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';

const SpecialOrderDetail = ({ order, timeAgo, handleSent }) => {

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={6} className='orderInfo'>
          <h3>Cliente: <b>{order.name}</b></h3>
          <p>Fecha: {order.date.toDate().toString()} <b>(hace {timeAgo(order.date)})</b></p>
          <p>Id: <b>{order.id}</b></p>
          <p>{order.email}</p>
          <Link to={{ pathname: `mailto:${order.email}` }} className='link' target="_blank">
            Contactar
          </Link>
        </Col>
        <Col xs={12} md={6} className='orderProduct'>
          <h3>Descripción:</h3>
          <p>{order.description}</p>
        </Col>
        <Col xs={12} md={{ span: 8, offset: 2 }} className='orderSend'>
          <Alert variant={order.sent ? 'success' : 'warning'}>
            {order.sent ? 'Respondido' : 'No respondido'}
          </Alert>
          <Button variant='brand' onClick={handleSent}>
            {order.sent ? 'Marcar como no respondido' : 'Marcar como respondido'}
          </Button>
        </Col>

      </Row>
    </Container>
  )
}

export default SpecialOrderDetail;