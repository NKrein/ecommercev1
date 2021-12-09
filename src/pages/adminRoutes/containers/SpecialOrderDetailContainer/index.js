import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { Navigate, useParams } from 'react-router-dom';
import { getFirestore } from '../../../../firebase';
import { Alert } from 'react-bootstrap';
import Loader from '../../../commonComponents/Loader';
import SpecialOrderDetail from '../../components/SpecialOrderDetail';

const SpecialOrderDetailContainer = () => {

  const { currentUser, timeAgo } = useContext(AuthContext);
  const { specialOrderId } = useParams();

  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [sent, setSent] = useState();
  const [update, setUpdate] = useState();

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const orderCollection = db.collection('specialOrder');
    const order = orderCollection.doc(specialOrderId)

    order.get().then((doc) => {
      if (doc.data()) {
        setItem({ id: doc.id, ...doc.data() });
      } else {
        setError('No hay coincidencia con el id');
      }
    })
      .catch(error => {
        console.log('Error al traer pedido', error);
        setError('Error al traer pedido');
      })
      .finally(() => {
        setLoading(false);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  const handleSent = () => {
    setSent(!item.sent);
  }

  useEffect(() => {
    if (item) {
      const orderItem = getFirestore().collection('specialOrder').doc(specialOrderId)
      setLoading(true);
      orderItem.update({ sent: sent })
        .then()
        .catch(() => { setError('Error al acualizar estado de envío') })
        .finally(() => {
          setLoading(false);
          setUpdate(sent);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sent]);

  if (currentUser) {
    return (
      <>
        {success && <Alert variant='success' onClose={() => setSuccess('')} dismissible>{success}</Alert>}
        {error && <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert>}
        {(item && !loading) ? <SpecialOrderDetail order={item} timeAgo={timeAgo} handleSent={handleSent} /> : <Loader />}
      </>
    )
  } else {
    return (
      <Navigate to='/admin' />
    )
  }

}

export default SpecialOrderDetailContainer;