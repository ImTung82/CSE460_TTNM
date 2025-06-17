import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../../layouts/user/Header";
import Footer from "../../layouts/user/Footer";

const Home = () => {
  const sampleBook = {
    title: "Thám tử lừng danh Tizen - 69",
    price: "24.000đ",
    oldPrice: "30.000đ",
    discount: "-20%",
    img: "/assets/user/book2.png",
  };
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = [
    "/assets/user/banner4.png",
    "/assets/user/banner2.png",
    "/assets/user/banner1.png",
    "/assets/user/banner3.png",
  ];

  const nextSlide = () => {
    setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentBanner(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <div className="bg-white text-black">
        <div className="w-full relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentBanner * 100}%)` }}
          >
            {banners.map((banner, index) => (
              <img
                key={index}
                src={banner}
                alt={`Banner ${index + 1}`}
                className="w-full h-auto object-cover flex-shrink-0"
              />
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#192F59] hover:opacity-70 p-2 rounded-full transition-all ease-out duration-300"
          >
            <img
              src="/assets/user/icon_lui.png"
              alt="Previous"
              className="h-8 w-8"
            />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#192F59] hover:opacity-70 p-2 rounded-full transition-all ease-out duration-300"
          >
            <img
              src="/assets/user/icon_tien.png"
              alt="Next"
              className="h-8 w-8"
            />
          </button>
        </div>

        <div className="max-w-screen-lg mx-auto py-8">
          <div className="py-10 bg-white text-center">
            <h2 className="text-4xl font-bold mb-8 uppercase">Sách mới</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
              {Array(5)
                .fill(sampleBook)
                .map((book, index) => (
                  <div
                    key={index}
                    className="text-left p-2 border border-transparent hover:border-[#cccccc] hover:bg-gray-50 transition-all ease-out duration-200 rounded"
                  >
                    <img
                      src={book.img}
                      alt={book.title}
                      className="w-full h-auto object-cover mb-2 hover:scale-95 hover:opacity-70 transition-transform duration-300 ease-in-out"
                    />
                    <p className="text-sm text-gray-800">{book.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-red-600 font-semibold">
                        {book.price}
                      </span>
                      <span className="bg-red-600 text-white text-xs px-1.5 py-0.5 rounded">
                        {book.discount}
                      </span>
                    </div>
                    <span className="line-through text-sm text-gray-400">
                      {book.oldPrice}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="py-10 bg-white text-center">
            <h2 className="text-4xl font-bold mb-8 uppercase">Sách bán chạy</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
              {Array(5)
                .fill(sampleBook)
                .map((book, index) => (
                  <div
                    key={index}
                    className="text-left p-2 border border-transparent hover:border-[#cccccc] hover:bg-gray-50 transition-all ease-out duration-200 rounded"
                  >
                    <img
                      src={book.img}
                      alt={book.title}
                      className="w-full h-auto object-cover mb-2 hover:scale-95 hover:opacity-70 transition-transform duration-300 ease-in-out"
                    />
                    <p className="text-sm text-gray-800">{book.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-red-600 font-semibold">
                        {book.price}
                      </span>
                      <span className="bg-red-600 text-white text-xs px-1.5 py-0.5 rounded">
                        {book.discount}
                      </span>
                    </div>
                    <span className="line-through text-sm text-gray-400">
                      {book.oldPrice}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
