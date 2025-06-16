import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditOrder() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Thực hiện cập nhật đơn hàng tại đây

        toast.success("Sửa đơn hàng thành công!");

        // Chờ toast hiển thị rồi chuyển trang
        setTimeout(() => {
            navigate("/admin/don-hang", { state: { message: "Sửa đơn hàng thành công!" } });
        }, 1000);
    };

    return (
        <div className="bg-white h-screen">
            <h2 className="text-2xl font-bold mb-6 text-black">Chỉnh sửa đơn hàng</h2>

            <form className="mx-20 space-y-4" onSubmit={handleSubmit}>
                {/* Tên khách hàng */}
                <div className="flex items-center">
                    <label className="w-1/4 font-semibold">Tên khách hàng:</label>
                    <input
                        type="text"
                        className="w-3/4 border border-gray-300 p-2 rounded"
                        placeholder="Nhập tên khách hàng"
                        defaultValue="Nguyễn Văn A"
                    />
                </div>

                {/* Địa chỉ */}
                <div className="flex items-center">
                    <label className="w-1/4 font-semibold">Địa chỉ:</label>
                    <input
                        type="text"
                        className="w-3/4 border border-gray-300 p-2 rounded"
                        placeholder="Nhập địa chỉ"
                        defaultValue="123 Trần Duy Hưng"
                    />
                </div>

                {/* Số điện thoại */}
                <div className="flex items-center">
                    <label className="w-1/4 font-semibold">Số điện thoại:</label>
                    <input
                        type="text"
                        className="w-3/4 border border-gray-300 p-2 rounded"
                        placeholder="0123456789"
                        defaultValue="0912345678"
                    />
                </div>

                {/* Danh sách sản phẩm */}
                <div className="flex items-start">
                    <label className="w-1/4 font-semibold mt-2">Danh sách sản phẩm:</label>
                    <div className="w-3/4">
                        <table className="w-full table-auto border border-gray-300 mb-2">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-300 p-2">Tên sách</th>
                                    <th className="border border-gray-300 p-2">Số lượng</th>
                                    <th className="border border-gray-300 p-2">Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 p-2">
                                        <select className="w-full border border-gray-300 p-1 rounded" defaultValue="Lập trình Java cơ bản">
                                            <option>Lập trình Java cơ bản</option>
                                            <option>Học React nhanh</option>
                                            <option>Python cho người mới</option>
                                            <option>Cấu trúc dữ liệu</option>
                                        </select>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="number"
                                            min="1"
                                            className="w-full border border-gray-300 p-1 rounded"
                                            defaultValue="2"
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <button type="button" className="text-red-500 hover:underline">
                                            ❌
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            type="button"
                            className="mt-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
                        >
                            + Thêm sản phẩm
                        </button>
                    </div>
                </div>

                {/* Phương thức vận chuyển */}
                <div className="flex items-center">
                    <label className="w-1/4 font-semibold">Phương thức vận chuyển:</label>
                    <select className="w-3/4 border border-gray-300 p-2 rounded" defaultValue="Tiết kiệm">
                        <option>Tiết kiệm</option>
                        <option>Hỏa tốc</option>
                    </select>
                </div>

                {/* Phương thức thanh toán */}
                <div className="flex items-center">
                    <label className="w-1/4 font-semibold">Phương thức thanh toán:</label>
                    <select className="w-3/4 border border-gray-300 p-2 rounded" defaultValue="Thanh toán khi nhận hàng">
                        <option>-- Chọn phương thức --</option>
                        <option>Thanh toán khi nhận hàng</option>
                        <option>Chuyển khoản ngân hàng</option>
                        <option>Ví điện tử</option>
                    </select>
                </div>

                {/* Tổng tiền */}
                <div className="flex items-center">
                    <label className="w-1/4 font-semibold">Tổng tiền:</label>
                    <input
                        type="text"
                        className="w-3/4 border border-gray-300 p-2 rounded"
                        defaultValue="500000"
                    />
                </div>

                {/* Ngày đặt hàng */}
                <div className="flex items-center">
                    <label className="w-1/4 font-semibold">Ngày đặt hàng:</label>
                    <input
                        type="date"
                        className="w-3/4 border border-gray-300 p-2 rounded"
                        defaultValue="2024-06-10"
                    />
                </div>

                {/* Trạng thái */}
                <div className="flex items-center">
                    <label className="w-1/4 font-semibold">Trạng thái:</label>
                    <select className="w-3/4 border border-gray-300 p-2 rounded" defaultValue="Đang xử lý đơn hàng">
                        <option>Đang xử lý đơn hàng</option>
                        <option>Đã giao cho đơn vị vận chuyển</option>
                        <option>Giao hàng thành công</option>
                        <option>Giao hàng không thành công</option>
                        <option>Đơn hàng bị hủy</option>
                    </select>
                </div>

                {/* Nút thao tác */}
                <div className="flex space-x-2 pt-10">
                    <button
                        type="submit"
                        className="w-22 h-10 font-bold bg-yellow-500 hover:opacity-70 text-white rounded transition-all ease-out duration-150"
                    >
                        Sửa
                    </button>
                    <button
                        type="reset"
                        className="w-22 h-10 font-bold border hover:border-gray-500 hover:text-gray-500 text-black rounded transition-all ease-out duration-150"
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditOrder;
