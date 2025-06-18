

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import DeleteOrderModal from './DeleteOrderModal';
import OrderDetailModal from './OrderDetailModal';
import { toast, ToastContainer } from 'react-toastify';

const OrderTable = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const orders = [
    {
      id: "4TQ00001",
      name: "Nguyễn Văn An",
      phone: "0987654231",
      address: "Số 12 Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh",
      total: "120.000₫",
      status: "Giao hàng thành công",
      statusStyle: "bg-emerald-100 text-emerald-600",
    },
    {
      id: "4TQ00002",
      name: "Trần Thị Mai",
      phone: "0987654235",
      address: "Tòa nhà FPT, Duy Tân, Cầu Giấy, Hà Nội",
      total: "235.000₫",
      status: "Đang vận chuyển",
      statusStyle: "bg-blue-100 text-blue-600",
    },
    {
      id: "4TQ00003",
      name: "Lê Hoàng Long",
      phone: "0987654245",
      address: "80 Trần Hưng Đạo, Quận Hải Châu, Đà Nẵng",
      total: "89.000₫",
      status: "Đang xử lý đơn hàng",
      statusStyle: "bg-yellow-100 text-yellow-600",
    },
    {
      id: "4TQ00004",
      name: "Lê Hoàng Long",
      phone: "0987654245",
      address: "80 Trần Hưng Đạo, Quận Hải Châu, Đà Nẵng",
      total: "89.000₫",
      status: "Đang xử lý đơn hàng",
      statusStyle: "bg-yellow-100 text-yellow-600",
    },
    {
      id: "4TQ00005",
      name: "Lê Hoàng Long",
      phone: "0987654245",
      address: "80 Trần Hưng Đạo, Quận Hải Châu, Đà Nẵng",
      total: "89.000₫",
      status: "Đang xử lý đơn hàng",
      statusStyle: "bg-yellow-100 text-yellow-600",
    },{
      id: "4TQ00006",
      name: "Lê Hoàng Long",
      phone: "0987654245",
      address: "80 Trần Hưng Đạo, Quận Hải Châu, Đà Nẵng",
      total: "89.000₫",
      status: "Đang xử lý đơn hàng",
      statusStyle: "bg-yellow-100 text-yellow-600",
    },
    {
      id: "4TQ00007",
      name: "Lê Hoàng Long",
      phone: "0987654245",
      address: "80 Trần Hưng Đạo, Quận Hải Châu, Đà Nẵng",
      total: "89.000₫",
      status: "Đang xử lý đơn hàng",
      statusStyle: "bg-yellow-100 text-yellow-600",
    },
    {
      id: "4TQ00008",
      name: "Lê Hoàng Long",
      phone: "0987654245",
      address: "80 Trần Hưng Đạo, Quận Hải Châu, Đà Nẵng",
      total: "89.000₫",
      status: "Đang xử lý đơn hàng",
      statusStyle: "bg-yellow-100 text-yellow-600",
    },
  ];

  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location]);

  const handleClickOrder = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setSelectedOrder(null);
    setIsDetailModalOpen(false);
  };

  const openDeleteModal = (order) => {
    setOrderToDelete(order);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setOrderToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    closeDeleteModal();
    toast.success(`Xóa đơn hàng thành công!`);
  };

  return (
    <div className="p-6 relative">
      <h2 className="text-3xl font-bold">Quản lý đơn hàng</h2>
      <div className="flex justify-between items-center mb-4">
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        <Link
          to="/admin/don-hang/them-moi"
          className="flex items-center bg-[#28A745] hover:bg-[#7fca8d] text-white font-bold px-4 py-3 rounded-md transition duration-200"
        >
          <img src="/assets/admin/icon_them.png" alt="" className="w-5 h-5" />
          <span className="ml-2">Thêm mới</span>
        </Link>
      </div>

      <table className="min-w-full table-auto overflow-hidden">
        <thead className="text-left">
          <tr>
            <th className="px-4 py-2 ">#</th>
            <th className="px-4 py-2 ">Tên khách hàng</th>
            <th className="px-4 py-2 ">Số điện thoại</th>
            <th className="px-4 py-2 ">Địa chỉ</th>
            <th className="px-4 py-2 ">Tổng tiền</th>
            <th className="px-4 py-2 ">Trạng thái</th>
            <th className="px-4 py-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {orders.map((order, index) => (
            <tr key={index} className="text-sm hover:bg-gray-50 leading-relaxed">
              <td
                className="border-t border-gray-300 px-4 py-4 text-blue-600 font-semibold cursor-pointer hover:underline"
                onClick={() => handleClickOrder(order)}
              >
                {order.id}
              </td>
              <td className="border-t border-gray-300 px-4 py-4">{order.name}</td>
              <td className="border-t border-gray-300 px-4 py-4">{order.phone}</td>
              <td className="border-t border-gray-300 px-4 py-4">{order.address}</td>
              <td className="border-t border-gray-300 px-4 py-4">{order.total}</td>
              <td className="border-t border-gray-300 px-4 py-4">
                <span className={`text-sm font-medium px-2 py-1 rounded ${order.statusStyle}`}>
                  {order.status}
                </span>
              </td>
              <td className="border-t border-gray-300 px-4 py-4">
                <div className="flex justify-center items-center gap-2">
                  <Link to="/admin/don-hang/sua-don-hang" className="text-yellow-500 hover:text-yellow-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <path d="M.5 15.5V13L12.6.9c.2-.2.5-.2.7 0l1.8 1.8c.2.2.2.5 0 .7L3 15.5zM11 3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <button
                    onClick={() => openDeleteModal(order)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 512 512" fill="none">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" />
                      <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M80 112h352" />
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M192 112V72a24 24 0 0 1 24-24h80a24 24 0 0 1 24 24v40m-64 64v224m-72-224l8 224m136-224l-8 224" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-5 flex justify-end items-center gap-2">
        <button className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150">
          &lt;&lt;
        </button>
        <button className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150">
          &lt;
        </button>
        <button className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150">
          1
        </button>
        <button className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150">
          2
        </button>
        <button className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150">
          3
        </button>
        <button className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150">
          ...
        </button>
        <button className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150">
          10
        </button>
        <button className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150">
          &gt;
        </button>
        <button className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150">
          &gt;&gt;
        </button>
      </div>

      {/* Modals */}
      <DeleteOrderModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
      <OrderDetailModal
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrderTable;
