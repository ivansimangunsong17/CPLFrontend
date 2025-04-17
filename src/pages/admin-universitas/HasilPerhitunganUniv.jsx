import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineEye } from "react-icons/ai";

const HasilPerhitunganUniv = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Data contoh yang diperbarui
  const prodiList = [
    {
      nama: "Teknik Informatika",
      kaprodi: "Dr. Ahmad Fauzi, M.Kom",
      capaian: "85%",
      status: "Sangat Baik"
    },
    {
      nama: "Sistem Informasi",
      kaprodi: "Dr. Siti Aminah, M.T.I.",
      capaian: "72%",
      status: "Baik"
    },
    {
      nama: "Teknik Elektro",
      kaprodi: "Prof. Budi Santoso, Ph.D.",
      capaian: "91%",
      status: "Sangat Baik"
    },
    {
      nama: "Manajemen",
      kaprodi: "Dr. Rina Wijayanti, S.E., M.M.",
      capaian: "65%",
      status: "Cukup"
    },
    {
      nama: "Akuntansi",
      kaprodi: "Dewi Kusuma, S.E., Ak., M.M.",
      capaian: "78%",
      status: "Baik"
    }
  ];

  // Filter data
  const filteredData = prodiList.filter(item =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.kaprodi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Warna berdasarkan status
  const getStatusColor = (status) => {
    switch (status) {
      case "Sangat Baik": return "bg-green-100 text-green-800";
      case "Baik": return "bg-blue-100 text-blue-800";
      case "Cukup": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Fungsi untuk melihat detail
  const viewDetail = (prodi) => {
    alert(`Detail untuk ${prodi.nama}\nKaprodi: ${prodi.kaprodi}\nCapaian: ${prodi.capaian}\nStatus: ${prodi.status}`);
    // Di implementasi nyata bisa diarahkan ke halaman detail atau buka modal
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Judul */}
        <h1 className="text-xl font-bold text-gray-800 mb-4">Hasil Capaian Pembelajaran</h1>

        {/* Pencarian */}
        <div className="relative mb-6">
          <AiOutlineSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Cari program studi atau kaprodi..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabel Hasil */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Program Studi</th>
                <th className="p-3 text-left">Kaprodi</th>
                <th className="p-3 text-left">Capaian</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3 font-medium">{item.nama}</td>
                  <td className="p-3 text-gray-600">{item.kaprodi}</td>
                  <td className="p-3">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${parseFloat(item.capaian) > 80 ? 'bg-green-500' :
                              parseFloat(item.capaian) > 60 ? 'bg-blue-500' : 'bg-yellow-500'
                            }`}
                          style={{ width: item.capaian }}
                        ></div>
                      </div>
                      <span>{item.capaian}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => viewDetail(item)}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <AiOutlineEye className="mr-1" /> Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Keterangan */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
          <p className="font-medium mb-1">Keterangan Status:</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 rounded-full bg-green-100 text-green-800">Sangat Baik (≥80%)</span>
            <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800">Baik (70-79%)</span>
            <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">Cukup (60-69%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HasilPerhitunganUniv;