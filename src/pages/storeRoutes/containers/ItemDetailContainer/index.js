import React, { useState, useEffect, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ItemDetail from '../../components/ItemDetail';
import Loader from '../../components/Loader';
import { CartContext } from '../../../../context/CartContext';
import { getFirestore } from '../../../../firebase';


const ItemDetailContainer = () => {

  const [product, setProduct] = useState();
  const { itemId } = useParams();
  const [err, setErr] = useState(false);

  useEffect(() => {

    const db = getFirestore();
    const itemCollection = db.collection('item');
    const item = itemCollection.doc(itemId)

    item.get().then((doc) => {
      if(doc.data()) {
        setProduct({ id: doc.id, ...doc.data() });
      } else {
        setErr(true);
      }
    })
      .catch(error => {
        console.log('error al traer item', error);
        setErr(true);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId])

  //----------------------------------------------------------------------------------------Count
  const [count, setCount] = useState(1);

  let onAdd = () => {
    setCount(count + 1);
  }

  let onSub = () => {
    setCount(count - 1);
  }
  //--------------------------------------------------------------------------------getCount y Cart

  const { addItem, removeItem, isInCart, setChangeListener } = useContext(CartContext);
  const [getCount, setGetCount] = useState();

  const handlerAdd = () => {
    setGetCount(count);
    addItem(product, count);
    setChangeListener(product.id + count); //Para re-render de cantidad en boton carrito
  }

  const handlerRemove = () => {
    removeItem(product.id);
    setGetCount(false);
    setChangeListener(product.id - count); //Para re-render de cantidad en boton carrito
  }

  //-----------------------------------------------------------------------------------------------

  if (err) return <Navigate to='/error' />

  return (
    <>
      {product ? <ItemDetail product={product} onAdd={onAdd} onSub={onSub} count={count} handlerAdd={handlerAdd} handlerRemove={handlerRemove} getCount={getCount} isInCart={isInCart} /> : <Loader />}
    </>

  )
}

export default ItemDetailContainer;