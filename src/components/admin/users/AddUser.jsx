import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const initial = { name: '', email: '', password: '', phone: '', address: '', role: 'user' };

const AddUser = () => {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateName = (value) => {
    if (!value.trim())
      return 'Tên người dùng không được bỏ trống';
    else if (!/^.{2,50}$/.test(value.trim()))
      return 'Tên phải có 2-50 ký tự';
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

  const validatePassword = (value) => {
    if (!value)
      return 'Mật khẩu không được bỏ trống';
    return '';
  };

  const validatePhone = (value) => {
    if (!value.trim())
      return 'Số điện thoại không được bỏ trống';
    else if (!/^0\d{1,9}$/.test(value))
      return 'Số điện thoại phải bắt đầu bằng 0 và tối đa 10 chữ số';
    return '';
  };

  const validateAddress = (value) => {
    if (!value.trim())
      return 'Địa chỉ không được bỏ trống';
    else if (!/^.{15,150}$/.test(value.trim()))
      return 'Địa chỉ phải có 15-150 ký tự';
    return '';
  };

  const validateField = (name, value) => {
    let err = '';
    switch (name) {
      case 'name':
        return validateName(value);
      case 'email':
        return validateEmail(value);
      case 'password':
        return validatePassword(value);
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
    setForm(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = ['name','email','password','phone','address'];
    let ok = true;
    fields.forEach(f => { if(!validateField(f, form[f])) ok = false; });
    if (!ok) return;

    // simulate API call
    setTimeout(() => {
      toast.success('Thêm người dùng thành công!');
      navigate('/admin/nguoi-dung', { state: { message: 'Thêm người dùng thành công!' } });
    }, 600);
  };

  return (
    <div className="bg-white">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-black">Thêm người dùng</h2>
      <form className="mx-20 space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div className="flex items-center">
            <label className="w-1/4 font-semibold">Tên người dùng:<span className="text-red-500 ml-1">*</span></label>
            <input name="name" value={form.name} onChange={handleChange} className="w-3/4 border border-gray-300 p-2 rounded" />
          </div>
          {errors.name && <p className="text-red-500 ml-[25%]">{errors.name}</p>}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center">
            <label className="w-1/4 font-semibold">Email:<span className="text-red-500 ml-1">*</span></label>
            <input name="email" value={form.email} onChange={handleChange} className="w-3/4 border border-gray-300 p-2 rounded" />
          </div>
          {errors.email && <p className="text-red-500 ml-[25%]">{errors.email}</p>}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center">
            <label className="w-1/4 font-semibold">Mật khẩu:<span className="text-red-500 ml-1">*</span></label>
            <input name="password" type="password" value={form.password} onChange={handleChange} className="w-3/4 border border-gray-300 p-2 rounded" />
          </div>
          {errors.password && <p className="text-red-500 ml-[25%]">{errors.password}</p>}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center">
            <label className="w-1/4 font-semibold">Số điện thoại:<span className="text-red-500 ml-1">*</span></label>
            <input name="phone" value={form.phone} onChange={handleChange} className="w-3/4 border border-gray-300 p-2 rounded" placeholder="0xxxxxxxxx" />
          </div>
          {errors.phone && <p className="text-red-500 ml-[25%]">{errors.phone}</p>}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center">
            <label className="w-1/4 font-semibold">Địa chỉ:<span className="text-red-500 ml-1">*</span></label>
            <input name="address" value={form.address} onChange={handleChange} className="w-3/4 border border-gray-300 p-2 rounded" />
          </div>
          {errors.address && <p className="text-red-500 ml-[25%]">{errors.address}</p>}
        </div>

        <div className="flex items-center">
          <label className="w-1/4 font-semibold">Role:</label>
          <select name="role" value={form.role} onChange={handleChange} className="w-3/4 border border-gray-300 p-2 rounded">
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>

        <div className="flex space-x-2 pt-10">
          <button type="submit" className="w-22 h-10 font-bold bg-blue-500 hover:opacity-70 text-white rounded transition-all ease-out duration-150">Thêm</button>
          <button type="button" onClick={() => navigate('/admin/nguoi-dung')} className="w-22 h-10 font-bold border hover:border-red-500 hover:text-red-500 text-black rounded">Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
