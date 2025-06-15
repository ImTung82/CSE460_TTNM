import React from "react";

const Subnav = () => {
  return (
    <div className="bg-[#192F59] text-white text-sm font-medium">
      <div className="flex items-center justify-between max-w-screen-lg mx-auto">
        {/* Trang chủ */}
        <div className="px-8 py-3 hover:bg-[#888888] transition cursor-pointer">
          Trang chủ
        </div>

        {/* Danh mục có dropdown */}
        <div className="group relative px-8 py-3 hover:bg-[#888888] transition cursor-pointer">
          <p className="text-left">Danh mục</p>

          {/* Dropdown */}
          <div className="hidden group-hover:block absolute top-full left-0 mt-1 bg-white text-gray-800 shadow-lg rounded w-40 z-10">
            <div className="flex flex-col text-sm">
              <p className="cursor-pointer px-4 py-2 hover:bg-[#888888] hover:text-white w-full">
                Trinh thám
              </p>
              <p className="cursor-pointer px-4 py-2 hover:bg-[#888888] hover:text-white w-full">
                Light Novel
              </p>
              <p className="cursor-pointer px-4 py-2 hover:bg-[#888888] hover:text-white w-full">
                Manga
              </p>
            </div>
          </div>
        </div>

        {/* Về 4TQ */}
        <div className="px-8 py-3 hover:bg-[#888888] transition cursor-pointer">
          Về 4TQ
        </div>

        {/* Liên hệ */}
        <div className="px-8 py-3 hover:bg-[#888888] transition cursor-pointer">
          Liên hệ
        </div>
      </div>
    </div>
  );
};

export default Subnav;
