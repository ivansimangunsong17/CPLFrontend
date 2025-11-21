import React, { useState } from "react";
import { FaSearch, FaFilePdf } from "react-icons/fa";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import LogoCPLLogin from "../../assets/LogoCPLLogin.png";

const DashboardUniversitas = () => {
  const [search, setSearch] = useState("");

  const dataCPL = [
    { id: 1, kode: "IF3873833", programStudi: "Teknik Informatika", fakultas: "Teknik", status: "Selesai" },
    { id: 2, kode: "PK847834", programStudi: "Perikanan dan Kelautan", fakultas: "Pertanian", status: "Selesai" },
    { id: 3, kode: "HM834837", programStudi: "Hukum", fakultas: "Hukum", status: "Selesai" },
    { id: 4, kode: "KE734734", programStudi: "Pendidikan Kedokteran", fakultas: "Kedokteran", status: "Selesai" },
    { id: 5, kode: "EL756765", programStudi: "Teknik Elektro", fakultas: "Teknik", status: "Selesai" },
    { id: 6, kode: "ME85866", programStudi: "Teknik Mesin", fakultas: "Teknik", status: "Belum Selesai" },
    { id: 7, kode: "SI746764", programStudi: "Teknik Sipil", fakultas: "Teknik", status: "Belum Selesai" },
    { id: 8, kode: "KI784784", programStudi: "Teknik Kimia", fakultas: "Teknik", status: "Belum Selesai" },
    { id: 9, kode: "LI975757", programStudi: "Teknik Lingkungan", fakultas: "Teknik", status: "Belum Selesai" },
    { id: 10, kode: "IK85858", programStudi: "Ilmu Komputer", fakultas: "MIPA", status: "Belum Selesai" },
  ];

  const filteredData = dataCPL.filter((item) =>
    item.programStudi.toLowerCase().includes(search.toLowerCase())
  );

  const StatusBadge = ({ status }) => {
    const isSelesai = status === "Selesai";
    const color = isSelesai ? "text-green-600" : "text-red-600";
    const bgColor = isSelesai ? "bg-green-500" : "bg-red-500";

    return (
      <div className={`flex items-center gap-2 ${color}`}>
        <div className={`w-2 h-2 rounded-full ${bgColor}`}></div>
        <span className="font-medium">{status}</span>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            Selamat Datang di Dashboard
            <img src={LogoCPLLogin} alt="Logo CPL" className="w-10 h-10" />
            SIP-CPL
          </h1>
          <p className="text-gray-700 mt-4 leading-relaxed max-w-4xl">
            SIP-CPL adalah sistem yang dirancang untuk mempermudah pengelolaan kurikulum berbasis Outcome-Based Education (OBE). Fungsinya mencakup pengelolaan data dosen, data mahasiswa, serta data kurikulum yang meliputi Capaian Pembelajaran Lulusan (CPL), data mata kuliah, pemetaan CPL, hingga proses penilaian pembelajaran.
            Untuk memudahkan penggunaan, tersedia file panduan tata cara pemakaian website yang dapat Anda unduh di bawah ini.
          </p>

          <div className="flex items-center gap-4 mt-6 font-bold">
            <p
              href="#"
              className="flex text-xs items-center gap-3 px-4 py-2   text-black rounded-lg shadow-md "
            >
              <FaFilePdf className="w-5 h-5 text-red-600" />
              <span>Panduan Tata Cara <br /> Pemakaian Website</span>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all">
                Download PDF
              </button>
            </p>


          </div>
        </div>

        {/* Filter + Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Status Pengisian Nilai CPL Program Studi</h1>
          <div className="relative mt-4 sm:mt-0 w-full sm:w-auto sm:max-w-xs">
            <input
              type="text"
              placeholder="Cari Program Studi..."
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="absolute right-0 top-0 h-full px-3 bg-blue-500 text-white rounded-r-lg flex items-center justify-center">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  {["Kode Program Studi", "Program Studi", "Fakultas", "Status"].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-left font-semibold text-sm"
                    >
                      <div className="flex items-center gap-2 cursor-pointer">
                        {header}
                        <FiChevronDown className="w-4 h-4" />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.kode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.programStudi}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.fakultas}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-16">
              <FaSearch size={40} className="mx-auto text-gray-300" />
              <p className="mt-4 text-gray-600 font-semibold">Program Studi Tidak Ditemukan</p>
              <p className="text-gray-400 text-sm mt-1">Coba gunakan kata kunci lain.</p>
            </div>
          )}

          {filteredData.length > 0 && (
            <div className="flex items-center justify-center px-4 py-4 border-t border-gray-200">
              <nav className="flex items-center gap-1">
                <button className="p-2 rounded-md hover:bg-gray-100 text-gray-500">
                  <FiChevronLeft />
                </button>
                <button className="px-4 py-2 rounded-md text-sm hover:bg-gray-100 text-gray-700">1</button>
                <button className="px-4 py-2 rounded-md text-sm bg-blue-100 text-blue-600 font-semibold">2</button>
                <button className="px-4 py-2 rounded-md text-sm hover:bg-gray-100 text-gray-700">3</button>
                <span className="px-4 py-2 text-sm text-gray-700">...</span>
                <button className="px-4 py-2 rounded-md text-sm hover:bg-gray-100 text-gray-700">6</button>
                <button className="p-2 rounded-md hover:bg-gray-100 text-gray-500">
                  <FiChevronRight />
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardUniversitas;