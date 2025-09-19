import React, { useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { useProdiList } from "../../hooks/admin-universitas/useDataProdi";
import TableSkeleton from "../../components/TableSkeleton";

const HasilPerhitunganUniv = () => {
  const { data: prodiList, isLoading, isError } = useProdiList();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 🔎 Filtering data
  const filteredData = (prodiList || []).filter(
    (item) =>
      item.nama_prodi.toLowerCase().includes(search.toLowerCase()) ||
      item.kode_prodi.toLowerCase().includes(search.toLowerCase()) ||
      item.fakultas.nama_fakultas.toLowerCase().includes(search.toLowerCase())
  );

  // 👉 Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Error Handling */}
      {isError && (
        <div className="text-red-600 mb-4 text-center">
          Terjadi kesalahan saat mengambil data program studi.
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Manajemen Program Studi
        </h1>

        {/* 🔎 Input Search */}
        <div className="relative mt-4 sm:mt-0 w-full sm:w-auto sm:max-w-xs">
          <input
            type="text"
            placeholder="Cari Program Studi..."
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset ke halaman 1 kalau searching
            }}
          />
          <button className="absolute right-0 top-0 h-full px-3 bg-blue-500 text-white rounded-r-lg flex items-center justify-center">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-200 text-black">
              <tr>
                {["Kode Prodi", "Nama Program Studi", "Fakultas", "Detail"].map(
                  (label, idx) => (
                    <th key={idx} className="p-4 text-left">
                      <div className="flex items-center gap-1">
                        {label} <AiOutlineArrowDown size={14} />
                      </div>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <TableSkeleton rows={3} />
              ) : currentData.length > 0 ? (
                currentData.map((item) => (
                  <tr
                    key={item.prodi_id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium text-gray-800">
                      {item.kode_prodi}
                    </td>
                    <td className="p-4">{item.nama_prodi}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {item.fakultas?.nama_fakultas || "-"}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="text-blue-600 hover:text-blue-800">
                        Lihat Detail
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-10 text-center text-gray-400 italic"
                  >
                    Tidak ada data ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 📌 Pagination */}
        <div className="flex justify-center items-center space-x-2 p-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 text-gray-500 hover:text-blue-600 disabled:opacity-40"
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              if (page === 1 || page === totalPages) return true;
              if (page >= currentPage - 1 && page <= currentPage + 1) return true;
              return false;
            })
            .map((page, idx, arr) => {
              const prevPage = arr[idx - 1];
              return (
                <React.Fragment key={page}>
                  {prevPage && page - prevPage > 1 && (
                    <span className="px-2 text-gray-400">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg transition ${currentPage === page
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              );
            })}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-gray-500 hover:text-blue-600 disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default HasilPerhitunganUniv;
