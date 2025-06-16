import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SectionTitle from "../../layouts/user/SectionTitle";
import Navbar from "../../layouts/user/Navbar";
import Subnav from "../../layouts/user/Subnav";
const PlaceOrder = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [newAddress, setNewAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("default");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    country: "Việt Nam",
    city: "Hà Nội",
    district: "Ba Đình",
    ward: "Kim Mã",
    address: ""
  });
  
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    phone: "",
    address: ""
  });

  // Check if returning from a payment gateway
  useEffect(() => {
    const paymentStatus = sessionStorage.getItem("paymentStatus");
    if (paymentStatus === "success") {
      // Clear the payment status
      sessionStorage.removeItem("paymentStatus");
      // Set order success message
      sessionStorage.setItem("orderSuccess", "true");
      // Navigate back to cart
      navigate("/cart");
    }
  }, [navigate]);

  // Handle address selection change
  const handleChangeAddress = (e) => {
    setSelectedAddress(e.target.value);
    if (e.target.value === "other") {
      setShowModal(true);
    }
  };

  // Handle payment method change
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const closeModal = () => {
    setShowModal(false);
    // Reset form data and errors when closing
    setFormData({
      fullName: "",
      phone: "",
      country: "Việt Nam",
      city: "Hà Nội",
      district: "Ba Đình",
      ward: "Kim Mã",
      address: ""
    });
    setFormErrors({
      fullName: "",
      phone: "",
      address: ""
    });
    
    // Set radio button back to default address
    setSelectedAddress("default");
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedPaymentGateway(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...formErrors };
    
    // Validate fullName
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Trường này không được để trống";
      isValid = false;
    }
    
    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Trường này không được để trống";
      isValid = false;
    } else if (!/^0\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại gồm 10 chữ số và bắt đầu bằng số 0";
      isValid = false;
    }
    
    // Validate address
    if (!formData.address.trim()) {
      newErrors.address = "Trường này không được để trống";
      isValid = false;
    }
    
    setFormErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid, create new address
      const newAddressString = `${formData.fullName} | ${formData.address}, ${formData.ward}, ${formData.district}, ${formData.city} | ${formData.phone}`;
      setNewAddress(newAddressString);
      setSelectedAddress("new");
      
      // Show success message and close modal
      toast.success("Thêm địa chỉ thành công");
      closeModal();
    }
  };

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
    // Clear error when user types
    if (couponError) {
      setCouponError("");
    }
  };

  const applyCoupon = () => {
    if (couponCode.trim()) {
      setCouponError("Mã giảm giá không hợp lệ");
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "cod") {
      // For COD, directly navigate back to cart with success message
      sessionStorage.setItem("orderSuccess", "true");
      navigate("/cart");
    } else {
      // For online payment methods, show the payment gateway modal
      setShowPaymentModal(true);
      setSelectedPaymentGateway(paymentMethod);
    }
  };

  const handlePaymentGatewaySubmit = () => {
    // Simulate redirection to payment gateway
    toast.info(`Đang chuyển hướng đến cổng thanh toán ${getPaymentGatewayName(selectedPaymentGateway)}...`, {
      autoClose: 3000,
    });
    
    // Close the payment modal
    closePaymentModal();
    
    // Simulate payment process with a timeout
    setTimeout(() => {
      // Set payment status to success (this would be done by the payment gateway in a real scenario)
      sessionStorage.setItem("paymentStatus", "success");
      
      // Simulate returning from payment gateway
      window.location.href = window.location.href;
    }, 3000);
  };

  const getPaymentGatewayName = (method) => {
    switch (method) {
      case "vnpay": return "VNPay";
      case "zalopay": return "ZaloPay";
      case "momo": return "MoMo";
      case "creditcard": return "Thẻ tín dụng/Ghi nợ";
      default: return "";
    }
  };

  return (
    <>
      <Navbar />
      <Subnav />
    
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white relative mb-32">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>
      
      <div className="border border-[#cccccc]/80 rounded-lg p-4 bg-white shadow-md">
        <SectionTitle title="Địa chỉ giao hàng" />
        <div className="space-y-2 text-sm text-gray-700">
          <label className="block">
            <input
              type="radio"
              name="address"
              className="mr-2"
              value="default"
              checked={selectedAddress === "default"}
              onChange={handleChangeAddress}
            />
            Lê Doãn Tú | Số nhà 390, Kim Mã, Ba Đình, Hà Nội | 0987789244
          </label>
          
          {newAddress && (
            <label className="block">
              <input
                type="radio"
                name="address"
                className="mr-2"
                value="new"
                checked={selectedAddress === "new"}
                onChange={handleChangeAddress}
              />
              {newAddress}
            </label>
          )}
          
          <label className="block">
            <input
              type="radio"
              name="address"
              className="mr-2"
              value="other"
              checked={selectedAddress === "other"}
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
              value="cod"
              className="mr-2"
              checked={paymentMethod === "cod"}
              onChange={handlePaymentMethodChange}
            />
            Thanh toán khi nhận hàng
          </label>
          <label className="block">
            <input 
              type="radio" 
              name="payment" 
              value="vnpay"
              className="mr-2"
              checked={paymentMethod === "vnpay"}
              onChange={handlePaymentMethodChange}
            /> 
            VNPay
          </label>
          <label className="block">
            <input 
              type="radio" 
              name="payment" 
              value="zalopay"
              className="mr-2"
              checked={paymentMethod === "zalopay"}
              onChange={handlePaymentMethodChange}
            /> 
            ZaloPay
          </label>
          <label className="block">
            <input 
              type="radio" 
              name="payment" 
              value="momo"
              className="mr-2"
              checked={paymentMethod === "momo"}
              onChange={handlePaymentMethodChange}
            /> 
            Momo
          </label>
          <label className="block">
            <input 
              type="radio" 
              name="payment" 
              value="creditcard"
              className="mr-2"
              checked={paymentMethod === "creditcard"}
              onChange={handlePaymentMethodChange}
            /> 
            Thẻ tín dụng/Ghi nợ
          </label>
        </div>
      </div>

      <div className="border border-[#cccccc]/80 rounded-lg p-4 bg-white shadow-md">
        <SectionTitle title="Mã quà tặng/khuyến mãi" />
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Nhập mã khuyến mãi"
              className="w-full border border-[#cccccc] px-4 py-2 rounded text-sm"
              value={couponCode}
              onChange={handleCouponChange}
            />
            {couponError && (
              <p className="text-red-500 text-xs mt-1">{couponError}</p>
            )}
          </div>
          <button 
            className="px-4 py-2 bg-[#192F59] hover:bg-[#114388] text-white rounded text-sm cursor-pointer"
            onClick={applyCoupon}
          >
            Áp dụng
          </button>
        </div>
        <a href="#" className="text-sm text-blue-500 mt-2 inline-block">
          Chọn mã khuyến mãi
        </a>
      </div>

      <div className="border border-[#cccccc]/80 rounded-lg p-4 bg-white shadow-md">
        <SectionTitle title="Kiểm tra lại đơn hàng" />
        <div className="flex gap-4">
          <img src="/assets/user/book.png" alt="book" className="w-20 h-28 object-cover border rounded" />
          <div className="flex-1 grid grid-cols-5 gap-2 items-center">
            <p className="col-span-2 text-sm font-medium self-start">
              Thám Tử Lừng Danh Conan - Tập 43 (Tái Bản 2023)
            </p>
            <div className="flex flex-col justify-center">
              <p className="font-semibold text-black text-sm">24.000đ</p>
              <p className="text-gray-500 line-through text-xs">30.000đ</p>
            </div>
            <p className="text-center text-sm text-black font-medium">2</p>
            <div className="flex items-center justify-end text-sm font-medium text-red-600">
              48.000 đ
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white shadow-[0_-2px_6px_rgba(0,0,0,0.1)] px-6 py-4 border-t border-[#cccccc]">
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
          <button 
            className="px-6 py-2 bg-[#192F59] hover:bg-[#114388] text-white rounded text-sm"
            onClick={handlePlaceOrder}
          >
            Xác nhận
          </button>
        </div>
      </div>
      
      {/* Address Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/75">
          <div className="bg-white w-full max-w-3xl rounded-md shadow-xl p-6">
            <h2 className="text-lg font-bold mb-6 text-center">
              Thay đổi địa chỉ giao hàng
            </h2>
            <form className="space-y-4 text-sm" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="col-span-1">Họ và tên người nhận:</label>
                <div className="col-span-2">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`border ${formErrors.fullName ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
                  />
                  {formErrors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="col-span-1">Số điện thoại:</label>
                <div className="col-span-2">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="col-span-1">Quốc gia:</label>
                <select 
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="col-span-2 border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option>Việt Nam</option>
                  <option>Hoa Kỳ</option>
                  <option>Nhật Bản</option>
                  <option>Hàn Quốc</option>
                </select>
              </div>
              
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="col-span-1">Tỉnh/Thành phố:</label>
                <select 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="col-span-2 border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option>Hà Nội</option>
                  <option>TP. Hồ Chí Minh</option>
                  <option>Đà Nẵng</option>
                  <option>Hải Phòng</option>
                </select>
              </div>
              
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="col-span-1">Quận/Huyện:</label>
                <select 
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="col-span-2 border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option>Ba Đình</option>
                  <option>Cầu Giấy</option>
                  <option>Thanh Xuân</option>
                  <option>Hoàng Mai</option>
                </select>
              </div>
              
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="col-span-1">Phường/Xã:</label>
                <select 
                  name="ward"
                  value={formData.ward}
                  onChange={handleInputChange}
                  className="col-span-2 border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option>Kim Mã</option>
                  <option>Dịch Vọng</option>
                  <option>Nguyễn Trãi</option>
                </select>
              </div>
              
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="col-span-1">Địa chỉ nhận hàng:</label>
                <div className="col-span-2">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
                  />
                  {formErrors.address && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center gap-3 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-white hover:text-[#C92127] border rounded"
                  onClick={closeModal}
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#192F59] hover:bg-[#114388] text-white rounded"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Gateway Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/75">
          <div className="bg-white w-full max-w-md rounded-md shadow-xl p-6">
            <h2 className="text-lg font-bold mb-2 text-center">
              Thanh toán qua {getPaymentGatewayName(selectedPaymentGateway)}
            </h2>
            <p className="text-center text-gray-600 text-sm mb-6">
              Vui lòng hoàn tất thanh toán để tiếp tục
            </p>

            {/* Mock payment gateway UI - this would be the actual payment gateway in a real app */}
            <div className="space-y-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm text-gray-600">Tổng thanh toán:</span>
                <span className="font-bold text-red-600">68.000 đ</span>
              </div>
              
              {selectedPaymentGateway === "creditcard" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-700 mb-1">Số thẻ</label>
                    <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full p-2 border rounded" />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-700 mb-1">Ngày hết hạn</label>
                      <input type="text" placeholder="MM/YY" className="w-full p-2 border rounded" />
                    </div>
                    <div className="w-24">
                      <label className="block text-xs text-gray-700 mb-1">CVV</label>
                      <input type="text" placeholder="123" className="w-full p-2 border rounded" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-700 mb-1">Tên chủ thẻ</label>
                    <input type="text" placeholder="NGUYEN VAN A" className="w-full p-2 border rounded" />
                  </div>
                </div>
              )}
              
              {(selectedPaymentGateway === "vnpay" || selectedPaymentGateway === "zalopay" || selectedPaymentGateway === "momo") && (
                <div className="text-center py-4">
                  <img 
                    src={`/assets/user/${selectedPaymentGateway}-logo.png`}
                    alt={`${getPaymentGatewayName(selectedPaymentGateway)} Logo`} 
                    className="w-16 h-16 mx-auto mb-4"
                    onError={(e) => { e.target.src = "/assets/user/qr.jpg"; }}
                  />
                  <p className="text-sm">
                    Quét mã QR hoặc nhấn "Thanh toán" để tiếp tục
                  </p>
                </div>
              )}
            </div>
            
          <div className="flex justify-center gap-3 mt-6">
            <button
              type="button"
              className="min-w-[120px] px-4 py-2 bg-white border hover:text-[#C92127] rounded text-center"
              onClick={closePaymentModal}
            >
              Huỷ
            </button>
            <button
              type="button"
              className="min-w-[120px] px-4 py-2 bg-[#192F59] hover:bg-[#114388] text-white rounded text-center"
              onClick={handlePaymentGatewaySubmit}
            >
              Thanh toán
            </button>
          </div>

          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default PlaceOrder;