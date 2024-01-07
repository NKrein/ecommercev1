import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FormInput from '../../../commonComponents/FormInput';
import './style.css';


const UserPasswordReset = ({ formName, takeUserEmail, handleEmail, loading }) => {

  return (
    <Container>
      <Row className='userForm'>
        <Col xs={12} md={12}>
          <h1>{formName}</h1>
        </Col>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <Form onSubmit={takeUserEmail}>
            <FormInput name='email' type='email' placeholder='Email' handleChange={handleEmail} text={false} requiredField={true} />
            <button style={{ width: '100%' }} className='brandBtn' disabled={loading}>{formName}</button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default UserPasswordReset;