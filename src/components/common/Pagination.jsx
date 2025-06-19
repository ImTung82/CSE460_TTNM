import React from "react";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center mb-8 gap-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
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
  );
}
