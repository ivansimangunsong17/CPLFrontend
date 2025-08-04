import React, { useEffect, useState } from "react";

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    message = "Apakah Anda yakin ingin menghapus?",
}) => {
    const [isVisible, setIsVisible] = useState(false);  // untuk animasi
    const [shouldRender, setShouldRender] = useState(isOpen); // untuk render

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setTimeout(() => setIsVisible(true), 10); // animasi masuk
        } else {
            setIsVisible(false); // animasi keluar
            // tunggu transisi selesai sebelum unmount
            setTimeout(() => setShouldRender(false), 300);
        }
    }, [isOpen]);

    if (!shouldRender) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                transition: "opacity 300ms ease",
                opacity: isVisible ? 1 : 0,
            }}
        >
            <div
                className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm relative"
                style={{
                    transform: isVisible ? "scale(1)" : "scale(0.9)",
                    opacity: isVisible ? 1 : 0,
                    transition: "transform 300ms ease, opacity 300ms ease",
                    background: "white",
                }}
            >
                {/* Tombol Close */}
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: 8,
                        right: 12,
                        fontSize: "1.25rem",
                        color: "#555",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    ×
                </button>

                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <span style={{ color: "#e53e3e", fontSize: 24 }}>⚠️</span>
                    <h2 style={{ fontSize: 18, fontWeight: 600, color: "#2d3748" }}>Konfirmasi Hapus</h2>
                </div>

                {/* Isi Pesan */}
                <p style={{ color: "#4a5568", marginBottom: 24 }}>{message}</p>

                {/* Tombol Aksi */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: "8px 16px",
                            border: "1px solid #cbd5e0",
                            borderRadius: 6,
                            background: "#fff",
                            color: "#2d3748",
                            cursor: "pointer",
                        }}
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            padding: "8px 16px",
                            borderRadius: 6,
                            backgroundColor: "#e53e3e",
                            color: "#fff",
                            cursor: "pointer",
                            border: "none",
                        }}
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
