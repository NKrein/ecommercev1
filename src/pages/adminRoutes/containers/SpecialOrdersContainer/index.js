import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import SpecialOrderItem from '../../components/SpecialOrderItem';
import { getFirestore } from '../../../../firebase';
import { Alert } from 'react-bootstrap';
import Loader from '../../../commonComponents/Loader';

const SpecialOrdersContainer = () => {

  const { currentUser, timeAgo } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [arrayItems, setArrayItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const itemCollection = db.collection('specialOrder').orderBy('date', 'desc'); //get from recent to old

    itemCollection.get().then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        console.log('no results');
        setError('No hay pedidos para mostrar.');
      } else {
        setArrayItems(querySnapshot.docs.map(doc => [doc.id, doc.data()]));
      }
    })
      .catch(error => {
        console.log('error', error);
        setError('Error al obtener los pedidos.');
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
        {(arrayItems && !loading) ? arrayItems.map(order => <SpecialOrderItem order={order[1]} id={order[0]} key={order[0]} timeAgo={timeAgo} />) : <Loader />}
      </>
    )
  } else {
    return (
      <Navigate to='/admin' />
    )
  }

}

export default SpecialOrdersContainer;