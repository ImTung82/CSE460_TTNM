import React from "react";

const RightContent = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Thám Tử Lừng Danh Tizen - 69
          </h1>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <p className="text-gray-700">Tác giả: Gosho Aoyama</p>
              <p className="text-gray-700">Hình thức bìa: Bìa Mềm</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">Nhà xuất bản: Kim Đồng</p>
              <p className="text-gray-700">Năm xuất bản: 2025</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 mb-2">
            <span className="text-3xl font-bold text-red-600">24.000đ</span>
            <span className="inline-block bg-red-600 text-white text-sm font-semibold px-2 py-1 rounded">
              -20%
            </span>
          </div>

          <div className="text-lg text-gray-400 line-through">30.000đ</div>
        </div>

        <div>
          <h2 className="text-2xl mb-2 mb-4 font-bold">Thông tin chi tiết</h2>
          <div className="bg-gray-50 rounded-lg p-2 text-700 max-w-[850px]">
            <div className="grid grid-cols-1 gap-5">
              {[
                ["Tác giả :", "Gosho Aoyama"],
                ["Người Dịch :", "Hoàng Giang"],
                ["Tên nhà sản xuất :", "Kim Đồng"],
                ["Năm xuất bản :", "2025"],
                ["Hình thức :", "Bìa Mềm"],
                ["Ngôn Ngữ :", "Tiếng Việt"],
                ["Trọng lượng (gr) :", "145"],
                ["Kích Thước, Cao Rộng :", "17.5 x 11.3 x 0.9 cm"],
                ["Số trang :", "165"],
                ["Thể loại :", "Trinh thám"],
              ].map(([label, value], index, arr) => (
                <div
                  key={index}
                  className={`flex items-start py-1 ${
                    index < arr.length - 1 ? "border-b border-gray-200" : ""
                  }`}
                >
                  <span className="text-gray-600 min-w-[460px]">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Mô tả sách</h2>
          <div className="prose prose-sm text-gray-700 gap-4">
            <p className="max-w-[850px]">
              Kudo Shinichi là một thám tử trẻ nổi tiếng với tài năng suy luận
              xuất sắc. Trong một lần theo dõi các thành viên của tổ chức áo đen
              bí ẩn, cậu bị phát hiện và bị ép uống một loại thuốc độc lạ. Tuy
              nhiên, thay vì chết, cơ thể cậu bị teo nhỏ thành hình dạng của một
              đứa trẻ 7 tuổi. Để che giấu danh tính thật và tiếp tục truy tìm tổ
              chức áo đen, cậu đã lấy tên là Edogawa Conan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightContent;
