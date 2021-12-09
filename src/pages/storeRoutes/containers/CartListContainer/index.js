import React, { useContext, useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { CartContext } from '../../../../context/CartContext';
import ItemCartContainer from '../ItemCartContainer';
import CartDetail from '../../components/CartDetail';
import OrderPage from '../../components/OrderPage';
import firebase from 'firebase/app';
import { getFirestore } from '../../../../firebase';
import Loader from '../../components/Loader';

const CartListContainer = () => {

  const { inCart, removeAll, totalQuant, totalPrice } = useContext(CartContext);

  const [clearAll, setClearAll] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [orderId, setOrderId] = useState();
  const [buyerLoaded, setBuyerLoaded] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [err, setErr] = useState(false);

  //------------------------------------------------------------------------------------Order

  const db = getFirestore();
  const buyers = db.collection('buyer');  //buyer collection
  const orders = db.collection('order');  //order collection

  const newOrder = {
    buyer: userInfo,
    items: inCart,
    date: firebase.firestore.Timestamp.fromDate(new Date()),
    total: totalPrice,
    paid: false
  }


  //----------------------------------------------------------buyer registration

  useEffect(() => {
    if (userInfo) {
      //buyer exist?
      buyers.where('email', '==', `${userInfo.email}`).get().then((querySnapshot) => {
        if (querySnapshot.size === 0) {
          //if doesnt exist, add new buyer data
          buyers.add(userInfo).then(({ id }) => {
            console.log('Comprador creado:', id);
          }).catch(err => {
            console.log('Error al agregar comprador:', err);
            setErr(true);
          });
        } else {
          //if exist, dont add
          console.log('El usuario ya existe', querySnapshot.docs.map(doc => doc.data()));
        }
      })
      .catch(err => {
        console.log('Error al verificar comprador:', err);
        setErr(true);
      })
      .finally(() => {
        setBuyerLoaded(true);
      })
    } else {
      console.log('No hay datos del comprador aún')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  //----------------------------------------------------------order registration

  useEffect(() => {
    //if buyer is loaded, add order
    buyerLoaded && orders.add(newOrder).then(({id}) => {
      setOrderId(id);
      setBuyerLoaded(false);
    }).catch(err => {
      console.log('Error al cargar orden:', err);
      setErr(true);
    }).finally(() => {
      removeAll(); // Cart clean
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyerLoaded]);

  //----------------------------------------------------------------stock update

  useEffect(() => {

    if (userInfo) {
      inCart.forEach(prod => {
        const docRef = db.collection('item').doc(prod.item.id);
        docRef.update({ stock: prod.item.stock - prod.quant});
        console.log('Stock updated para =>', docRef.id);
      })
      setUpdated(true);  
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userInfo])


  //----------------------------------------------------------------finish order 


  if (err) return <Navigate to='/error' />

  if (updated) return orderId? <OrderPage orderId={orderId} userInfo={userInfo} /> : <Loader />

  if (inCart.length) {
    return (
      <>
        {inCart.map(item => (<ItemCartContainer product={item} key={item.item.id} />))}
        <CartDetail quant={totalQuant}
          price={totalPrice}
          clearAll={clearAll}
          setClearAll={setClearAll}
          removeAll={removeAll}
          userInfo={userInfo}
          setUserInfo={setUserInfo} />
      </>
    )
  } else {
    return (
      <>
        <p>Aún no hay nada por aqui.</p>
        <Link to={'/'}><button className='brandBtn'>Quiero comprar!</button></Link>
      </>
    )
  }
};

export default CartListContainer;