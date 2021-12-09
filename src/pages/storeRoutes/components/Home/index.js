import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Home = ({ greetings }) => {

  return (
  <>
    <h1>{greetings}</h1>
    <p>-Acuarelas Originales-</p>
    <Link to={'/cat/all'}><button className='brandBtn'>Ver Catálogo completo</button></Link>
  </>
)
}

export default Home;