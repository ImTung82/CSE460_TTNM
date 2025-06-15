import React, { useState } from "react";
import SectionTitle from "../../layouts/SectionTitle";

const PlaceOrder = () => {
  const [showModal, setShowModal] = useState(false);

  const handleChangeAddress = (e) => {
    if (e.target.value === "other") {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white relative">
      <div className="border border-[#cccccc]/80 rounded-lg p-4 bg-white shadow-md">
        <SectionTitle title="Địa chỉ giao hàng" />
        <div className="space-y-2 text-sm text-gray-700">
          <label className="block">
            <input
              type="radio"
              name="address"
              className="mr-2"
              value="default"
              defaultChecked
            />
            Lê Doãn Tú | Số nhà 390, Kim Mã, Ba Đình, Hà Nội | 0987789244
          </label>
          <label className="block">
            <input
              type="radio"
              name="address"
              className="mr-2"
              value="other"
              onChange={handleChangeAddress}
            />
            Giao đến địa chỉ khác
          </label>
        </div>
      </div>

      <div className="border border-[#cccccc]/80 rounded-lg p-4 bg-white shadow-md">
        <SectionTitle title="Phương thức vận chuyển" />
        <div className="space-y-2 text-sm text-gray-700">
          <label className="block">
            <input
              type="radio"
              name="shipping"
              className="mr-2"
              defaultChecked
            />
            Giao hàng tiêu chuẩn
          </label>
          <label className="block">
            <input type="radio" name="shipping" className="mr-2" />
            Giao nhanh
          </label>
          <label className="block">
            <input type="radio" name="shipping" className="mr-2" />
            Nhận tại cửa hàng: 108 Giảng Võ, Ba Đình, Hà Nội
          </label>
        </div>
      </div>

      <div className="border border-[#cccccc]/80 rounded-lg p-4 bg-white shadow-md">
        <SectionTitle title="Phương thức thanh toán" />
        <div className="space-y-2 text-sm text-gray-700">
          <label className="block">
            <input
              type="radio"
              name="payment"
              className="mr-2"
              defaultChecked
            />
            Thanh toán khi nhận hàng
          </label>
          <label className="block">
            <input type="radio" name="payment" className="mr-2" /> VNPay
          </label>
          <label className="block">
            <input type="radio" name="payment" className="mr-2" /> ZaloPay
          </label>
          <label className="block">
            <input type="radio" name="payment" className="mr-2" /> Momo
          </label>
          <label className="block">
            <input type="radio" name="payment" className="mr-2" /> Thẻ tín
            dụng/Ghi nợ
          </label>
        </div>
      </div>

      <div className="border border-[#cccccc]/80 rounded-lg p-4 bg-white shadow-md">
        <SectionTitle title="Mã quà tặng/khuyến mãi" />
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Nhập mã khuyến mãi"
            className="flex-1 border border-[#cccccc] px-4 py-2 rounded text-sm"
          />
          <button className="px-4 py-2 bg-[#192F59] text-white rounded text-sm cursor-pointer">
            Áp dụng
          </button>
        </div>
        <a href="" className="text-sm text-blue-500 mt-2 ">
          Chọn mã khuyến mãi
        </a>
      </div>

      <div className="mb-38 border border-[#cccccc]/80 rounded-lg p-4 bg-white shadow-md">
        <SectionTitle title="Kiểm tra lại đơn hàng" />
        <div className="flex gap-4">
          <img
            src="/book.png"
            alt="book"
            className="w-20 h-28 object-cover border rounded"
          />
          <div className="flex-1 grid grid-cols-4 gap-2">
            <p className="col-span-2 text-sm font-medium self-start">
              Thám Tử Lừng Danh Conan - Tập 43 (Tái Bản 2023)
            </p>
            <div className="flex flex-col justify-center">
              <p className="font-semibold text-black text-sm">24.000đ</p>
              <p className="text-gray-500 line-through text-xs">30.000đ</p>
            </div>
            <div className="flex items-center justify-end text-sm font-medium text-red-600">
              48.000 đ
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-2px_6px_rgba(0,0,0,0.1)] px-6 py-4 border-t border-[#cccccc]">
        <div className="max-w-4xl mx-auto flex flex-col items-end space-y-3">
          <div className="space-y-1 text-sm w-[250px]">
            <div className="flex justify-between">
              <p className="text-gray-700">Thành tiền:</p>
              <p className="font-medium text-black">48.000 đ</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Phí vận chuyển:</p>
              <p className="font-medium text-black">20.000 đ</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Tổng tiền:</p>
              <p className="font-semibold text-red-600">68.000 đ</p>
            </div>
          </div>
          <button className="px-6 py-2 bg-[#192F59] text-white rounded text-sm">
            Xác nhận
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/75">
          <div className="bg-white w-full max-w-3xl rounded-md shadow-xl p-6">
            <h2 className="text-lg font-bold mb-6 text-center">
              Thay đổi địa chỉ giao hàng
            </h2>
            <form className="space-y-4 text-sm">
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="col-span-1">Họ và tên người nhận:</label>
                <input
                  type="text"
                  className="col-span-2 border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="col-span-1">Số điện thoại:</label>
                <input
                  type="text"
                  className="col-span-2 border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="col-span-1">Quốc gia:</label>
                <select className="col-span-2 border border-gray-300 rounded px-3 py-2 w-full">
                  <option>Việt Nam</option>
                  <option>Hoa Kỳ</option>
                  <option>Nhật Bản</option>
                  <option>Hàn Quốc</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="col-span-1">Tỉnh/Thành phố:</label>
                <select className="col-span-2 border border-gray-300 rounded px-3 py-2 w-full">
                  <option>Hà Nội</option>
                  <option>TP. Hồ Chí Minh</option>
                  <option>Đà Nẵng</option>
                  <option>Hải Phòng</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="col-span-1">Quận/Huyện:</label>
                <select className="col-span-2 border border-gray-300 rounded px-3 py-2 w-full">
                  <option>Ba Đình</option>
                  <option>Cầu Giấy</option>
                  <option>Thanh Xuân</option>
                  <option>Hoàng Mai</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="col-span-1">Phường/Xã:</label>
                <select className="col-span-2 border border-gray-300 rounded px-3 py-2 w-full">
                  <option>Kim Mã</option>
                  <option>Dịch Vọng</option>
                  <option>Nguyễn Trãi</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="col-span-1">Địa chỉ nhận hàng:</label>
                <input
                  type="text"
                  className="col-span-2 border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={closeModal}
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#192F59] text-white rounded"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;