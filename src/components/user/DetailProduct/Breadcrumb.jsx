import React from "react";

const Breadcrumb = () => {
  return (
    <nav className="container mx-auto mt-7 px-4 py-3 text-lg text-gray-600">
      <div className="flex items-center space-x-2">
        <a href="/" className="hover:text-blue-600">
          Trang chủ
        </a>
        <span className="text-gray-900">›</span>
        <a href="#" className="hover:text-blue-600">
          Trinh thám
        </a>
        <span className="text-gray-900">›</span>
        <span className="text-gray-400">Thám Tử Lừng Danh Tizen - 69</span>
      </div>
    </nav>
  );
};

export default Breadcrumb;
