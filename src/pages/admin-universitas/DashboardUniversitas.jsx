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

  const statistics = {
    totalFakultas: dataFakultas.length,
    totalProdi: dataProdi.length,
    totalDosen: 45,
    totalMahasiswa: 1200,
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

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Cari data..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Data Boxes */}
      <div className="space-y-6">

        {/* Fakultas Box */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Data Fakultas</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Lihat Semua →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-gray-600 text-sm border-b">
                <tr>
                  <th className="pb-2">Nama Fakultas</th>
                  <th className="pb-2">Kode</th>
                  <th className="pb-2">Dekan</th>
                  <th className="pb-2">Jumlah Prodi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dataFakultas.map((fakultas) => (
                  <tr key={fakultas.id} className="hover:bg-gray-50">
                    <td className="py-3">{fakultas.nama}</td>
                    <td className="py-3 font-medium">{fakultas.kode}</td>
                    <td className="py-3">{fakultas.dekan}</td>
                    <td className="py-3">{fakultas.jumlahProdi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Prodi Box */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Data Program Studi</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Lihat Semua →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-gray-600 text-sm border-b">
                <tr>
                  <th className="pb-2">Nama Prodi</th>
                  <th className="pb-2">Fakultas</th>
                  <th className="pb-2">Kaprodi</th>
                  <th className="pb-2">Mahasiswa</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dataProdi.map((prodi) => (
                  <tr key={prodi.id} className="hover:bg-gray-50">
                    <td className="py-3">{prodi.nama}</td>
                    <td className="py-3">{prodi.fakultas}</td>
                    <td className="py-3">{prodi.kaprodi}</td>
                    <td className="py-3">{prodi.jumlahMahasiswa}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${prodi.status === "Aktif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {prodi.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Akun Box */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Data Akun Admin</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Lihat Semua →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-gray-600 text-sm border-b">
                <tr>
                  <th className="pb-2">Nama</th>
                  <th className="pb-2">Email</th>
                  <th className="pb-2">Role</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dataAkun.map((akun) => (
                  <tr key={akun.id} className="hover:bg-gray-50">
                    <td className="py-3">{akun.nama}</td>
                    <td className="py-3">{akun.email}</td>
                    <td className="py-3">{akun.role}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${akun.status === "Aktif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {akun.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUniversitas;