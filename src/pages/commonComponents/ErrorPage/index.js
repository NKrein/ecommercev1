import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';


const ErrorPage = () => {

  return (
    <div className='errorPage'>
      <h2>¡Ups!</h2>
      <h3>Hubo un error, puede ser porque:</h3>
      <p>Al parecer no está disponible el producto o la página que buscas, 
        <br/>o hubo un error de conexión.</p>
      <h3>Intentalo nuevamente</h3>
      <Link to={'/'}><button>Ir al inicio</button></Link>
      <Link to={'/order'}><button>Hacer un pedido</button></Link>
      <p>¡Si el error persiste, por favor comunicate conmigo por cualquier vía que se encuentra más abajo!
        <br/>Responderé en breve, muchas gracias.</p>
    </div>
  )
}

export default ErrorPage;