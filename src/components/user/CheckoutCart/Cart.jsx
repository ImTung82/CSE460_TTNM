import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../layouts/user/Navbar";
import Subnav from "../../layouts/user/Subnav";
import Footer from "../../layouts/user/Footer";
const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    // Test cases cho tên sách
    { id: 1, name: "", price: 24000, oldPrice: 30000, quantity: 1, image: "/assets/user/book.png", selected: false }, // Tên rỗng
    { id: 2, name: "   ", price: 24000, oldPrice: 30000, quantity: 1, image: "/assets/user/book.png", selected: false }, // Chỉ khoảng trắng
    { id: 3, name: "Sách@#$%^&*()", price: 24000, oldPrice: 30000, quantity: 1, image: "/assets/user/book.png", selected: false }, // Ký tự đặc biệt không hợp lệ
    // { id: 4, name: "A".repeat(251), price: 24000, oldPrice: 30000, quantity: 1, image: "/assets/user/book.png", selected: false }, // Vượt quá 250 ký tự
    // { id: 5, name: "A".repeat(250), price: 24000, oldPrice: 30000, quantity: 1, image: "/assets/user/book.png", selected: false }, // Đúng 250 ký tự
    { id: 6, name: "Thám Tử Lừng Danh Conan - Tập 43 (Tái Bản 2023)", price: 24000, oldPrice: 30000, quantity: 1, image: "/assets/user/book.png", selected: false }, // Hợp lệ
    
    // Test cases cho số lượng
    { id: 7, name: "Sách số lượng thực", price: 24000, oldPrice: 30000, quantity: 1.5, image: "/assets/user/book.png", selected: false }, // Số thực
    { id: 8, name: "Sách số lượng chữ", price: 24000, oldPrice: 30000, quantity: "abc", image: "/assets/user/book.png", selected: false }, // Chứa chữ
    { id: 9, name: "Sách số lượng ký tự đặc biệt", price: 24000, oldPrice: 30000, quantity: "2@", image: "/assets/user/book.png", selected: false }, // Ký tự đặc biệt
    { id: 10, name: "Sách số lượng < 1", price: 24000, oldPrice: 30000, quantity: 0, image: "/assets/user/book.png", selected: false }, // Nhỏ hơn 1
    { id: 11, name: "Sách số lượng > 99", price: 24000, oldPrice: 30000, quantity: 100, image: "/assets/user/book.png", selected: false }, // Lớn hơn 99
    { id: 12, name: "Sách số lượng = 1", price: 24000, oldPrice: 30000, quantity: 1, image: "/assets/user/book.png", selected: false }, // Bằng 1
    { id: 13, name: "Sách số lượng = 99", price: 24000, oldPrice: 30000, quantity: 99, image: "/assets/user/book.png", selected: false }, // Bằng 99
    { id: 14, name: "Sách số lượng hợp lệ", price: 24000, oldPrice: 30000, quantity: 50, image: "/assets/user/book.png", selected: false }, // Hợp lệ
    
    // Test cases cho đơn giá
    { id: 15, name: "Sách giá ký tự đặc biệt", price: "24000@", oldPrice: 30000, quantity: 1, image: "/assets/user/book.png", selected: false }, // Ký tự đặc biệt
    { id: 16, name: "Sách giá chữ", price: "abc", oldPrice: 30000, quantity: 1, image: "/assets/user/book.png", selected: false }, // Chứa chữ
    { id: 17, name: "Sách giá âm", price: -24000, oldPrice: 30000, quantity: 1, image: "/assets/user/book.png", selected: false }, // Giá âm
    { id: 18, name: "Sách giá bằng 0", price: 0, oldPrice: 30000, quantity: 1, image: "/assets/user/book.png", selected: false }, // Giá bằng 0
    { id: 19, name: "Sách giá thực dương", price: 24000.5, oldPrice: 30000, quantity: 1, image: "/assets/user/book.png", selected: false }, // Số thực dương
    { id: 20, name: "Sách giá hợp lệ", price: 24000, oldPrice: 30000, quantity: 1, image: "/assets/user/book.png", selected: false }, // Hợp lệ
  ]);

  const [selectAll, setSelectAll] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const validateBookName = (name) => {
  if (!name || name.trim() === "")
    return "Tên sách không được để trống";
  if (name.length > 250)
    return "Tên sách vượt quá 250 ký tự";
    const invalidSpecialChars = /[^a-zA-ZÀ-ỹ0-9\s\.\,\-\/]/;
  if (invalidSpecialChars.test(name))
    return "Tên sách không hợp lệ";
  return "";
};

const validateQuantity = (quantity) => {
  const numQuantity = Number(quantity);
  if (!Number.isInteger(numQuantity) || isNaN(numQuantity))
    return "Số lượng phải là số nguyên";
  if (numQuantity < 1)
    return "Số lượng phải lớn hơn hoặc bằng 1";
  if (numQuantity > 99)
    return "Số lượng vượt quá giới hạn cho phép";
  return "";
};

const validatePrice = (price) => {
  const numPrice = Number(price);
  if (isNaN(numPrice))
    return "Đơn giá phải là số";
  if (numPrice < 0)
    return "Đơn giá không được âm";
  return "";
};

