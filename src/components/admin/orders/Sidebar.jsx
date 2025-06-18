import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-[350px] h-screen bg-black text-white">
      <div className="flex flex-col justify-between h-full p-5">
        <div>
          <div className="text-2xl text-center font-bold mb-8">
            <Link to="/admin">4TQ</Link>
          </div>

          <div>
            <Link
              to="/admin/san-pham"
              className="block px-4 py-4 rounded-3xl text-white transition-all hover:text-[#E65F2B] hover:bg-white hover:ml-4 font-normal hover:font-bold"
            >
              Quản lý đầu sách
            </Link>
            <Link
              to="/admin/don-hang"
              className="block px-4 py-4 rounded-3xl text-white transition-all hover:text-[#E65F2B] hover:bg-white hover:ml-4 font-normal hover:font-bold"
            >
              Quản lý đơn hàng
            </Link>
            <Link
              to=""
              className="block px-4 py-4 rounded-3xl text-white transition-all hover:text-[#E65F2B] hover:bg-white hover:ml-4 font-normal hover:font-bold"
            >
              Quản lý mã giảm giá
            </Link>
            <Link
              to=""
              className="block px-4 py-4 rounded-3xl text-white transition-all hover:text-[#E65F2B] hover:bg-white hover:ml-4 font-normal hover:font-bold"
            >
              Quản lý thông báo người dùng
            </Link>
            <Link
              to=""
              className="block px-4 py-4 rounded-3xl text-white transition-all hover:text-[#E65F2B] hover:bg-white hover:ml-4 font-normal hover:font-bold"
            >
              Quản lý PT thanh toán
            </Link>
            <Link
              to=""
              className="block px-4 py-4 rounded-3xl text-white transition-all hover:text-[#E65F2B] hover:bg-white hover:ml-4 font-normal hover:font-bold"
            >
              Quản lý PT vận chuyển
            </Link>
            <Link
              to=""
              className="block px-4 py-4 rounded-3xl text-white transition-all hover:text-[#E65F2B] hover:bg-white hover:ml-4 font-normal hover:font-bold"
            >
              Quản lý danh mục
            </Link>
            <Link
              to=""
              className="block px-4 py-4 rounded-3xl text-white transition-all hover:text-[#E65F2B] hover:bg-white hover:ml-4 font-normal hover:font-bold"
            >
              Thống kê doanh thu
            </Link>
          </div>
        </div>

        <div>
          <Link
            to="/"
            className="block px-4 py-4 rounded-3xl text-white transition-all hover:text-[#E65F2B] hover:bg-white hover:ml-4 font-normal hover:font-bold"
          >
            → Trở về trang chủ
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
