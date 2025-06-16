import React from 'react';

const DeleteOrderModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg border w-[450px]">
        <div className="border-b px-6 py-4">
          <h2 className="text-2xl font-bold text-black">Xóa đơn hàng</h2>
        </div>
        <div className="p-6 text-center text-black text-base">
          Bạn có chắc chắn muốn xóa đơn hàng này không?
        </div>
        <div className="flex justify-end gap-3 px-6 pb-4">
          <button
            onClick={onClose}
            className="w-22 h-10 border border-black rounded hover:border-red-500 hover:text-red-500 font-medium transition-all ease-out duration-150"
          >
            Không
          </button>
          <button
            onClick={onConfirm}
            className="w-22 h-10 bg-red-600 text-white rounded hover:opacity-70 font-medium transition-all ease-out duration-150"
          >
            Có
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteOrderModal;
