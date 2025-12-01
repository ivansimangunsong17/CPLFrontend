import React, { useState, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const PemetaanKaprodi = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // === Dummy data MK + kelas + periode ===
  const dummyMK = [
    { kodeMK: "MK-1101", namaMK: "Struktur Data", kelasList: ["Struktur Data A", "Struktur Data B"], periode: "2025 Ganjil" },
    { kodeMK: "MK-1102", namaMK: "Basis Data", kelasList: ["Basis Data A", "Basis Data B", "Basis Data C"], periode: "2025 Ganjil" },
    { kodeMK: "MK-1201", namaMK: "Sistem Operasi", kelasList: ["Sistem Operasi A"], periode: "2025 Genap" },
    { kodeMK: "MK-1301", namaMK: "Pemrograman Web", kelasList: ["Pemrograman Web A", "Pemrograman Web B"], periode: "2024 Ganjil" },
    { kodeMK: "MK-1105", namaMK: "Algoritma", kelasList: ["Algoritma A", "Algoritma B"], periode: "2024 Genap" },
    { kodeMK: "MK-1106", namaMK: "Rekayasa Perangkat Lunak", kelasList: ["RPL A"], periode: "2025 Ganjil" },
    { kodeMK: "MK-1207", namaMK: "Kalkulus", kelasList: ["Kalkulus A", "Kalkulus B"], periode: "2023 Genap" },
    { kodeMK: "MK-1308", namaMK: "Kecerdasan Buatan", kelasList: ["AI A", "AI B"], periode: "2025 Ganjil" },
  ];


  const flatMK = dummyMK.flatMap(mk =>
    mk.kelasList.map(kelas => ({
      kodeMK: mk.kodeMK,
      namaMK: mk.namaMK,
      kelas,
      periode: mk.periode
    }))
  );

  const filteredMK = useMemo(() => {
    return flatMK.filter(
      (mk) =>
        mk.kodeMK.toLowerCase().includes(search.toLowerCase()) ||
        mk.namaMK.toLowerCase().includes(search.toLowerCase()) ||
        mk.kelas.toLowerCase().includes(search.toLowerCase()) ||
        mk.periode.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);


  return (
    <div className="p-6 space-y-5">

      {/* Header + Search */}
      <div className="text-lg font-semibold flex justify-between items-center text-gray-800">
        <h1>Daftar Pemetaan Mata Kuliah</h1>
        <div className="relative w-full sm:w-[280px]">
          <input
            type="text"
            placeholder="Cari data..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10
                       text-sm text-gray-700 placeholder:text-gray-400
                       focus:border-blue-400 focus:ring-2 focus:ring-blue-100 
                       outline-none transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <FiSearch size={18} />
          </div>
        </div>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-blue-600 text-white font-semibold">
                <th className="p-3 text-left pl-10">Kode MK</th>
                <th className="p-3 text-left">Nama Mata Kuliah</th>
                <th className="p-3 text-left">Nama Kelas</th>
                <th className="p-3 text-center">Periode</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filteredMK.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-400">
                    Data Mata Kuliah tidak ditemukan
                  </td>
                </tr>
              ) : (
                filteredMK.map((mk, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="p-4 pl-10 font-medium text-gray-900">{mk.kodeMK}</td>
                    <td className="p-3 text-gray-700 font-medium">{mk.namaMK}</td>
                    <td className="p-3 text-gray-700">{mk.kelas}</td>
                    <td className="p-3 text-center font-semibold text-gray-900">{mk.periode}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => navigate(`/dashboard/kaprodi/hasil_perhitungan/${mk.kodeMK}`)}
                        className="text-blue-600 font-medium hover:text-blue-800 transition"
                      >
                        Lihat 👁
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default PemetaanKaprodi;
