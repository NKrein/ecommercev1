import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import './style.css';

const UserFooter = () => {
  
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return (
      <div className='adminFooter'>
        <p>Ingresado como {currentUser.email}</p>
      </div>
    )
  } else {
    return (
      <div className='adminFooter'>
        <p>Por favor inicie sesión para continuar.</p>
      </div>
    )
  }

}

export default UserFooter;