import React, { useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineEye } from "react-icons/ai";
import { useKelas } from "../../hooks/dosen/useKelas";
import TableSkeleton from "../../components/TableSkeleton";
import { AuthContext } from "../../context/AuthContext";

const AturPenilaianDosen = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // ✅ Asumsi ID dosen ada di user.id
  const dosenId = user?.id;

  // ✅ Panggil hook useKelas
  const { kelasQuery } = useKelas({ dosen_id: dosenId });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ✅ NORMALISASI DATA AGAR SELALU ARRAY
  const data = useMemo(() => {
    const raw = kelasQuery.data;

    if (!raw) return [];

    if (Array.isArray(raw)) return raw;

    if (Array.isArray(raw.data)) return raw.data;

    if (raw.kelas_id) return [raw]; // Jika API hanya return 1 object

    return [];
  }, [kelasQuery.data]);

  // ✅ FILTERING DATA
  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    if (!term) return data;

    return data.filter(item => (
      item.kode_mata_kuliah?.toLowerCase().includes(term) ||
      item.nama_mata_kuliah?.toLowerCase().includes(term) ||
      item.nama_kelas?.toLowerCase().includes(term) ||
      item.semester?.toLowerCase().includes(term) ||
      item.tahun_ajaran?.toLowerCase().includes(term)
    ));
  }, [data, searchTerm]);

  // ✅ PAGINATION
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleViewDetail = (kelas) => {
    const kelasId = kelas.kelas_id;
    if (kelasId) {
      navigate(`/dashboard/dosen/atur_penilaian/${kelasId}`);
    } else {
      console.error("kelas_id tidak ditemukan:", kelas);
    }
  };

  if (kelasQuery.isLoading) {
    return <TableSkeleton rows={itemsPerPage} columns={6} />;
  }

  if (kelasQuery.isError) {
    return <div className="text-red-500 text-center p-6">Error: {kelasQuery.error.message}</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Daftar Kelas</h2>
          <p className="text-gray-600 text-sm mb-5">Kelola penilaian dengan memilih kelas</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <AiOutlineSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Cari kelas atau mata kuliah..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <table className="w-full">
            <thead className="bg-blue-100 text-gray-800 text-sm">
              <tr>
                <th className="p-4 text-left font-semibold">Kode MK</th>
                <th className="p-4 text-left font-semibold">Mata Kuliah</th>
                <th className="p-4 text-left font-semibold">Nama Kelas</th>
                <th className="p-4 text-left font-semibold">Semester</th>
                <th className="p-4 text-left font-semibold">Tahun Ajaran</th>
                <th className="p-4 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    Tidak ada data kelas
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, index) => (
                  <tr key={item.kelas_id || index} className="hover:bg-gray-50 transition">
                    <td className="p-4 font-mono text-indigo-600">{item.kode_mata_kuliah || '-'}</td>
                    <td className="p-4">{item.nama_mata_kuliah || '-'}</td>
                    <td className="p-4 font-semibold">{item.nama_kelas || '-'}</td>
                    <td className="p-4">{item.semester || '-'}</td>
                    <td className="p-4">{item.tahun_ajaran || '-'}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleViewDetail(item)}
                        className="inline-flex items-center gap-1 px-3 py-1 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                      >
                        Lihat <AiOutlineEye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center py-4 border-t border-gray-200">
              <div className="flex gap-2">
                {Array.from({ length: Math.min(6, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded text-sm transition ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                    >
                      {page < 10 ? `0${page}` : page}
                    </button>
                  );
                })}

                {totalPages > 6 && (
                  <>
                    <span className="px-2 text-gray-500">...</span>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className={`px-3 py-1 rounded text-sm transition ${currentPage === totalPages ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                    >
                      {totalPages < 10 ? `0${totalPages}` : totalPages}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AturPenilaianDosen;
