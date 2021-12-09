import React from 'react';
import sentIcon from '../../../../images/send.svg'
import ExclamIcon from '../../../../images/exclam.svg' 
import arrowIcon from '../../../../images/rightArrow.svg'
import { Col, Container, Row, DropdownButton, Dropdown, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';

const OrderItem = ({ order, id, timeAgo }) => {

  return (
    <Alert variant={order.paid ? 'success' : 'danger'}>
      <Container fluid>
        <Row className='orderItemCard'>
          <Col xs={12} md={6}>
            <p>{order.buyer.name}</p>
          </Col>
          <Col xs={12} md={6}>
            <p>{id}</p>
          </Col>
          <Col xs={12}>
            <hr/>
          </Col>
          <Col xs={6} md={3}>
            <DropdownButton id="dropdown-item-button" title={`Carrito (${order.items.length})`} variant='brand'>
              {order.items.map(prod => <Dropdown.ItemText key={prod.item.id}>{prod.item.name}<hr/></Dropdown.ItemText>)}
            </DropdownButton>
          </Col>
          <Col xs={6} md={3}>
            <p>Hace {timeAgo(order.date)}</p>
          </Col>
          <Col xs={6} md={3}>
            {order.sent? <img width='30px' src={sentIcon} alt='Envío establecido' /> : <img width='30px' src={ExclamIcon} alt='Envío no establecido' />}
          </Col>
          <Col xs={6} md={3}>
            <Link className='link' to={`/admin/dashboard/ord/${id}`}>
              <img width='30px' src={arrowIcon} alt='Ver orden' />
            </Link>
          </Col>
        </Row>
      </Container>

    </Alert>
  )
}

export default OrderItem;