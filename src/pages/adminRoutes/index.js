import { Col, Container, Row } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from '../commonComponents/ErrorPage';
import AuthProvider from '../../context/AuthContext';
import UserAdminContainer from './containers/UserAdminContainer';
import LoginContainer from './containers/LoginContainer';
import DashboardContainer from './containers/DashboardContainer';
import UserNavBar from './components/UserNavBar';
import UserFooter from './components/UserFooter';
import PasswordResetContainer from './containers/PasswordResetContainer';
import UserDashboardNav from './components/UserDashboardNav';
import ProductsContainer from './containers/ProductsContainer';
import OrdersContainer from './containers/OrdersContainer';
import BuyerContainer from './containers/BuyersContainer';
import NewProductContainer from './containers/NewProductContainer';
import ProductEditContainer from './containers/ProductEditContainer';
import OrderDetailContainer from './containers/OrderDetailContainer';
import BuyerDetailContainer from './containers/BuyerDetailContainer';
import SpecialOrdersContainer from './containers/SpecialOrdersContainer';
import SpecialOrderDetailContainer from './containers/SpecialOrderDetailContainer';
import SuggListContainer from './containers/SuggListContainer';
import SuggDetailContainer from './containers/SuggDetailContainer';


const AdminRoutes = () => {
  return (
    <AuthProvider>
      <Container fluid>
        <Row style={{minHeight: '75vh'}}>
          <Col sm={12} style={{position: 'fixed', top: '0', zIndex: 110}}>
            <UserNavBar colapsable='Perfil' col1='Gestionar contraseña' col2='Agregar administrador' />
          </Col>
          <Col sm={12} md={3} style={{position: 'fixed', top: '10vh', zIndex: 100, alignSelf: 'flex-start'}}>
            <UserDashboardNav />
          </Col>
          <Col className='contentColAdmin'>
            <Routes>
              <Route path={'/'} element={<LoginContainer />} />                
              <Route path={'/userAdmin'} element={<UserAdminContainer />} />
              <Route path={'/dashboard'} element={<DashboardContainer />} />
              <Route path={'/passwordReset'} element={<PasswordResetContainer />} />
              <Route path={'/dashboard/products'} element={<ProductsContainer />} />
              <Route path={'/dashboard/edit/:productId'} element={<ProductEditContainer />} />
              <Route path={'/dashboard/product/new'} element={<NewProductContainer />} />
              <Route path={'/dashboard/orders'} element={<OrdersContainer />} />
              <Route path={'/dashboard/ord/:orderId'} element={<OrderDetailContainer/>} />
              <Route path={'/dashboard/specialOrders'} element={<SpecialOrdersContainer/>} />
              <Route path={'/dashboard/specialOrd/:specialOrderId'} element={<SpecialOrderDetailContainer/>} />
              <Route path={'/dashboard/buyers'} element={<BuyerContainer />} />
              <Route path={'/dashboard/buy/:buyerId'} element={<BuyerDetailContainer />} />
              <Route path={'/dashboard/suggestions'} element={<SuggListContainer />} />
              <Route path={'/dashboard/sugg/:suggId'} element={<SuggDetailContainer />} />
              <Route path={'*'} element={<ErrorPage />} />
            </Routes>
          </Col>
          <Col sm={12} style={{position: 'fixed', bottom: '0', zIndex: 110}}>
            <UserFooter />
          </Col>
        </Row>
      </Container>
    </AuthProvider>
  );
}

export default AdminRoutes;
