import React from "react";

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
                {/* Tombol Close */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    ✖
                </button>

                {/* Icon & Judul */}
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-red-500 text-2xl">⚠️</span>
                    <h2 className="text-lg font-semibold">Hapus</h2>
                </div>

                {/* Isi Modal */}
                <p className="text-gray-600 mb-6">Apakah Anda yakin ingin menghapus?</p>

                {/* Tombol Aksi */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-md hover:bg-gray-100"
                    >
                        Kembali
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
};


export default ConfirmModal;
