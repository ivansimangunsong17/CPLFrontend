import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useProdiList } from "../../hooks/admin-universitas/useDataProdi";

import TableSkeleton from "../../components/TableSkeleton";

const HasilPerhitunganUniv = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 10;

  // Fetch data prodi using useProdiList hook
  const { data: prodiList, isLoading, isError } = useProdiList();

  // Transform data to match the table structure
  const prodiData = prodiList || [];

  // Filter data berdasarkan search
  const filteredData = prodiData.filter(item =>
    item.nama_prodi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.kode_prodi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.fakultas?.nama_fakultas?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Generate page numbers untuk pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Add ellipsis if current page is far from start
      if (currentPage > 3) {
        pageNumbers.push('...');
      }

      // Add pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pageNumbers.includes(i)) {
          pageNumbers.push(i);
        }
      }

      // Add ellipsis if current page is far from end
      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }

      // Always show last page
      if (!pageNumbers.includes(totalPages)) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const handlePageChange = (page) => {
    if (page !== '...' && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDetailClick = (prodiId) => {
    navigate(`/dashboard/admin_universitas/detail_prodi/${prodiId}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Loading Screen */}
      

      <div className="max-w-7xl mx-auto">
        {/* Error Handling */}
        {isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-semibold">Error</p>
            <p>Terjadi kesalahan saat mengambil data program studi. Silakan coba lagi nanti.</p>
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Daftar Program Studi</h1>
            {!isLoading && prodiData.length > 0 && (
              <div className="text-sm text-gray-600">
                {searchTerm ? (
                  <>Menampilkan {filteredData.length} dari {prodiData.length} program studi</>
                ) : (
                  <>Total {prodiData.length} program studi</>
                )}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="flex justify-end mb-4">
            <div className="relative w-80">
              <AiOutlineSearch className="absolute right-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Cari Program Studi..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition">
                <AiOutlineSearch size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-200 ">
              <tr>
                <th className="px-6 py-4 text-left font-medium">
                  <div className="flex items-center gap-2">
                    Kode Program Studi
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-medium">
                  <div className="flex items-center gap-2">
                    Nama Program Studi
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-medium">
                  <div className="flex items-center gap-2">
                    Fakultas
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-medium">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <TableSkeleton rows={itemsPerPage} columns={4} />
              ) : (
                currentData.map((item, index) => (
                  <tr key={item.prodi_id || index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900 font-medium">{item.kode_prodi || "-"}</td>
                    <td className="px-6 py-4 text-gray-900">{item.nama_prodi || "-"}</td>
                    <td className="px-6 py-4 text-gray-700">{item.fakultas?.nama_fakultas || "-"}</td>                  <td className="px-6 py-4">
                      <button
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        onClick={() => handleDetailClick(item.prodi_id)}
                      >
                        Lihat Detail
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Empty State */}
          {!isLoading && currentData.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <AiOutlineSearch size={48} className="mx-auto" />
              </div>
              <p className="text-gray-500 text-lg">
                {prodiData.length === 0 ? "Belum ada data program studi" : "Tidak ada data yang ditemukan"}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {prodiData.length === 0
                  ? "Data program studi akan muncul di sini setelah ditambahkan"
                  : "Coba ubah kata kunci pencarian Anda"
                }
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 gap-2">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(page)}
                disabled={page === '...'}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${page === currentPage
                  ? 'bg-blue-600 text-white'
                  : page === '...'
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HasilPerhitunganUniv;