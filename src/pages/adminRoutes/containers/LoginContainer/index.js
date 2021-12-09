import React, { useContext, useState, useEffect } from 'react';
import UserForm from '../../components/UserForm';
import { AuthContext } from '../../../../context/AuthContext';
import { Alert } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';


const LoginContainer = () => {

  const { logIn, currentUser } = useContext(AuthContext);

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
      logIn(email, password).then((res) => {
        setError('');
        setSuccess('Inicio exitoso.');
        console.log('Inicio exitoso', res);
      }).catch(err => {
        console.log('ERROR', err);
        setError('Error al ingresar usuario.');
      })
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])


  return (
    <>
      {success && <Alert variant='success' onClose={() => setSuccess('')} dismissible>{success}</Alert> }
      {error && <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert> }
      {currentUser? 
        <Navigate to='/admin/dashboard' /> : 
        <UserForm formName='Log In' takeUserInfo={takeUserInfo} handleEmail={handleEmail} handlePass={handlePass} loading={loading} />
      }
    </>
  )
}

export default LoginContainer;