import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineEye } from "react-icons/ai";
import { useKelas } from "../../hooks/admin-prodi/useKelas";
import TableSkeleton from "../../components/TableSkeleton";

const AturPenilaianProdi = () => {
    const navigate = useNavigate();
    // PERBAIKAN: Nama hook yang benar kemungkinan adalah `kelasQuery`
    const { kelasQuery } = useKelas();
    const [searchTerm, setSearchTerm] = useState("");

    const data = useMemo(() => kelasQuery.data || [], [kelasQuery.data]);
    const isLoading = kelasQuery.isLoading;
    const error = kelasQuery.error;

    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const term = (searchTerm || "").toLowerCase().trim();
            // PERBAIKAN: Filter berdasarkan properti yang ada di data kelas
            return (
                item.kode_kelas?.toLowerCase().includes(term) ||
                item.nama_kelas?.toLowerCase().includes(term) ||
                item.mata_kuliah?.nama_mata_kuliah?.toLowerCase().includes(term) ||
                item.mata_kuliah?.kode_mata_kuliah?.toLowerCase().includes(term)
            );
        });
    }, [data, searchTerm]);

    // Logika pagination sudah benar
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleViewDetail = (kelas) => {
        // PERBAIKAN: Navigasi menggunakan `kelas_id`
        const kelasId = kelas.kelas_id;
        if (kelasId) {
            // Arahkan ke halaman detail kelas, bukan atur penilaian
            navigate(`/dashboard/admin_prodi/atur_penilaian/${kelasId}`);
        } else {
            console.error("ID kelas tidak ditemukan:", kelas);
        }
    };

    if (error) return <div className="text-red-500">Error: {error.message}</div>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Daftar Kelas</h2>
                        <p className="text-gray-600 mt-1">Kelola penilaian dengan memilih kelas yang akan diatur</p>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="relative max-w-md">
                        <AiOutlineSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari Kelas atau Mata Kuliah..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-blue-100 ">
                            <tr>
                                <th className="p-4 text-left">Kode MK</th>
                                <th className="p-4 text-left">Mata Kuliah</th>
                                {/* PERBAIKAN: Menambahkan kolom Nama Kelas agar lebih informatif */}
                                <th className="p-4 text-left">Nama Kelas</th>
                                <th className="p-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {isLoading ? (
                                <TableSkeleton rows={itemsPerPage} columns={4} />
                            ) : paginatedData.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-500">
                                        {searchTerm ? "Tidak ada data yang sesuai dengan pencarian" : "Belum ada data kelas"}
                                    </td>
                                </tr>
                            ) : (
                                paginatedData.map((item, index) => (
                                    // PERBAIKAN: Gunakan `kelas_id` sebagai key
                                    <tr key={item.kelas_id || index} className="hover:bg-gray-50 transition">
                                        {/* PERBAIKAN: Render properti yang benar dari data kelas */}
                                        <td className="p-4 font-medium text-gray-800">
                                            {item.mata_kuliah?.kode_mata_kuliah || '-'}
                                        </td>
                                        <td className="p-4 text-gray-700">
                                            {item.mata_kuliah?.nama_mata_kuliah || '-'}
                                        </td>
                                        <td className="p-4 text-gray-700 font-semibold">
                                            {item.nama_kelas || '-'}
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

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center py-4 border-t border-gray-200">
                            <div className="flex gap-2">
                                {/* Logika pagination Anda sudah benar */}
                                {Array.from({ length: Math.min(6, totalPages) }, (_, i) => {
                                    const page = i + 1;
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-3 py-1 rounded text-sm transition ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
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
                                            className={`px-3 py-1 rounded text-sm transition ${currentPage === totalPages ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
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