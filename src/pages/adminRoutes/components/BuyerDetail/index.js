import React from 'react';
import checkIcon from '../../../../images/check.svg'
import sentIcon from '../../../../images/send.svg'
import ExclamIcon from '../../../../images/exclam.svg'
import xIcon from '../../../../images/x.svg'
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';

const BuyerDetail = ({ buyer, orders }) => {


  return (
    <Container>
      <Row>
        <Col xs={12} md={{ span: 6, offset: 3 }} className='buyerCard'>
          <h3>{buyer.name}</h3>
          <p>{buyer.id}</p>
          <p>Dirección: {buyer.address} (CP {buyer.pc})</p>
          <p>Subscripción: {buyer.sub ? <img width='20px' src={checkIcon} alt='Subscripto' /> : <img width='20px' src={xIcon} alt='No Subscripto' />}</p>
          <p>Email: {buyer.email}</p>
          <Link to={{ pathname: `mailto:${buyer.email}` }} className='link' target="_blank">
            Contactar
          </Link>
        </Col>
        <Col xs={12} md={{ span: 6, offset: 3 }} className='buyerCard'>
          <h4>Pedidos</h4>
          {orders.map(item =>
            <Link to={`/admin/dashboard/ord/${item[0]}`} className='link'>
              <Alert variant={item[1].paid ? 'success' : 'danger'}>
                <Row>
                  <Col xs={10}>
                    {item[0]}
                  </Col>
                  <Col xs={2}>
                    {item[1].sent ? <img width='30px' src={sentIcon} alt='Envío establecido' /> : <img width='30px' src={ExclamIcon} alt='Envío no establecido' />}
                  </Col>
                </Row>
              </Alert>
            </Link>)}
        </Col>
      </Row>
    </Container>
  )
}

export default BuyerDetail;