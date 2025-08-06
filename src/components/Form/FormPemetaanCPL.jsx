import React, { useEffect, useState, useMemo } from "react";

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
      .reduce((sum, item) => sum + parseFloat(item.pivot?.bobot || 0), 0);
  }, [pemetaanData, initialData]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        cpl_id: initialData.cpl_id,
        bobot: initialData.pivot?.bobot || "",
      });
    } else {
      setFormData({ cpl_id: "", bobot: "" });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bobotBaru = parseFloat(formData.bobot || 0);
    const totalAkhir = totalBobotTerpakai + bobotBaru;

    // ✅ Validasi total bobot tidak melebihi 100%
    if (totalAkhir > 100) {
      alert(`Total bobot melebihi 100%! Saat ini: ${totalAkhir}%`);
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Pemetaan CPL" : "Tambah Pemetaan CPL"}
        </h2>

        {/* ✅ Info Total Bobot */}
        <div className="mb-3 p-3 bg-gray-100 rounded text-sm">
          <p>
            Total bobot terpakai: <strong>{totalBobotTerpakai}%</strong>
          </p>
          <p>
            Sisa bobot: <strong>{100 - totalBobotTerpakai}%</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Pilih CPL</label>
            <select
              name="cpl_id"
              value={formData.cpl_id}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
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
              className="w-full border px-3 py-2 rounded"
              placeholder="Masukkan bobot (0-100)"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white bg-blue-500 rounded ${
                isLoading ? "opacity-50" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPemetaanCPL;
