import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import SuggItem from '../../components/SuggItem';
import { getFirestore } from '../../../../firebase';
import { Alert } from 'react-bootstrap';
import Loader from '../../../commonComponents/Loader';

const SuggListContainer = () => {

  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [arrayItems, setArrayItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const itemCollection = db.collection('suggestions') //get from recent to old

    itemCollection.get().then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        console.log('no results');
        setError('No hay experiencias para mostrar.');
      } else {
        setArrayItems(querySnapshot.docs.map(doc => [doc.id, doc.data()]));
      }
    })
      .catch(error => {
        console.log('error', error);
        setError('Error al obtener las experiancias.');
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);



  if (currentUser) {
    return (
      <>
        {error && <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert>}
        {(arrayItems && !loading) ? arrayItems.map(sugg => <SuggItem sugg={sugg[1]} id={sugg[0]} key={sugg[0]} />) : <Loader />}
      </>
    )
  } else {
    return (
      <Navigate to='/admin' />
    )
  }

}

export default SuggListContainer;