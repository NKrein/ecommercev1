import React from 'react';
import exclamIcon from '../../../../images/exclam.svg'
import checkIcon from '../../../../images/check.svg'
import smileIcon from '../../../../images/smile.png'
import neutralIcon from '../../../../images/neutral.png'
import sadIcon from '../../../../images/sad.png'
import arrowIcon from '../../../../images/rightArrow.svg'
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';

const SuggItem = ({ sugg, id }) => {

  return (
    <Link className='link' to={`/admin/dashboard/sugg/${id}`}>
      <Container fluid>
        <Row className='suggItemCard'>
          <Col xs={6} md={3}>
            {sugg.qualification === 'No me gustó' && <img width='30px' src={sadIcon} alt='No me gustó' />}
            {sugg.qualification === 'Más o menos' && <img width='30px' src={neutralIcon} alt='Más o menos' />}
            {sugg.qualification === '¡Excelente!' && <img width='30px' src={smileIcon} alt='¡Excelente!' />}
          </Col>
          <Col xs={6} md={3}>
            {sugg.check ? <img width='30px' src={checkIcon} alt='Respondido' /> : <img width='30px' src={exclamIcon} alt='Sin responder' />}
          </Col>
          <Col xs={6} md={4}>
            <p>{sugg.name}</p>
          </Col>
          <Col xs={6} md={2}>
            <p><img width='30px' src={arrowIcon} alt='Ver orden' /></p>
          </Col>
        </Row>
      </Container>
    </Link>

  )
}

export default SuggItem;