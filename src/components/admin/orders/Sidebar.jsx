import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getLinkClass = (path) => {
    const isActive =
      path === "/"
        ? currentPath === "/"
        : currentPath.startsWith(path);

    return `block px-4 py-4 rounded-3xl transition-all ${isActive
        ? "text-[#E65F2B] bg-white ml-4 font-bold"
        : "text-white hover:text-[#E65F2B] hover:bg-white hover:ml-4 hover:font-bold"
      }`;
  };

  return (
    <aside className="w-[350px] h-screen bg-black text-white">
      <div className="flex flex-col justify-between h-full p-5">
        <div>
          <div className="text-2xl text-center font-bold mb-8">
            <Link to="/admin">4TQ</Link>
          </div>

          <div className="space-y-2">
            <Link to="/admin/san-pham" className={getLinkClass("/admin/san-pham")}>
              Quản lý đầu sách
            </Link>
            <Link to="/admin/don-hang" className={getLinkClass("/admin/don-hang")}>
              Quản lý đơn hàng
            </Link>
            <Link to="/admin/nguoi-dung" className={getLinkClass("/admin/nguoi-dung")}>
              Quản lý người dùng
            </Link>
            <Link to="" className={getLinkClass("/admin/ma-giam-gia")}>
              Quản lý mã giảm giá
            </Link>
            <Link to="" className={getLinkClass("/admin/thong-bao")}>
              Quản lý thông báo người dùng
            </Link>
            <Link to="" className={getLinkClass("/admin/pt-thanh-toan")}>
              Quản lý PT thanh toán
            </Link>
            <Link to="" className={getLinkClass("/admin/pt-van-chuyen")}>
              Quản lý PT vận chuyển
            </Link>
            <Link to="" className={getLinkClass("/admin/danh-muc")}>
              Quản lý danh mục
            </Link>
            <Link to="" className={getLinkClass("/admin/thong-ke")}>
              Thống kê doanh thu
            </Link>
          </div>
        </div>

        <div>
          <Link to="/" className={getLinkClass("/")}>
            → Trở về trang chủ
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
