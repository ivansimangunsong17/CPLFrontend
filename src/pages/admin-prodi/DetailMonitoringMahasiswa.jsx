import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiSearch, FiEye } from 'react-icons/fi';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from 'recharts';

const DetailMonitoringMahasiswa = () => {
    const navigate = useNavigate();
    const { mahasiswaId } = useParams(); // opsional kalau butuh ID dari URL

    const [searchTerm, setSearchTerm] = useState("");

    // fungsi klik lihat detail ✅
    const handleViewDetail = (mahasiswaId, matakuliahId) => {
        if (mahasiswaId && matakuliahId) {
            navigate(`/dashboard/admin_prodi/detail_monitoring_mahasiswa/${mahasiswaId}/${matakuliahId}`);
        } else {
            console.error("ID Mahasiswa atau Matakuliah tidak ditemukan", mahasiswaId, matakuliahId);
        }
    };


    const mahasiswaInfo = {
        nama: "BUDI SIREGAR",
        npm: "2116536537",
    };

    const dataMataKuliah = [
        { id: 1, matkul: "Struktur Data", kelas: "A", cpl: { 1: 73, 2: 73, 3: 75 } },
        { id: 2, matkul: "Basis Data", kelas: "A", cpl: { 1: 70, 3: 74, 5: 71, 6: 72 } },
        { id: 3, matkul: "Pemrograman Web", kelas: "A", cpl: { 4: 71, 5: 71, 6: 71, 7: 74 } },
        { id: 4, matkul: "Algoritma", kelas: "A", cpl: { 2: 76, 3: 72, 5: 72, 10: 75 } },
        { id: 5, matkul: "Jaringan Komputer", kelas: "B", cpl: { 1: 77, 2: 77, 3: 73, 4: 73 } },
        { id: 6, matkul: "Sistem Operasi", kelas: "A", cpl: { 8: 72, 9: 72, 10: 72 } },
        { id: 7, matkul: "Basis Data Lanjut", kelas: "A", cpl: { 2: 74, 4: 75, 7: 73, 8: 73 } },
        { id: 8, matkul: "Pemrograman Mobile", kelas: "B", cpl: { 3: 73, 5: 78, 8: 71 } },
        { id: 9, matkul: "Kecerdasan Buatan", kelas: "B", cpl: { 3: 75, 7: 72, 9: 76 } },
        { id: 10, matkul: "Pengolahan Citra", kelas: "A", cpl: { 2: 77, 4: 78, 5: 78, 7: 73, 10: 73 } },
    ];

    // filter tabel ✅
    const filteredData = useMemo(() => {
        return dataMataKuliah.filter((item) =>
            item.matkul.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.kelas.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [dataMataKuliah, searchTerm]);

    const renderNilai = (val) => {
        return val
            ? <span className="font-medium text-gray-800">{val}</span>
            : <span className="text-gray-300">-</span>;
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/95 backdrop-blur-sm border border-gray-200 p-3 rounded-lg shadow-xl text-xs">
                    <p className="font-bold text-gray-700 mb-1">{label}</p>
                    {payload.map((entry, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: entry.stroke || entry.fill }}
                            />
                            <span className="text-gray-500">{entry.name}:</span>
                            <span className="font-semibold text-gray-800">{entry.value}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    // Data Spider Chart ✅
    const dataCPL = [
        { subject: "CPL-1", target: 70, nilai: 65, fullMark: 100 },
        { subject: "CPL-2", target: 70, nilai: 80, fullMark: 100 },
        { subject: "CPL-3", target: 70, nilai: 55, fullMark: 100 },
        { subject: "CPL-4", target: 70, nilai: 90, fullMark: 100 },
        { subject: "CPL-5", target: 70, nilai: 85, fullMark: 100 },
        { subject: "CPL-6", target: 70, nilai: 75, fullMark: 100 },
        { subject: "CPL-7", target: 70, nilai: 60, fullMark: 100 },
        { subject: "CPL-8", target: 70, nilai: 95, fullMark: 100 },
        { subject: "CPL-9", target: 70, nilai: 88, fullMark: 100 },
        { subject: "CPL-10", target: 70, nilai: 70, fullMark: 100 },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Card Info Mahasiswa */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-center text-lg font-medium text-gray-800 mb-8">
                        Informasi Mahasiswa
                    </h2>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-24 relative">
                        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gray-200 -translate-x-1/2"></div>
                        <div className="flex flex-col items-center text-center">
                            <p className="text-sm text-gray-500 font-medium mb-1">Nama Mahasiswa</p>
                            <h3 className="text-xl font-bold text-gray-900">{mahasiswaInfo.nama}</h3>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <p className="text-sm text-gray-500 font-medium mb-1">NPM</p>
                            <h3 className="text-xl font-bold text-gray-900 font-mono">{mahasiswaInfo.npm}</h3>
                        </div>
                    </div>
                </div>

                {/* Spider Chart */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center min-h-[500px]">
                    <div className="w-full max-w-2xl h-[450px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dataCPL}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: "#374151", fontSize: 11, fontWeight: 500 }} />
                                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#9ca3af", fontSize: 10 }} />

                                <Radar name="Target CPL" dataKey="target" stroke="#3b82f6" strokeWidth={2} strokeDasharray="4 4" fill="transparent" />
                                <Radar name="Aktual CPL" dataKey="nilai" stroke="#f59e0b" strokeWidth={3} fill="#f59e0b" fillOpacity={0.25} />

                                <Tooltip content={<CustomTooltip />} />
                                <Legend iconType="plainline" wrapperStyle={{ paddingTop: 20, fontSize: 12, fontWeight: 500 }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* HEADER + SEARCH */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-xl font-bold text-gray-900">
                        Detail Mata Kuliah dan Nilai CPL Mahasiswa
                    </h2>

                    <div className="relative w-full md:w-72">
                        <input
                            type="text"
                            placeholder="Cari Matakuliah atau Kelas.."
                            className="w-full pl-10 pr-12 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FiSearch className="absolute left-3.5 top-3 text-gray-400" size={16} />
                    </div>
                </div>

                {/* TABEL */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-6 py-4 sticky left-0 bg-blue-600 ">Mata Kuliah</th>
                                    <th className="px-4 py-4 text-center border-r border-blue-500/30">Kelas</th>
                                    {[...Array(10)].map((_, i) => (
                                        <th key={i} className="px-3 py-4 text-center min-w-[60px]">CPL {i + 1}</th>
                                    ))}
                                    <th className="px-6 py-4 text-center sticky right-0 bg-blue-600 ">CPMK</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((item, idx) => (
                                        <tr key={item.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                            <td className="px-6 py-4 sticky left-0 bg-inherit border-r border-gray-200">
                                                {item.matkul}
                                            </td>
                                            <td className="px-4 py-4 text-center border-r">{item.kelas}</td>
                                            {[...Array(10)].map((_, i) => (
                                                <td key={i} className="text-center px-3 py-4">
                                                    {renderNilai(item.cpl[i + 1])}
                                                </td>
                                            ))}
                                            <td className="px-6 py-4 text-center sticky right-0 bg-inherit border-l border-gray-200">
                                                <button
                                                    onClick={() => handleViewDetail(mahasiswaId, item.id)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full text-xs font-medium border border-blue-200"
                                                >
                                                    Lihat <FiEye size={14} />
                                                </button>

                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={13} className="text-center px-6 py-12 italic text-gray-500">
                                            Tidak ada data ditemukan
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DetailMonitoringMahasiswa;
