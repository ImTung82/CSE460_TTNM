import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function EditUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: 'Nguyễn Văn A',
    email: 'a@example.com',
    phone: '0912345678',
    address: 'Hà Nội',
    role: 'user'
  });

  const [errors, setErrors] = useState({});

  const validateName = (value) => {
    if (!value.trim())
      return 'Tên người dùng không được bỏ trống';
    else if (!/^.{1,50}$/.test(value.trim()))
      return 'Tên người dùng không vượt quá 50 ký tự';
    return '';
  };

  const validateEmail = (value) => {
    if (!value.trim())
      return 'Email không được bỏ trống';
    else if (value.length > 150)
      return 'Email không được vượt quá 150 ký tự';
    else if (!/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(value))
      return 'Email không hợp lệ';
    return '';
  };

  const validatePhone = (value) => {
    if (!value.trim())
      return 'Số điện thoại không được bỏ trống';
    else if (!/^0\d{9}$/.test(value))
      return 'Số điện thoại phải bắt đầu bằng 0 và tối đa 10 chữ số';
    return '';
  };

  const validateAddress = (value) => {
    if (!value.trim())
      return 'Địa chỉ không được bỏ trống';
    else if (!/^.{1,150}$/.test(value.trim()))
      return 'Địa chỉ không vượt quá 150 ký tự';
    return '';
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return validateName(value);
      case 'email':
        return validateEmail(value);
      case 'phone':
        return validatePhone(value);
      case 'address':
        return validateAddress(value);
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'role') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    setTimeout(() => {
      toast.success('Sửa người dùng thành công!');
      navigate('/admin/nguoi-dung', {
        state: { message: 'Sửa người dùng thành công!' }
      });
    }, 600);
  };

  return (
    <div className="bg-white">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-black">Sửa người dùng</h2>
      <form className="mx-20 space-y-4" onSubmit={handleSubmit}>
        {/* Name field */}
        <div className="flex flex-col">
          <div className="flex items-center">
            <label className="w-1/4 font-semibold">Tên người dùng:<span className="text-red-500 ml-1">*</span></label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-3/4 border border-gray-300 p-2 rounded"
              placeholder="Nhập tên người dùng"
            />
          </div>
          {errors.name && <p className="text-red-500 ml-[25%]">{errors.name}</p>}
        </div>

        {/* Email field */}
        <div className="flex flex-col">
          <div className="flex items-center">
            <label className="w-1/4 font-semibold">Email:<span className="text-red-500 ml-1">*</span></label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-3/4 border border-gray-300 p-2 rounded"
              placeholder="Nhập email"
            />
          </div>
          {errors.email && <p className="text-red-500 ml-[25%]">{errors.email}</p>}
        </div>

        {/* Phone field */}
        <div className="flex flex-col">
          <div className="flex items-center">
            <label className="w-1/4 font-semibold">Số điện thoại:<span className="text-red-500 ml-1">*</span></label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-3/4 border border-gray-300 p-2 rounded"
              placeholder="Nhập số điện thoại"
            />
          </div>
          {errors.phone && <p className="text-red-500 ml-[25%]">{errors.phone}</p>}
        </div>

        {/* Address field */}
        <div className="flex flex-col">
          <div className="flex items-center">
            <label className="w-1/4 font-semibold">Địa chỉ:<span className="text-red-500 ml-1">*</span></label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-3/4 border border-gray-300 p-2 rounded"
              placeholder="Nhập địa chỉ"
            />
          </div>
          {errors.address && <p className="text-red-500 ml-[25%]">{errors.address}</p>}
        </div>

        {/* Role field */}
        <div className="flex items-center">
          <label className="w-1/4 font-semibold">Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-3/4 border border-gray-300 p-2 rounded"
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>

        <div className="flex space-x-2 pt-10">
          <button
            type="submit"
            className="w-22 h-10 font-bold bg-yellow-500 hover:opacity-70 text-white rounded transition-all ease-out duration-150"
          >
            Sửa
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/nguoi-dung')}
            className="w-22 h-10 font-bold border hover:border-red-500 hover:text-red-500 text-black rounded transition-all ease-out duration-150"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
