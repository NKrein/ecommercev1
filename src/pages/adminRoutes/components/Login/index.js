import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FormInput from './FormInput';
import './style.css';


const Login = ({ takeUserInfo, handleEmail, handlePass, loading }) => {

  return (
    <Container>
      <Row className='specialOrder'>
        <Col xs={12} md={12}>
          <h1>Log In</h1>
        </Col>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <Form onSubmit={takeUserInfo}>
            <FormInput name='email' type='email' placeholder='Email' handleChange={handleEmail} text={false} requiredField={true} />
            <FormInput name='password' type='password' placeholder='Contraseña' handleChange={handlePass} text={false} requiredField={true} />
            <button style={{ width: '100%' }} className='brandBtn' disabled={loading}>Entrar</button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login;