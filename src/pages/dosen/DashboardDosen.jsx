import React from 'react'
import { FaFilePdf } from "react-icons/fa";
import { FiBarChart2, FiBook, FiUserCheck, FiUsers } from 'react-icons/fi';

import DetailDistribusiDosen from './DetailDistribusiDosen';
import TabelDistribusiDosen from '../../components/Chart/TabelDistribusiDosen';

const DashboardDosen = () => {

  const stats = [
    { title: "Total Mahasiswa", value: 178, icon: FiUsers, color: "text-blue-500" },
    { title: "Total Dosen", value: 50, icon: FiUserCheck, color: "text-gray-700" },
    { title: "Total Mata Kuliah", value: 60, icon: FiBook, color: "text-green-500" },
    { title: "Jumlah CPL", value: 10, icon: FiBarChart2, color: "text-yellow-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
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


        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-2 flex flex-col items-center justify-center hover:shadow-md transition">
              <item.icon size={30} className={`${item.color} mb-3 `} />
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-2xl font-bold text-gray-800">{item.value}</p>
            </div>
          ))}
        </section>

        {/* TABEL STATUS PENGISIAN NILAI */}
        <div className='font-bold '>Status Pengisian / Upload Nilai Pada Mata Kuliah Yang Diampu</div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-gray-800">
            <thead>
              <tr className="bg-[#007BFF] text-white text-sm uppercase tracking-wide">
                <th className="py-3 px-4 text-center">Mata Kuliah ↓</th>
                <th className="py-3 px-4 text-center">Nama Kelas ↓</th>
                <th className="py-3 px-4 text-center">Periode ↓</th>
                <th className="py-3 px-4 text-center">Status ↓</th>
              </tr>
            </thead>
            <tbody>
              {[
                { mk: "Struktur Data", kelas: "Struktur Data A", periode: "2024 Genap", status: "Selesai" },
                { mk: "Pemrograman Web", kelas: "Web B", periode: "2024 Genap", status: "Belum Selesai" },
                { mk: "Algoritma", kelas: "Algo A", periode: "2024 Ganjil", status: "Selesai" },
                { mk: "Struktur Data", kelas: "Struktur Data A", periode: "2024 Genap", status: "Selesai" },
                { mk: "Pemrograman Web", kelas: "Web B", periode: "2024 Genap", status: "Belum Selesai" },
                { mk: "Algoritma", kelas: "Algo A", periode: "2024 Ganjil", status: "Selesai" },
                { mk: "Struktur Data", kelas: "Struktur Data A", periode: "2024 Genap", status: "Selesai" },
                { mk: "Pemrograman Web", kelas: "Web B", periode: "2024 Genap", status: "Belum Selesai" },
                { mk: "Algoritma", kelas: "Algo A", periode: "2024 Ganjil", status: "Selesai" },
                { mk: "Struktur Data", kelas: "Struktur Data A", periode: "2024 Genap", status: "Selesai" },
                { mk: "Pemrograman Web", kelas: "Web B", periode: "2024 Genap", status: "Belum Selesai" },
                { mk: "Algoritma", kelas: "Algo A", periode: "2024 Ganjil", status: "Selesai" }
              ].map((row, i) => (
                <tr key={i} className="border-b last:border-b-0 border-gray-200 hover:bg-gray-50 transition">
                  <td className="py-3 px-4 text-sm text-center font-medium">{row.mk}</td>
                  <td className="py-3 px-4 text-sm text-center">{row.kelas}</td>
                  <td className="py-3 px-4 text-sm text-center">{row.periode}</td>
                  <td className="py-3 px-4 text-sm text-center">
                    {row.status === "Selesai" ? (
                      <span className="inline-flex  items-center gap-1 text-green-600 bg-green-50 border border-green-200 px-3 py-1 rounded-full text-sm font-medium">
                        ● {row.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-sm font-medium">
                        ● {row.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <TabelDistribusiDosen />
        </div>
      </div>
    </div>

  )
}

export default DashboardDosen