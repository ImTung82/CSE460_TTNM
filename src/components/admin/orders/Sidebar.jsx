import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-[300px] h-[950px] bg-black text-white p-5">
      <div className="text-2xl text-center font-bold mb-8"><Link
          to="/admin"
          
        >
          4TQ
        </Link></div>
      <nav className="space-y-3">
        <Link
          to="/admin/san-pham"
          className="block px-4 py-2 rounded-3xl text-white transition-all hover:text-red-600 hover:bg-white hover:ml-4 font-normal hover:font-bold"
        >
          Quản lý đầu sách
        </Link>
        <Link
          to="/admin/don-hang"
          className="block px-4 py-2 rounded-3xl text-white transition-all hover:text-red-600 hover:bg-white hover:ml-4 font-normal hover:font-bold"
        >
          Quản lý đơn hàng
        </Link>
        <Link
          to=""
          className="block px-4 py-2 rounded-3xl text-white transition-all hover:text-red-600 hover:bg-white hover:ml-4 font-normal hover:font-bold"
        >
          Quản lý mã giảm giá
        </Link>
        <Link
          to=""
          className="block px-4 py-2 rounded-3xl text-white transition-all hover:text-red-600 hover:bg-white hover:ml-4 font-normal hover:font-bold"
        >
          Quản lý thông báo người dùng
        </Link>
        <Link
          to=""
          className="block px-4 py-2 rounded-3xl text-white transition-all hover:text-red-600 hover:bg-white hover:ml-4 font-normal hover:font-bold"
        >
          Quản lý PT thanh toán
        </Link>
        <Link
          to=""
          className="block px-4 py-2 rounded-3xl text-white transition-all hover:text-red-600 hover:bg-white hover:ml-4 font-normal hover:font-bold"
        >
          Quản lý PT vận chuyển
        </Link>
        <Link
          to=""
          className="block px-4 py-2 rounded-3xl text-white transition-all hover:text-red-600 hover:bg-white hover:ml-4 font-normal hover:font-bold"
        >
          Quản lý danh mục
        </Link>
        <Link
          to=""
          className="block px-4 py-2 rounded-3xl text-white transition-all hover:text-red-600 hover:bg-white hover:ml-4 font-normal hover:font-bold"
        >
          Thống kê doanh thu
        </Link>
        <Link
          to=""
          className="block px-4 py-2 rounded-3xl text-white transition-all hover:text-red-600 hover:bg-white hover:ml-4 font-normal hover:font-bold"
        >
          → Trở về trang chủ
        </Link>

      </nav>
    </aside>
  );
};

export default Sidebar;

