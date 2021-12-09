import React from 'react';
import Item from '../Item';
import './style.css';

const ItemList = ({ products }) => {

  return (
    <ul className='productList'>
      {products.map(prod => (<Item product={prod[1]} id={prod[0]} key={prod[0]} />))}
    </ul>
  )
}

export default ItemList;