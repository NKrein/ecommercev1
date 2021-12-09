import React from 'react';
import Form from 'react-bootstrap/Form';

const FormInput = ({ name, type, placeholder, handleChange, text, requiredField, isInvalid=false }) => {

  return (
    <Form.Group className="mb-3">
      {text &&
        <Form.Text className="text-muted">
          {text}
        </Form.Text>
      }
      <Form.Control type={type} name={name} placeholder={placeholder} onChange={handleChange} required={requiredField} isInvalid={isInvalid} />
    </Form.Group>
  );
}

export default FormInput;