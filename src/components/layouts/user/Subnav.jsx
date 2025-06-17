import React from "react";
import { Link } from "react-router-dom";
const Subnav = () => {
  return (
    <div className="bg-[#192F59] text-white text-lg font-medium">
      <div className="flex items-center justify-between max-w-screen-lg mx-auto">
        <Link to="/" className="px-8 py-3 hover:bg-[#114388] transition cursor-pointer uppercase">
          Trang chủ
        </Link>

        <div className="group relative px-8 py-3 hover:bg-[#114388] transition cursor-pointer">
          <p className="text-left uppercase">Danh mục</p>

          <div className="hidden group-hover:block absolute top-full left-0 bg-white text-gray-800 shadow-lg rounded w-40 z-10">
            <div className="flex flex-col text-sm">
              <p className="cursor-pointer px-4 py-2 hover:bg-[#114388] hover:text-white w-full">
                Trinh thám
              </p>
              <p className="cursor-pointer px-4 py-2 hover:bg-[#114388] hover:text-white w-full">
                Light Novel
              </p>
              <p className="cursor-pointer px-4 py-2 hover:bg-[#114388] hover:text-white w-full">
                Manga
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 py-3 hover:bg-[#114388] transition cursor-pointer uppercase">
          Về 4TQ
        </div>

        <div className="px-8 py-3 hover:bg-[#114388] transition cursor-pointer uppercase">
          Liên hệ
        </div>
      </div>
    </div>
  );
};

export default Subnav;
