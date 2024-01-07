import React, { useState, useContext } from 'react';
import ItemCart from '../../components/ItemCart';
import { CartContext } from '../../../../context/CartContext';


const ItemCartContainer = ({ product }) => {

  const { removeItem, isInCart, setChangeListener } = useContext(CartContext);

  //----------------------------------------------------------------------------------------productId
  const [productId, setProductId] = useState(false);

  const setId = () => {
    setProductId(product.item.id);
  }

  const setNoId = () => {
    setProductId(false);
  }

  const handlerRemove = () => {
    removeItem(productId);
    setProductId(false);
    setChangeListener(true); //para re-render de CartDetail
  }

  //----------------------------------------------------------------------------------------Count
  const [count, setCount] = useState(product.quant);

  let onAdd = () => {
    setCount(count + 1);
    product.quant = product.quant + 1;
    setChangeListener(product.item.id + product.quant); //para re-render de CartDetail
  }

  let onSub = () => {
    setCount(count - 1);
    product.quant = product.quant - 1;
    setChangeListener(product.item.id + product.quant); //para re-render de CartDetail
  }

  return (
    <>
      {isInCart(product.item.id) ?
        <ItemCart product={product} 
                  setId={setId} 
                  setNoId={setNoId} 
                  handlerRemove={handlerRemove} 
                  productId={productId} 
                  onAdd={onAdd} onSub={onSub} count={product.quant} />
        :
        <p>Producto eliminado!</p>
      }
    </>
  )
};

export default ItemCartContainer;