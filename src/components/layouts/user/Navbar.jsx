import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-10 font-medium">
      <div className="w-[500px]">
        <Link to="/">
          <img src="/assets/user/logo.png" className="w-32" alt="Logo" />
        </Link>
      </div>

      <div className="flex items-center border border-[#192F59] rounded-full w-[500px] overflow-hidden h-10">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="px-4 w-full h-full outline-none text-sm"
        />
        <button className="bg-[#192F59] h-full px-4 flex items-center justify-center">
          <img src="/assets/user/search.png" alt="Search" className="w-4" />
        </button>
      </div>

      <div className="flex items-center gap-6 text-center text-sm text-[#192F59] w-[500px] justify-end">
        <div className="flex flex-col items-center">
          <img src="/assets/user/notify.png" className="w-8 cursor-pointer" alt="Notifications" />
          <span>Thông báo</span>
        </div>

        <Link to="/cart" className="flex flex-col items-center">
          <div className="relative">
            <img src="/assets/user/cart.png" className="w-8 cursor-pointer" alt="Cart" />
            <span className="absolute -top-1 right-[-6px] bg-red-600 text-white text-[10px] w-[16px] h-[16px] rounded-full flex items-center justify-center leading-none">
              5
            </span>
          </div>
          <span>Giỏ hàng</span>
        </Link>

        <div className="flex flex-col items-center">
          <img src="/assets/user/account.png" className="w-8 cursor-pointer" alt="Account" />
          <span>Tài khoản</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;