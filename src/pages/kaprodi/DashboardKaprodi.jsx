import React, { useState } from "react";
import { FaDownload, FaSearch, FaSort, FaChalkboardTeacher, FaUserGraduate, FaClipboardCheck, FaBook } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const initialCPL = [
  { kode: "CPL-01", deskripsi: "Analisis kebutuhan perangkat lunak", capaian: 85, target: 80, status: "Tercapai" },
  { kode: "CPL-02", deskripsi: "Desain arsitektur sistem", capaian: 75, target: 80, status: "Belum" },
  { kode: "CPL-03", deskripsi: "Implementasi algoritma", capaian: 82, target: 80, status: "Tercapai" },
  { kode: "CPL-04", deskripsi: "Pengujian sistem", capaian: 68, target: 75, status: "Belum" },
];

const DashboardKaprodi = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(initialCPL);
  const [sortConfig, setSortConfig] = useState(null);

  const statistics = {
    mahasiswa: 1200,
    dosen: 15,
    matkulAktif: 18,
    totalCPL: 12,
    cplTercapai: 8,
    cplBelumTercapai: 4,
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedData = [...data].sort((a, b) => (
      direction === "asc" ? a[key] - b[key] : b[key] - a[key]
    ));
    setData(sortedData);
    setSortConfig({ key, direction });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <FaUserGraduate className="text-blue-600 text-3xl mr-4" />
          <div>
            <h3 className="text-gray-600">Mahasiswa</h3>
            <p className="text-xl font-bold">{statistics.mahasiswa}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <FaChalkboardTeacher className="text-green-600 text-3xl mr-4" />
          <div>
            <h3 className="text-gray-600">Dosen</h3>
            <p className="text-xl font-bold">{statistics.dosen}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <FaBook className="text-yellow-600 text-3xl mr-4" />
          <div>
            <h3 className="text-gray-600">Matkul Aktif</h3>
            <p className="text-xl font-bold">{statistics.matkulAktif}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <FaClipboardCheck className="text-purple-600 text-3xl mr-4" />
          <div>
            <h3 className="text-gray-600">CPL Tercapai</h3>
            <p className="text-xl font-bold">
              {statistics.cplTercapai}/{statistics.totalCPL}
            </p>
          </div>
        </div>
      </div>

      {/* Highlight CPL Belum Tercapai */}
      <div className="bg-red-100 p-4 rounded-lg mb-6 border border-red-300">
        <h3 className="text-red-600 font-bold mb-2 flex items-center">
          <FaClipboardCheck className="mr-2" />
          {statistics.cplBelumTercapai} CPL Belum Mencapai Target
        </h3>
        <p className="text-sm text-red-600">
          Perlu evaluasi pada mata kuliah terkait CPL yang belum tercapai
        </p>
      </div>

      {/* Pencarian dan Tabel CPL */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-700">
          Detail Capaian CPL Program Studi
        </h2>
      </div>

      <div className="mb-4 flex items-center bg-white p-2 rounded-lg shadow-md">
        <FaSearch className="text-gray-500 mx-2" />
        <input
          type="text"
          placeholder="Cari CPL..."
          className="w-full p-2 outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-6">Kode CPL</th>
              <th className="py-3 px-6">Deskripsi</th>
              <th className="py-3 px-6 cursor-pointer" onClick={() => handleSort("capaian")}>
                Capaian <FaSort className="inline ml-1" />
              </th>
              <th className="py-3 px-6">Target</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.filter(item => item.deskripsi.toLowerCase().includes(search.toLowerCase()))
              .map((item, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 font-semibold">{item.kode}</td>
                  <td className="py-3 px-6">{item.deskripsi}</td>
                  <td className="py-3 px-6 font-bold">{item.capaian}%</td>
                  <td className="py-3 px-6">{item.target}%</td>
                  <td className="py-3 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === "Tercapai"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Grafik Progress (Bisa ditambahkan kemudian) */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-gray-700 font-bold mb-4">Progress Capaian CPL</h3>
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-gray-700 font-bold mb-4">Progress Capaian CPL</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={initialCPL}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="kode" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="capaian" name="Capaian" stroke="#8884d8" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="target" name="Target" stroke="#82ca9d" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default DashboardKaprodi;