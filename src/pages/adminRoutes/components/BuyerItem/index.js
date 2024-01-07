import React from 'react';
import checkIcon from '../../../../images/check.svg'
import xIcon from '../../../../images/x.svg'
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const BuyerItem = ({ buyer, id }) => {


  return (
    <Container>
      <Row className='buyerCard'>
        <Col xs={12} md={6}>
          <h3>{buyer.name}</h3>
          <p>{id}</p>
        </Col>        
        <Col xs={12} md={3}>
          <p>Subscripción: {buyer.sub? <img width='20px' src={checkIcon} alt='Subscripto' /> : <img width='20px' src={xIcon} alt='No Subscripto' />}</p>
        </Col>
        <Col xs={12} md={3}>
          <Link to={`/admin/dashboard/buy/${id}`}>
            <Button variant='brand'>Ver detalle</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default BuyerItem;