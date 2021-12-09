import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import OrderPage from '../../components/OrderPage';
import SpecialOrder from '../../components/SpecialOrder';
import firebase from 'firebase/app';
import { getFirestore } from '../../../../firebase';


const SpecialOrderContainer = () => {

  //------------------------------------------------------------------------------data fields

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [check, setCheck] = useState(true);
  const [description, setDescription] = useState();
  const [order, setOrder] = useState();
  const [orderId, setOrderId] = useState();
  const [err, setErr] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleDesc = (e) => {
    setDescription(e.target.value);
  }

  const handleCheck = (e) => {
    setCheck(e.target.checked);
  }


  const takeOrder = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      name: name.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))), //Capitalize
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      description: description,
      sub: check
    }
    setOrder(data);
  }


  //-----------------------------------------------------------------------order registration

  const db = getFirestore();
  const specialOrder = db.collection('specialOrder');  //specialOrder collection

  useEffect(() => {
    //if order is loaded, add
    order && specialOrder.add(order).then(({ id }) => {
      setOrderId(id);
    }).catch(err => {
      console.log('Error al cargar orden:', err);
      setErr(true);
    });

    console.log(order)
    console.log('Se cargó la orden bajo el id:', orderId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  //-----------------------------------------------------------------------order suggestions

  const [qual, setQual] = useState();
  const [comment, setComment] = useState('');
  const [sugg, setSugg] = useState();
  const [message, setMessage] = useState();

  const handleQual = (e) => {
    setQual(e.target.textContent);
  }

  const handleComment = (e) => {
    setComment(e.target.value);
  }

  const saveSuggestion = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      name: name.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))), //Capitalize
      qualification: qual,
      comment: comment
    }
    setSugg(data);
  }

  useEffect(() => {
    const db = getFirestore();
    const suggestions = db.collection('suggestions');  //suggestions collection
  
    //if suggestion is loaded, add
    sugg && suggestions.add(sugg).then(() => {
      setMessage(['success', 'Sugerencia enviada! Muchas gracias por hacer que siga mejorando.']);
    }).catch(err => {
      setMessage(['warning', 'ups! Parece que paso algo, no se mandó la sugerencia.'])
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sugg]);



  if (err) return <Navigate to='/error' />

  return (
    <>
      {orderId ?
        <OrderPage 
          orderId={orderId} 
          userInfo={order} 
          handleQual={handleQual} 
          handleComment={handleComment} 
          saveSuggestion={saveSuggestion}
          message={message}
          qual={qual}
        />
        :
        <SpecialOrder 
          takeOrder={takeOrder} 
          handleEmail={handleEmail} 
          handleName={handleName} 
          handleCheck={handleCheck} 
          handleDesc={handleDesc} 
        />
      }
    </>
  )
}

export default SpecialOrderContainer;