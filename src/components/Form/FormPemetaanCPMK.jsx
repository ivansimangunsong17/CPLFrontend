import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { FaTag, FaPercentage, FaSpinner } from "react-icons/fa";
import { HiX } from "react-icons/hi";

const FormPemetaanCPMK = ({
    isOpen,
    onClose,
    onSubmit,
    cpmkOptions,
    initialData,
    isLoading,
    cplBobot, // Bobot CPL Induk (misal: 20%)
    totalAcuan, // Total bobot CPMK yang sudah terpakai (misal: 10%)
}) => {
    const [formData, setFormData] = useState({
        cpmk_id: "",
        bobot: "",
    });

    // Logic untuk mengisi form saat mode edit (TIDAK BERUBAH)
    useEffect(() => {
        if (initialData) {
            setFormData({
                cpmk_id: initialData.cpmk_id || "",
                bobot: initialData.bobot || "",
            });
        } else {
            setFormData({ cpmk_id: "", bobot: "" });
        }
    }, [initialData, isOpen]); // Reset saat modal dibuka/ditutup

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Hitung total bobot terpakai (kecuali data yang sedang diedit)
    const totalBobotTerpakai = useMemo(() => {
        if (initialData) {
            // Jika mode edit, total acuan adalah total TANPA bobot item ini
            return totalAcuan - (initialData.bobot || 0);
        }
        return totalAcuan; // Jika mode tambah, total acuan adalah total saat ini
    }, [totalAcuan, initialData]);

    // Sisa bobot yang tersedia dari CPL
    const sisaBobot = useMemo(() => Math.max(cplBobot - totalBobotTerpakai, 0), [cplBobot, totalBobotTerpakai]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validasi 1: CPMK harus dipilih (hanya untuk mode 'tambah baru')
        if (!initialData && !formData.cpmk_id) {
            toast.error("Silakan pilih CPMK terlebih dahulu.");
            return;
        }
        // Validasi 2: Bobot harus diisi
        if (!formData.bobot || parseFloat(formData.bobot) <= 0) {
            toast.error("Bobot harus diisi dan lebih besar dari 0.");
            return;
        }

        const bobotBaru = parseFloat(formData.bobot || 0);
        const totalAkhir = totalBobotTerpakai + bobotBaru;

        // Validasi 3: Total tidak boleh melebihi bobot CPL
        if (totalAkhir > cplBobot) {
            toast.error(`Total bobot CPMK (${totalAkhir}%) melebihi bobot acuan CPL (${cplBobot}%)! Sisa bobot ${sisaBobot}%.`);
            return;
        }

        onSubmit(formData);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose} // Tutup modal saat klik backdrop
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 30 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-xl shadow-xl w-full max-w-lg"
                        onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam modal menutup modal
                    >
                        {/* Header Modal Baru */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-800">
                                {initialData ? "Edit Pemetaan CPMK" : "Tambah Pemetaan CPMK"}
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Tutup modal"
                            >
                                <HiX size={24} />
                            </button>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSubmit} className="space-y-6 p-6">

                            {/* Progress Bar Bobot */}
                            {cplBobot > 0 && (
                                <div>
                                    <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
                                        <span>Bobot CPMK Terpakai</span>
                                        <span className={totalBobotTerpakai > cplBobot ? 'text-red-500' : 'text-gray-800'}>
                                            {totalBobotTerpakai}% / {cplBobot}% (dari CPL)
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <motion.div
                                            className={`h-2.5 rounded-full ${totalBobotTerpakai > cplBobot ? 'bg-red-500' : 'bg-blue-600'}`}
                                            initial={{ width: 0 }}
                                            // Hitung persentase bar berdasarkan bobot CPL
                                            animate={{ width: `${Math.min((totalBobotTerpakai / cplBobot) * 100, 100)}%` }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>
                                    <p className="text-right text-sm text-gray-500 mt-1">
                                        Sisa bobot tersedia: <strong>{sisaBobot}%</strong>
                                    </p>
                                </div>
                            )}

                            {/* Field CPMK */}
                            <div>
                                <label htmlFor="cpmk_id" className="block text-sm font-medium text-gray-700 mb-1">Pilih CPMK</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                        <FaTag />
                                    </span>
                                    <select
                                        id="cpmk_id"
                                        name="cpmk_id"
                                        value={formData.cpmk_id}
                                        onChange={handleChange}
                                        className="w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-gray-100"
                                        disabled={!!initialData}
                                    >
                                        <option value="">-- Pilih CPMK --</option>
                                        {/* Menampilkan CPMK yang sedang diedit */}
                                        {initialData && (
                                            <option key={initialData.cpmk_id} value={initialData.cpmk_id}>
                                                {cpmkOptions.find(c => c.cpmk_id === initialData.cpmk_id)?.nama_cpmk || `CPMK-${initialData.cpmk_id}`}
                                            </option>
                                        )}
                                        {/* Menampilkan sisa CPMK yang tersedia */}
                                        {cpmkOptions.map((cpmk) => (
                                            <option key={cpmk.cpmk_id} value={cpmk.cpmk_id}>
                                                {cpmk.kode_cpmk} — {cpmk.nama_cpmk}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Field Bobot */}
                            <div>
                                <label htmlFor="bobot" className="block text-sm font-medium text-gray-700 mb-1">Bobot (%)</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                        <FaPercentage />
                                    </span>
                                    <input
                                        type="number"
                                        id="bobot"
                                        name="bobot"
                                        value={formData.bobot}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        placeholder={`Masukkan bobot (maks ${sisaBobot}%)`}
                                        min="0"
                                        max={cplBobot}
                                    />
                                </div>
                            </div>

                            {/* Tombol Aksi (Footer Modal) */}
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                                    disabled={isLoading}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                                        }`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <FaSpinner className="animate-spin" />
                                    ) : null}
                                    {isLoading ? "Menyimpan..." : (initialData ? "Perbarui" : "Simpan")}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FormPemetaanCPMK;