import React, { useContext, useState, useEffect } from 'react';
import UserForm from '../../components/UserForm';
import { AuthContext } from '../../../../context/AuthContext';
import { Alert } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';


const UserAdminContainer = () => {

  const { currentUser, signUp } = useContext(AuthContext);

  //---------------------------------------------------------------------------------SignUp

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePass = (e) => {
    setPassword(e.target.value);
  }

  const takeUserInfo = (e) => {
    e.preventDefault();
    setUserData(true);
    console.log(email, password)
  }


  useEffect(() => {
    if (userData) {
      setLoading(true);
      signUp(email, password).then((res) => {
        setError('');
        setSuccess('Éxito al registrar usuario.')
        console.log(res);
      }).catch(err => {
        console.log(err);
        setError('Error al registrar usuario.');
      })
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])




  return (
    <>
      {success && <Alert variant='success' onClose={() => setSuccess('')} dismissible>{success}</Alert>}
      {error && <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert>}
      {currentUser ?
        <UserForm formName='Registrar nuevo usuario' takeUserInfo={takeUserInfo} handleEmail={handleEmail} handlePass={handlePass} loading={loading} /> :
        <Navigate to='/admin' />
      }
    </>
  )
}

export default UserAdminContainer;