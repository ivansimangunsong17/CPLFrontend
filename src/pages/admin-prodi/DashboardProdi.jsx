import React, { useState } from "react";
import {
  FiUsers,
  FiUserCheck,
  FiBook,
  FiBarChart2,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaFilePdf } from "react-icons/fa";
import SpiderChartCPL from "../../components/Chart/SpiderChartCPL";
import LineChartCPL from "../../components/Chart/LineChartCPL";
import TabelDistribusi from "../../components/Chart/TabelDistribusi";
import TabelMonitoring from "../../components/Chart/TabelMonitoring";

const DashboardProdi = () => {
  const [search, setSearch] = useState("");

  // Dummy Data
  const data = [
    { matkul: "Struktur Data", kelas: "Struktur Data A", dosen: "Rizka Andayani, S.T., M.T.", periode: "2024 Genap", status: "Selesai" },
    { matkul: "Struktur Data", kelas: "Struktur Data B", dosen: "Rizka Andayani, S.T., M.T.", periode: "2024 Genap", status: "Tidak ada" },
    { matkul: "Struktur Data", kelas: "Struktur Data C", dosen: "Dr. Budi Santoso, S.Kom., M.Cs.", periode: "2024 Genap", status: "Selesai" },
    { matkul: "Basis Data", kelas: "Basis Data A", dosen: "Nadia Amalia, S.T., M.T.I.", periode: "2024 Genap", status: "Tidak ada" },
    { matkul: "Basis Data", kelas: "Basis Data B", dosen: "Nadia Amalia, S.T., M.T.I.", periode: "2024 Genap", status: "Selesai" },
    { matkul: "Basis Data", kelas: "Basis Data C", dosen: "Nadia Amalia, S.T., M.T.I.", periode: "2024 Genap", status: "Tidak ada" },
    { matkul: "Sistem Operasi", kelas: "Sistem Operasi A", dosen: "Taufik Hidayat, S.T., M.T.", periode: "2024 Genap", status: "Selesai" },
    { matkul: "Sistem Operasi", kelas: "Sistem Operasi B", dosen: "Taufik Hidayat, S.T., M.T.", periode: "2024 Genap", status: "Tidak ada" },
    { matkul: "Sistem Operasi", kelas: "Sistem Operasi C", dosen: "Taufik Hidayat, S.T., M.T.", periode: "2024 Genap", status: "Selesai" },
    { matkul: "Kecerdasan Buatan", kelas: "Kecerdasan Buatan A", dosen: "Taufik Hidayat, S.T., M.T.", periode: "2024 Genap", status: "Tidak ada" },
    { matkul: "Struktur Data", kelas: "Struktur Data A", dosen: "Rizka Andayani, S.T., M.T.", periode: "2024 Genap", status: "Selesai" },
    { matkul: "Struktur Data", kelas: "Struktur Data B", dosen: "Rizka Andayani, S.T., M.T.", periode: "2024 Genap", status: "Tidak ada" },
    { matkul: "Struktur Data", kelas: "Struktur Data C", dosen: "Dr. Budi Santoso, S.Kom., M.Cs.", periode: "2024 Genap", status: "Selesai" },
    { matkul: "Sistem Operasi", kelas: "Sistem Operasi A", dosen: "Taufik Hidayat, S.T., M.T.", periode: "2024 Genap", status: "Selesai" },
    { matkul: "Sistem Operasi", kelas: "Sistem Operasi B", dosen: "Taufik Hidayat, S.T., M.T.", periode: "2024 Genap", status: "Tidak ada" },
    { matkul: "Sistem Operasi", kelas: "Sistem Operasi C", dosen: "Taufik Hidayat, S.T., M.T.", periode: "2024 Genap", status: "Selesai" },
    { matkul: "Kecerdasan Buatan", kelas: "Kecerdasan Buatan A", dosen: "Taufik Hidayat, S.T., M.T.", periode: "2024 Genap", status: "Tidak ada" },
    { matkul: "Basis Data", kelas: "Basis Data A", dosen: "Nadia Amalia, S.T., M.T.I.", periode: "2024 Genap", status: "Tidak ada" },
    { matkul: "Basis Data", kelas: "Basis Data B", dosen: "Nadia Amalia, S.T., M.T.I.", periode: "2024 Genap", status: "Selesai" },
    { matkul: "Basis Data", kelas: "Basis Data C", dosen: "Nadia Amalia, S.T., M.T.I.", periode: "2024 Genap", status: "Tidak ada" },

  ];

  // 1. Filter Data
  const filteredData = data.filter(
    (row) =>
      row.matkul.toLowerCase().includes(search.toLowerCase()) ||
      row.kelas.toLowerCase().includes(search.toLowerCase()) ||
      row.dosen.toLowerCase().includes(search.toLowerCase())
  );

  // 2. State Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // 3. Hitung Total Halaman
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // 4. Ambil Data untuk Halaman Saat Ini
  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // Dummy statistik
  const stats = [
    { title: "Total Mahasiswa", value: 178, icon: FiUsers, color: "text-blue-500" },
    { title: "Total Dosen", value: 50, icon: FiUserCheck, color: "text-gray-700" },
    { title: "Total Mata Kuliah", value: 60, icon: FiBook, color: "text-green-500" },
    { title: "Jumlah CPL", value: 10, icon: FiBarChart2, color: "text-yellow-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <section className="bg-white shadow rounded-xl p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            Selamat Datang di Dashboard{" "}
            <span role="img" aria-label="book">📖</span> SIP-CPL
          </h1>
          <p className="text-gray-600 leading-relaxed">
            SIP-CPL adalah sistem yang dirancang untuk mempermudah pengelolaan kurikulum berbasis Outcome-Based Education (OBE). Fungsinya mencakup pengelolaan data dosen, data mahasiswa, serta data kurikulum yang meliputi Capaian Pembelajaran Lulusan (CPL), data mata kuliah, pemetaan CPL, hingga proses penilaian pembelajaran.
            Untuk memudahkan penggunaan, tersedia file panduan tata cara pemakaian website yang dapat Anda unduh di bawah ini.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-red-200 transition">
              <FaFilePdf /> Panduan Tata Cara Pemakaian Website
            </button>
            <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-blue-700 transition">
              Download PDF
            </a>
          </div>
        </section>

        {/* Statistik Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-2 flex flex-col items-center justify-center hover:shadow-md transition">
              <item.icon size={30} className={`${item.color} mb-3 `} />
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-2xl font-bold text-gray-800">{item.value}</p>
            </div>
          ))}
        </section>

        {/* Tabel Status Nilai */}
        <section className="bg-white shadow rounded-xl p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Status Pengisian / Upload Nilai Pada Mata Kuliah
            </h2>
            <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
              <input
                type="text"
                placeholder="Cari Berdasarkan.."
                value={search}
                onChange={handleSearchChange}
                className="px-3 py-2 text-sm outline-none w-48"
              />
              <button className="bg-blue-600 text-white px-3 py-2 hover:bg-blue-700 transition">
                <FiSearch size={18} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-300">
            <table className="w-full text-sm text-gray-700">
              <thead>
                <tr className="bg-blue-600 text-white text-sm">
                  <th className="py-3 px-4 text-left">Mata Kuliah</th>
                  <th className="py-3 px-4 text-left">Nama Kelas</th>
                  <th className="py-3 px-4 text-left">Dosen</th>
                  <th className="py-3 px-4 text-left">Periode</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(
                  paginatedData.reduce((acc, row) => {
                    if (!acc[row.matkul]) acc[row.matkul] = [];
                    acc[row.matkul].push(row);
                    return acc;
                  }, {})
                ).map(([matkul, rows]) =>
                  rows.map((row, idx) => (
                    <tr
                      key={row.kelas}
                      className={`hover:bg-gray-50 transition ${idx === rows.length - 1 ? "border-b border-gray-300" : "border-0 border-gray-300"
                        }`}
                    >
                      {idx === 0 && (
                        <td
                          rowSpan={rows.length}
                          className="py-3 px-4 font-semibold border-r-1 border-gray-300 align-top bg-white"
                        >
                          {matkul}
                        </td>
                      )}
                      <td className="py-3 px-4 border-r border-gray-300">{row.kelas}</td>
                      <td className="py-3 px-4 border-r border-gray-300">{row.dosen}</td>
                      <td className="py-3 px-4 border-r border-gray-300">{row.periode}</td>
                      <td className="py-3 px-4">
                        {row.status === "Selesai" ? (
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-600">
                            ● {row.status}
                          </span>
                        ) : (
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
                            ● {row.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
                {paginatedData.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-500">
                      Data tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Modern */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Menampilkan <span className="font-medium">{(page - 1) * rowsPerPage + 1}</span> sampai <span className="font-medium">{Math.min(page * rowsPerPage, filteredData.length)}</span> dari <span className="font-medium">{filteredData.length}</span> hasil
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage((p) => Math.max(p - 1, 1))}
                      className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                      {page}
                    </span>
                    <button
                      disabled={page === totalPages || totalPages === 0}
                      onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                      className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${page === totalPages || totalPages === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <FiChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Spider Chart CPL */}
        <section>
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Spider Chart CPL
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* Kiri: Rata-rata (Tanpa Filter) */}
              <div className="flex flex-col items-center">
                <SpiderChartCPL />
              </div>
              {/* Kanan: Per Angkatan (Dengan Filter) */}
              <div className="flex flex-col items-center">
                <SpiderChartCPL enableFilter={true} />
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Grafik Perkembangan CPL Tiap Angkatan
              </h2>
              <LineChartCPL />
            </div>

          </div>
        </section>
        {/* Tabel Distribusi */}
        <div className="mt-10">
          <TabelDistribusi />
        </div>
        {/* Tabel Monitoring */}
        <div className="mt-10">
          <TabelMonitoring />
        </div>


      </div>
    </div>
  );
};

export default DashboardProdi;