import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../layouts/user/Navbar";
import Subnav from "../../layouts/user/Subnav";
const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(
    Array(5)
      .fill({
        id: 0,
        name: "Thám Tử Lừng Danh Conan - Tập 43 (Tái Bản 2023)",
        price: 24000,
        oldPrice: 30000,
        quantity: 1,
        image: "/assets/user/book.png",
        selected: false,
      })
      .map((item, index) => ({ ...item, id: index }))
  );

  const [selectAll, setSelectAll] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

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
      const quantity = typeof item.quantity === "number" ? item.quantity : 1;
      return sum + item.price * quantity;
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
    if (totalAmount > 0) {
      navigate("/place-order");
    }
  };

  return (
    <>
      <Navbar />
      <Subnav />
      <div className="min-h-screen pt-10 px-4 md:px-16 lg:px-60">
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
                        <p className="font-semibold">{item.name}</p>
                        <div className="flex items-center gap-2 mt-auto">
                          <p className="text-red-600 font-bold">
                            {item.price.toLocaleString()} đ
                          </p>
                          <p className="line-through text-gray-400 text-xs">
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
                            className="px-3 py-1 w-12 text-center outline-none"
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
                      <p className="text-red-600 font-bold">
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
          <p className="font-medium">
            Tổng tiền:{" "}
            <span className="text-red-600 font-bold">
              {totalAmount.toLocaleString()} đ
            </span>
          </p>
          <button
            className={`px-6 py-2 rounded ${
              totalAmount > 0
                ? "bg-[#192F59] hover:bg-[#114388] text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleCheckout}
            disabled={totalAmount === 0}
          >
            Thanh toán
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
