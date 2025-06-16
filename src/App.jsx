import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layouts/user/Navbar';
import Subnav from './components/layouts/user/Subnav';
import Cart from './components/user/CheckoutCart/Cart';
import PlaceOrder from './components/user/CheckoutCart/PlaceOrder';

const App = () => {
  return (
    <div>
      <Navbar />
      <Subnav />
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
      </Routes>      
    </div>
  );
};

export default App;