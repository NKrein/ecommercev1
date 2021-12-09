import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';

const ProductItem = ({ product, id }) => {


  return (
    <Container fluid>
      <Row className='itemAdminView'>
        <Col>
          <img src={product.img} alt="item" />
        </Col>
        <Col>
          <p><b>{product.name}</b></p>
        </Col>
        <Col>
          <p><b>{product.stock}</b></p>
        </Col>
        <Col>
          <p><b>AR$ {product.price}</b></p>
        </Col>
        <Col>
          <Link to={`/admin/dashboard/edit/${id}`}>
            <button>Ver</button>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductItem;