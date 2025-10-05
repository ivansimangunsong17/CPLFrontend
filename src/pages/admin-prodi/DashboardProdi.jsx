import React, { useState } from "react";
import {
  FiUsers,
  FiUserCheck,
  FiBook,
  FiBarChart2,
  FiSearch,
} from "react-icons/fi";
import SpiderChartCPL from "../../components/Chart/SpiderChartCPL";
import {
  Legend
} from "recharts";
import { AiOutlineLine } from "react-icons/ai";
import LineChartCPL from "../../components/Chart/LineChartCPL";

const DashboardProdi = () => {
  // Dummy statistik
  const stats = [
    {
      title: "Total Mahasiswa",
      value: 178,
      icon: FiUsers,
      color: "text-blue-500",
    },
    {
      title: "Total Dosen",
      value: 50,
      icon: FiUserCheck,
      color: "text-gray-700",
    },
    {
      title: "Total Mata Kuliah",
      value: 60,
      icon: FiBook,
      color: "text-green-500",
    },
    {
      title: "Jumlah CPL",
      value: 10,
      icon: FiBarChart2,
      color: "text-yellow-500",
    },
  ];

  // Dummy tabel data
  const [search, setSearch] = useState("");
  const data = [
    {
      matkul: "Struktur Data",
      kelas: "Struktur Data A",
      dosen: "Rizka Andayani, S.T., M.T.",
      periode: "2024 Genap",
      status: "Selesai",
    },
    {
      matkul: "Struktur Data",
      kelas: "Struktur Data B",
      dosen: "Rizka Andayani, S.T., M.T.",
      periode: "2024 Genap",
      status: "Tidak ada",
    },
    {
      matkul: "Struktur Data",
      kelas: "Struktur Data C",
      dosen: "Dr. Budi Santoso, S.Kom., M.Cs.",
      periode: "2024 Genap",
      status: "Selesai",
    },
    {
      matkul: "Basis Data",
      kelas: "Basis Data A",
      dosen: "Nadia Amalia, S.T., M.T.I.",
      periode: "2024 Genap",
      status: "Tidak ada",
    },
    {
      matkul: "Basis Data",
      kelas: "Basis Data B",
      dosen: "Nadia Amalia, S.T., M.T.I.",
      periode: "2024 Genap",
      status: "Selesai",
    },
    {
      matkul: "Basis Data",
      kelas: "Basis Data C",
      dosen: "Nadia Amalia, S.T., M.T.I.",
      periode: "2024 Genap",
      status: "Tidak ada",
    },
    {
      matkul: "Sistem Operasi",
      kelas: "Sistem Operasi A",
      dosen: "Taufik Hidayat, S.T., M.T.",
      periode: "2024 Genap",
      status: "Selesai",
    },
    {
      matkul: "Sistem Operasi",
      kelas: "Sistem Operasi B",
      dosen: "Taufik Hidayat, S.T., M.T.",
      periode: "2024 Genap",
      status: "Tidak ada",
    },
    {
      matkul: "Sistem Operasi",
      kelas: "Sistem Operasi C",
      dosen: "Taufik Hidayat, S.T., M.T.",
      periode: "2024 Genap",
      status: "Selesai",
    },
    {
      matkul: "Kecerdasan Buatan",
      kelas: "Kecerdasan Buatan A",
      dosen: "Taufik Hidayat, S.T., M.T.",
      periode: "2024 Genap",
      status: "Tidak ada",
    },
  ];

  // Filter pencarian
  const filteredData = data.filter(
    (row) =>
      row.matkul.toLowerCase().includes(search.toLowerCase()) ||
      row.kelas.toLowerCase().includes(search.toLowerCase()) ||
      row.dosen.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <section className="bg-white shadow rounded-xl p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            Selamat Datang di Dashboard{" "}
            <span role="img" aria-label="book">
              📖
            </span>{" "}
            SIP-CPL
          </h1>
          <p className="text-gray-600 leading-relaxed">
            SIP-CPL adalah sistem yang dirancang untuk mempermudah pengelolaan
            kurikulum berbasis Outcome-Based Education (OBE). Fungsinya mencakup
            pengelolaan data dosen, data mahasiswa, serta data kurikulum yang
            meliputi Capaian Pembelajaran Lulusan (CPL), data mata kuliah,
            pemetaan CPL, hingga proses penilaian pembelajaran.
          </p>
          <p className="text-gray-600 mt-3">
            Untuk memudahkan penggunaan, tersedia file panduan tata cara
            pemakaian website yang dapat Anda unduh di bawah ini.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-red-200 transition">
              <span>📕</span>
              Panduan Tata Cara Pemakaian Website
            </button>
            <a
              href="#"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-blue-700 transition"
            >
              Download PDF
            </a>
          </div>
        </section>

        {/* Statistik Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center hover:shadow-md transition"
            >
              <item.icon size={40} className={`${item.color} mb-3`} />
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
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-2 text-sm outline-none w-48"
              />
              <button className="bg-blue-600 text-white px-3 py-2 hover:bg-blue-700 transition">
                <FiSearch size={18} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border">
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
                {filteredData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b last:border-0 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{row.matkul}</td>
                    <td className="py-3 px-4">{row.kelas}</td>
                    <td className="py-3 px-4">{row.dosen}</td>
                    <td className="py-3 px-4">{row.periode}</td>
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
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Spider Chart CPL */}
        <section>
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Spider Chart CPL
            </h2>

            {/* Grid Spider Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="flex flex-col items-center">
                <SpiderChartCPL />
                <p className="mt-4 text-gray-600 font-medium">Angkatan 2021-2025</p>
              </div>
              <div className="flex flex-col items-center">
                <SpiderChartCPL />
                <p className="mt-4 text-gray-600 font-medium">Angkatan 2021</p>
              </div>
            </div>

            {/* Tambahan Grafik Perkembangan */}
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Grafik Perkembangan CPL Tiap Angkatan
              </h2>
              <LineChartCPL/> {/* komponen grafik line */}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default DashboardProdi;
