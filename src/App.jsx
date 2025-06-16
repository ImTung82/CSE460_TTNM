import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Cart from './components/user/CheckoutCart/Cart';
import PlaceOrder from './components/user/CheckoutCart/PlaceOrder';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
      </Routes>      
    </div>
  );
};

export default App;