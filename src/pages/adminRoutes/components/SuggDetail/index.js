import React from 'react';
import exclamIcon from '../../../../images/exclam.svg'
import checkIcon from '../../../../images/check.svg'
import smileIcon from '../../../../images/smile.png'
import neutralIcon from '../../../../images/neutral.png'
import sadIcon from '../../../../images/sad.png'
import { Alert, Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const SuggDetail = ({ sugg, handleCheck }) => {

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={6} className='suggInfo'>
          <h3>Cliente: <b>{sugg.name}</b></h3>
          <p>Id: <b>{sugg.id}</b></p>
          {sugg.qualification === 'No me gustó' && <img width='60px' src={sadIcon} alt='No me gustó' />}
          {sugg.qualification === 'Más o menos' && <img width='60px' src={neutralIcon} alt='Más o menos' />}
          {sugg.qualification === '¡Excelente!' && <img width='60px' src={smileIcon} alt='¡Excelente!' />}
          <Link to={{ pathname: `mailto:${sugg.email}` }} className='link' target="_blank">
            <p>Contactar</p>
          </Link>
        </Col>
        <Col xs={12} md={6} className='suggProduct'>
          <h3>Comentario</h3>
          <p>{sugg.comment}</p>
        </Col>
        <Col xs={12} md={{ span: 8, offset: 2 }} className='suggSend'>
          <p>Estado de la respuesta</p>
          <Alert variant={sugg.check ? 'success' : 'warning'}>
            {sugg.check ? <img width='30px' src={checkIcon} alt="Check" /> : <img width='30px' src={exclamIcon} alt="No check" />}
          </Alert>
          <Button variant='brand' onClick={handleCheck}>
            {sugg.check ? 'Deshacer Check' : 'Marcar Check'}
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default SuggDetail;