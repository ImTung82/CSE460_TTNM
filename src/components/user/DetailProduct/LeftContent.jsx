import React from "react";
import { Link } from "react-router-dom";
export default function LeftContent() {
  return (
    <div>
      <div className="bg-white p-6">
        {/* Book cover image */}
        <div className="mb-6">
          <img
            src="/assets/user/book2.png"
            alt="Thám Tử Lừng Danh Tizen - 69"
            width={300}
            height={400}
            className="w-full px-16"
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-5">
          <button
            type="button"
            className="flex-1 border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
          >
            <img
              src="/assets/user/cart_icon.png"
              alt="Cart Icon"
              className="w-4 h-4 mr-2"
            />
            Thêm vào giỏ hàng
          </button>

          <Link
            to="/dat-hang"
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center"
          >
            Mua ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
