import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineEye } from "react-icons/ai";
import { useMataKuliah } from "../../hooks/admin-prodi/useMataKuliah";
import TableSkeleton from "../../components/TableSkeleton";

const AturPenilaianProdi = () => {
    const navigate = useNavigate();
    const { mataKuliahQuery } = useMataKuliah();
    const [searchTerm, setSearchTerm] = useState("");

    // Memoized data extraction
    const data = useMemo(() => {
        const rawData = mataKuliahQuery.data || [];
        console.log('Raw mata kuliah data:', rawData);
        return rawData;
    }, [mataKuliahQuery.data]);
    const isLoading = mataKuliahQuery.isLoading;
    const error = mataKuliahQuery.error;

    // Memoized filtered data
    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const term = (searchTerm || "").toLowerCase().trim();
            return (
                item.kode_mata_kuliah?.toLowerCase().includes(term) ||
                item.nama_mata_kuliah?.toLowerCase().includes(term) ||
                item.kode?.toLowerCase().includes(term) ||
                item.nama?.toLowerCase().includes(term)
            );
        });
    }, [data, searchTerm]);

    // Data untuk pagination
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleViewDetail = (matakuliah) => {
        // Navigasi ke halaman detail pemetaan mata kuliah
        const mataKuliahId = matakuliah.id || matakuliah.mata_kuliah_id;
        if (mataKuliahId) {
            navigate(`/dashboard/admin_prodi/atur_penilaian/${mataKuliahId}`);

        } else {
            console.error("ID mata kuliah tidak ditemukan:", matakuliah);
        }
    };

    if (error) return <div className="text-red-500">Error: {error.message}</div>;

    return (
        <div className="p-6 max-w-7xl mx-auto">


            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Daftar Mata Kuliah</h2>
                        <p className="text-gray-600 mt-1">Kelola penilaian mata kuliah dengan CPL</p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <AiOutlineSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari Mata Kuliah..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {error && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
                            <p className="font-medium">Error memuat data:</p>
                            <p className="text-sm">{error.message}</p>
                        </div>
                    )}

                    <table className="w-full">
                        <thead className="bg-blue-100 ">
                            <tr>
                                <th className="p-4 text-left">Kode MK </th>
                                <th className="p-4 text-left">Mata Kuliah </th>
                                <th className="p-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {isLoading ? (
                                <TableSkeleton rows={itemsPerPage} columns={3} />
                            ) : paginatedData.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="p-8 text-center text-gray-500">
                                        {searchTerm ? "Tidak ada data yang sesuai dengan pencarian" : "Belum ada data mata kuliah"}
                                    </td>
                                </tr>
                            ) : (
                                paginatedData.map((item, index) => (
                                    <tr key={item.id ?? index} className="hover:bg-gray-50 transition">
                                        <td className="p-4 font-medium text-gray-800">
                                            {item.kode_mata_kuliah || item.kode || 'IF265365'}
                                        </td>
                                        <td className="p-4 text-gray-700">
                                            {item.nama_mata_kuliah || item.nama || 'Nama Mata Kuliah'}
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => handleViewDetail(item)}
                                                className="inline-flex items-center gap-1 px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                                            >
                                                Lihat
                                                <AiOutlineEye size={16} />
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
                                            className={`px-3 py-1 rounded text-sm transition ${currentPage === page
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                                            className={`px-3 py-1 rounded text-sm transition ${currentPage === totalPages
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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

export default AturPenilaianProdi;
