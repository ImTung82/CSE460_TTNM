import React, { useState } from "react";
import Header from "../../layouts/user/Header";
import Footer from "../../layouts/user/Footer";
import { Link, useLocation } from "react-router-dom";
import booksData from "../../../data/booksData";
import SortDropdown from "../../common/SortDropdown";
import Pagination from "../../common/Pagination";

const categories = [
  { key: "trinh-tham", label: "Trinh thám" },
  { key: "light-novel", label: "Light Novel" },
  { key: "manga", label: "Manga" },
];

export default function Collection() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const categoryKey = params.get("category");
  const categoryObj = categories.find((cat) => cat.key === categoryKey);
  const categoryName = categoryObj ? categoryObj.label : null;

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBooks = categoryKey
    ? booksData.filter(
        (book) =>
          book.category &&
          book.category.toLowerCase().replace(/\s/g, "-") === categoryKey
      )
    : booksData;

  const parsePrice = (priceStr) => Number(priceStr.replace(/[^\d]/g, ""));
  let sortedBooks = [...filteredBooks];
  if (selected === "Giá từ thấp đến cao") {
    sortedBooks.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  } else if (selected === "Giá từ cao đến thấp") {
    sortedBooks.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  }

  const booksPerPage = 15;
  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="max-w-480 w-full max-h-424.5 h-full mb-10 ">
        <div className="w-full h-14.25  mt-7.5 py-2 ">
          <div className="max-w-332.5 w-full h-full mx-auto flex items-center py-3 text-lg text-gray-600 space-x-2">
            <Link to="/" className=" hover:text-blue-600">
              Trang chủ
            </Link>
            <span className="text-gray-900">›</span>
            {!categoryName ? (
              <span className="text-gray-400 cursor-default pointer-events-none">
                Danh mục
              </span>
            ) : (
              <>
                <Link to="/danh-muc" className="hover:text-blue-600">
                  Danh mục
                </Link>
                <span className="text-gray-900">›</span>
                <span className="text-gray-400 cursor-default pointer-events-none">
                  {categoryName}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="max-w-332.5 w-full max-h-398 h-full mt-5 mx-auto flex justify-between gap-20 ">
          <div className="max-w-60 w-full h-46 rounded-md">
            <div className="w-full px-2">
              <h2 className="uppercase text-3xl mb-3">Danh mục</h2>
            </div>
            <div className="w-full h-1 bg-gray-300"></div>
            <div className="w-full">
              {categories.map((cat) => (
                <div
                  key={cat.key}
                  className="w-full h-10 px-2 border-b-1 border-gray-300 flex items-center"
                >
                  <Link
                    to={`/danh-muc?category=${cat.key}`}
                    className={`font-light text-base w-full h-full flex items-center transition-colors duration-150 ${
                      categoryKey === cat.key
                        ? "text-[#2489F4] pointer-events-none cursor-default"
                        : "hover:text-gray-400"
                    }`}
                  >
                    {cat.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="max-w-257.5 w-full ">
            <div className="flex justify-between">
              <h2 className="text-4xl font-bold uppercase">
                {categoryName || "Tất cả sách"}
              </h2>
              <SortDropdown
                selected={selected}
                isOpen={isOpen}
                onToggle={() => setIsOpen((prev) => !prev)}
                onSelect={handleSelect}
              />
            </div>
            <div className="mt-6 ">
              {paginatedBooks.length === 0 ? (
                <div className="text-xl text-gray-500 text-center py-10">
                  Không tìm thấy sách phù hợp.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {paginatedBooks.map((book, idx) => (
                    <Link
                      to="/chi-tiet-dau-sach"
                      key={idx}
                      className="text-left p-2 border border-transparent hover:border-[#cccccc] hover:bg-gray-50 transition duration-200 rounded"
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
                    </Link>
                  ))}
                </div>
              )}
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
