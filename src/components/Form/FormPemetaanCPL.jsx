import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { FaTag, FaPercentage, FaSpinner } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import ConfirmModal from "../../components/Modal/ConfModal"; // Pastikan impor ini benar

const FormPemetaanCPL = ({
  isOpen,
  onClose,
  onSubmit,
  cplOptions,
  initialData,
  isLoading,
  pemetaanData,
  pemetaanCPMKData, // Prop baru dari komponen induk
  onResetCPMKs,     // Prop baru dari komponen induk
}) => {
  const [formData, setFormData] = useState({ cpl_id: "", bobot: "" });
  const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);

  // Hitung total bobot CPL terpakai
  const totalBobotTerpakai = useMemo(() => {
    return (pemetaanData || [])
      .filter((item) => !initialData || item.cpl_id !== initialData.cpl_id)
      .reduce((sum, item) => sum + parseFloat(item.bobot || 0), 0);
  }, [pemetaanData, initialData]);

  // Hitung total bobot CPMK terpakai (HANYA untuk CPL yang sedang diedit)
  const totalBobotCPMKTerpakai = useMemo(() => {
    if (!initialData || !pemetaanCPMKData) return 0;
    return (pemetaanCPMKData || [])
      .filter(cpmk => cpmk.cpl_id === initialData.cpl_id)
      .reduce((sum, item) => sum + parseFloat(item.bobot || 0), 0);
  }, [pemetaanCPMKData, initialData]);

  const sisaBobot = useMemo(() => Math.max(100 - totalBobotTerpakai, 0), [totalBobotTerpakai]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        cpl_id: initialData.cpl_id,
        bobot: initialData.bobot || "",
      });
    } else {
      setFormData({ cpl_id: "", bobot: "" });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!initialData && !formData.cpl_id) {
      toast.error("Silakan pilih CPL terlebih dahulu.");
      return;
    }
    if (!formData.bobot || parseFloat(formData.bobot) <= 0) {
      toast.error("Bobot harus diisi dan lebih besar dari 0.");
      return;
    }

    const bobotBaru = parseFloat(formData.bobot || 0);
    const totalAkhirCPL = totalBobotTerpakai + bobotBaru;

    if (totalAkhirCPL > 100) {
      toast.error(`Total bobot CPL (${totalAkhirCPL}%) melebihi 100%! Sisa bobot ${sisaBobot}%.`);
      return;
    }

    if (
      initialData &&
      bobotBaru < parseFloat(initialData.bobot || 0) &&
      totalBobotCPMKTerpakai > bobotBaru
    ) {
      setIsConfirmResetOpen(true);
      return;
    }

    onSubmit(formData);
  };

  const handleConfirmResetAndSubmit = () => {
    onSubmit(formData);
    if (onResetCPMKs && initialData?.cpl_id) {
      onResetCPMKs(initialData.cpl_id);
    }
    setIsConfirmResetOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  {initialData ? "✏️ Edit Pemetaan CPL" : "Tambah Pemetaan CPL"}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Tutup modal"
                >
                  <HiX size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 p-6">
                <div>
                  <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
                    <span>Bobot CPL Terpakai (Total Mata Kuliah)</span>
                    <span className={totalBobotTerpakai > 100 ? 'text-red-500' : 'text-gray-800'}>
                      {totalBobotTerpakai}% / 100%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div
                      className={`h-2.5 rounded-full ${totalBobotTerpakai > 100 ? 'bg-red-500' : 'bg-blue-600'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(totalBobotTerpakai, 100)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-right text-sm text-gray-500 mt-1">
                    Sisa bobot: <strong>{sisaBobot}%</strong>
                  </p>
                </div>

                <div>
                  <label htmlFor="cpl_id" className="block text-sm font-medium text-gray-700 mb-1">Pilih CPL</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <FaTag />
                    </span>
                    <select
                      id="cpl_id"
                      name="cpl_id"
                      value={formData.cpl_id}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-gray-100"
                      disabled={!!initialData}
                    >
                      <option value="">-- Pilih CPL --</option>
                      {initialData && (
                        <option key={initialData.cpl_id} value={initialData.cpl_id}>
                          {cplOptions.find(cpl => cpl.id === initialData.cpl_id)?.kode_cpl || initialData.cpl_id}
                        </option>
                      )}
                      {cplOptions.map((cpl) => (
                        <option key={cpl.id} value={cpl.id}>
                          {cpl.kode_cpl}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

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
                      placeholder="Masukkan bobot (0-100)"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
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

      {/* Modal Konfirmasi Reset */}
      <ConfirmModal
        isOpen={isConfirmResetOpen}
        onClose={() => setIsConfirmResetOpen(false)}
        onConfirm={handleConfirmResetAndSubmit}
        title="Peringatan Validasi"
        description={`Bobot CPL baru (${formData.bobot}%) lebih rendah dari total bobot CPMK terkait (${totalBobotCPMKTerpakai}%). Melanjutkan akan ME-RESET semua bobot CPMK terkait menjadi 0. Lanjutkan?`}
        confirmText="Konfirmasi"
        // PERBAIKAN: Gunakan prop `isLoading` yang diteruskan dari parent
        isLoading={isLoading}
      />
    </>
  );
};

export default FormPemetaanCPL;

