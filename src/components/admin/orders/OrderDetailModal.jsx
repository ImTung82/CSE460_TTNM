import React from "react";

const OrderDetailModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const order = {
    id: "4TQ00001",
    name: "Nguyễn Văn A",
    phone: "0901234567",
    address: "123 Đường ABC, Quận 1, TP. HCM",
    paymentMethod: "Thanh toán khi nhận hàng",
    shippingMethod: "Giao hàng tiêu chuẩn",
    subtotal: "110.000đ",
    shippingFee: "10.000đ",
    discount: "0đ",
    total: "120.000đ",
    products: [
      { name: "Thám tử Lừng danh Tizen", quantity: 2 },
      { name: "Hà Nội Xưa", quantity: 1 },
    ],
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg max-w-5xl w-full p-6 relative border border-gray-300">
        <h2 className="text-2xl font-bold text-center mb-6">
          Chi tiết đơn hàng
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {/* Cột trái */}
          <div className="space-y-4">
            <div className="border border-gray-200 rounded h-[85px] p-4 flex justify-between items-start">
              <div>
                <p>
                  <strong>Đơn hàng:</strong>{" "}
                  <span className="text-blue-600">{order.id}</span>
                </p>
                <p className="text-gray-400 text-sm">
                  Ngày đặt hàng: 01/06/2025
                </p>
              </div>
              <span className="text-white bg-[#01FF16] text-sm px-3 py-1 rounded">
                Thành công
              </span>
            </div>

            <div className="border border-gray-200 rounded p-4 h-[85px] flex items-center">
              <div className="flex gap-6">
                {/* Cột trái: Nhãn */}
                <div className="space-y-2 w-[170px] text-gray-600">
                  <p className="font-bold mb-2">Thông tin khách hàng:</p>
                </div>

                {/* Cột phải: Giá trị từ đơn hàng */}
                <div className="space-y-2">
                  <p>{order.name}</p>
                  <p>{order.phone}</p>
                  <p>{order.address}</p>
                </div>
              </div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="border border-gray-200 rounded h-[240px] p-4">
              <p className="font-bold mb-2">Danh sách sản phẩm</p>
              <table className="w-full text-left border-t border-gray-200">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">Tên sản phẩm</th>
                    <th className="px-4 py-2">Số Lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cột phải */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <div className="border border-gray-200 rounded h-[85px] p-0 overflow-hidden">
                {/* Phần tiêu đề được tô màu xám nhạt */}
                <div className="bg-gray-200 px-4 py-2">
                  <p className="font-semibold">Phương thức thanh toán</p>
                </div>
                <div className="px-4 py-2 bg-gray-50">
                  <p>{order.paymentMethod}</p>
                </div>
              </div>

              <div className="border border-gray-200 rounded h-[85px] p-0 overflow-hidden">
                <div className="bg-gray-200 px-4 py-2">
                  <p className="font-semibold">Phương thức vận chuyển</p>
                </div>
                <div className="px-4 py-2 bg-gray-50">
                  <p>{order.shippingMethod}</p>
                </div>
              </div>

              <div className="border border-gray-200 rounded">
                <div className="p-4 space-y-2">
                  <p className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{order.subtotal}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>{order.shippingFee}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Mã giảm giá:</span>
                    <span>{order.discount}</span>
                  </p>
                </div>

                {/* Nét kẻ full chiều ngang chia cách */}
                <div className="border-t border-gray-300 my-2" />

                <div className="p-3">
                  <p className="flex justify-between font-bold text-[#FF0000] text-lg">
                    <span>Tổng tiền:</span>
                    <span>{order.total}</span>
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-3 bg-[#192F59] text-white text-lg font-bold py-2 rounded hover:bg-[#16324f]"
            >
              TRỞ LẠI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
