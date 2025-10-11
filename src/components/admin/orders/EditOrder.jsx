import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditOrder() {
    const navigate = useNavigate();

    const stockMap = {
        'Lập trình Java cơ bản': 5,
        'Học React nhanh': 3,
        'Python cho người mới': 2,
        'Cấu trúc dữ liệu': 4
    };

    const [formData, setFormData] = useState({
        tenKhachHang: 'Nguyễn Văn A',
        diaChi: '123 Trần Duy Hưng',
        soDienThoai: '0912345678',
        tongTien: '500000',
        ngayDat: '2024-06-10',
        phuongThucThanhToan: 'Thanh toán khi nhận hàng'
    });

    const [errors, setErrors] = useState({});

    const validateCustomerName = (value) => {
        if (!value.trim())
            return "Tên khách hàng không được bỏ trống";
        if (!/^[\p{L}\s-]{2,50}$/u.test(value.trim()))
            return "Tên hợp lệ 2-50 ký tự, chỉ chứa chữ cái, khoảng trắng và dấu gạch ngang";
        return "";
    };

    const validateAddress = (value) => {
        if (!value.trim())
            return "Địa chỉ không được bỏ trống";
        if (!/^[\p{L}0-9\s,\.\-\/]{5,100}$/u.test(value.trim()))
            return "Địa chỉ 5-100 ký tự, không chứa ký tự đặc biệt";
        return "";
    };

    const validatePhone = (value) => {
        if (!value.trim())
            return "Số điện thoại không được bỏ trống";
        if (!/^\d{9,11}$/.test(value))
            return "Số điện thoại không hợp lệ";
        return "";
    };

    const validateTotal = (value) => {
        if (!value.trim())
            return "Tổng tiền không được bỏ trống";
        if (!/^\d+$/.test(value.trim()))
            return "Tổng tiền chỉ được chứa chữ số";
        return "";
    };

    const validateOrderDate = (value) => {
        if (!value.trim())
            return "Ngày đặt hàng không được bỏ trống";

        let d = null;
        if (/^\d{4}-\d{2}-\d{2}$/.test(value))
            d = new Date(value);
        else if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
            const [dd, mm, yyyy] = value.split('/');
            d = new Date(`${yyyy}-${mm}-${dd}`);
        }

        if (!d || isNaN(d.getTime()))
            return 'Ngày đặt hàng không hợp lệ';

        const today = new Date();
        today.setHours(0,0,0,0);
        d.setHours(0,0,0,0);

        if (d > today)
            return 'Ngày đặt không được lớn hơn ngày hiện tại';

        return "";
    };

    const validateField = (name, value) => {
        switch (name) {
            case "tenKhachHang":
                return validateCustomerName(value);
            case "diaChi":
                return validateAddress(value);
            case "soDienThoai":
                return validatePhone(value);
            case "tongTien":
                return validateTotal(value);
            case "ngayDat":
                return validateOrderDate(value);
            default:
                return "";
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        
        setFormData(prev => ({ ...prev, [name]: value }));

        
        validateField(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra từng trường
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            validateField(key, formData[key]); // gọi lại hàm validate
            if (
                !formData[key] ||
                (key === "phuongThucThanhToan" && formData[key] === "-- Chọn phương thức --")
            ) {
                newErrors[key] = "Vui lòng điền đầy đủ thông tin";
            }
        });

        // Nếu có lỗi thì hiển thị toast và không submit
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Nếu không có lỗi, thực hiện submit
        // Validate product list
        const table = e.target.querySelector('table');
        const rows = table ? Array.from(table.querySelectorAll('tbody tr')) : [];
        if (rows.length === 0) {
            toast.error('Danh sách sản phẩm không được để trống');
            return;
        }
        for (const r of rows) {
            const select = r.querySelector('select');
            const qtyInput = r.querySelector('input[type="number"]');
            const title = select ? select.value.trim() : '';
            const qty = qtyInput ? parseInt(qtyInput.value, 10) : 0;
            if (!title) {
                toast.error('Tên sách không được để trống');
                return;
            }
            if (!qty || qty < 1) {
                toast.error('Số lượng phải lớn hơn 0');
                return;
            }
            const available = stockMap[title] ?? 0;
            if (qty > available) {
                toast.error(`Số lượng cho "${title}" vượt quá tồn kho (${available})`);
                return;
            }
        }

        setTimeout(() => {
            navigate("/admin/don-hang", { state: { message: "Sửa đơn hàng thành công!" } });
        }, 1000);
    };

    return (
        <div className="bg-white">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-6 text-black">Chỉnh sửa đơn hàng</h2>

            <form className="mx-20 space-y-4" onSubmit={handleSubmit}>
                {/* Tên khách hàng */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Tên khách hàng:<span className="text-red-500 ml-1">*</span></label>
                        <input
                            name="tenKhachHang"
                            type="text"
                            value={formData.tenKhachHang}
                            onChange={handleChange}
                            className="w-3/4 border border-gray-300 p-2 rounded"
                            placeholder="Nhập tên khách hàng"
                        />
                    </div>
                    {errors.tenKhachHang && <p className="text-red-500 ml-[25%]">{errors.tenKhachHang}</p>}
                </div>

                {/* Địa chỉ */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Địa chỉ:<span className="text-red-500 ml-1">*</span></label>
                        <input
                            name="diaChi"
                            type="text"
                            value={formData.diaChi}
                            onChange={handleChange}
                            className="w-3/4 border border-gray-300 p-2 rounded"
                            placeholder="Nhập địa chỉ"
                        />
                    </div>
                    {errors.diaChi && <p className="text-red-500 ml-[25%]">{errors.diaChi}</p>}
                </div>

                {/* Số điện thoại */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Số điện thoại:<span className="text-red-500 ml-1">*</span></label>
                        <input
                            name="soDienThoai"
                            type="text"
                            value={formData.soDienThoai}
                            onChange={handleChange}
                            className="w-3/4 border border-gray-300 p-2 rounded"
                            placeholder="0123456789"
                        />
                    </div>
                    {errors.soDienThoai && <p className="text-red-500 ml-[25%]">{errors.soDienThoai}</p>}
                </div>

                {/* Danh sách sản phẩm */}
                {/* Không validate sản phẩm ở đây */}
                <div className="flex items-start">
                    <label className="w-1/4 font-semibold mt-2">Danh sách sản phẩm:</label>
                    <div className="w-3/4">
                        <table className="w-full table-auto border border-gray-300 mb-2">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-300 p-2">Tên sách</th>
                                    <th className="border border-gray-300 p-2">Số lượng</th>
                                    <th className="border border-gray-300 p-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 p-2">
                                        <select className="w-full border border-gray-300 p-1 rounded">
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
                                            defaultValue="1"
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
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Phương thức thanh toán:<span className="text-red-500 ml-1">*</span></label>
                        <select
                            name="phuongThucThanhToan"
                            value={formData.phuongThucThanhToan}
                            onChange={handleChange}
                            className="w-3/4 border border-gray-300 p-2 rounded"
                        >
                            <option>-- Chọn phương thức --</option>
                            <option>Thanh toán khi nhận hàng</option>
                            <option>Chuyển khoản ngân hàng</option>
                            <option>Ví điện tử</option>
                        </select>
                    </div>
                    {errors.phuongThucThanhToan && <p className="text-red-500 ml-[25%]">{errors.phuongThucThanhToan}</p>}
                </div>

                {/* Tổng tiền */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Tổng tiền:<span className="text-red-500 ml-1">*</span></label>
                        <input
                            name="tongTien"
                            type="text"
                            value={formData.tongTien}
                            onChange={handleChange}
                            className="w-3/4 border border-gray-300 p-2 rounded"
                        />
                    </div>
                    {errors.tongTien && <p className="text-red-500 ml-[25%]">{errors.tongTien}</p>}
                </div>

                {/* Ngày đặt hàng */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Ngày đặt hàng:<span className="text-red-500 ml-1">*</span></label>
                        <input
                            name="ngayDat"
                            type="date"
                            value={formData.ngayDat}
                            onChange={handleChange}
                            className="w-3/4 border border-gray-300 p-2 rounded"
                        />
                    </div>
                    {errors.ngayDat && <p className="text-red-500 ml-[25%]">{errors.ngayDat}</p>}
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
                        onClick={() => navigate("/admin/don-hang")}
                        className="w-22 h-10 font-bold border hover:border-red-500 hover:text-red-500 text-black rounded transition-all ease-out duration-150"
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditOrder;
