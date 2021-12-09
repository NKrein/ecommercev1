import React from 'react';
import './style.css';

const Counter = ({stock, onAdd, onSub, count}) => {

  return (
    <div className='counter'>
      <button className='counter-btn' onClick={onSub} disabled={count === 1}>-</button>
      <p>{count}</p>
      <button className='counter-btn' onClick={onAdd} disabled={count >= stock}>+</button>
    </div>
  )

}

export default Counter;