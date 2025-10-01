import React from "react";

const BookDetailModal = ({ book, onClose }) => {
  if (!book) return null;

  const giaGoc = parseFloat(book.giaGoc) || 0;
  const khuyenMai = parseFloat(book.khuyenMai) || 0;
  const giaBan = giaGoc * (1 - khuyenMai / 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full px-10 py-5 relative border border-gray-300">
        <h2 className="text-center text-2xl font-bold mb-10 text-black">
          Chi tiết đầu sách
        </h2>

        <div className="flex flex-row gap-10">
          {/* Hình ảnh */}
          <div>
            <img
              src="/assets/admin/sach.webp"
              alt={book.tenSach}
              className="w-64 h-80 shadow-md rounded"
            />
          </div>

          {/* Thông tin sách */}
          <div className="space-y-3 text-sm text-black">
            <h3 className="text-lg font-bold">{book.name}</h3>
            <div className="flex flex-row gap-40">
              <div className="space-y-3">
                <p><strong>Tác giả:</strong> {book.author}</p>
                <p><strong>Nhà xuất bản:</strong> {book.tenNhaXuatBan}</p>
              </div>
              <div className="space-y-3">
                <p><strong>Người dịch:</strong> {book.nguoiDich}</p>
                <p><strong>Năm xuất bản:</strong> {book.namXuatBan}</p>
              </div>
            </div>
            <p><strong>Ngôn ngữ:</strong> {book.ngonNgu}</p>
            <p><strong>Trọng lượng:</strong> {book.trongLuong}gr</p>
            <p><strong>Kích thước bao bì:</strong> {book.kichThuocBaoBi}cm</p>
            <p><strong>Số trang:</strong> {book.soTrang}</p>
            <p><strong>Thể loại:</strong> {book.theLoai?.join(", ")}</p>
          </div>
        </div>

        {/* Mô tả */}
        <div className="mt-6">
          <h3 className="font-bold text-black text-2xl mb-1">MÔ TẢ TỔNG QUAN VỀ SÁCH:</h3>
          <p className="text-justify text-sm text-gray-800">{book.moTa}</p>
        </div>

        <div className="flex items-end justify-between">
          {/* Giá bán */}
          <div className="mt-6 text-sm space-y-2">
            <h3 className="font-bold text-black text-2xl mb-1">GIÁ BÁN:</h3>
            <p><span className="font-semibold">Giá gốc:</span> {giaGoc.toLocaleString("vi-VN")}đ</p>
            <p><span className="font-semibold">Khuyến mãi:</span> <span className="text-blue-500">{khuyenMai}%</span></p>
            <p><span className="font-semibold">Giá bán sau khuyến mãi:</span> <span className="text-red-500">{giaBan.toLocaleString("vi-VN")}đ</span></p>
          </div>

          {/* Nút */}
          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="bg-[#0d1f4a] hover:opacity-80 text-white font-bold py-2 px-35 rounded cursor-pointer transition-all ease-out duration-150"
            >
              TRỞ LẠI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;
