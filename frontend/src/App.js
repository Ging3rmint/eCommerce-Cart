import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';

import Header from './components/organisms/Header/Header';
import Footer from './components/organisms/Footer/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

import './styles/app.scss'

const App = () => {

  return (
    <Router>
      <Header/>
      <main className='py-3'>
        <Container>
          <Route exact path='/' component={HomeScreen}/>
          <Route path='/cart/:id?' component={CartScreen}/>
          <Route path='/checkout' component={CheckoutScreen}/>
          <Route path='/payment' component={PaymentScreen}/>
          <Route path='/placeorder' component={PlaceOrderScreen}/>
          <Route path='/order/:id' component={OrderScreen}/>
          <Route path='/profile' component={ProfileScreen}/>
          <Route path='/register' component={RegisterScreen}/>
          <Route path='/login' component={LoginScreen}/>
          <Route path='/product/:id' component={ProductScreen}/>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
