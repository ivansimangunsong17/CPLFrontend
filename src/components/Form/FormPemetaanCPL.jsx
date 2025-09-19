import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const FormPemetaanCPL = ({
  isOpen,
  onClose,
  onSubmit,
  cplOptions,
  initialData,
  isLoading,
  pemetaanData,
}) => {
  const [formData, setFormData] = useState({ cpl_id: "", bobot: "" });

  // Hitung total bobot terpakai (kecuali data yang sedang diedit)
  const totalBobotTerpakai = useMemo(() => {
    return (pemetaanData || [])
      .filter((item) => !initialData || item.cpl_id !== initialData.cpl_id)
      .reduce((sum, item) => sum + parseFloat(item.bobot || 0), 0);
  }, [pemetaanData, initialData]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        cpl_id: initialData.cpl_id,
        bobot: initialData.bobot || "",
      });
    } else {
      setFormData({ cpl_id: "", bobot: "" });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bobotBaru = parseFloat(formData.bobot || 0);
    const totalAkhir = totalBobotTerpakai + bobotBaru;

    if (totalAkhir > 100) {

      toast.error("Total bobot melebihi 100%!");
      return;
    }

    onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {initialData ? "✏️ Edit Pemetaan CPL" : "Tambah Pemetaan CPL"}
            </h2>

            {/* Info Total Bobot */}
            <div
              className={`mb-4 p-3 rounded-lg text-sm font-medium ${totalBobotTerpakai === 100
                ? "bg-green-100 text-green-700"
                : totalBobotTerpakai < 100
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
                }`}
            >
              <p>
                Terpakai: <strong>{totalBobotTerpakai}%</strong>
              </p>
              <p>
                Sisa: <strong>{Math.max(100 - totalBobotTerpakai, 0)}%</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Pilih CPL</label>
                <select
                  name="cpl_id"
                  value={formData.cpl_id}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  disabled={!!initialData}
                >
                  <option value="">-- Pilih CPL --</option>
                  {cplOptions.map((cpl) => (
                    <option key={cpl.id} value={cpl.id}>
                      {cpl.kode_cpl} - {cpl.nama_cpl}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Bobot (%)</label>
                <input
                  type="number"
                  name="bobot"
                  value={formData.bobot}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan bobot (0-100)"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
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

export default FormPemetaanCPL;
