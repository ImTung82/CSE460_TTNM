

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import DeleteOrderModal from './DeleteOrderModal';
import OrderDetailModal from './OrderDetailModal';
import { toast, ToastContainer } from 'react-toastify';

const BookList = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const books = [
        {
            id: "SP00001",
            image: "/assets/admin/sach_2.jpg",
            name: "Thám từ lừng danh Tizen - Tập 69",
            author: "Gosho Aoyama",
            description: "Kudo Shinichi là một cậu thám tử học sinh năng...",
            price: "24.000đ",
        },
        {
            id: "SP00002",
            image: "/assets/admin/sach_2.jpg",
            name: "Thám từ lừng danh Tizen - Tập 69",
            author: "Gosho Aoyama",
            description: "Kudo Shinichi là một cậu thám tử học sinh năng...",
            price: "24.000đ",
        },
        {
            id: "SP00003",
            image: "/assets/admin/sach_2.jpg",
            name: "Thám từ lừng danh Tizen - Tập 69",
            author: "Gosho Aoyama",
            description: "Kudo Shinichi là một cậu thám tử học sinh năng...",
            price: "24.000đ",
        },
        {
            id: "SP00004",
            image: "/assets/admin/sach_2.jpg",
            name: "Thám từ lừng danh Tizen - Tập 69",
            author: "Gosho Aoyama",
            description: "Kudo Shinichi là một cậu thám tử học sinh năng...",
            price: "24.000đ",
        },
        {
            id: "SP00005",
            image: "/assets/admin/sach_2.jpg",
            name: "Thám từ lừng danh Tizen - Tập 69",
            author: "Gosho Aoyama",
            description: "Kudo Shinichi là một cậu thám tử học sinh năng...",
            price: "24.000đ",
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
            <h2 className="text-3xl font-bold">Quản lý đầu sách</h2>
            <div className="flex justify-between items-center mb-4">
                <ToastContainer position="top-right" autoClose={3000} theme="colored" />
                <Link
                    to="/admin/san-pham/them-moi"
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
                        <div className='flex justify-center items-center'>
                            <th className="px-4 py-2 ">Hình ảnh</th>
                        </div>
                        <th className="px-4 py-2 ">Tên sách</th>
                        <th className="px-4 py-2 ">Tác giả</th>
                        <th className="px-4 py-2 ">Mô tả</th>
                        <th className="px-4 py-2 ">Giá bán</th>
                        <th className="px-4 py-2 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {books.map((book, index) => (
                        <tr key={index} className="text-sm hover:bg-gray-50 leading-relaxed">
                            <td
                                className="border-t border-gray-300 px-4 py-4 text-blue-600 font-semibold cursor-pointer hover:underline"
                                onClick={() => handleClickOrder(order)}
                            >
                                {book.id}
                            </td>
                            <td className="border-t border-gray-300 px-4 py-4">
                                <div className="flex justify-center items-center">
                                    <img src={book.image} alt="Ảnh sách" className="w-20 h-20 object-cover rounded" />
                                </div>
                            </td>
                            <td className="border-t border-gray-300 px-4 py-4">{book.name}</td>
                            <td className="border-t border-gray-300 px-4 py-4">{book.author}</td>
                            <td className="border-t border-gray-300 px-4 py-4">{book.description}</td>
                            <td className="border-t border-gray-300 px-4 py-4">{book.price}</td>
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

export default BookList;
