import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa"; // Impor spinner

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    // PERBAIKAN: Terima props baru yang lebih deskriptif
    title = "Konfirmasi Tindakan",
    description = "Apakah Anda yakin ingin melanjutkan?",
    confirmText = "Konfirmasi",
    isLoading = false, // Tambahkan prop isLoading
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
            setTimeout(() => setShouldRender(false), 300);
        }
    }, [isOpen]);

    if (!shouldRender) return null;

    return (
        <div
            // PERBAIKAN: Gunakan Tailwind CSS untuk styling
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
                }`}
            onClick={onClose} // Tutup saat klik backdrop
        >
            <div
                // PERBAIKAN: Gunakan Tailwind CSS untuk styling dan animasi
                className={`relative w-full max-w-lg rounded-xl bg-white p-6 shadow-lg transition-all duration-300 ${isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
                    }`}
                onClick={(e) => e.stopPropagation()} // Cegah klik di modal menutup modal
            >
                {/* Tombol Close */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                >
                    &times; {/* Karakter 'x' */}
                </button>

                {/* Header */}
                <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-2xl text-red-500">
                        ⚠️
                    </span>
                    {/* PERBAIKAN: Gunakan prop 'title' */}
                    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                </div>

                {/* Isi Pesan */}
                {/* PERBAIKAN: Gunakan prop 'description' */}
                <p className="mb-6 text-x text-gray-600">{description}</p>

                {/* Tombol Aksi */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        // PERBAIKAN: Styling dengan Tailwind
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        // PERBAIKAN: Styling dengan Tailwind
                        className="flex w-32 justify-center rounded-lg border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:bg-red-300"
                        disabled={isLoading}
                    >
                        {/* PERBAIKAN: Tampilkan spinner saat isLoading */}
                        {isLoading ? (
                            <FaSpinner className="animate-spin" />
                        ) : (
                            confirmText // Gunakan prop confirmText
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;