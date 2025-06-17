import { useState } from 'react'
//import './App.css'
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from './components/layouts/admin/AdminLayout';
import OrderTable from './components/admin/orders/OrderTable';
import AddOrder from './components/admin/orders/AddOrder';
import EditOrder from './components/admin/orders/EditOrder';

import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layouts/user/Navbar';
import Subnav from './components/layouts/user/Subnav';
import Cart from './components/user/CheckoutCart/Cart';
import PlaceOrder from './components/user/CheckoutCart/PlaceOrder';

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Đây là trang chủ</h1>
            </>
          }
        />

        <Route
          path="/admin/don-hang"
          element={
            <AdminLayout>
              <OrderTable />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/don-hang/them-moi"
          element={
            <AdminLayout>
              <AddOrder />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/don-hang/sua-don-hang"
          element={
            <AdminLayout>
              <EditOrder />
            </AdminLayout>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <div>Đây là trang tổng quan của Bảng điều khiển dành cho quản lý</div>
            </AdminLayout>
          }
        />
      </Routes>
      
      
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
      </Routes>
      
    </div>
  )
}

export default App;