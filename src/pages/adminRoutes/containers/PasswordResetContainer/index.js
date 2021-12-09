import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { Alert } from 'react-bootstrap';
import UserPasswordReset from '../../components/UserPasswordReset';
import { Navigate } from 'react-router-dom';


const PasswordResetContainer = () => {

  const { currentUser, resetPassword } = useContext(AuthContext);

  //---------------------------------------------------------------------------------SignUp

  const [email, setEmail] = useState();
  const [userData, setUserData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }


  const takeUserEmail = (e) => {
    e.preventDefault();
    (email === currentUser.email) ? setUserData(true) : setError('No coinciden las direcciones de Email');
    console.log(email);
  }

  useEffect(() => {
    if (userData) {
      setLoading(true);
      resetPassword(email).then((res) => {
        setError('');
        setSuccess('¡Éxito! Revisa el email para terminar el proceso.');
        console.log(res);
      }).catch(err => {
        console.log(err);
        setError('Error al intentar cambiar la contraseña');
      })
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userData])


  return (
    <>
      {success && <Alert variant='success' onClose={() => setSuccess('')} dismissible>{success}</Alert> }
      {error && <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert>}
      {currentUser ?
      <UserPasswordReset formName='Reestablecer contraseña' takeUserEmail={takeUserEmail} handleEmail={handleEmail} loading={loading} /> :
      <Navigate to='/admin' />
      }
    </>
  )
}

export default PasswordResetContainer;