import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditDiscount() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const determineStatus = (ngayBatDau, ngayKetThuc, soLuong) => {
    const today = new Date();
    const startDate = new Date(ngayBatDau);
    const endDate = new Date(ngayKetThuc);

    if (soLuong == 0) return "Ngừng kích hoạt";
    if (today < startDate) return "Ngừng kích hoạt";
    if (today > endDate) return "Ngừng kích hoạt";
    return "Kích hoạt";
  };

  const [formData, setFormData] = useState({
    loaiGiamGia: "Dịp lễ",
    dipLe: "TETDUONG2025",
    maGiamGia: "TETDUONG2025",
    hinhAnh: "giam-20.jpg",
    moTa: "Giảm 20% tổng đơn hàng nhân dịp năm mới",
    giaTriGiam: "20",
    ngayBatDau: "2025-01-01",
    ngayKetThuc: "2025-01-07",
    soLuong: "1000",
  });

  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState(
    typeof formData.hinhAnh === "string" ? formData.hinhAnh : ""
  );

  const discountCodes = ["KM00002", "KM00003", "KM00004", "KM00005", "KM00006"];

  const validDiscountTypes = [
    "Dịp lễ",
    "Theo số lượng",
    "Theo hóa đơn",
    "Khuyến mại thường",
  ];
  const occasions = [
    "TETDUONG2025",
    "TETAM2025",
    "PHUNU08MAR",
    "GIOTO2025",
    "LE30405",
    "THIEUNHI0601",
    "GIADINH2806",
    "KHAIGIANG0509",
    "TRUNGTHU2025",
    "HALLO1031",
    "NHAGIAO2011",
    "BLACKFRIDAY1124",
    "NOEL2512",
    "BIRTHDAYCUS",
    "BIRTHDAYSHOP",
  ];

  const generateDescription = (loaiGiamGia, maGiamGia, dipLe) => {
    if (loaiGiamGia === "Dịp lễ") {
      const occasionMap = {
        TETDUONG2025: "Giảm giá dịp Tết Dương Lịch",
        TETAM2025: "Giảm giá dịp Tết Âm Lịch",
        PHUNU08MAR: "Giảm giá ngày Quốc tế Phụ nữ",
        GIOTO2025: "Giảm giá dịp Giỗ Tổ Hùng Vương",
        LE30405: "Giảm giá dịp 30/4 - 1/5",
        THIEUNHI0601: "Giảm giá dịp Quốc tế Thiếu nhi",
        GIADINH2806: "Giảm giá ngày Gia đình Việt Nam",
        KHAIGIANG0509: "Giảm giá dịp khai giảng",
        TRUNGTHU2025: "Giảm giá dịp Trung Thu",
        HALLO1031: "Giảm giá dịp Halloween",
        NHAGIAO2011: "Giảm giá ngày Nhà giáo Việt Nam",
        BLACKFRIDAY1124: "Giảm giá Black Friday",
        NOEL2512: "Giảm giá dịp Giáng Sinh",
        BIRTHDAYCUS: "Giảm giá sinh nhật khách hàng",
        BIRTHDAYSHOP: "Giảm giá sinh nhật cửa hàng",
      };
      return occasionMap[dipLe] || "Mô tả tự động cho dịp lễ";
    } else if (loaiGiamGia === "Theo hóa đơn") {
      return `Giảm giá theo hóa đơn cho mã ${maGiamGia}`;
    } else if (loaiGiamGia === "Theo số lượng") {
      return `Giảm giá theo số lượng cho mã ${maGiamGia}`;
    }
    return formData.moTa;
  };

  const validateLoaiGiamGia = (value) => {
    let error = "";
    if (!value) return "Vui lòng chọn loại giảm giá";
    if (!validDiscountTypes.includes(value))
      return "Loại giảm giá không hợp lệ";
    return error;
  };

  const validateDipLe = (value, loaiGiamGia) => {
    let error = "";
    if (loaiGiamGia === "Dịp lễ" && !value)
      return "Vui lòng chọn dịp lễ cho mã giảm giá";
    if (loaiGiamGia === "Dịp lễ" && !occasions.includes(value))
      return "Dịp lễ không hợp lệ";
    return error;
  };

  const validateMaGiamGia = (value, loaiGiamGia, dipLe) => {
    let error = "";
    if (!value || !value.trim()) return "Vui lòng nhập hoặc sinh mã giảm giá";
    if (!/^[a-zA-Z0-9]+$/.test(value))
      return "Mã giảm giá chỉ được chứa chữ cái và số";
    if (value.length > 50) return "Mã giảm giá không được vượt quá 50 ký tự";
    if (value !== "KM00001" && discountCodes.includes(value))
      return "Mã giảm giá đã tồn tại trong hệ thống";
    if (loaiGiamGia === "Dịp lễ" && !dipLe)
      return "Vui lòng chọn dịp lễ cho mã giảm giá";
    return error;
  };

  const validateMoTa = (value) => {
    let error = "";
    if (value.length > 500) return "Mô tả không được vượt quá 500 ký tự";
    if (/[^\p{L}\p{N}\p{P}\p{Z}\n\r]/u.test(value)) {
      return "Mô tả chứa ký tự không hợp lệ";
    }

    return error;
  };

  const validateGiaTriGiam = (value) => {
    let error = "";
    if (!value || !value.toString().trim()) {
      error = "Vui lòng nhập hoặc sinh giá trị giảm";
    } else if (isNaN(value)) {
      error = "Giá trị giảm phải là số";
    } else if (parseFloat(value) < 1 || parseFloat(value) > 100) {
      error = "Giá trị giảm phải từ 1% đến 100%";
    }
    return error;
  };

  const validateField = (name, value, formData = {}) => {
    switch (name) {
      case "loaiGiamGia":
        return validateLoaiGiamGia(value);
      case "dipLe":
        return validateDipLe(value, formData.loaiGiamGia);
      case "maGiamGia":
        return validateMaGiamGia(value, formData.loaiGiamGia, formData.dipLe);
      case "moTa":
        return validateMoTa(value);
      case "giaTriGiam":
        return validateGiaTriGiam(value);
      case "ngayBatDau":
        if (!value) return "Vui lòng chọn ngày bắt đầu";
        if (isNaN(Date.parse(value))) return "Định dạng ngày không hợp lệ";
        return "";
      case "ngayKetThuc":
        if (!value) return "Vui lòng chọn ngày kết thúc";
        if (isNaN(Date.parse(value))) return "Định dạng ngày không hợp lệ";
        if (
          formData.ngayBatDau &&
          Date.parse(value) <= Date.parse(formData.ngayBatDau)
        ) {
          return "Ngày kết thúc phải lớn hơn ngày bắt đầu";
        }
        return "";
      case "soLuong":
        if (!value || !value.toString().trim()) {
          return "Số lượng phát hành không được bỏ trống";
        } else if (!/^\d+$/.test(value)) {
          return "Số lượng phải là số nguyên dương";
        } else if (parseInt(value, 10) < 1) {
          return "Số lượng phải lớn hơn hoặc bằng 1";
        }
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };
      if (name === "loaiGiamGia" && value !== "Dịp lễ") {
        newFormData.dipLe = "";
      }
      if (name === "loaiGiamGia" || name === "dipLe") {
        newFormData.maGiamGia =
          name === "dipLe" && value ? value : prev.maGiamGia;
        newFormData.moTa = generateDescription(
          newFormData.loaiGiamGia,
          newFormData.maGiamGia,
          newFormData.dipLe
        );
        newFormData.giaTriGiam = [
          "Dịp lễ",
          "Theo số lượng",
          "Theo hóa đơn",
        ].includes(newFormData.loaiGiamGia)
          ? "10"
          : prev.giaTriGiam;
      }
      return newFormData;
    });
    const error = validateField(name, value, { ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      hinhAnh: file || prev.hinhAnh,
    }));
    setFileName(file ? file.name : "");
    const error = validateField("hinhAnh", file || formData.hinhAnh);
    setErrors((prev) => ({ ...prev, hinhAnh: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const updatedFormData = {
      ...formData,
      trangThai: determineStatus(
        formData.ngayBatDau,
        formData.ngayKetThuc,
        formData.soLuong
      ),
    };

    Object.entries(updatedFormData).forEach(([key, value]) => {
      if (key !== "trangThai") {
        const error = validateField(key, value, updatedFormData);
        if (error) newErrors[key] = error;
      }
    });

    if (!newErrors.ngayBatDau && !newErrors.ngayKetThuc) {
      const start = Date.parse(updatedFormData.ngayBatDau);
      const end = Date.parse(updatedFormData.ngayKetThuc);
      if (start >= end) {
        newErrors.ngayBatDau = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc";
        newErrors.ngayKetThuc = "Ngày kết thúc phải lớn hơn ngày bắt đầu";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    toast.success("Sửa mã giảm giá thành công!");
    setTimeout(() => {
      navigate("/admin/giam-gia", {
        state: { message: "Sửa mã giảm giá thành công!" },
      });
    }, 1000);
  };

  return (
    <div className="bg-white">
      <h2 className="text-2xl font-bold mb-6 text-black">
        Sửa thông tin mã giảm giá
      </h2>

      <form className="mx-20 space-y-4" onSubmit={handleSubmit}>
        {/* Loại giảm giá */}
        <div className="flex flex-col">
          <div className="flex items-center">
            <label className="w-1/4 font-semibold">
              Loại giảm giá:<span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="loaiGiamGia"
              value={formData.loaiGiamGia}
              onChange={handleChange}
              className="w-3/4 border border-gray-300 p-2 rounded"
            >
              <option value="">-- Chọn loại giảm giá --</option>
              <option>Dịp lễ</option>
              <option>Theo số lượng</option>
              <option>Theo hóa đơn</option>
              <option>Khuyến mại thường</option>
            </select>
          </div>
          {errors.loaiGiamGia && (
            <p className="text-red-500 ml-[25%]">{errors.loaiGiamGia}</p>
          )}
        </div>

        {/* Dịp lễ */}
        {formData.loaiGiamGia === "Dịp lễ" && (
          <div className="flex flex-col">
            <div className="flex items-center">
              <label className="w-1/4 font-semibold">
                Dịp lễ:<span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="dipLe"
                value={formData.dipLe}
                onChange={handleChange}
                className="w-3/4 border border-gray-300 p-2 rounded"
              >
                <option value="">-- Chọn dịp lễ --</option>
                {occasions.map((occasion) => (
                  <option key={occasion} value={occasion}>
                    {occasion}
                  </option>
                ))}
              </select>
            </div>
            {errors.dipLe && (
              <p className="text-red-500 ml-[25%]">{errors.dipLe}</p>
            )}
          </div>
        )}

        {/* Mã giảm giá */}
        <div className="flex flex-col">
          <div className="flex items-center">
            <label className="w-1/4 font-semibold">
              Mã giảm giá:<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              name="maGiamGia"
              value={formData.maGiamGia}
              onChange={handleChange}
              type="text"
              className="w-3/4 border border-gray-300 p-2 rounded"
              placeholder="Nhập mã giảm giá (chữ cái, số, tối đa 50 ký tự)"
            />
          </div>
          {errors.maGiamGia && (
            <p className="text-red-500 ml-[25%]">{errors.maGiamGia}</p>
          )}
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
              readOnly={["Dịp lễ", "Theo số lượng", "Theo hóa đơn"].includes(
                formData.loaiGiamGia
              )}
            />
          </div>
          {errors.moTa && (
            <p className="text-red-500 ml-[25%]">{errors.moTa}</p>
          )}
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
              readOnly={["Dịp lễ", "Theo số lượng", "Theo hóa đơn"].includes(
                formData.loaiGiamGia
              )}
            />
          </div>
          {errors.giaTriGiam && (
            <p className="text-red-500 ml-[25%]">{errors.giaTriGiam}</p>
          )}
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
          {errors.ngayBatDau && (
            <p className="text-red-500 ml-[25%]">{errors.ngayBatDau}</p>
          )}
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
          {errors.ngayKetThuc && (
            <p className="text-red-500 ml-[25%]">{errors.ngayKetThuc}</p>
          )}
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
          {errors.soLuong && (
            <p className="text-red-500 ml-[25%]">{errors.soLuong}</p>
          )}
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
            onClick={() => navigate("/admin/giam-gia")}
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
