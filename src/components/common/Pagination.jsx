import React from "react";

function getPageNumbers(current, total) {
  const delta = 2;
  const range = [];
  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    range.push(i);
  }
  if (current - delta > 2) {
    range.unshift("...");
  }
  if (current + delta < total - 1) {
    range.push("...");
  }
  range.unshift(1);
  if (total > 1) range.push(total);
  return [...new Set(range)];
}

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  if (totalPages <= 1) return null;
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="mt-5 mb-10 flex justify-center items-center gap-2">
      <button
        className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        &lt;&lt;
      </button>
      <button
        className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {pageNumbers.map((num, idx) =>
        num === "..." ? (
          <span
            key={idx}
            className="w-9 h-9 flex items-center justify-center font-bold text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={idx}
            className={`w-9 h-9 font-bold rounded-lg border border-gray-300 text-sm transition-all ease-out duration-150 ${
              currentPage === num
                ? "bg-blue-400 text-white"
                : "hover:bg-blue-400 hover:text-white text-gray-700"
            }`}
            onClick={() => onPageChange(num)}
          >
            {num}
          </button>
        )
      )}
      <button
        className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
      <button
        className="w-9 h-9 font-bold rounded-lg border border-gray-300 hover:bg-blue-400 hover:text-white text-sm text-gray-700 transition-all ease-out duration-150"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        &gt;&gt;
      </button>
    </div>
  );
}
