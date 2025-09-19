import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

const FormPemetaanCPMK = ({
    isOpen,
    onClose,
    onSubmit,
    cpmkOptions,
    initialData,
    isLoading,
    cplBobot,
    totalAcuan,
}) => {
    const [formData, setFormData] = useState({
        cpmk_id: "",
        bobot: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                cpmk_id: initialData.cpmk_id || "",
                bobot: initialData.bobot || "",
            });
        } else {
            setFormData({ cpmk_id: "", bobot: "" });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative bg-white w-full max-w-md rounded-2xl shadow-xl p-6"
                    >
                        {/* Tombol Close */}
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        >
                            <AiOutlineClose size={20} />
                        </button>

                        {/* Header */}
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            {initialData ? "Edit Pemetaan CPMK" : "Tambah Pemetaan CPMK"}
                        </h3>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Pilih CPMK */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">
                                    Pilih CPMK
                                </label>
                                <select
                                    name="cpmk_id"
                                    value={formData.cpmk_id}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl px-3 py-2 text-sm"
                                    disabled={!!initialData}
                                >
                                    <option value="">-- Pilih CPMK --</option>
                                    {cpmkOptions.map((cpmk) => (
                                        <option key={cpmk.cpmk_id} value={cpmk.cpmk_id}>
                                            {cpmk.kode_cpmk} — {cpmk.nama_cpmk}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Bobot */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">
                                    Bobot (%)
                                </label>
                                <input
                                    type="number"
                                    name="bobot"
                                    value={formData.bobot}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl px-3 py-2 text-sm"
                                    placeholder="Masukkan bobot"
                                />
                                {cplBobot > 0 && (
                                    <div className="mt-3 text-xs space-y-1">
                                        <p className="text-gray-600">
                                            Bobot acuan CPL:{" "}
                                            <span className="font-semibold">{cplBobot}%</span>
                                        </p>
                                        <p className="text-gray-600">
                                            Bobot CPMK terpakai:{" "}
                                            <span className="font-semibold">{totalAcuan}%</span>
                                        </p>
                                        <p>
                                            Sisa bobot:{" "}
                                            <span className="font-semibold text-blue-600">
                                                {Math.max(cplBobot - totalAcuan, 0)}%
                                            </span>
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Tombol */}
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm"
                                    disabled={isLoading}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-sm text-sm"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Menyimpan..." : "Simpan"}
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
