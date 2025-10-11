
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditDiscount() {
    const navigate = useNavigate();
    const today = new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState({
        maGiamGia: 'KM00001',
        hinhAnh: "giam-20.jpg",
        moTa: 'Giảm 20% cho mỗi cuốn sách',
        giaTriGiam: '20',
        ngayBatDau: '2025-10-01',
        ngayKetThuc: '2025-10-15',
        soLuong: '10000',
        trangThai: 'Kích hoạt',
    });

    const [errors, setErrors] = useState({});
    const [fileName, setFileName] = useState(
        typeof formData.hinhAnh === "string" ? formData.hinhAnh : ""
    );

    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case "maGiamGia":
                if (!value.trim()) error = "Mã giảm giá không được bỏ trống";
                break;
            case 'hinhAnh':
                if (!value) {
                    error = 'Vui lòng tải lên hình ảnh đại diện cho mã giảm giá';
                } else {
                    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
                    if (!allowed.includes(value.type)) error = 'Định dạng ảnh chỉ chấp nhận JPG, JPEG, PNG, SVG';
                    const maxSize = 25 * 1024 * 1024;
                    if (value.size > maxSize) error = 'Dung lượng ảnh phải <= 25MB';
                }
                break;
            case 'moTa':
                if (value && value.length > 500) error = 'Mô tả không được vượt quá 500 ký tự';
                break;
            case "giaTriGiam":
                if (!value.trim()) {
                    error = "Giá trị giảm không được bỏ trống";
                } else if (isNaN(value)) {
                    error = "Giá trị giảm chỉ được nhập số";
                } else if (parseFloat(value) < 0 || parseFloat(value) > 100) {
                    error = "Giá trị giảm phải nằm trong khoảng từ 0 đến 100";
                }
                break;
            case 'ngayBatDau':
                if (!value) error = 'Vui lòng chọn ngày bắt đầu';
                else if (isNaN(Date.parse(value))) error = 'Định dạng ngày không hợp lệ';
                break;
            case 'ngayKetThuc':
                if (!value) error = 'Vui lòng chọn ngày kết thúc';
                else if (isNaN(Date.parse(value))) error = 'Định dạng ngày không hợp lệ';
                break;
            case 'soLuong':
                if (!value || !value.toString().trim()) {
                    error = 'Số lượng phát hành không được bỏ trống';
                } else if (!/^\d+$/.test(value)) {
                    error = 'Số lượng phải là số nguyên dương';
                } else if (parseInt(value, 10) < 1) {
                    error = 'Số lượng phải lớn hơn hoặc bằng 1';
                }
                break;
            case 'trangThai':
                if (!value) error = 'Vui lòng chọn trạng thái mã giảm giá';
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        setFormData((prev) => ({
            ...prev,
            hinhAnh: file || prev.hinhAnh, // nếu không chọn file mới thì giữ nguyên ảnh cũ
        }));

        // cập nhật tên hiển thị
        setFileName(file ? file.name : "");

        // validate
        const error = validateField("hinhAnh", file || formData.hinhAnh);
        setErrors((prev) => ({ ...prev, hinhAnh: error }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.entries(formData).forEach(([key, value]) => {
            const error = validateField(key, value);
            if (error) newErrors[key] = error;
        });

        // Kiểm tra quan hệ ngày bắt đầu < ngày kết thúc
        if (!newErrors.ngayBatDau && !newErrors.ngayKetThuc) {
            const start = Date.parse(formData.ngayBatDau);
            const end = Date.parse(formData.ngayKetThuc);
            if (start >= end) {
                newErrors.ngayBatDau = 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc';
                newErrors.ngayKetThuc = 'Ngày kết thúc phải lớn hơn ngày bắt đầu';
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        toast.success('Sửa mã giảm giá thành công!');
        setTimeout(() => {
            navigate('/admin/giam-gia', { state: { message: 'Sửa mã giảm giá thành công!' } });
        }, 1000);
    };

    return (
        <div className="bg-white">
            <h2 className="text-2xl font-bold mb-6 text-black">Sửa thông tin mã giảm giá</h2>

            <form className="mx-20 space-y-4" onSubmit={handleSubmit}>
                {/* Mã giảm giá */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Mã giảm giá:<span className="text-red-500 ml-1">*</span></label>
                        <input
                            name="maGiamGia"
                            value={formData.maGiamGia}
                            onChange={handleChange}
                            type="text"
                            className="w-3/4 border border-gray-300 p-2 rounded"
                            placeholder="Nhập mã giảm giá (tối đa 50 ký tự)"
                        />
                    </div>
                    {errors.maGiamGia && <p className="text-red-500 ml-[25%]">{errors.maGiamGia}</p>}
                </div>

                {/* Hình ảnh */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">
                            Hình ảnh đại diện:<span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="w-3/4 border border-gray-300 rounded bg-white flex items-center space-x-4">
                            <label
                                htmlFor="uploadFile"
                                className="px-4 py-2 bg-gray-100 border-r border-gray-300 rounded cursor-pointer hover:bg-gray-200"
                            >
                                Tải ảnh lên
                            </label>
                            <span className="text-gray-700 text-sm truncate flex-1">
                                {fileName || "Chưa có ảnh nào được chọn"}
                            </span>
                            <input
                                id="uploadFile"
                                type="file"
                                accept="image/*"
                                name="hinhAnh"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Hiển thị ảnh (cũ hoặc mới) */}
                    {formData.hinhAnh && (
                        <img
                            src={
                                typeof formData.hinhAnh === "string"
                                    ? `/uploads/${formData.hinhAnh}`
                                    : URL.createObjectURL(formData.hinhAnh)
                            }
                            alt="Preview"
                            className="ml-[25%] mt-2 w-32 h-32 object-cover border rounded"
                        />
                    )}

                    {errors.hinhAnh && (
                        <p className="text-red-500 ml-[25%]">{errors.hinhAnh}</p>
                    )}
                </div>

                {/* Mô tả */}
                <div className="flex flex-col">
                    <div className="flex items-start">
                        <label className="w-1/4 font-semibold pt-2">Mô tả:</label>
                        <textarea
                            name="moTa"
                            value={formData.moTa}
                            onChange={handleChange}
                            className="w-3/4 border border-gray-300 p-2 rounded min-h-[96px]"
                            placeholder="Mô tả (tối đa 500 ký tự)"
                        />
                    </div>
                    {errors.moTa && <p className="text-red-500 ml-[25%]">{errors.moTa}</p>}
                </div>

                {/* Giá trị giảm (%) */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">
                            Giá trị giảm (%):<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            name="giaTriGiam"
                            value={formData.giaTriGiam}
                            onChange={handleChange}
                            type="number"
                            min="1"
                            max="100"
                            className="w-3/4 border border-gray-300 p-2 rounded"
                            placeholder="Nhập giá trị giảm (1 - 100)"
                        />
                    </div>
                    {errors.giaTriGiam && <p className="text-red-500 ml-[25%]">{errors.giaTriGiam}</p>}
                </div>

                {/* Ngày bắt đầu */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">
                            Ngày bắt đầu:<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            name="ngayBatDau"
                            value={formData.ngayBatDau}
                            onChange={handleChange}
                            type="date"
                            min={today}
                            className="w-3/4 border border-gray-300 p-2 rounded"
                        />
                    </div>
                    {errors.ngayBatDau && <p className="text-red-500 ml-[25%]">{errors.ngayBatDau}</p>}
                </div>

                {/* Ngày kết thúc */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">
                            Ngày kết thúc:<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            name="ngayKetThuc"
                            value={formData.ngayKetThuc}
                            onChange={handleChange}
                            type="date"
                            min={today}
                            className="w-3/4 border border-gray-300 p-2 rounded"
                        />
                    </div>
                    {errors.ngayKetThuc && <p className="text-red-500 ml-[25%]">{errors.ngayKetThuc}</p>}
                </div>

                {/* Số lượng phát hành */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">
                            Số lượng phát hành:<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            name="soLuong"
                            value={formData.soLuong}
                            onChange={handleChange}
                            type="number"
                            min="1"
                            className="w-3/4 border border-gray-300 p-2 rounded"
                            placeholder="Nhập số lượng (số nguyên >= 1)"
                        />
                    </div>
                    {errors.soLuong && <p className="text-red-500 ml-[25%]">{errors.soLuong}</p>}
                </div>

                {/* Trạng thái */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">
                            Trạng thái:<span className="text-red-500 ml-1">*</span>
                        </label>
                        <select
                            name="trangThai"
                            value={formData.trangThai}
                            onChange={handleChange}
                            className="w-3/4 border border-gray-300 p-2 rounded"
                        >
                            <option value="">-- Chọn trạng thái --</option>
                            <option>Kích hoạt</option>
                            <option>Ngừng kích hoạt</option>
                        </select>
                    </div>
                    {errors.trangThai && <p className="text-red-500 ml-[25%]">{errors.trangThai}</p>}
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
                        onClick={() => navigate('/admin/giam-gia')}
                        className="w-22 h-10 font-bold border hover:border-red-500 hover:text-red-500 text-black rounded transition-all ease-out duration-150"
                    >
                        Hủy
                    </button>
                </div>
            </form>

            <ToastContainer />
        </div>
    );
}

export default EditDiscount;