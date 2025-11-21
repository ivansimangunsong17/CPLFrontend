import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useParams } from "react-router-dom";
import TableSkeleton from "../../components/TableSkeleton";
import { useNavigate } from "react-router-dom";


const DetailHasilPerhitunganUniv = () => {
    const { prodiId, kelasId } = useParams();
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();



    // Simulasi loading 2 detik
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const dataKelas = [
        {
            kelas_id: 1,
            mata_kuliah: {
                kode_mata_kuliah: "IF265365",
                nama_mata_kuliah: "Struktur Data",
            },
            nama_kelas: "Struktur Data A",
            tahun_ajaran: "2024",
            semester: "Genap",
        },
        {
            kelas_id: 2,
            mata_kuliah: {
                kode_mata_kuliah: "IF265365",
                nama_mata_kuliah: "Struktur Data",
            },
            nama_kelas: "Struktur Data B",
            tahun_ajaran: "2024",
            semester: "Genap",
        },
        {
            kelas_id: 3,
            mata_kuliah: {
                kode_mata_kuliah: "IF765461",
                nama_mata_kuliah: "Rekayasa Perangkat Lunak",
            },
            nama_kelas: "Rekayasa Perangkat Lunak A",
            tahun_ajaran: "2024",
            semester: "Genap",
        },
        {
            kelas_id: 4,
            mata_kuliah: {
                kode_mata_kuliah: "IF765461",
                nama_mata_kuliah: "Rekayasa Perangkat Lunak",
            },
            nama_kelas: "Rekayasa Perangkat Lunak B",
            tahun_ajaran: "2024",
            semester: "Genap",
        },
        {
            kelas_id: 5,
            mata_kuliah: {
                kode_mata_kuliah: "IF765461",
                nama_mata_kuliah: "Rekayasa Perangkat Lunak",
            },
            nama_kelas: "Rekayasa Perangkat Lunak C",
            tahun_ajaran: "2024",
            semester: "Genap",
        },
    ];

    // Fungsi Search
    const filteredData = dataKelas.filter((item) => {
        const term = search.toLowerCase();
        return (
            item.mata_kuliah.kode_mata_kuliah.toLowerCase().includes(term) ||
            item.mata_kuliah.nama_mata_kuliah.toLowerCase().includes(term) ||
            item.nama_kelas.toLowerCase().includes(term) ||
            item.tahun_ajaran.toString().includes(term) ||
            item.semester.toLowerCase().includes(term)
        );
    });

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-800">
                    Daftar Mata Kuliah — Prodi #{prodiId}
                </h1>

                {/* Search */}
                <div className="relative mt-4 sm:mt-0 w-full sm:w-auto sm:max-w-xs">
                    <input
                        type="text"
                        placeholder="Cari Program Studi..."
                        className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="absolute right-0 top-0 h-full px-3 bg-blue-500 text-white rounded-r-lg flex items-center justify-center">
                        <FaSearch />
                    </button>
                </div>
            </div>

            {/* Tabel */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="px-6 py-3 text-left">Kode MK</th>
                                <th className="px-6 py-3 text-left">Nama Mata Kuliah</th>
                                <th className="px-6 py-3 text-left">Nama Kelas</th>
                                <th className="px-6 py-3 text-left">Periode</th>
                                <th className="px-6 py-3 text-left">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {isLoading ? (
                                <TableSkeleton rows={6} columns={5} />
                            ) : filteredData.length > 0 ? (
                                filteredData.map((kelas) => (
                                    <tr
                                        key={kelas.kelas_id}
                                        className="border border-gray-300 hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">{kelas.mata_kuliah.kode_mata_kuliah}</td>
                                        <td className="px-6 py-4">{kelas.mata_kuliah.nama_mata_kuliah}</td>
                                        <td className="px-6 py-4">{kelas.nama_kelas}</td>
                                        <td className="px-6 py-4">
                                            {kelas.tahun_ajaran} {kelas.semester}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/dashboard/admin_universitas/hasil_perhitungan/${prodiId}/${kelas.kelas_id}`
                                                    )
                                                }


                                                className="text-blue-600 hover:text-blue-800">
                                                Lihat
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-gray-500 py-6">
                                        Tidak ada hasil untuk pencarian "{search}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default DetailHasilPerhitunganUniv;
