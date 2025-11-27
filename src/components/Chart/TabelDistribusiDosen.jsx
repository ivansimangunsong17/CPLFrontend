import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaSort } from "react-icons/fa";

const TabelDistribusiDosen = () => {
    const navigate = useNavigate();

    // --- 1. Dummy Data Kelas + Nilai CPL 1–10 ---
    const initialData = [
        {
            id: 1,
            mataKuliah: "Struktur Data",
            namaKelas: "Struktur Data A",
            semester: "2023 Ganjil",
            dosen: "Taufik Hidayat, S.T., M.T.",
            cpl: { 1: 82, 4: 88, 5: 90,   8: 70, }
        },
        {
            id: 2,
            mataKuliah: "Pemrograman Web",
            namaKelas: "Pemrograman Web B",
            semester: "2023 Ganjil",
            dosen: "Taufik Hidayat, S.T., M.T.",
            cpl: { 6: 80, 7: 60, 8: 66, }
        },
        {
            id: 3,
            mataKuliah: "Basis Data",
            namaKelas: "Basis Data A",
            semester: "2023 Genap",
            dosen: "John Doe, S.Kom., M.Kom.",
            cpl: { 1: 81, 2: 72, 3: 74, 5: 70, 7: 64, }
        },
        {
            id: 4,
            mataKuliah: "Informatika Dasar",
            namaKelas: "Informatika Dasar B",
            semester: "2023 Genap",
            dosen: "John Doe, S.Kom., M.Kom.",
            cpl: { 2: 80, 5: 87, 6: 85,  8: 81, }
        },
        {
            id: 5,
            mataKuliah: "Algoritma",
            namaKelas: "Algoritma A",
            semester: "2022 Genap",
            dosen: "Jane Smith, M.Sc.",
            cpl: { 3: 77, 4: 73,  6: 78, 7: 74,}
        },
      
    ];

    // --- 2. State ---
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("Semua");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Opsi semester unik
    const semesterOptions = ["Semua", ...new Set(initialData.map(item => item.semester))];

    // --- 3. Filtering ---
    const filteredData = useMemo(() => {
        return initialData.filter(item => {
            const matchSearch =
                item.mataKuliah.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.namaKelas.toLowerCase().includes(searchTerm.toLowerCase());

            const matchSemester =
                selectedSemester === "Semua" || selectedSemester === item.semester;

            return matchSearch && matchSemester;
        });
    }, [searchTerm, selectedSemester, initialData]);

    // --- 4. Pagination ---
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    // --- Render ---
    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

            {/* HEADER */}
            <div className="p-3  flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">

                <h2 className="text-lg font-bold text-gray-800">Distribusi Capaian CPL per Kelas</h2>

                {/* SEARCH + FILTER */}
                <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Cari mata kuliah / kelas..."
                        className="w-full sm:w-64 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />

                    <select
                        className="w-full sm:w-auto px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        value={selectedSemester}
                        onChange={(e) => { setSelectedSemester(e.target.value); setCurrentPage(1); }}
                    >
                        {semesterOptions.map(opt => (
                            <option key={opt} value={opt}>
                                {opt === "Semua" ? "Semua Semester" : opt}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm whitespace-nowrap">
                    <thead className="bg-blue-600 text-white text-xs uppercase">
                        <tr>
                            <th className="px-2 py-4 text-center rounded-tl-lg">Mata Kuliah ↓</th>
                            <th className="px-2 py-4 text-center">Nama Kelas ↓</th>
                            <th className="px-2 py-4 text-center">Semester ↓</th>

                            {/* Kolom CPL 1–10 */}
                            {[...Array(8)].map((_, i) => (
                                <th key={i} className="px-1 py-4 text-center">
                                    <div className="flex items-center justify-center gap-1 cursor-pointer opacity-90 hover:opacity-100">
                                        CPL {i + 1} <FaSort size={8} className="opacity-70" />
                                    </div>
                                </th>
                            ))}


                            <th className="px-4 py-4 text-center rounded-tr-lg">Aksi</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {paginatedData.length > 0 ? paginatedData.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50 transition">
                                <td className="px-1 py-4 text-center text-sm  text-blue-700">
                                    {item.mataKuliah}
                                </td>
                                <td className="px-1 py-4 font-sm text-center">{item.namaKelas}</td>
                                <td className="px-1 py-4 text-sm text-center text-gray-600">{item.semester}</td>

                                {[...Array(8)].map((_, i) => (
                                    <td key={i} className="px-2 py-4 text-sm  text-center ">
                                        {item.cpl[i + 1] ?? <span className="text-gray-400">-</span>}
                                    </td>
                                ))}



                                <td className="px-2 py-4 text-center">
                                    <button
                                        onClick={() => navigate(`/dashboard/dosen/detail_distribusi_kelas/${item.id}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full text-xs font-medium transition"
                                    >
                                        Lihat <FiEye size={13} />
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={15} className="px-2 py-10 text-center text-gray-500 italic">Tidak ada data kelas.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            <div className="p-4 border-t flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

                <p className="text-sm text-gray-500">
                    Menampilkan {paginatedData.length ? ((currentPage - 1) * itemsPerPage + 1) : 0} -{" "}
                    {Math.min(currentPage * itemsPerPage, filteredData.length)} dari{" "}
                    {filteredData.length} kelas
                </p>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-md disabled:opacity-40"
                    >
                        <FiChevronLeft />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-medium transition ${currentPage === page ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {page < 10 ? `0${page}` : page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-md disabled:opacity-40"
                    >
                        <FiChevronRight />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default TabelDistribusiDosen;