const validateCartItems = (items) => {
  const errors = [];
  items.forEach((item, index) => {
    const nameError = validateBookName(item.name);
    if (nameError)
      errors.push(`Sản phẩm ${index + 1}: ${nameError}`);
    const quantityError = validateQuantity(item.quantity);
    if (quantityError)
      errors.push(`Sản phẩm ${index + 1}: ${quantityError}`);
    const priceError = validatePrice(item.price);
    if (priceError)
      errors.push(`Sản phẩm ${index + 1}: ${priceError}`);
  });
  return errors;
};

  useEffect(() => {
    const orderSuccess = sessionStorage.getItem("orderSuccess");
    if (orderSuccess) {
      toast.success("Đặt hàng thành công");
      sessionStorage.removeItem("orderSuccess");
    }
  }, []);

  // Handle select all checkbox
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    // Update all items selection status
    setCartItems(
      cartItems.map((item) => ({
        ...item,
        selected: newSelectAll,
      }))
    );
  };

  // Handle individual item selection
  const handleSelectItem = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Update quantity with buttons
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle direct quantity input
  const handleQuantityChange = (id, e) => {
    const value = parseInt(e.target.value);

    // Ensure the input is a positive number
    if (!isNaN(value) && value > 0) {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: value } : item
        )
      );
    } else if (e.target.value === "") {
      // Allow empty input while typing
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: e.target.value } : item
        )
      );
    }
  };

  // Handle blur event to ensure valid quantity
  const handleQuantityBlur = (id, e) => {
    const value = parseInt(e.target.value);

    if (isNaN(value) || value < 1 || e.target.value === "") {
      // Reset to 1 if invalid
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: 1 } : item
        )
      );
    }
  };

// Calculate total based on selected items
useEffect(() => {
  const total = cartItems.reduce((sum, item) => {
    if (!item.selected) return sum;
    
    // Chỉ validate để tính toán, không skip item
    const quantity = typeof item.quantity === "number" ? item.quantity : 
                    (typeof item.quantity === "string" && !isNaN(Number(item.quantity))) ? Number(item.quantity) : 1;
    const price = typeof item.price === "number" ? item.price : 
                 (typeof item.price === "string" && !isNaN(Number(item.price))) ? Number(item.price) : 0;
    
    // Chỉ tính nếu quantity và price hợp lệ
    if (quantity > 0 && price >= 0) {
      return sum + price * quantity;
    }
    
    return sum;
  }, 0);

  setTotalAmount(total);

  // Update selectAll state based on items
  setSelectAll(
    cartItems.length > 0 && cartItems.every((item) => item.selected)
  );
}, [cartItems]);
  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

// Handle checkout
const handleCheckout = () => {
  const selectedItems = cartItems.filter(item => item.selected);
  
  if (selectedItems.length === 0) {
    toast.error("Vui lòng chọn ít nhất một sản phẩm để thanh toán");
    return;
  }
  
  const validationErrors = validateCartItems(selectedItems);
  
  if (validationErrors.length > 0) {
    // Hiển thị từng lỗi validation
    validationErrors.forEach(error => {
      toast.error(error);
    });
    return;
  }
  
  if (totalAmount >= 0) {
    navigate("/dat-hang");
  }
};

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Subnav />
      <div className=" pt-10 px-4 md:px-16 lg:px-60 mb-36">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <h1 className="text-2xl font-bold mb-6">Giỏ hàng</h1>

        {cartItems.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-[#F8F8F8] text-left text-sm text-gray-600">
                  <th className="p-4">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="accent-[#192F59]"
                    />
                  </th>
                  <th className="p-4">Chọn tất cả</th>
                  <th className="p-4 text-center">Số lượng</th>
                  <th className="p-4 text-right">Thành tiền</th>
                  <th className="p-4 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-200 text-sm"
                  >
                    <td className="p-4 align-middle">
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => handleSelectItem(item.id)}
                        className="accent-[#192F59]"
                      />
                    </td>

                    <td className="p-4 flex gap-4 items-stretch">
                      <img
                        src={item.image}
                        alt="product"
                        className="w-20 h-28 object-cover rounded border"
                      />
                      <div className="flex flex-col justify-between">
                        <p className="font-medium">{item.name}</p>
                        <div className="flex items-center gap-2 mt-auto">
                          <p className="text-red-600 font-semibold">
                            {item.price.toLocaleString()} đ
                          </p>
                          <p className="line-through text-gray-400 text-xs font-normal">
                            {item.oldPrice.toLocaleString()} đ
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 align-middle">
                      <div className="flex justify-center items-center">
                        <div className="flex border border-gray-300 rounded">
                          <button
                            className="px-3 py-1 border-r border-gray-300"
                            onClick={() =>
                              updateQuantity(item.id, Number(item.quantity) - 1)
                            }
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, e)}
                            onBlur={(e) => handleQuantityBlur(item.id, e)}
                            className="px-3 py-1 w-12 text-center outline-none font-normal"
                          />
                          <button
                            className="px-3 py-1 border-l border-gray-300"
                            onClick={() =>
                              updateQuantity(item.id, Number(item.quantity) + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-right align-middle">
                      <p className="text-[#E82323] font-medium">
                        {(
                          item.price *
                          (typeof item.quantity === "number"
                            ? item.quantity
                            : 1)
                        ).toLocaleString()}{" "}
                        đ
                      </p>
                    </td>

                    <td className="p-4 text-center align-middle">
                      <button onClick={() => removeItem(item.id)}>
                        <img
                          src="/assets/user/delete.png"
                          alt="delete"
                          className="w-5 h-5"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">Giỏ hàng của bạn đang trống</p>
          </div>
        )}

        <div className="flex flex-col items-end mt-6 gap-2 text-sm">
          <p className="font-semibold">
            Tổng tiền:{" "}
            <span className="text-[#E82323] font-semibold">
              {totalAmount.toLocaleString()} đ
            </span>
          </p>
          <button
            className={`px-6 py-2 rounded ${
              cartItems.filter(item => item.selected).length > 0
                ? "bg-[#192F59] hover:bg-[#114388] text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleCheckout}
            disabled={cartItems.filter(item => item.selected).length === 0}
          >
            Thanh toán
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
