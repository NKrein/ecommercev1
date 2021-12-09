import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import ProductItem from '../../components/ProductItem';
import Loader from '../../../commonComponents/Loader';
import { getFirestore } from '../../../../firebase';
import { Alert } from 'react-bootstrap';


const ProductsContainer = () => {

  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [arrayItems, setArrayItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const itemCollection = db.collection('item');

    itemCollection.get().then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        console.log('no results');
        setError('No hay productos para mostrar.');
      } else {
        setArrayItems(querySnapshot.docs.map(doc => [doc.id, doc.data()]));
      }
    })
      .catch(error => {
        console.log('error', error);
        setError('Error al obtener los productos.');
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
        {(arrayItems&&!loading)? arrayItems.map(prod => <ProductItem product={prod[1]} id={prod[0]} key={prod[0]} />) : <Loader />}
      </>
    )
  } else {
    return (
      <Navigate to='/admin' />
    )
  }

}

export default ProductsContainer;