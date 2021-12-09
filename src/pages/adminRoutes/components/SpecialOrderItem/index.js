import React from 'react';
import exclamIcon from '../../../../images/exclam.svg'
import checkIcon from '../../../../images/check.svg'
import arrowIcon from '../../../../images/rightArrow.svg'
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';

const SpecialOrderItem = ({ order, id, timeAgo }) => {

  return (
    <Container fluid>
      <Row className='specialOrderItemCard'>
        <Col xs={12} md={6}>
          <p>{order.name}</p>
        </Col>
        <Col xs={12} md={6}>
          <p>{id}</p>
        </Col>
        <Col xs={12}>
          <hr />
        </Col>
        <Col xs={6} md={3}>
          <p>Hace {timeAgo(order.date)}</p>
        </Col>
        <Col xs={3} md={3}>
          {order.sent ? <img width='30px' src={checkIcon} alt='Respondido' /> : <img width='30px' src={exclamIcon} alt='Sin responder' />}
        </Col>
        <Col xs={3} md={6}>
          <Link className='link' to={`/admin/dashboard/specialOrd/${id}`}>
            <img width='30px' src={arrowIcon} alt='Ver orden' />
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default SpecialOrderItem;