import AdminLayout from "./components/layouts/admin/AdminLayout";
import OrderTable from "./components/admin/orders/OrderTable";
import AddOrder from "./components/admin/orders/AddOrder";
import EditOrder from "./components/admin/orders/EditOrder";
import DeleteOrderModal from "./components/admin/orders/DeleteOrderModal";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Collection from "./components/user/SearchBook/Collection";
import SearchTitle from "./components/user/SearchBook/SearchTitle";
import { useState } from "react";
//import './App.css'
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AdminLayout from './components/layouts/admin/AdminLayout';
// import OrderTable from './components/admin/orders/OrderTable';
// import AddOrder from './components/admin/orders/AddOrder';
// import EditOrder from './components/admin/orders/EditOrder';

import Cart from "./components/user/CheckoutCart/Cart";
import PlaceOrder from "./components/user/CheckoutCart/PlaceOrder";
import Home from "./components/user/Home/Home";
import Login from "./components/user/Login/Login";

const App = () => {
  return (
    <div>
      <Routes>
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
              <div>
                Đây là trang tổng quan của Bảng điều khiển dành cho quản lý
              </div>
            </AdminLayout>
          }
        />
      </Routes>

      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/" element={<Home />} />
          <Route path="/dang-nhap" element={<Login />} />

          <Route path="/collections" element={<Collection />} />
          <Route path="/title" element={<SearchTitle />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
