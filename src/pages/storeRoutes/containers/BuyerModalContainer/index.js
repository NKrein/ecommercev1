import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormInput from '../../components/FormInput';

const BuyerModal = ({ setUserInfo }) => {

  //------------------------------------------------------------------------------Data Fields

  const [email, setEmail] = useState();
  const [verEmail, setVerEmail] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [pc, setPc] = useState();
  const [check, setCheck] = useState(true);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleVerification = (e) => {
    setVerEmail(e.target.value);
  }

  const isInvalid = () => {
    return (email === verEmail)? false : true;
  }

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleAddress = (e) => {
    setAddress(e.target.value);
  }

  const handlePc = (e) => {
    setPc(e.target.value);
  }

  const handleCheck = (e) => {
    setCheck(e.target.checked);
  }


  const takeData = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      name: name.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))), //Capitalize
      address: address.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))), //Capitalize
      pc: pc,
      sub: check
    }
    setUserInfo(userData);
    handleClose();
  }

  //------------------------------------------------------------------------------------Modal

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);




  return (
    <>
      <button onClick={handleShow} style={{ width: '100%', color: 'white', backgroundColor: '#8fa382' }}>
        Terminar Compra
      </button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Ya casi terminas!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={takeData}>
            <FormInput name='email' type='email' placeholder='Email' handleChange={handleEmail} text='Estos datos serán de uso exclusivo para Dharma, no se compartirá a terceros.' requiredField={true} />
            <FormInput name='email' type='email' placeholder='Repetir Email' handleChange={handleVerification} text={'Se habilitará el boton si coinciden los campos'} requiredField={true} isInvalid={isInvalid()} />
            <FormInput name='nombre' type='text' placeholder='Nombre y apellido' handleChange={handleName} text={false} requiredField={true} />
            <FormInput name='direccion' type='text' placeholder='Dirección' handleChange={handleAddress} text={false} requiredField={true} />
            <FormInput name='cp' type='text' placeholder='Código postal' handleChange={handlePc} text={false} requiredField={true} />
            <Form.Group className="mb-3">
              <Form.Check defaultChecked='true' type="checkbox" label="Suscribirme!" onChange={handleCheck} />
            </Form.Group>
            <button style={isInvalid()? {width:'100%', backgroundColor:'rgba(0, 0, 0, 0.4)'}:{width:'100%' }} className='brandBtn' disabled={isInvalid()}>Continuar</button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className='brandBtn' onClick={handleClose}>Volver</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BuyerModal;