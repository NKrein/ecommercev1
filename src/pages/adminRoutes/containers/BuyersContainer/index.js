import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import BuyerItem from '../../components/BuyerItem';
import { getFirestore } from '../../../../firebase';
import Loader from '../../../commonComponents/Loader';
import { Alert } from 'react-bootstrap';


const BuyerContainer = () => {

  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [arrayItems, setArrayItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const itemCollection = db.collection('buyer');

    itemCollection.get().then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        console.log('no results');
        setError('No hay clientes para mostrar.');
      } else {
        setArrayItems(querySnapshot.docs.map(doc => [doc.id, doc.data()]));
      }
    })
      .catch(error => {
        console.log('error', error);
        setError('Error al obtener los clientes.');
      })
      .finally(() => {
        setLoading(false);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (currentUser) {
    return (
      <>
        {error && <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert>}
        {(arrayItems && !loading) ? arrayItems.map(buyer => <BuyerItem buyer={buyer[1]} id={buyer[0]} key={buyer[0]} />) : <Loader />}
      </>
    )
  } else {
    return (
      <Navigate to='/admin' />
    )
  }

}

export default BuyerContainer;