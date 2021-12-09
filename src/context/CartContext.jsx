import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({defaultValue = [], children}) => {

  const [inCart, setInCart] = useState(defaultValue);

  const getFromCart = (id) => {
    return inCart.find(obj => obj.item.id === id)
  }

  const isInCart = (id) => {
    return id !== undefined ? getFromCart(id) : false;
  }

  const addItem = (prod, n) => {
    if (isInCart(prod.id)) {
      console.log(`${prod.name} ya está en carrito:`, getFromCart(prod.id));
    } else {
      const newItem = {item: prod, quant: n};
      setInCart([...inCart, newItem]);  
      console.log(`Se agregó ${prod.name} (cantidad: ${n}) al carrito correctamente`);
    }
  }

  const removeItem = (id) => {
    if (isInCart(id) && inCart.length> 1) {
      const productIndex = inCart.findIndex(obj => obj.item.id === id);
      console.log('indice de producto a eliminar', productIndex)
      inCart.splice(productIndex, 1);
      console.log('Producto eliminado del carrito');
    } else {
      setInCart([]);
    }
  }

  const removeAll = () => {
    if (inCart.length > 0) {
      setInCart([]);
      console.log('Carrito vacío');
    } else {
      console.log('No hay nada en Carrito');
    }
  }
//-------------------------------------------------------------------------------Precio y cantidad total
  const [totalQuant, setTotalQuant] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [changeListener, setChangeListener] = useState(0); //para re-render

  useEffect(() => {
    let quant = 0;
    let price = 0;
    inCart.forEach(product => (
      quant = quant + product.quant
    ));  
    setTotalQuant(quant);
    inCart.forEach(product => (
      price = price + (product.item.price * product.quant)
    ));  
    setTotalPrice(price);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeListener]);


  return (
    <CartContext.Provider value={{inCart, addItem, removeItem, isInCart, removeAll, totalQuant, totalPrice, setChangeListener }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;