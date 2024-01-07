import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import UserDashboard from '../../components/UserDashboard';
import { Navigate } from 'react-router-dom';


const DashboardContainer = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser ?
        <UserDashboard /> :
        <Navigate to='/admin' />
      }
    </>
  )
}

export default DashboardContainer;