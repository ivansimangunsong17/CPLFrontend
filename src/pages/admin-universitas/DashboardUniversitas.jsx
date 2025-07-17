import React, { useState } from "react";
import { FaDownload, FaSearch, FaUniversity, FaChalkboardTeacher, FaUsers, FaUserGraduate } from "react-icons/fa";

const DashboardUniversitas = () => {
  const [search, setSearch] = useState("");

  // Sample data
  const dataFakultas = [
    { id: 1, nama: "Fakultas Teknologi Informasi", kode: "FTI", dekan: "Prof. Dr. Andi", jumlahProdi: 5 },
    { id: 2, nama: "Fakultas Teknik Elektro", kode: "FTE", dekan: "Prof. Dr. Budi", jumlahProdi: 4 },
  ];

  const dataProdi = [
    { id: 1, nama: "Teknik Informatika", fakultas: "FTI", kaprodi: "Dr. Ahmad", jumlahMahasiswa: 350, status: "Aktif" },
    { id: 2, nama: "Sistem Informasi", fakultas: "FTI", kaprodi: "Dr. Budi", jumlahMahasiswa: 280, status: "Aktif" },
  ];

  const dataAkun = [
    { id: 1, nama: "Admin FTI", email: "admin.fti@univ.ac.id", role: "Admin Fakultas", status: "Aktif" },
    { id: 2, nama: "Kaprodi TI", email: "kaprodi.ti@univ.ac.id", role: "Admin Prodi", status: "Aktif" },
  ];

  // Data hasil perhitungan CPL
  const hasilPerhitunganCPL = [
    { id: 1, programStudi: "Teknik Informatika", nilaiCPL: 88, nilaiCPMK: 90, status: "Selesai" },
    { id: 2, programStudi: "Perikanan dan Kelautan", nilaiCPL: 87, nilaiCPMK: 85, status: "Selesai" },
    { id: 3, programStudi: "Hukum", nilaiCPL: 86, nilaiCPMK: 88, status: "Proses" },
    { id: 4, programStudi: "Pendidikan Kedokteran", nilaiCPL: null, nilaiCPMK: null, status: "Tidak ada" },
    { id: 5, programStudi: "Teknik Elektro", nilaiCPL: 88, nilaiCPMK: 90, status: "Proses" },
    { id: 6, programStudi: "Teknik Mesin", nilaiCPL: 87, nilaiCPMK: 89, status: "Proses" },
    { id: 7, programStudi: "Teknik Sipil", nilaiCPL: 86, nilaiCPMK: 88, status: "Proses" },
    { id: 8, programStudi: "Teknik Kimia", nilaiCPL: 87, nilaiCPMK: 89, status: "Proses" },
    { id: 9, programStudi: "Teknik Lingkungan", nilaiCPL: 87, nilaiCPMK: 90, status: "Proses" },
    { id: 10, programStudi: "Ilmu Komputer", nilaiCPL: 88, nilaiCPMK: 89, status: "Proses" },
  ];

  const statistics = {
    totalFakultas: dataFakultas.length,
    totalProdi: dataProdi.length,
    totalDosen: 45,
    totalMahasiswa: 1200,
  };

  // Filter data berdasarkan search
  const filteredHasilPerhitungan = hasilPerhitunganCPL.filter(item =>
    item.programStudi.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-800";
      case "Proses":
        return "bg-yellow-100 text-yellow-800";
      case "Tidak ada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Universitas</h1>

      {/* Statistik Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <FaUniversity className="text-blue-500 text-2xl mr-3" />
            <div>
              <p className="text-gray-500 text-sm">Fakultas</p>
              <p className="text-xl font-bold">{statistics.totalFakultas}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <FaChalkboardTeacher className="text-green-500 text-2xl mr-3" />
            <div>
              <p className="text-gray-500 text-sm">Program Studi</p>
              <p className="text-xl font-bold">{statistics.totalProdi}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <FaUsers className="text-purple-500 text-2xl mr-3" />
            <div>
              <p className="text-gray-500 text-sm">Dosen</p>
              <p className="text-xl font-bold">{statistics.totalDosen}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <FaUserGraduate className="text-yellow-500 text-2xl mr-3" />
            <div>
              <p className="text-gray-500 text-sm">Mahasiswa</p>
              <p className="text-xl font-bold">{statistics.totalMahasiswa}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hasil Perhitungan Capaian Pembelajaran Lulusan */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Hasil Perhitungan Capaian Pembelajaran Lulusan</h2>
            <div className="max-w-md">
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari Program Studi..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Search Bar */}

        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-medium">
                  <div className="flex items-center gap-2">
                    Program Studi
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-medium">
                  <div className="flex items-center gap-2">
                    Nilai CPL
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-medium">
                  <div className="flex items-center gap-2">
                    Nilai CPMK
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredHasilPerhitungan.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900">{item.programStudi}</td>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {item.nilaiCPL || '-'}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {item.nilaiCPMK || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.status === 'Selesai' ? 'bg-green-500' :
                        item.status === 'Proses' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredHasilPerhitungan.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FaSearch size={48} className="mx-auto" />
            </div>
            <p className="text-gray-500 text-lg">Tidak ada data yang ditemukan</p>
            <p className="text-gray-400 text-sm mt-2">
              Coba ubah kata kunci pencarian Anda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardUniversitas;