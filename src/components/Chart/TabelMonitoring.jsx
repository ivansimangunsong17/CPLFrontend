import React, { useState, useMemo, useContext } from "react";
import { AiOutlineSearch, AiOutlineEye, AiOutlineLeft, AiOutlineRight, AiOutlineFilter } from "react-icons/ai"; // Tambahkan ikon Filter
import { useMahasiswa } from "../../hooks/admin-prodi/useMahasiswa";
import TableSkeleton from "../../components/TableSkeleton";
import { AuthContext } from "../../context/AuthContext";

const TabelMonitoring = () => {
    const { user } = useContext(AuthContext);

    // Hanya ambil query untuk read data
    const { mahasiswaQuery } = useMahasiswa();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAngkatan, setSelectedAngkatan] = useState("Semua"); // State untuk filter angkatan

    // State untuk pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Memoized data extraction
    const data = useMemo(() => mahasiswaQuery.data || [], [mahasiswaQuery.data]);
    const isLoading = mahasiswaQuery.isLoading;
    const error = mahasiswaQuery.error;

    // Ambil daftar angkatan unik dari data untuk opsi dropdown
    const angkatanOptions = useMemo(() => {
        const angkatans = data.map(item => item.angkatan).filter(Boolean); // Ambil semua angkatan
        const uniqueAngkatans = [...new Set(angkatans)].sort((a, b) => b - a); // Hapus duplikat dan urutkan descending
        return ["Semua", ...uniqueAngkatans];
    }, [data]);

    // Memoized filtered data (Search + Filter Angkatan)
    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const term = (searchTerm || "").toLowerCase().trim();

            // Logika Pencarian Teks
            const matchesSearch =
                item.nama?.toLowerCase().includes(term) ||
                item.npm?.toLowerCase().includes(term) ||
                item.angkatan?.toString().includes(term);

            // Logika Filter Angkatan
            const matchesAngkatan =
                selectedAngkatan === "Semua" ||
                item.angkatan?.toString() === selectedAngkatan.toString();

            return matchesSearch && matchesAngkatan;
        });
    }, [data, searchTerm, selectedAngkatan]);

    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset ke halaman 1 saat mencari
    };

    const handleAngkatanChange = (e) => {
        setSelectedAngkatan(e.target.value);
        setCurrentPage(1); // Reset ke halaman 1 saat filter berubah
    };

    const handleViewDetail = (mahasiswa) => {
        // Logika untuk melihat detail mahasiswa
        console.log("Lihat detail mahasiswa:", mahasiswa);
        // Navigasi atau buka modal detail di sini
    };

    if (error) return <div className="text-red-500 p-4">Error memuat data: {error.message}</div>;

    return (
        <div className="p-3 w-full bg-white min-h-screen space-y-6 rounded-xl shadow-sm border border-gray-200">

            {/* Header & Search & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Monitoring Mahasiswa</h1>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    {/* Dropdown Filter Angkatan */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <AiOutlineFilter className="text-gray-400" />
                        </div>
                        <select
                            value={selectedAngkatan}
                            onChange={handleAngkatanChange}
                            className="w-full sm:w-48 text-sm pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white text-gray-700 cursor-pointer appearance-none"
                        >
                            {angkatanOptions.map((angkatan) => (
                                <option className="px-2 py-2 text-gray-700 hover:bg-blue-50"
                                    key={angkatan} value={angkatan}>
                                    {angkatan === "Semua" ? "Semua Angkatan" : angkatan}
                                </option>
                            ))}
                        </select>
                        {/* Custom Arrow Icon for Select */}
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-64">
                        <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Cari nama, NPM..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-600">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider w-16">
                                    No
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Nama Lengkap
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    NPM
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Angkatan
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-medium text-white uppercase tracking-wider w-24">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {isLoading ? (
                                <TableSkeleton cols={5} rows={5} />
                            ) : paginatedData.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500 italic">
                                        {searchTerm || selectedAngkatan !== "Semua"
                                            ? "Tidak ada data yang sesuai filter/pencarian"
                                            : "Belum ada data mahasiswa"}
                                    </td>
                                </tr>
                            ) : (
                                paginatedData.map((item, index) => (
                                    <tr
                                        key={item.id || index}
                                        className="hover:bg-blue-50 transition-colors duration-150"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                            {(currentPage - 1) * itemsPerPage + index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{item.nama}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 ">
                                            {item.npm}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                                                {item.angkatan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <button
                                                onClick={() => handleViewDetail(item)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-offset-2 focus:ring-blue-500 transition-all"
                                            >
                                                Lihat <AiOutlineEye size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Modern & Clean */}
                {!isLoading && filteredData.length > 0 && (
                    <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50">
                        <div className="text-sm text-gray-500 font-medium">
                            Menampilkan <span className="font-bold text-gray-800">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-bold text-gray-800">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> dari <span className="font-bold text-gray-800">{filteredData.length}</span> data
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg hover:bg-gray-200 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                                aria-label="Previous Page"
                            >
                                <AiOutlineLeft size={16} />
                            </button>

                            <div className="flex items-center gap-1">
                                {/* Logic Pagination Angka */}
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    // Logic sederhana untuk menampilkan halaman di sekitar halaman aktif
                                    let pageNum = i + 1;
                                    if (totalPages > 5) {
                                        if (currentPage > 3 && currentPage < totalPages - 2) {
                                            pageNum = currentPage - 2 + i;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        }
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${currentPage === pageNum
                                                ? "bg-blue-600 text-white shadow-md ring-2 ring-blue-600 ring-offset-1"
                                                : "text-gray-600 hover:bg-gray-200 bg-white border border-gray-200"
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg hover:bg-gray-200 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                                aria-label="Next Page"
                            >
                                <AiOutlineRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TabelMonitoring;