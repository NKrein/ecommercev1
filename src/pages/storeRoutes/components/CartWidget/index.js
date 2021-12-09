import React, { useContext } from 'react';
import { CartContext } from '../../../../context/CartContext';
import cartIcon from '../../../../images/cart.svg'

const CartWidget = () => {

  const { inCart, totalQuant } = useContext(CartContext);

  return(
    <button className='cartBtn' style={{backgroundColor: inCart.length>0? '#8fa382' : 'rgba(0, 0, 0, 0.4)'}}>
			<img style={{WebkitFilter: inCart.length? 'invert(100%)' : 'inherit'}} src={cartIcon} alt="icono carrito" />
      {inCart.length>0 && <span className='cartCount'>{totalQuant}</span>}
		</button>
  )
}

export default CartWidget;