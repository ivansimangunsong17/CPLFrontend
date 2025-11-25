import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { FiSearch, FiEye, FiChevronLeft, FiChevronRight, FiFilter } from "react-icons/fi";
import { FaSort } from "react-icons/fa";

const TabelDistribusi = () => {
    const navigate = useNavigate(); // 2. Inisialisasi hook navigasi

    // --- 1. Data Dummy (Diubah menjadi Semester) ---
    const initialData = [
        { id: 1, mataKuliah: "Struktur Data", semester: "2023 Ganjil", cpl: { 1: 80, 2: 65, 3: 74 } },
        { id: 2, mataKuliah: "Basis Data", semester: "2023 Ganjil", cpl: { 1: 70, 3: 74, 5: 71, 6: 72 } },
        { id: 3, mataKuliah: "Pemrograman Web", semester: "2023 Genap", cpl: { 4: 71, 5: 71, 6: 71, 7: 74 } },
        { id: 4, mataKuliah: "Algoritma", semester: "2023 Ganjil", cpl: { 2: 76, 3: 72, 5: 72, 10: 75 } },
        { id: 5, mataKuliah: "Jaringan Komputer", semester: "2022 Genap", cpl: { 1: 77, 2: 77, 3: 73, 4: 73 } },
        { id: 6, mataKuliah: "Sistem Operasi", semester: "2022 Genap", cpl: { 8: 72, 9: 72, 10: 72 } },
        { id: 7, mataKuliah: "Basis Data Lanjut", semester: "2022 Ganjil", cpl: { 2: 74, 4: 75, 7: 73, 8: 73 } },
        { id: 8, mataKuliah: "Pemrograman Mobile", semester: "2021 Genap", cpl: { 3: 73, 5: 78, 8: 71 } },
        { id: 9, mataKuliah: "Kecerdasan Buatan", semester: "2021 Ganjil", cpl: { 3: 75, 7: 72, 9: 76 } },
        { id: 10, mataKuliah: "Pengolahan Citra", semester: "2021 Genap", cpl: { 2: 77, 4: 78, 5: 78, 7: 73, 10: 73 } },
        { id: 11, mataKuliah: "Matematika Diskrit", semester: "2023 Ganjil", cpl: { 1: 85, 2: 80 } },
        { id: 12, mataKuliah: "Riset Operasi", semester: "2022 Genap", cpl: { 5: 70, 6: 75 } },
    ];

    // --- 2. State Management ---
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("Semua"); // Ubah nama state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Opsi Semester (diambil unik dari data)
    const semesterOptions = ["Semua", ...new Set(initialData.map(item => item.semester))];

    // --- 3. Logic Filtering ---
    const filteredData = useMemo(() => {
        return initialData.filter((item) => {
            const matchesSearch = item.mataKuliah.toLowerCase().includes(searchTerm.toLowerCase());
            // Ubah logika filter ke semester
            const matchesSemester = selectedSemester === "Semua" || item.semester === selectedSemester;
            return matchesSearch && matchesSemester;
        });
    }, [searchTerm, selectedSemester]);

    // --- 4. Logic Pagination ---
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // 3. Handler Navigasi
    const handleViewDetail = (mataKuliahId) => {
        navigate(`/dashboard/admin_prodi/detail_distribusi_matakuliah/${mataKuliahId}`);
    };

    // --- Helper Render Cell CPL ---
    const renderCplCell = (value) => {
        return value ? (
            <span className="font-medium text-gray-800">{value}</span>
        ) : (
            <span className="text-gray-400">-</span>
        );
    };

    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">

            {/* Header & Controls */}
            <div className="p-3 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-lg font-bold text-gray-800 whitespace-nowrap">
                    Distribusi Nilai CPL
                </h2>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                    {/* Search Bar */}
                    <div className="relative w-full sm:w-auto flex-grow md:flex-grow-0">
                        <input
                            type="text"
                            placeholder="Cari Mata Kuliah.."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64 transition-all"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
                    </div>

                    {/* Filter Dropdown (Semester) */}
                    <div className="relative w-full sm:w-auto">
                        <select
                            className="w-full sm:w-auto appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer transition-all"
                            value={selectedSemester}
                            onChange={(e) => {
                                setSelectedSemester(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            {semesterOptions.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt === "Semua" ? "Semua Semester" : opt}
                                </option>
                            ))}
                        </select>
                        <FiFilter className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                    </div>

                    <button className="hidden sm:block bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition shadow-sm flex-shrink-0">
                        <FiSearch size={20} />
                    </button>
                </div>
            </div>

            {/* Table Wrapper - Kunci Responsivitas */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                    <thead className="bg-blue-600 text-white uppercase text-xs tracking-wider">
                        <tr>
                            <th className="px-3 py-4 font-semibold rounded-tl-lg">Mata Kuliah</th>
                            {[...Array(10)].map((_, i) => (
                                <th key={i} className="px-2 py-4 text-center font-semibold">
                                    <div className="flex items-center justify-center gap-1 cursor-pointer hover:text-blue-100">
                                        CPL {i + 1} <FaSort className="opacity-50" size={10} />
                                    </div>
                                </th>
                            ))}
                            <th className="px-3 py-4 text-center font-semibold rounded-tr-lg">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className={`hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                                >
                                    <td className="px-3 py-4 font-medium text-gray-900">
                                        {item.mataKuliah}
                                        {/* Update tampilan label di bawah nama matkul */}
                                        <div className="text-xs text-gray-400 font-normal mt-0.5">{item.semester}</div>
                                    </td>
                                    {/* Render CPL 1-10 */}
                                    {[...Array(10)].map((_, i) => (
                                        <td key={i} className="px-3 py-4 text-center">
                                            {renderCplCell(item.cpl[i + 1])}
                                        </td>
                                    ))}
                                    <td className="px-3 py-4 text-center">
                                        <button
                                            onClick={() => handleViewDetail(item.id)} // 4. Pasang Handler
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full text-xs font-medium transition-colors"
                                        >
                                            Lihat <FiEye size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={12} className="px-6 py-10 text-center text-gray-500 italic">
                                    Tidak ada data mata kuliah yang ditemukan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer / Pagination */}
            <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-sm text-gray-500">
                    Menampilkan {paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} - {Math.min(currentPage * itemsPerPage, filteredData.length)} dari {filteredData.length} data
                </span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-md hover:bg-gray-100 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FiChevronLeft />
                    </button>

                    <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-all
                                    ${currentPage === page
                                        ? "bg-blue-600 text-white shadow-sm"
                                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                            >
                                {page < 10 ? `0${page}` : page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-md hover:bg-gray-100 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FiChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TabelDistribusi;