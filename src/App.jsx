import { Routes, Route } from "react-router-dom";

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
import Register from "./components/user/Register/Register";
import BookList from "./components/admin/books/BookList";
import AddBook from "./components/admin/books/AddBook";
import EditBook from "./components/admin/books/EditBook";
import Detail from "./components/user/DetailProduct/Detail";
import UserTable from "./components/admin/users/UserTable";
import AddUser from "./components/admin/users/AddUser";
import EditUser from "./components/admin/users/EditUser";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import DiscountList from "./components/admin/discount/DiscountList";
import AddDiscount from "./components/admin/discount/AddDiscount";
import EditDiscount from "./components/admin/discount/EditDiscount";

// ✅ ScrollToTop: cuộn lên đầu mỗi khi đổi route
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <>
    <ScrollToTop />
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
        path="/admin/nguoi-dung"
        element={
          <AdminLayout>
            <UserTable />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/nguoi-dung/them-moi"
        element={
          <AdminLayout>
            <AddUser />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/nguoi-dung/sua-nguoi-dung"
        element={
          <AdminLayout>
            <EditUser />
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
      < Route
        path="/admin/giam-gia"
        element={
          < AdminLayout >
            <DiscountList />
          </AdminLayout >
        }
      />
      < Route
        path="/admin/giam-gia/them-moi"
        element={
          < AdminLayout >
            <AddDiscount />
          </AdminLayout >
        }
      />
      < Route
        path="/admin/giam-gia/sua-giam-gia"
        element={
          < AdminLayout >
            <EditDiscount />
          </AdminLayout >
        }
      />

      {/* User routes */}
      <Route path="/" element={<Home />} />
      <Route path="/dang-nhap" element={<Login />} />
      <Route path="/dang-ky" element={<Register />} />
      <Route path="/gio-hang" element={<Cart />} />
      <Route path="/dat-hang" element={<PlaceOrder />} />
      <Route path="/danh-muc" element={<Collection />} />
      <Route path="/ten-sach" element={<SearchTitle />} />
      <Route path="/chi-tiet-dau-sach" element={<Detail />} />
    </Routes>
  </>
);

export default App;