import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../layouts/user/Header";
import Footer from "../../layouts/user/Footer";
import booksData from "../../../data/booksData";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchTitle() {
  const query = useQuery();
  const keyword = query.get("keyword") || "";

  const foundBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(keyword.toLowerCase())
  );

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 15;
  const totalPages = Math.ceil(foundBooks.length / booksPerPage);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const parsePrice = (priceStr) => Number(priceStr.replace(/[^\d]/g, ""));

  let sortedBooks = [...foundBooks];
  if (selected === "Giá từ thấp đến cao") {
    sortedBooks.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  } else if (selected === "Giá từ cao đến thấp") {
    sortedBooks.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  }

  const startIdx = (currentPage - 1) * booksPerPage;
  const endIdx = startIdx + booksPerPage;
  const paginatedBooks = sortedBooks.slice(startIdx, endIdx);

  const handleSelect = (value) => {
    setSelected(value);
    setIsOpen(false);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <div className="max-w-335.5 w-full h-34.25 mx-auto flex justify-between">
        <div className="max-w-136.5 w-full h-full flex flex-col justify-center gap-2.5">
          <h1 className="text-[40px] ">Tìm kiếm</h1>
          <p className="text-xl ">
            Kết quả tìm kiếm cho <span className="font-bold">"{keyword}"</span>
          </p>
        </div>
        <div className="max-w-98 w-full h-full relative inline-block text-left py-8">
          <div className="flex items-center gap-4 h-[44px] ">
            <label className="text-xl whitespace-nowrap">Sắp xếp theo</label>
            <button
              type="button"
              onClick={toggleDropdown}
              className="flex justify-between items-center w-60 h-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none cursor-pointer"
            >
              {selected || "Lựa chọn sắp xếp"}
              <svg
                className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {isOpen && (
            <div className="absolute right-2.5 mt-1 max-w-60 w-full rounded-md outline-gray-400 bg-white shadow-2xl z-10">
              <div className="py-1 text-sm text-gray-700">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect("Giá từ thấp đến cao")}
                >
                  Giá từ thấp đến cao
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect("Giá từ cao đến thấp")}
                >
                  Giá từ cao đến thấp
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-336.25 w-full max-h-385.5 h-full mx-auto p-3.75">
        {paginatedBooks.length === 0 ? (
          <div className="text-xl text-gray-500 text-center py-10">
            Không tìm thấy sách phù hợp.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {paginatedBooks.map((book, idx) => (
              <div
                key={idx}
                className="text-left p-2 border border-transparent hover:border-[#cccccc] hover:bg-gray-50 transition duration-200 rounded"
              >
                <img
                  src={book.img}
                  alt={book.title}
                  className="w-full h-auto object-cover mb-2"
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
        )}
      </div>
      {/* PHÂN TRANG */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 mb-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded border ${
                currentPage === i + 1
                  ? "bg-[#192F59] text-white"
                  : "bg-white text-[#192F59] hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
      <Footer />
    </>
  );
}
