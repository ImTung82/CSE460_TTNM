import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/ten-sach?keyword=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="flex items-center justify-between px-10 py-2 font-medium h-[80px] mx-55">
      <div className="w-[400px]">
        <Link to="/">
          <img src="/assets/user/logo_2.png" className="w-32" alt="Logo" />
        </Link>
      </div>

      <form
        className="flex items-center border border-[#192F59] rounded-full w-[700px] overflow-hidden h-10"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="px-4 w-full h-full outline-none text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#192F59] h-full px-4 flex items-center justify-center"
        >
          <img src="/assets/user/search.png" alt="Search" className="w-4" />
        </button>
      </form>

      <div className="flex items-center gap-10 text-center text-sm text-[#192F59] w-[500px] justify-end">
        <div className="flex flex-col items-center">
          <img
            src="/assets/user/notify.png"
            className="w-8 cursor-pointer"
            alt="Notifications"
          />
          <span className="text-[12px]">Thông báo</span>
        </div>

        <Link to="/gio-hang" className="flex flex-col items-center">
          <div className="relative">
            <img
              src="/assets/user/cart.png"
              className="w-8 cursor-pointer"
              alt="Cart"
            />
            <span className="absolute -top-1 right-[-6px] bg-red-600 text-white text-[10px] w-[16px] h-[16px] rounded-full flex items-center justify-center leading-none">
              5
            </span>
          </div>
          <span className="text-[12px]">Giỏ hàng</span>
        </Link>

        <div className="group relative flex flex-col items-center transition-all ease-out duration-300">
          <img
            src="/assets/user/account.png"
            className="w-8 cursor-pointer"
            alt="Account"
          />
          <span className="text-[12px]">Tài khoản</span>
          <div className="absolute top-full right-0 w-40 bg-white rounded shadow-lg flex-col hidden group-hover:flex z-20 transition-all ease-out duration-300">
            <Link
              to="/dang-nhap"
              className="px-4 py-3 text-left hover:bg-gray-100 text-sm"
            >
              Đăng nhập
            </Link>
            <div className="border"></div>
            <button className="px-4 py-3 text-left hover:bg-gray-100 text-sm">
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
