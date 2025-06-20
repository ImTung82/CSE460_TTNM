import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import BookDetailModal from './BookDetailModal';
import DeleteBookModal from './DeleteBookModal';

const BookList = () => {
    const [selectedBook, setSelectedBook] = useState(null);
    const [bookToDelete, setBookToDelete] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const books = [
        {
            id: "SP00001",
            image: "/assets/admin/sach_2.jpg",
            name: "Thám tử lừng danh Tizen - Tập 69",
            author: "Gosho Aoyama",
            description: "Kudo Shinichi là một cậu thám tử học sinh năng...",
            price: "24.000đ",
            giaGoc: "30000",
            khuyenMai: "20",
            moTa: "Kudo Tizen là một cậu thám tử học sinh năng nổ với biệt tài suy luận có thể sánh ngang với Sherlock Holmes! Một ngày nọ, khi mải đuổi theo những kẻ khả nghi, cậu đã bị chúng cho uống một loại thuốc kì lạ khiến cho cơ thể bị teo nhỏ. Vậy là một thám tử tí hon xuất hiện với cái tên giả: Edogawa Tizen!!",
            nguoiDich: "Hương Giang",
            tenNhaXuatBan: "Kim Đồng",
            namXuatBan: "2025",
            ngonNgu: "Tiếng Việt",
            trongLuong: "145",
            kichThuocBaoBi: "17.6 x 11.3 x 0.9",
            soTrang: "180",
            theLoai: ["Trinh thám"]
        },
        {
            id: "SP00002",
            image: "/assets/admin/sach_2.jpg",
            name: "Thám tử lừng danh Tizen - Tập 70",
            author: "Gosho Aoyama",
            description: "Kudo Shinichi là một cậu thám tử học sinh năng...",
            price: "24.000đ",
            giaGoc: "30000",
            khuyenMai: "20",
            moTa: "Kudo Tizen là một cậu thám tử học sinh năng nổ với biệt tài suy luận có thể sánh ngang với Sherlock Holmes! Một ngày nọ, khi mải đuổi theo những kẻ khả nghi, cậu đã bị chúng cho uống một loại thuốc kì lạ khiến cho cơ thể bị teo nhỏ. Vậy là một thám tử tí hon xuất hiện với cái tên giả: Edogawa Tizen!!",
            nguoiDich: "Hương Giang",
            tenNhaXuatBan: "Kim Đồng",
            namXuatBan: "2025",
            ngonNgu: "Tiếng Việt",
            trongLuong: "145",
            kichThuocBaoBi: "17.6 x 11.3 x 0.9",
            soTrang: "180",
            theLoai: ["Trinh thám"]
        },
        {
            id: "SP00003",
            image: "/assets/admin/sach_2.jpg",
            name: "Thám tử lừng danh Tizen - Tập 71",
            author: "Gosho Aoyama",
            description: "Kudo Shinichi là một cậu thám tử học sinh năng...",
            price: "24.000đ",
            giaGoc: "30000",
            khuyenMai: "20",
            moTa: "Kudo Tizen là một cậu thám tử học sinh năng nổ với biệt tài suy luận có thể sánh ngang với Sherlock Holmes! Một ngày nọ, khi mải đuổi theo những kẻ khả nghi, cậu đã bị chúng cho uống một loại thuốc kì lạ khiến cho cơ thể bị teo nhỏ. Vậy là một thám tử tí hon xuất hiện với cái tên giả: Edogawa Tizen!!",
            nguoiDich: "Hương Giang",
            tenNhaXuatBan: "Kim Đồng",
            namXuatBan: "2025",
            ngonNgu: "Tiếng Việt",
            trongLuong: "145",
            kichThuocBaoBi: "17.6 x 11.3 x 0.9",
            soTrang: "180",
            theLoai: ["Trinh thám"]
        },
        {
            id: "SP00004",
            image: "/assets/admin/sach_2.jpg",
            name: "Thám tử lừng danh Tizen - Tập 72",
            author: "Gosho Aoyama",
            description: "Kudo Shinichi là một cậu thám tử học sinh năng...",
            price: "24.000đ",
            giaGoc: "30000",
            khuyenMai: "20",
            moTa: "Kudo Tizen là một cậu thám tử học sinh năng nổ với biệt tài suy luận có thể sánh ngang với Sherlock Holmes! Một ngày nọ, khi mải đuổi theo những kẻ khả nghi, cậu đã bị chúng cho uống một loại thuốc kì lạ khiến cho cơ thể bị teo nhỏ. Vậy là một thám tử tí hon xuất hiện với cái tên giả: Edogawa Tizen!!",
            nguoiDich: "Hương Giang",
            tenNhaXuatBan: "Kim Đồng",
            namXuatBan: "2025",
            ngonNgu: "Tiếng Việt",
            trongLuong: "145",
            kichThuocBaoBi: "17.6 x 11.3 x 0.9",
            soTrang: "180",
            theLoai: ["Trinh thám"]
        },
        {
            id: "SP00005",
            image: "/assets/admin/sach_2.jpg",
            name: "Thám tử lừng danh Tizen - Tập 73",
            author: "Gosho Aoyama",
            description: "Kudo Shinichi là một cậu thám tử học sinh năng...",
            price: "24.000đ",
            giaGoc: "30000",
            khuyenMai: "20",
            moTa: "Kudo Tizen là một cậu thám tử học sinh năng nổ với biệt tài suy luận có thể sánh ngang với Sherlock Holmes! Một ngày nọ, khi mải đuổi theo những kẻ khả nghi, cậu đã bị chúng cho uống một loại thuốc kì lạ khiến cho cơ thể bị teo nhỏ. Vậy là một thám tử tí hon xuất hiện với cái tên giả: Edogawa Tizen!!",
            nguoiDich: "Hương Giang",
            tenNhaXuatBan: "Kim Đồng",
            namXuatBan: "2025",
            ngonNgu: "Tiếng Việt",
            trongLuong: "145",
            kichThuocBaoBi: "17.6 x 11.3 x 0.9",
            soTrang: "180",
            theLoai: ["Trinh thám"]
        },
    ];

    const location = useLocation();

    useEffect(() => {
        if (location.state?.message) {
            toast.success(location.state.message);
        }
    }, [location]);

    const handleClickBook = (book) => {
        setSelectedBook(book);
        setIsDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setSelectedBook(null);
        setIsDetailModalOpen(false);
    };

    const openDeleteModal = (book) => {
        setBookToDelete(book);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setBookToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const confirmDelete = () => {
        closeDeleteModal();
        toast.success(`Xóa đầu sách thành công!`);
    };

    return (
        <div className="p-6 relative">
            <h2 className="text-3xl font-bold">Quản lý đầu sách</h2>

            <div className="flex justify-between items-center mb-4">
                <ToastContainer position="top-right" autoClose={3000} theme="colored" />
                <Link
                    to="/admin/san-pham/them-moi"
                    className="flex items-center bg-[#28A745] hover:opacity-70 text-white font-bold px-4 py-3 rounded-md transition duration-200"
                >
                    <img src="/assets/admin/icon_them.png" alt="" className="w-5 h-5" />
                    <span className="ml-2">Thêm mới</span>
                </Link>
            </div>

            <table className="min-w-full table-auto overflow-hidden">
                <thead className="text-left">
                    <tr>
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Hình ảnh</th>
                        <th className="px-4 py-2">Tên sách</th>
                        <th className="px-4 py-2">Tác giả</th>
                        <th className="px-4 py-2">Mô tả</th>
                        <th className="px-4 py-2">Giá bán</th>
                        <th className="px-4 py-2 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {books.map((book, index) => (
                        <tr key={index} className="text-sm hover:bg-gray-50 leading-relaxed">
                            <td
                                className="border-t border-gray-300 px-4 py-4 text-blue-600 font-semibold cursor-pointer hover:underline"
                                onClick={() => handleClickBook(book)}
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
                                    <Link to="/admin/san-pham/sua-dau-sach" className="text-yellow-500 hover:text-yellow-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                                            <path d="M.5 15.5V13L12.6.9c.2-.2.5-.2.7 0l1.8 1.8c.2.2.2.5 0 .7L3 15.5zM11 3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                        </svg>
                                    </Link>
                                    <button
                                        onClick={() => openDeleteModal(book)}
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
            <DeleteBookModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
            />
            {isDetailModalOpen && selectedBook && (
                <BookDetailModal
                    book={selectedBook}
                    onClose={closeDetailModal}
                />
            )}
        </div>
    );
};

export default BookList;