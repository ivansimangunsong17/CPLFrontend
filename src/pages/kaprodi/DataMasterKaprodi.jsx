import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const DataMasterKaprodi = () => {
    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    // ===== Dummy Data CPL =====
    const dummyCPL = [
        { kode: "CPL-01", deskripsi: "Memahami konsep dasar dalam ilmu komputer" },
        { kode: "CPL-02", deskripsi: "Mampu merancang dan mengembangkan sistem perangkat lunak" },
        { kode: "CPL-03", deskripsi: "Mampu menganalisis dan menyelesaikan masalah teknis dalam perangkat keras" },
        { kode: "CPL-04", deskripsi: "Memiliki kemampuan komunikasi yang efektif dalam penyampaian hasil kerja" },
        { kode: "CPL-05", deskripsi: "Mampu bekerja dalam tim dan berkolaborasi secara efektif" },
        { kode: "CPL-06", deskripsi: "Mampu mengelola proyek pengembangan perangkat lunak" },
    ];

    // ===== Dummy Data Mata Kuliah =====
    const dummyMK = [
        { kodeMK: "MK-1101", namaMK: "Struktur Data" },
        { kodeMK: "MK-1102", namaMK: "Basis Data" },
        { kodeMK: "MK-1201", namaMK: "Sistem Operasi" },
        { kodeMK: "MK-1301", namaMK: "Pemrograman Web" },
    ];

    // ===== Filter Search =====
    const filteredCPL = useMemo(() => {
        return dummyCPL.filter(
            (cpl) =>
                cpl.kode.toLowerCase().includes(search.toLowerCase()) ||
                cpl.deskripsi.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const filteredMK = useMemo(() => {
        return dummyMK.filter(
            (mk) =>
                mk.kodeMK.toLowerCase().includes(search.toLowerCase()) ||
                mk.namaMK.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm p-5 space-y-6">

                {/* ===== Header Section ===== */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Data Master Program Studi
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Kelola Data CPL & Mata Kuliah
                        </p>
                    </div>

                    {/* ===== Search Bar ===== */}
                    <div className="relative w-full sm:w-[280px]">
                        <input
                            type="text"
                            placeholder="Cari data..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pl-10
                         text-sm text-gray-700 placeholder:text-gray-400
                         focus:border-blue-400 focus:ring-2 focus:ring-blue-100 
                         outline-none transition"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="absolute left-3 top-[50%] -translate-y-[50%] text-gray-400">
                            <FiSearch size={18} />
                        </div>
                    </div>
                </div>

                {/* ===== TABLE CPL ===== */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">
                        Daftar CPL
                    </h2>
                    <div className="overflow-x-auto rounded-xl border border-gray-100">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="bg-blue-600 text-white font-semibold">
                                    <th className="p-3 text-left">Kode</th>
                                    <th className="p-3 text-left">Deskripsi CPL</th>

                                </tr>
                            </thead>
                            <tbody>
                                {filteredCPL.map((cpl, i) => (
                                    <tr
                                        key={i}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                                    >
                                        <td className="p-3 font-medium text-gray-900">
                                            {cpl.kode}
                                        </td>
                                        <td className="p-3 text-gray-700 font-medium">{cpl.deskripsi}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredCPL.length === 0 && (
                            <div className="text-center py-4 text-gray-400">
                                Data CPL tidak ditemukan
                            </div>
                        )}
                    </div>
                </div>

                {/* ===== TABLE MATAKULIAH ===== */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">
                        Daftar Mata Kuliah
                    </h2>
                    <div className="overflow-x-auto rounded-xl border border-gray-100">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="bg-blue-600 text-white font-semibold">
                                    <th className="p-3 text-left">Kode MK</th>
                                    <th className="p-3 text-left">Nama Mata Kuliah</th>
                                    <th className="p-3 text-left">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMK.map((mk, i) => (
                                    <tr
                                        key={i}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                                    >
                                        <td className="p-4  font-medium text-gray-900">
                                            {mk.kodeMK}
                                        </td>
                                        <td className="p-3 text-gray-700 font-medium">{mk.namaMK}</td>
                                        <td className="p-3 text-left">
                                            <button
                                                onClick={() => navigate(`/dashboard/kaprodi/data_master/${mk.kodeMK}`)}
                                                className="text-blue-600 font-medium hover:text-blue-800 transition">
                                                Aksi 👁
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredMK.length === 0 && (
                            <div className="text-center py-4 text-gray-400">
                                Data Mata Kuliah tidak ditemukan
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DataMasterKaprodi;
