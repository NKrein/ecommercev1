import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FormInput from '../FormInput';
import './style.css';


const SpecialOrder = ({ takeOrder, handleEmail, handleName, handleCheck, handleDesc }) => {

  return (
    <Container>
      <Row className='specialOrder'>
        <Col xs={12} md={12}>
          <h1>Pedido especial</h1>
          <p>Si no encontraste disponible la obra que querías o la querés de diferente tamaño, o bien una personalizada:</p>
          <p>¡dejame tus datos y me pondré en contacto para seguir con el pedido!</p>
        </Col>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <Form onSubmit={takeOrder}>
            <FormInput name='email' type='email' placeholder='Email' handleChange={handleEmail} text='Estos datos serán de uso exclusivo para Dharma, no se compartirá a terceros.' requiredField={true} />
            <FormInput name='nombre' type='text' placeholder='Nombre y apellido' handleChange={handleName} text={false} requiredField={true} />
            <Form.Group className='mb-3'>
              <Form.Control as='textarea' rows={3} placeholder='Breve descripción' onChange={handleDesc} required />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Check defaultChecked='true' type='checkbox' label='Suscribirme!' onChange={handleCheck} />
            </Form.Group>
            <button style={{ width: '100%' }} className='brandBtn'>Enviar</button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default SpecialOrder;