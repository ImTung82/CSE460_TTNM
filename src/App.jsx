import { useState } from 'react'
//import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout  from './components/layouts/admin/AdminLayout';
import OrderTable from './components/admin/orders/OrderTable';
import AddOrder from './components/admin/orders/AddOrder';
import EditOrder from './components/admin/orders/EditOrder';
import DeleteOrderModal from './components/admin/orders/DeleteOrderModal';
const App = () => {
  return (
    <Router>
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
          path="/admin/don-hang/xoa-don-hang"
          element={
            <AdminLayout>
              <DeleteOrderModal />
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
    </Router>
  )
}

export default App
