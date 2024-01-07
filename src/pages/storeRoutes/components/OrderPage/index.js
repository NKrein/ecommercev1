import React from 'react';
import { Container, Row, Col, Alert, Form } from 'react-bootstrap';
import './style.css';

const OrderPage = ({ orderId, userInfo, handleQual, handleComment, saveSuggestion, message, qual }) => {

  return (
    <Container fluid>
      <Row className='orderPage'>
        <Col xs={12}>
          <h2>¡Muchas gracias {userInfo.name}!</h2>
          <p>Estás aportando al crecimiento de algo <span className='brandFont'>genuino </span>, como el sentimiento que genera <span className='brandFont'>Dharma </span> en tus espacios</p>
        </Col>
        <Col xs={12}>
          <p>Tu pedido se registró bajo el id <span>{orderId}</span></p>
          <p>Chequeá tu correo <b>{userInfo.email}</b>, recibirás los detalles del pedido.</p>
          {userInfo.address && <p>Junto con el <b>link</b> para pagar.</p>}
        </Col>
        <Col>
          <p>¿Cómo calificarías tu experiencia con la DharmaTienda?</p>
          <div className='buttonContainer'>
            <button onClick={handleQual}>No me gustó</button>
            <button onClick={handleQual}>Más o menos</button>
            <button onClick={handleQual}>¡Excelente!</button>
          </div>
          {qual &&
            <Form onSubmit={saveSuggestion}>
              <Form.Text className="text-muted">
                Elegiste <b>{qual}</b>
              </Form.Text>
              <Form.Group className='mb-3'>
                <Form.Control as='textarea' rows={3} placeholder='¿Por qué? Me va a ayudar mucho saberlo!' onChange={handleComment} />
              </Form.Group>
              {message ?
                <Alert variant={message[0]}>{message[1]}</Alert>
                :
                <button style={{ width: '100%' }} className='brandBtn'>Enviar</button>
              }
            </Form>
          }
        </Col>
        {userInfo.address &&
          <Col>
            <p>¡Compartí tu compra en las redes!</p>
            <p>Etiquetá a Dharma Diseños, y ganate un cupón sorpresa para canjear en la DharmaTienda</p>
          </Col>
        }
      </Row>
    </Container>
  );
}

export default OrderPage;