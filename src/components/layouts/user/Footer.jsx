export default function Footer() {
  return (
    <div className="footer max-w-480 w-full h-61 bg-[#192F59] py-2.25 font-semibold text-white mt-auto">
      <div className="max-w-400 w-full h-56.5 mx-auto flex items-center justify-between">
        <div className="max-w-98 w-full h-35.75 flex gap-5">
          <div className="w-25 h-full flex flex-col justify-between">
            <img
              src="/assets/user/LogoFooter.png"
              alt="Logo"
              className="w-full h-10.5"
            />
            <ul className="w-full h-17.75 text-sm flex flex-col justify-between ">
              <li>Địa chỉ</li>
              <li>Điện thoại</li>
              <li>Email</li>
            </ul>
          </div>
          <div className="w-55.5 h-full flex flex-col justify-between">
            <div className="h-10.5 text-center flex items-center">
              <h3 className="text-xl">Website bán sách 4TQ</h3>
            </div>
            <ul className="w-full h-17.75 text-sm flex flex-col justify-between">
              <li>300 Kim Mã, Ba Đình, TP. Hà Nội</li>
              <li>0969382184</li>
              <li>4tqstore@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="max-w-50 w-full h-36.375 flex flex-col gap-5 px-3.75">
          <div className="w-full">
            <h3 className="uppercase">Chính sách</h3>
          </div>
          <ul className="w-full h-27 text-sm flex flex-col justify-between ">
            <li className="">
              <a href="#">Chính sách bảo mật</a>
            </li>
            <li className="">
              <a href="#">Chính sách thanh toán</a>
            </li>
            <li className="">
              <a href="#">Chính sách vận chuyển</a>
            </li>
            <li className="">
              <a href="#">Chính sách đổi trả</a>
            </li>
          </ul>
        </div>
        <div className="max-w-38 w-full h-14.25">
          <img src="/assets/user/LogoCongThuong.png" alt="Logo" />
        </div>
        <div className="max-w-68 w-full h-41.875 flex flex-col gap-2">
          <div className="w-full">
            <h3>Kết nối với chúng tôi</h3>
          </div>
          <div className="w-full">
            <img src="/assets/user/FB.png" alt="FB" />
          </div>
        </div>
      </div>
    </div>
  );
}
