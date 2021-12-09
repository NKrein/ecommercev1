import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FormInput from '../../../commonComponents/FormInput';

const ProductEdit = ({ setDataLoaded, img, setImg, uploadProgress, requiredField = true , product = {id:'', name:'', category:'', description:'', price:'', stock:''} }) => {

  //------------------------------------------------------------------------------Data Fields

  const [name, setName] = useState('');
  const [cat, setCat] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleCat = (e) => {
    setCat(e.target.value);
  }

  const handleStock = (e) => {
    setStock(e.target.value);
  }

  const handlePrice = (e) => {
    setPrice(e.target.value);
  }

  const handleImgSelect = (e) => {
    e.target.files[0] && setImg(e.target.files[0]);
  }

  const handleDesc = (e) => {
    setDesc(e.target.value);
  }

  const takeData = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      category: cat,
      stock: stock,
      price: price,
      description: desc
    }
    setDataLoaded(data);
  }



  return (
    <>
      <Col xs={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }}>
        <Form onSubmit={takeData}>
          <FormInput name='nombre' type='text' placeholder={product.name} handleChange={handleName} text='Nombre' requiredField={requiredField} />
          <FormInput name='categoria' type='text' placeholder={product.category} handleChange={handleCat} text='Categoría' requiredField={requiredField} />
          <FormInput name='stock' type='number' placeholder={product.stock} handleChange={handleStock} text='Stock' requiredField={requiredField} />
          <FormInput name='precio' type='number' placeholder={product.price} handleChange={handlePrice} text='Precio' requiredField={requiredField} />
          {product.img && <img src={product.img} alt='product img' width='200px' />}
          <FormInput name='imagen' type='file' placeholder='' handleChange={handleImgSelect} text={img && `Cargando imagen: ${uploadProgress}%`} requiredField={requiredField} />
          <Form.Group className="mb-3">
            <Form.Control as="textarea" rows={3} placeholder={`Descripción: ${product.description}`} onChange={handleDesc} required={requiredField} />
          </Form.Group>
          <button className='brandBtn'>Continuar</button>
        </Form>
      </Col>
    </>
  );
}

export default ProductEdit;