import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../layouts/user/Header";
import Footer from "../../layouts/user/Footer";
import booksData from "../../../data/booksData";
import SortDropdown from "../../common/SortDropdown";
import Pagination from "../../common/Pagination";

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
        <SortDropdown
          selected={selected}
          isOpen={isOpen}
          onToggle={() => setIsOpen((prev) => !prev)}
          onSelect={handleSelect}
        />
      </div>
      <div className="max-w-336.25 w-full max-h-385.5 h-full mx-auto mb-8 p-3.75">
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
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <Footer />
    </>
  );
}
