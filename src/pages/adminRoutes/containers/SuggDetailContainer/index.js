import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { Navigate, useParams } from 'react-router-dom';
import { getFirestore } from '../../../../firebase';
import { Alert } from 'react-bootstrap';
import Loader from '../../../commonComponents/Loader';
import SuggDetail from '../../components/SuggDetail';

const SuggDetailContainer = () => {

  const { currentUser } = useContext(AuthContext);
  const { suggId } = useParams();

  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [check, setCheck] = useState();
  const [update, setUpdate] = useState();

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const suggCollection = db.collection('suggestions');
    const sugg = suggCollection.doc(suggId)

    sugg.get().then((doc) => {
      if (doc.data()) {
        setItem({ id: doc.id, ...doc.data() });
      } else {
        setError('No hay coincidencia con el id');
      }
    })
      .catch(error => {
        console.log('Error al traer experiencia', error);
        setError('Error al traer experiencia');
      })
      .finally(() => {
        setLoading(false);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  const handleCheck = () => {
    setCheck(!item.check);
  }

  useEffect(() => {
    if (item) {
      const suggItem = getFirestore().collection('suggestions').doc(suggId)
      setLoading(true);
      suggItem.update({ check: check })
        .then()
        .catch(() => { setError('Error al acualizar check') })
        .finally(() => {
          setLoading(false);
          setUpdate(check);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check]);

  if (currentUser) {
    return (
      <>
        {success && <Alert variant='success' onClose={() => setSuccess('')} dismissible>{success}</Alert>}
        {error && <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert>}
        {(item && !loading) ? <SuggDetail sugg={item} handleCheck={handleCheck} /> : <Loader />}
      </>
    )
  } else {
    return (
      <Navigate to='/admin' />
    )
  }

}

export default SuggDetailContainer;