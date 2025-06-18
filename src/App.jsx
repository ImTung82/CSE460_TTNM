import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLayout from "./components/layouts/admin/AdminLayout";
import OrderTable from "./components/admin/orders/OrderTable";
import AddOrder from "./components/admin/orders/AddOrder";
import EditOrder from "./components/admin/orders/EditOrder";
import Collection from "./components/user/SearchBook/Collection";
import SearchTitle from "./components/user/SearchBook/SearchTitle";
import Cart from "./components/user/CheckoutCart/Cart";
import PlaceOrder from "./components/user/CheckoutCart/PlaceOrder";
import Home from "./components/user/Home/Home";
import Login from "./components/user/Login/Login";
import BookList from "./components/admin/books/BookList";
import AddBook from "./components/admin/books/AddBook";
import EditBook from "./components/admin/books/EditBook";
import Detail from "./components/user/DetailProduct/Detail";
import Navbar from "./components/layouts/user/Navbar";
import Subnav from "./components/layouts/user/Subnav";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Subnav />
      <Routes>
        {/* Admin routes */}
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
          path="/admin/san-pham"
          element={
            <AdminLayout>
              <BookList />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/san-pham/them-moi"
          element={
            <AdminLayout>
              <AddBook />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/san-pham/sua-dau-sach"
          element={
            <AdminLayout>
              <EditBook />
            </AdminLayout>
          }
        />

        {/* User routes */}
        <Route path="/" element={<Home />} />
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/collections" element={<Collection />} />
        <Route path="/title" element={<SearchTitle />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </Router>
  );
};

export default App;
