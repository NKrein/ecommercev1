import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { Navigate, useParams } from 'react-router-dom';
import { getFirestore } from '../../../../firebase';
import { Alert } from 'react-bootstrap';
import Loader from '../../../commonComponents/Loader';
import BuyerDetail from '../../components/BuyerDetail';

const BuyerDetailContainer = () => {

  const { currentUser } = useContext(AuthContext);
  const { buyerId } = useParams();

  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState();
  const [orders, setOrders] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const buyerCollection = db.collection('buyer');
    const buyer = buyerCollection.doc(buyerId);

    buyer.get().then((doc) => {
      if (doc.data()) {
        setItem({ id: doc.id, ...doc.data() });
      } else {
        setError('No hay coincidencia con el id');
      }
    })
      .catch(error => {
        console.log('Error al traer cliente', error);
        setError('Error al traer cliente');
      })
      .finally(() => {
        setLoading(false);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyerId]);

  useEffect(() => {
    if (item) {
      setLoading(true);
      const db = getFirestore();
      const orderCollection = db.collection('order').where('buyer.email', '==', `${item.email}`).orderBy('date', 'desc');

      orderCollection.get().then((querySnapshot) => {
        if (querySnapshot.size === 0) {
          console.log('No hay coincidencias')
        } else {
          setOrders(querySnapshot.docs.map(doc => [doc.id, doc.data()]));
        }
      })
        .catch(err => {
          console.log('Error al cargar pedidos', err);
          setError('Error al cargar pedidos del cliente');
        })
        .finally(setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  console.log(orders)

  if (currentUser) {
    return (
      <>
        {success && <Alert variant='success' onClose={() => setSuccess('')} dismissible>{success}</Alert>}
        {error && <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert>}
        {(item && orders && !loading) ? <BuyerDetail buyer={item} orders={orders} /> : <Loader />}
      </>
    )
  } else {
    return (
      <Navigate to='/admin' />
    )
  }

}

export default BuyerDetailContainer;