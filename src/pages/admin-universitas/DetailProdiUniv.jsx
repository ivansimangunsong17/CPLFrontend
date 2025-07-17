import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    AiOutlineArrowLeft,
    AiOutlineFileText,
    AiOutlineUser,
    AiOutlineBarChart,
    AiOutlineCalendar,
    AiOutlineBook,
    AiOutlineTeam,
    AiOutlineTrophy,
    AiOutlineDownload,
    AiOutlinePrinter,
    AiOutlineEye
} from "react-icons/ai";
import {
    FaGraduationCap,
    FaChalkboardTeacher,
    FaBookOpen,
    FaAward,
    FaUsers,
    FaClock
} from "react-icons/fa";
import { useProdiList } from "../../hooks/admin-universitas/useDataProdi";
import LoadingScreen from "../../components/LoadingScreen";

const DetailProdiUniv = () => {
    const { prodiId } = useParams();
    const navigate = useNavigate();
    const { data: prodiList, isLoading, isError } = useProdiList();
    const [activeTab, setActiveTab] = useState('overview');

    // Find the specific prodi data
    const prodiData = prodiList?.find(item => item.prodi_id.toString() === prodiId);

    // Sample data for demonstration - replace with real API data
    const sampleData = {
        tahunAjaran: "2023/2024",
        kodeMatakuliah: "IF1323415256",
        namaMatakuliah: "STRUKTUR DATA",
        namaKelas: "STRUKTUR DATA A",
        dosenPengampu: "Taufik Hidayat, S.T., M.T.",
        totalMahasiswa: 45,
        pencapaianCPL: 75,
        akreditasi: "B",
        tahunBerdiri: "2005",
        cplData: [
            {
                code: "CPL-01",
                description: "Memiliki pengetahuan yang memadai terkait cara kerja sistem komputer dan mampu menerapkan menggunakan berbagai algoritma/metode untuk memecahkan masalah pada suatu organisasi",
                achievement: 78
            },
            {
                code: "CPL-02",
                description: "Mampu menganalisis kebutuhan pengguna dan merancang solusi berbasis teknologi informasi",
                achievement: 82
            },
            {
                code: "CPL-03",
                description: "Mampu bekerja sama dalam tim dan berkomunikasi dengan baik",
                achievement: 85
            }
        ],
        cpmkData: [
            {
                code: "CPMK-01",
                description: "Mampu memahami cara kerja sistem komputer",
                achievement: 80
            },
            {
                code: "CPMK-02",
                description: "Mampu menerapkan algoritma untuk memecahkan suatu masalah",
                achievement: 75
            },
            {
                code: "CPMK-03",
                description: "Mampu menggunakan struktur data untuk menyelesaikan permasalahan",
                achievement: 78
            }
        ]
    };

    if (isLoading) {
        return <LoadingScreen message="Memuat detail program studi..." />;
    }

    if (isError || !prodiData) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <p className="font-semibold">Error</p>
                        <p>
                            {isError ? "Terjadi kesalahan saat mengambil data." : "Program studi tidak ditemukan."}
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/dashboard/admin_universitas/hasil_perhitungan")}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                    >
                        <AiOutlineArrowLeft size={18} />
                        <span>Kembali</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="p-6">
                        {/* Breadcrumb */}
                        <nav className="flex items-center text-sm text-gray-600 mb-4">
                            <button
                                onClick={() => navigate("/dashboard/admin_universitas/hasil_perhitungan")}
                                className="hover:text-blue-600 transition-colors"
                            >
                                Hasil Perhitungan
                            </button>
                            <span className="mx-2">/</span>
                            <span className="text-gray-800 font-medium">Detail Program Studi</span>
                        </nav>

                        {/* Header Content */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <button
                                    onClick={() => navigate("/dashboard/admin_universitas/hasil_perhitungan")}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition mt-1"
                                >
                                    <AiOutlineArrowLeft size={18} />
                                    <span>Kembali</span>
                                </button>

                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <FaGraduationCap className="text-blue-600" size={24} />
                                        </div>
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-800">{prodiData.nama_prodi}</h1>
                                            <p className="text-gray-600">{prodiData.fakultas?.nama_fakultas}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                            {prodiData.kode_prodi}
                                        </span>
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                            Akreditasi {sampleData.akreditasi}
                                        </span>
                                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                                            Berdiri {sampleData.tahunBerdiri}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                    <AiOutlineDownload size={16} />
                                    Export
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                                    <AiOutlinePrinter size={16} />
                                    Print
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="border-t border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {[
                                { id: 'overview', label: 'Overview', icon: <AiOutlineEye size={16} /> },
                                { id: 'cpl', label: 'Data CPL', icon: <FaAward size={16} /> },
                                { id: 'cpmk', label: 'Data CPMK', icon: <FaBookOpen size={16} /> },
                                { id: 'mahasiswa', label: 'Data Mahasiswa', icon: <FaUsers size={16} /> },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-600">Total Mahasiswa</h3>
                                        <p className="text-2xl font-bold text-blue-600">{sampleData.totalMahasiswa}</p>
                                        <p className="text-xs text-gray-500 mt-1">Tahun {sampleData.tahunAjaran}</p>
                                    </div>
                                    <div className="p-3 bg-blue-100 rounded-full">
                                        <FaUsers className="text-blue-600" size={20} />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-600">Pencapaian CPL</h3>
                                        <p className="text-2xl font-bold text-green-600">{sampleData.pencapaianCPL}%</p>
                                        <p className="text-xs text-green-500 mt-1">↗ +5% dari semester lalu</p>
                                    </div>
                                    <div className="p-3 bg-green-100 rounded-full">
                                        <FaAward className="text-green-600" size={20} />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-600">Mata Kuliah Aktif</h3>
                                        <p className="text-2xl font-bold text-purple-600">24</p>
                                        <p className="text-xs text-gray-500 mt-1">Semester ini</p>
                                    </div>
                                    <div className="p-3 bg-purple-100 rounded-full">
                                        <FaBookOpen className="text-purple-600" size={20} />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-600">Dosen Pengampu</h3>
                                        <p className="text-2xl font-bold text-orange-600">18</p>
                                        <p className="text-xs text-gray-500 mt-1">Aktif mengajar</p>
                                    </div>
                                    <div className="p-3 bg-orange-100 rounded-full">
                                        <FaChalkboardTeacher className="text-orange-600" size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Program Information */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <AiOutlineFileText className="text-blue-600" />
                                    Informasi Program Studi
                                </h2>

                                <div className="space-y-4">
                                    <div className="grid gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Kode Program Studi
                                            </label>
                                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                                <span className="text-gray-900">{prodiData.kode_prodi}</span>
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Nama Program Studi
                                            </label>
                                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                                <span className="text-gray-900">{prodiData.nama_prodi}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Fakultas
                                        </label>
                                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                            <span className="text-gray-900">{prodiData.fakultas?.nama_fakultas || "-"}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Tahun Berdiri
                                            </label>
                                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                                <span className="text-gray-900">{sampleData.tahunBerdiri}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Akreditasi
                                            </label>
                                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                                <span className="text-gray-900 font-medium">{sampleData.akreditasi}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Current Course Info */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <FaClock className="text-green-600" />
                                    Mata Kuliah Sample
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tahun Ajaran
                                        </label>
                                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                            <span className="text-blue-900 font-medium">{sampleData.tahunAjaran}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Kode Mata Kuliah
                                        </label>
                                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                            <span className="text-gray-900 font-mono">{sampleData.kodeMatakuliah}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nama Mata Kuliah
                                        </label>
                                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                            <span className="text-gray-900 font-medium">{sampleData.namaMatakuliah}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nama Kelas
                                        </label>
                                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                            <span className="text-gray-900">{sampleData.namaKelas}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Dosen Pengampu
                                        </label>
                                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                            <span className="text-gray-900">{sampleData.dosenPengampu}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* CPL Tab Content */}
                {activeTab === 'cpl' && (
                    <div className="space-y-6">
                        {/* CPL Header Info */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Capaian Pembelajaran Lulusan (CPL)
                            </h2>
                            <p className="text-gray-600">
                                Hasil Pengukuran CPMK - CPL dan CPMK yang dibebankan pada MK
                            </p>
                        </div>

                        {/* CPL Data Table */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-blue-500 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-medium">CPL</th>
                                            <th className="px-6 py-4 text-left font-medium">Deskripsi</th>
                                            <th className="px-6 py-4 text-center font-medium">Pencapaian</th>
                                            <th className="px-6 py-4 text-center font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {sampleData.cplData.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <span className="font-medium text-blue-600">{item.code}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-gray-900 text-sm leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex items-center justify-center">
                                                        <div className="w-16 h-16 relative">
                                                            <svg className="w-16 h-16 transform -rotate-90">
                                                                <circle
                                                                    cx="32"
                                                                    cy="32"
                                                                    r="28"
                                                                    stroke="#e5e7eb"
                                                                    strokeWidth="8"
                                                                    fill="transparent"
                                                                />
                                                                <circle
                                                                    cx="32"
                                                                    cy="32"
                                                                    r="28"
                                                                    stroke={item.achievement >= 80 ? "#10b981" : item.achievement >= 60 ? "#f59e0b" : "#ef4444"}
                                                                    strokeWidth="8"
                                                                    fill="transparent"
                                                                    strokeDasharray={`${(item.achievement / 100) * 175.93} 175.93`}
                                                                    strokeLinecap="round"
                                                                />
                                                            </svg>
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <span className="text-sm font-bold">{item.achievement}%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.achievement >= 80
                                                        ? 'bg-green-100 text-green-800'
                                                        : item.achievement >= 60
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {item.achievement >= 80 ? 'Excellent' : item.achievement >= 60 ? 'Good' : 'Needs Improvement'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* CPL Learning Methods */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pelaksanaan Pembelajaran</h3>
                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <p className="text-sm text-gray-700 mb-2">
                                    <strong>Deskripsi pelaksanaan perkuliahan, kesesuaian yang direncanakan di RPS dengan yang terlaksana</strong>
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium text-gray-800 mb-3">Materi/Praktikum yang diberikan</h4>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li className="flex items-start gap-2">
                                            <span className="font-medium text-blue-600">1.</span>
                                            <span>Sejarah OOP</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="font-medium text-blue-600">2.</span>
                                            <span>Perbandingan Prosedural Dengan OOP</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="font-medium text-blue-600">3.</span>
                                            <span>OOP dalam Java</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-800 mb-3">Metode pembelajaran yang dilaksanakan</h4>
                                    <div className="bg-blue-50 rounded-lg p-3">
                                        <p className="text-sm text-blue-800 font-medium">Problem Based Learning</p>
                                    </div>

                                    <h4 className="font-medium text-gray-800 mb-3 mt-4">Metode asesmen yang dilaksanakan</h4>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li className="flex items-start gap-2">
                                            <span className="font-medium text-green-600">1.</span>
                                            <span>Tugas</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="font-medium text-green-600">2.</span>
                                            <span>UTS</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="font-medium text-green-600">3.</span>
                                            <span>UAS</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* CPMK Tab Content */}
                {activeTab === 'cpmk' && (
                    <div className="space-y-6">
                        {/* CPMK Header */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Capaian Pembelajaran Mata Kuliah (CPMK)
                            </h2>
                            <p className="text-gray-600">
                                CPL dan CPMK yang dibebankan pada MK
                            </p>
                        </div>

                        {/* CPMK Tabs */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="border-b border-gray-200">
                                <nav className="flex">
                                    <button className="px-6 py-4 bg-blue-500 text-white font-medium border-b-2 border-blue-500">
                                        CPL
                                    </button>
                                    <button className="px-6 py-4 bg-blue-500 text-white font-medium">
                                        CPMK
                                    </button>
                                </nav>
                            </div>

                            <div className="p-6">
                                {/* CPMK Data Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <tbody className="divide-y divide-gray-200">
                                            {sampleData.cpmkData.map((item, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="py-4 pr-6 w-24">
                                                        <span className="font-medium text-blue-600 text-sm">{item.code}.</span>
                                                    </td>
                                                    <td className="py-4">
                                                        <p className="text-gray-900 text-sm leading-relaxed">
                                                            {item.description}
                                                        </p>
                                                    </td>
                                                    <td className="py-4 text-right w-20">
                                                        <div className="flex items-center justify-end">
                                                            <div className="w-12 h-12 relative">
                                                                <svg className="w-12 h-12 transform -rotate-90">
                                                                    <circle
                                                                        cx="24"
                                                                        cy="24"
                                                                        r="20"
                                                                        stroke="#e5e7eb"
                                                                        strokeWidth="6"
                                                                        fill="transparent"
                                                                    />
                                                                    <circle
                                                                        cx="24"
                                                                        cy="24"
                                                                        r="20"
                                                                        stroke={item.achievement >= 80 ? "#10b981" : item.achievement >= 60 ? "#f59e0b" : "#ef4444"}
                                                                        strokeWidth="6"
                                                                        fill="transparent"
                                                                        strokeDasharray={`${(item.achievement / 100) * 125.66} 125.66`}
                                                                        strokeLinecap="round"
                                                                    />
                                                                </svg>
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <span className="text-xs font-bold">{item.achievement}%</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mahasiswa Tab Content */}
                {activeTab === 'mahasiswa' && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="text-center py-12">
                            <FaUsers className="mx-auto text-gray-400 mb-4" size={48} />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Data Mahasiswa</h3>
                            <p className="text-gray-500">Data mahasiswa akan ditampilkan di sini</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DetailProdiUniv;
