import React from "react";

export default function SortDropdown({ selected, isOpen, onToggle, onSelect }) {
  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-4 h-[44px]">
        <label className="text-xl whitespace-nowrap">Sắp xếp theo</label>
        <button
          type="button"
          onClick={onToggle}
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
        <div className="absolute right-0 mt-1 max-w-60 w-full rounded-md outline-gray-400 bg-white shadow-2xl z-10">
          <div className="py-1 text-sm text-gray-700">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelect("Giá từ thấp đến cao")}
            >
              Giá từ thấp đến cao
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelect("Giá từ cao đến thấp")}
            >
              Giá từ cao đến thấp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
