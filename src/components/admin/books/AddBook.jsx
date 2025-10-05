import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

function AddBook() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        tenSach: '',
        hinhAnh: null,
        tacGia: '',
        nguoiDich: '',
        moTa: '',
        tenNhaXuatBan: '',
        namXuatBan: '',
        hinhThuc: '',
        ngonNgu: '',
        trongLuong: '',
        kichThuocBaoBi: '',
        soTrang: '',
        theLoai: [],
        giaGoc: '',
        khuyenMai: '',
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
    const [fileName, setFileName] = useState("Chưa có ảnh nào được chọn");

    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case "tenSach":
                if (!value.trim()) 
                    error = "Tên đầu sách không được bỏ trống";
                break;
            case "hinhAnh":
                if (!value) 
                    error = "Vui lòng tải lên hình ảnh cho đầu sách";
                break;
            case "tacGia":
                if (!value.trim()) 
                    error = "Tác giả không được bỏ trống";
                break;
            case "nguoiDich":
                if (!value.trim()) 
                    error = "Người dịch không được bỏ trống";
                break;
            case "moTa":
                if (!value.trim()) 
                    error = "Mô tả không được bỏ trống";
                break;
            case "tenNhaXuatBan":
                if (!value.trim()) 
                    error = "Tên nhà xuất bản không được bỏ trống";
                break;
            case "namXuatBan":
                if (!value.trim()) {
                    error = "Năm xuất bản không được bỏ trống";
                } else if (isNaN(value)) {
                    error = "Năm xuất bản chỉ được nhập số";
                }
                break;
            case "hinhThuc":
                if (!value || value === "-- Chọn hình thức --") {
                    error = "Vui lòng chọn hình thức của sách";
                }
                break;
            case "ngonNgu":
                if (!value || value === "-- Chọn ngôn ngữ --") {
                    error = "Vui lòng chọn ngôn ngữ của sách";
                }
                break;
            case "trongLuong":
                if (isNaN(value)) {
                    error = "Trọng lượng chỉ được nhập số";
                }
                break;
            case "soTrang":
                if (!value.trim()) {
                    error = "Số trang không được bỏ trống";
                } else if (isNaN(value)) {
                    error = "Số trang chỉ được nhập số";
                }
                break;
            case "theLoai":
                if (!value || value.length === 0) {
                    error = "Vui lòng chọn thể loại cho sách";
                }
                break;
            case "giaGoc":
                if (!value.trim()) {
                    error = "Giá gốc không được bỏ trống";
                } else if (isNaN(value)) {
                    error = "Giá gốc chỉ được nhập số";
                }
                break;
            case "khuyenMai":
                if (!value.trim()) {
                    error = "Khuyến mãi không được bỏ trống";
                } else if (isNaN(value)) {
                    error = "Khuyến mãi chỉ được nhập số";
                } else if (parseFloat(value) < 0 || parseFloat(value) > 100) {
                    error = "Khuyến mãi phải nằm trong khoảng từ 0 đến 100";
                }
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
                state: { message: "Thêm đầu sách thành công!" }
            });
        }, 1000);
    };

    return (
        <div className="bg-white">
            <h2 className="text-2xl font-bold mb-6 text-black">Thêm đầu sách mới</h2>

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
                <div className="flex space-x-2 pt-10">
                    <button
                        type="submit"
                        className="w-22 h-10 font-bold bg-blue-500 hover:opacity-70 text-white rounded transition-all ease-out duration-150"
                    >
                        Thêm
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

export default AddBook;
