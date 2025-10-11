import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import DeleteDiscount from './DeleteDiscount';

const DiscountList = () => {
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [discountToDelete, setDiscountToDelete] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const discounts = [
        {
            id: "KM00001",
            image: "/assets/admin/sach_2.jpg",
            description: "Giảm 20% cho mỗi cuốn sách",
            percent: "20%",
            startDate: "2025-10-01",
            endDate: "2025-10-15",
            quantity: 10000,
            status: "Kích hoạt"
        },
        {
            id: "KM00002",
            image: "/assets/admin/sach_2.jpg",
            description: "Mua sách, giảm ngay 10%",
            percent: "10%",
            startDate: "2025-04-26",
            endDate: "2025-05-19",
            quantity: 1000,
            status: "Ngừng kích hoạt"
        },
        {
            id: "KM00003",
            image: "/assets/admin/sach_2.jpg",
            description: "Ưu đãi 50% áp dụng cho tất cả các sách",
            percent: "50%",
            startDate: "2026-10-21",
            endDate: "2026-10-27",
            quantity: 50,
            status: "Ngừng kích hoạt"
        },
        {
            id: "KM00004",
            image: "/assets/admin/sach_2.jpg",
            description: "Mỗi sách đều được giảm 40%",
            percent: "40%",
            startDate: "2025-01-21",
            endDate: "2025-01-16",
            quantity: 100,
            status: "Ngừng kích hoạt"
        },
        {
            id: "KM00005",
            image: "/assets/admin/sach_2.jpg",
            description: "Mua sách, giảm ngay 30%",
            percent: "30%",
            startDate: "2024-10-01",
            endDate: "2024-10-15",
            quantity: 50,
            status: "Ngừng kích hoạt"
        },
        {
            id: "KM00006",
            image: "/assets/admin/sach_2.jpg",
            description: "Ưu đãi 60% áp dụng cho tất cả các sách",
            percent: "60%",
            startDate: "2025-08-11",
            endDate: "2025-09-02",
            quantity: 1,
            status: "Ngừng kích hoạt"
        },
    ]

    const location = useLocation();

    useEffect(() => {
        if (location.state?.message) {
            toast.success(location.state.message);
        }
    }, [location]);

    const handleClickDiscount = (discount) => {
        setSelectedDiscount(discount);
        setIsDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setSelectedDiscount(null);
        setIsDetailModalOpen(false);
    };

    const openDeleteModal = (discount) => {
        setDiscountToDelete(discount);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDiscountToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const confirmDelete = () => {
        closeDeleteModal();
        toast.success(`Xóa mã giảm giá thành công!`);
    };

    return (
        <div className="p-6 relative">
            <h2 className="text-3xl font-bold">Quản lý khuyến mãi</h2>

            <div className="flex justify-between items-center mb-4">
                <ToastContainer position="top-right" autoClose={3000} theme="colored" />
                <Link
                    to="/admin/giam-gia/them-moi"
                    className="flex items-center bg-[#28A745] hover:opacity-70 text-white font-bold px-4 py-3 rounded-md transition duration-200"
                >
                    <img src="/assets/admin/icon_them.png" alt="" className="w-5 h-5" />
                    <span className="ml-2">Thêm mới</span>
                </Link>
            </div>

            <table className="min-w-full table-auto overflow-hidden">
                <thead className="text-left">
                    <tr>
                        <th className="px-4 py-2">Mã giảm giá</th>
                        <th className="px-4 py-2">Hình ảnh</th>
                        <th className="px-4 py-2">Mô tả</th>
                        <th className="px-4 py-2">Phần trăm</th>
                        <th className="px-4 py-2">Ngày bắt đầu</th>
                        <th className="px-4 py-2">Ngày kết thúc</th>
                        <th className="px-4 py-2">Số lượng</th>
                        <th className="px-4 py-2">Trạng thái</th>
                        <th className="px-4 py-2 text-center">Hành động</th>
                    </tr>
                </thead>

                <tbody className="bg-white">
                    {discounts.map((discount, index) => (
                        <tr key={index} className="text-sm hover:bg-gray-50 leading-relaxed">
                            <td
                                className="border-t border-gray-300 px-4 py-4 text-blue-600 font-semibold cursor-pointer hover:underline"
                                onClick={() => handleClickDiscount(discount)}
                            >
                                {discount.id}
                            </td>
                            <td className="border-t border-gray-300 px-4 py-4">
                                <div className="flex justify-center items-center">
                                    <img src={discount.image} alt="Ảnh khuyến mãi" className="w-20 h-20 object-cover rounded" />
                                </div>
                            </td>
                            <td className="border-t border-gray-300 px-4 py-4">{discount.description}</td>
                            <td className="border-t border-gray-300 px-4 py-4">{discount.percent}</td>
                            <td className="border-t border-gray-300 px-4 py-4">{discount.startDate}</td>
                            <td className="border-t border-gray-300 px-4 py-4">{discount.endDate}</td>
                            <td className="border-t border-gray-300 px-4 py-4">{discount.quantity}</td>
                            <td className="border-t border-gray-300 px-4 py-4">{discount.status}</td>
                            <td className="border-t border-gray-300 px-4 py-4">
                                <div className="flex justify-center items-center gap-2">
                                    <Link to="/admin/giam-gia/sua-giam-gia" className="text-yellow-500 hover:text-yellow-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                                            <path d="M.5 15.5V13L12.6.9c.2-.2.5-.2.7 0l1.8 1.8c.2.2.2.5 0 .7L3 15.5zM11 3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                        </svg>
                                    </Link>
                                    <button
                                        onClick={() => openDeleteModal(discount)}
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

            < div className="mt-5 flex justify-end items-center gap-2" >
                <button className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150">&lt;&lt;</button>
                <button className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150">&lt;</button>
                <button className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150">1</button>
                <button className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150">2</button>
                <button className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150">3</button>
                <button className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150">...</button>
                <button className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150">10</button>
                <button className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150">&gt;</button>
                <button className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150">&gt;&gt;</button>
            </div >

            {/* Modals */}
            < DeleteDiscount
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
            />
            {/* {
          isDetailModalOpen && selectedDiscount && (
            <
              discount={selectedDiscount}
              onClose={closeDetailModal}
            />
          )
        } */}

        </div>
    )
}

export default DiscountList