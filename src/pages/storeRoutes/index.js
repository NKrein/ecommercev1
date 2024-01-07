import logo from '../../images/logo.png';
import logo3 from '../../images/logo3.png'
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './containers/ItemListContainer';
import ItemDetailContainer from './containers/ItemDetailContainer';
import SpecialOrderContainer from './containers/SpecialOrderContainer';
import ItemListCartContainer from './containers/CartListContainer';
import CartProvider from '../../context/CartContext';
import Footer from './components/Footer';
import ErrorPage from '../commonComponents/ErrorPage';
import HomeContainer from './containers/HomeContainer';


const StoreRoutes = () => {
  return (
    <CartProvider>
      <NavBar logo={logo} link='Pedidos' colapsable='Tienda' col1='A3' col2='A4' />
      <Routes>
        <Route path={'/'} element={<HomeContainer />} />
        <Route path={'item/:itemId'} element={<ItemDetailContainer />} />
        <Route path={'cat/all'} element={<ItemListContainer />} />
        <Route path={'cat/:category'} element={<ItemListContainer />} />
        <Route path={'order'} element={<SpecialOrderContainer />} />
        <Route path={'Cart'} element={<ItemListCartContainer />} />
        <Route path={'*'} element={<ErrorPage />} />
      </Routes>
      <Footer logo={logo3} linkInstagram={'https://www.instagram.com/dharmadisenos.arte/'}
        linkFacebook={'https://www.facebook.com/dharmadisenosarte-105379871439318/'}
        linkWhatsapp={'https://api.whatsapp.com/send?phone=+5493517724589'}
        linkEmail={'mailto:camila.manez@gmail.com'} />
    </CartProvider>
  );
}

export default StoreRoutes;
