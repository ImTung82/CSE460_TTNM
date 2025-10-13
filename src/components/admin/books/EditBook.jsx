import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

function EditBook() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        tenSach: 'Thám tử Lừng danh Tizen - Tập 69',
        hinhAnh: "tham_tu_lung_danh_tizen_tap_69.jpg",
        tacGia: 'Gosho Aoyama',
        nguoiDich: 'Hương Giang',
        moTa: 'Kudo Tizen là một cậu thám tử học sinh năng nổ với biệt tài suy luận có thể sánh ngang với Sherlock Holmes! Một ngày nọ, khi mải đuổi theo những kẻ khả nghi, cậu đã bị chúng cho uống một loại thuốc kì lạ khiến cho cơ thể bị teo nhỏ. Vậy là một thám tử tí hon xuất hiện với cái tên giả: Edogawa Tizen!!',
        tenNhaXuatBan: 'Kim Đồng',
        namXuatBan: '2025',
        hinhThuc: 'Bìa mềm',
        ngonNgu: 'Tiếng Việt',
        trongLuong: '145',
        kichThuocBaoBi: '17.6 x 11.3 x 0.9',
        soTrang: '180',
        theLoai: ["Tiểu thuyết", "Trinh thám"],
        giaGoc: '30000',
        khuyenMai: '20',
    });

    const giaGocNumber = parseFloat(formData.giaGoc) || 0;
    const khuyenMaiNumber = parseFloat(formData.khuyenMai) || 0;
    const giaBan = giaGocNumber * (1 - khuyenMaiNumber / 100);

    useEffect(() => {
        if (window.MultiSelectTag) {
            new window.MultiSelectTag('theLoai', {
                maxSelection: 100,
                required: false,
                placeholder: 'Tìm kiếm thể loại',
                onChange: handleTheLoaiChange
            });
        }
    }, []);

    const handleTheLoaiChange = (selected) => {
        const theLoaiValues = selected.map(item => item.id);
        setFormData(prev => {
            const updated = { ...prev, theLoai: theLoaiValues };

            // Gọi validate sau khi setFormData
            const error = validateField("theLoai", theLoaiValues);
            setErrors(prevErrors => ({ ...prevErrors, theLoai: error }));

            return updated;
        });
    };

    const [errors, setErrors] = useState({});
    const [fileName, setFileName] = useState("tham_tu_lung_danh_tizen_tap_69.jpg");

    const validateTenSach = (value) => {
        if (!value.trim())
            return "Tên đầu sách không được bỏ trống";
        else if (value.length > 250)
            return "Tên đầu sách không được vượt quá 250 ký tự";
        return "";
    };

    const validateHinhAnh = (value) => {
        if (!value)
            return "Vui lòng tải lên hình ảnh cho đầu sách";
        else if (value.type !== "image/jpeg" && value.type !== "image/jpg" && value.type !== "image/png" && value.type !== "image/svg+xml")
            return "Định dạng ảnh không hợp lệ.";
        else if (value.size > 25 * 1024 * 1024)
            return "Kích thước ảnh không được vượt quá 25MB";
        return "";
    };

    const validateMoTa = (value) => {
        if (!value.trim())
            return "Mô tả không được bỏ trống";
        else if (value.length > 2000)
            return "Mô tả tổng quan không được vượt quá 2000 ký tự";
        return "";
    };

    const validateTenNhaXuatBan = (value) => {
        if (!value.trim()) 
            return "Tên nhà xuất bản không được bỏ trống";
        else if (value.length > 250)
            return "Tên nhà xuất bản không được vượt quá 250 ký tự";
        return "";
    };

    const validateNamXuatBan = (value) => {
        if (!/^-?\d+(\.\d+)?$/.test(value.trim()))
            return "Năm xuất bản chỉ được nhập số";
        else if (!Number.isInteger(Number(value)))
            return "Năm xuất bản phải là số nguyên";
        else if (Number(value) <= 0)
            return "Năm xuất bản phải lớn hơn 0";
        return "";
    };

    const validateTacGia = (value) => {
        if (!value.trim())
            return "Tác giả không được bỏ trống";
        else if (value.length > 250)
            return "Tác giả không được vượt quá 250 ký tự";
        return "";
    };

    const validateNguoiDich = (value) => {
        if (!value.trim())
            return "Người dịch không được bỏ trống";
        else if (value.length > 250)
            return "Người dịch không được vượt quá 250 ký tự";
        return "";
    };

    const validateNgonNgu = (value) => {
        if (value === "-- Chọn ngôn ngữ --")
            return "Vui lòng chọn ngôn ngữ của sách";
        return "";
    };

    const validateTrongLuong = (value) => {
        if (!/^-?\d+(\.\d+)?$/.test(value.trim()))
            return "Trọng lượng chỉ được nhập số";
        else if (!Number.isInteger(Number(value)))
            return "Trọng lượng phải là số nguyên";
        else if (Number(value) <= 0)
            return "Trọng lượng phải lớn hơn 0";
        return "";
    };

    const validateSoTrang = (value) => {
        if (!/^-?\d+(\.\d+)?$/.test(value.trim()))
            return "Số trang chỉ được nhập số";
        else if (!Number.isInteger(Number(value)))
            return "Số trang phải là số nguyên";
        else if (Number(value) <= 0)
            return "Số trang phải lớn hơn 0";
        return "";
    };

    const validateHinhThuc = (value) => {
        if (value === "-- Chọn hình thức --")
            return "Vui lòng chọn hình thức của sách";
        return "";
    };

    const validateTheLoai = (value) => {
        if (value.length === 0)
            return "Vui lòng chọn thể loại cho sách";
        return "";
    };

    const validateGiaGoc = (value) => {
        if (!/^-?\d+(\.\d+)?$/.test(value.trim()))
            return "Giá gốc chỉ được nhập số";
        else if (!Number.isInteger(Number(value)))
            return "Giá gốc phải là số nguyên";
        else if (Number(value) <= 0)
            return "Giá gốc phải lớn hơn 0";
        return "";
    };

    const validateKhuyenMai = (value) => {
        if (!/^-?\d+(\.\d+)?$/.test(value.trim()))
            return "Khuyến mãi chỉ được nhập số";
        else if (parseFloat(value) < 0 || parseFloat(value) > 100)
            return "Khuyến mãi phải nằm trong khoảng từ 0 đến 100";
        return "";
    };

    const validateField = (name, value) => {
        switch (name) {
            case "tenSach":
                return validateTenSach(value);
            case "hinhAnh":
                return validateHinhAnh(value);
            case "tacGia":
                return validateTacGia(value);
            case "nguoiDich":
                return validateNguoiDich(value);
            case "moTa":
                return validateMoTa(value);
            case "tenNhaXuatBan":
                return validateTenNhaXuatBan(value);
            case "namXuatBan":
                return validateNamXuatBan(value);
            case "hinhThuc":
                return validateHinhThuc(value);
            case "ngonNgu":
                return validateNgonNgu(value);
            case "trongLuong":
                return validateTrongLuong(value);
            case "soTrang":
                return validateSoTrang(value);
            case "theLoai":
                return validateTheLoai(value);
            case "giaGoc":
                return validateGiaGoc(value);
            case "khuyenMai":
                return validateKhuyenMai(value);
            default:
                return "";
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, hinhAnh: file }));
        setFileName(file ? file.name : "Chưa có ảnh nào được chọn");

        const error = validateField("hinhAnh", file);
        setErrors(prev => ({ ...prev, hinhAnh: error }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.entries(formData).forEach(([key, value]) => {
            const error = validateField(key, value);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setTimeout(() => {
            navigate("/admin/san-pham", {
                state: { message: "Sửa thông tin đầu sách thành công!" }
            });
        }, 1000);
    };

    return (
        <div className="bg-white">
            <h2 className="text-2xl font-bold mb-6 text-black">Sửa thông tin đầu sách</h2>

            <form className="mx-20 space-y-4" onSubmit={handleSubmit}>
                {/* Tên đầu sách */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Tên đầu sách:<span className="text-red-500 ml-1">*</span></label>
                        <input
                            name="tenSach"
                            value={formData.tenSach}
                            onChange={handleChange}
                            type="text"
                            className="w-3/4 border border-gray-300 p-2 rounded"
                            placeholder="Nhập tên đầu sách"
                        />
                    </div>
                    {errors.tenSach && <p className="text-red-500 ml-[25%]">{errors.tenSach}</p>}
                </div>

                {/* Hình ảnh */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Hình ảnh sách:<span className="text-red-500 ml-1">*</span></label>
                        <div className="w-3/4 border border-gray-300 rounded bg-white flex items-center space-x-4">
                            <label
                                htmlFor="uploadFile"
                                className="px-4 py-2 bg-gray-100 border-r border-gray-300 rounded cursor-pointer hover:bg-gray-200"
                            >
                                Tải ảnh lên
                            </label>
                            <span className="text-gray-700 text-sm truncate flex-1">
                                {fileName}
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
                    {errors.hinhAnh && <p className="text-red-500 ml-[25%]">{errors.hinhAnh}</p>}
                </div>

                {/* Tác giả */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Tác giả:<span className="text-red-500 ml-1">*</span></label>
                        <input
                            name="tacGia"
                            value={formData.tacGia}
                            onChange={handleChange}
                            type="text"
                            className="w-3/4 border border-gray-300 p-2 rounded"
                            placeholder="Nhập tác giả"
                        />
                    </div>
                    {errors.tacGia && <p className="text-red-500 ml-[25%]">{errors.tacGia}</p>}
                </div>

                {/* Người dịch */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Người dịch:<span className="text-red-500 ml-1">*</span></label>
                        <input
                            name="nguoiDich"
                            value={formData.nguoiDich}
                            onChange={handleChange}
                            type="text"
                            className="w-3/4 border border-gray-300 p-2 rounded"
                            placeholder="Nhập người dịch"
                        />
                    </div>
                    {errors.nguoiDich && <p className="text-red-500 ml-[25%]">{errors.nguoiDich}</p>}
                </div>


                {/* Mô tả */}
                <div className="flex flex-col">
                    <div className="flex items-start">
                        <label className="w-1/4 font-semibold pt-2">
                            Mô tả:<span className="text-red-500 ml-1">*</span>
                        </label>
                        <textarea
                            name="moTa"
                            value={formData.moTa}
                            onChange={handleChange}
                            className="w-3/4 border border-gray-300 p-2 rounded min-h-[128px]"
                            placeholder="Nhập mô tả chi tiết"
                        />
                    </div>
                    {errors.moTa && <p className="text-red-500 ml-[25%]">{errors.moTa}</p>}
                </div>

                {/* Tên nhà xuất bản */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Tên nhà xuất bản:<span className="text-red-500 ml-1">*</span></label>
                        <input
                            name="tenNhaXuatBan"
                            value={formData.tenNhaXuatBan}
                            onChange={handleChange}
                            type="text"
                            className="w-3/4 border border-gray-300 p-2 rounded"
                            placeholder="Nhập tên nhà xuất bản"
                        />
                    </div>
                    {errors.tenNhaXuatBan && <p className="text-red-500 ml-[25%]">{errors.tenNhaXuatBan}</p>}
                </div>

                {/* Năm xuất bản */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Năm xuất bản:<span className="text-red-500 ml-1">*</span></label>
                        <input
                            name="namXuatBan"
                            value={formData.namXuatBan}
                            onChange={handleChange}
                            type="text"
                            className="w-3/4 border border-gray-300 p-2 rounded"
                            placeholder="Nhập năm xuất bản"
                        />
                    </div>
                    {errors.namXuatBan && <p className="text-red-500 ml-[25%]">{errors.namXuatBan}</p>}
                </div>

                {/* Hình thức */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Hình thức:<span className="text-red-500 ml-1">*</span></label>
                        <select
                            name="hinhThuc"
                            value={formData.hinhThuc}
                            onChange={handleChange}
                            className="w-3/4 border border-gray-300 p-2 rounded"
                        >
                            <option>-- Chọn hình thức --</option>
                            <option>Bìa cứng</option>
                            <option>Bìa mềm</option>
                        </select>
                    </div>
                    {errors.hinhThuc && <p className="text-red-500 ml-[25%]">{errors.hinhThuc}</p>}
                </div>

                {/* Ngôn ngữ */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Ngôn ngữ:<span className="text-red-500 ml-1">*</span></label>
                        <select
                            name="ngonNgu"
                            value={formData.ngonNgu}
                            onChange={handleChange}
                            className="w-3/4 border border-gray-300 p-2 rounded"
                        >
                            <option>-- Chọn ngôn ngữ --</option>
                            <option>Tiếng Việt</option>
                            <option>Tiếng Anh</option>
                            <option>Tiếng Nhật</option>
                        </select>
                    </div>
                    {errors.ngonNgu && <p className="text-red-500 ml-[25%]">{errors.ngonNgu}</p>}
                </div>

                {/* Trọng lượng */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Trọng lượng:</label>
                        <input
                            name="trongLuong"
                            value={formData.trongLuong}
                            onChange={handleChange}
                            type="text"
                            className="w-3/4 border border-gray-300 p-2 rounded"
                            placeholder="Nhập trọng lượng"
                        />
                    </div>
                    {errors.trongLuong && <p className="text-red-500 ml-[25%]">{errors.trongLuong}</p>}
                </div>

                {/* Kích thước bao bì */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Kích thước bao bì:</label>
                        <input
                            name="kichThuocBaoBi"
                            value={formData.kichThuocBaoBi}
                            onChange={handleChange}
                            type="text"
                            className="w-3/4 border border-gray-300 p-2 rounded"
                            placeholder="Nhập kích thuớc bao bì (dài x rộng x cao)"
                        />
                    </div>
                    {errors.kichThuocBaoBi && <p className="text-red-500 ml-[25%]">{errors.kichThuocBaoBi}</p>}
                </div>

                {/* Số trang */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Số trang:<span className="text-red-500 ml-1">*</span></label>
                        <input
                            name="soTrang"
                            value={formData.soTrang}
                            onChange={handleChange}
                            type="text"
                            className="w-3/4 border border-gray-300 p-2 rounded"
                            placeholder="Nhập số trang"
                        />
                    </div>
                    {errors.soTrang && <p className="text-red-500 ml-[25%]">{errors.soTrang}</p>}
                </div>

                {/* Thể loại */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Thể loại:<span className="text-red-500 ml-1">*</span></label>
                        <select
                            name="theLoai"
                            value={formData.theLoai}
                            onChange={handleChange}
                            className="w-3/4 border border-gray-300 p-2 rounded"
                            id="theLoai"
                            multiple
                        >
                            {/* <option>-- Chọn ngôn ngữ --</option> */}
                            <option>Tiểu thuyết</option>
                            <option>Truyện ngắn</option>
                            <option>Khoa học</option>
                            <option>Kinh tế</option>
                            <option>Tâm lý - Kỹ năng sống</option>
                            <option>Lịch sử</option>
                            <option>Thiếu nhi</option>
                            <option>Văn học nước ngoài</option>
                            <option>Giáo trình - Tham khảo</option>
                            <option>Truyện tranh</option>
                            <option>Du ký</option>
                            <option>Ẩm thực</option>
                        </select>
                    </div>
                    {errors.theLoai && <p className="text-red-500 ml-[25%]">{errors.theLoai}</p>}
                </div>

                {/* Giá gốc */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Giá gốc:<span className="text-red-500 ml-1">*</span></label>
                        <input
                            name="giaGoc"
                            value={formData.giaGoc}
                            onChange={handleChange}
                            type="text"
                            className="w-3/4 border border-gray-300 p-2 rounded"
                            placeholder="Nhập giá gốc"
                        />
                    </div>
                    {errors.giaGoc && <p className="text-red-500 ml-[25%]">{errors.giaGoc}</p>}
                </div>

                {/* Khuyến mãi */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Khuyến mãi:<span className="text-red-500 ml-1">*</span></label>
                        <input
                            name="khuyenMai"
                            value={formData.khuyenMai}
                            onChange={handleChange}
                            type="text"
                            className="w-3/4 border border-gray-300 p-2 rounded"
                            placeholder="Nhập khuyến mãi (%)"
                        />
                    </div>
                    {errors.khuyenMai && <p className="text-red-500 ml-[25%]">{errors.khuyenMai}</p>}
                </div>

                {/* Giá bán */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <label className="w-1/4 font-semibold">Giá bán:</label>
                        <input
                            type="text"
                            value={isNaN(giaBan) ? "" : giaBan.toLocaleString("vi-VN")}
                            readOnly
                            className="w-3/4 border border-gray-300 p-2 rounded bg-gray-100"
                            placeholder="Giá bán sẽ tự động tính"
                        />
                    </div>
                </div>

                {/* Nút thao tác */}
                <div className="flex space-x-2 pt-10 justify-end">
                    <button
                        type="submit"
                        className="w-22 h-10 font-bold bg-yellow-500 hover:opacity-70 text-white rounded transition-all ease-out duration-150"
                    >
                        Sửa
                    </button>
                    <button
                        type="reset"
                        onClick={() => navigate("/admin/san-pham")}
                        className="w-22 h-10 font-bold border hover:border-red-500 hover:text-red-500 text-black rounded transition-all ease-out duration-150"
                    >
                        Hủy
                    </button>
                </div>
            </form>


        </div>
    );
}

export default EditBook;