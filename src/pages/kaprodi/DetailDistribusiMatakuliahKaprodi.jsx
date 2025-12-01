import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import hooks routing
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
    LabelList,
} from "recharts";
import { FiChevronDown, FiBook, FiHash, FiSearch, FiEye } from "react-icons/fi";

// --- KOMPONEN KECIL (UI COMPONENTS) ---

// 1. Kartu Info Mata Kuliah (Reusable)
const InfoCard = ({ label, value, icon: Icon }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 transition-all hover:shadow-md">
        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <Icon size={24} />
        </div>
        <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
            <h3 className="text-xl font-bold text-gray-800">{value}</h3>
        </div>
    </div>
);

// 2. Wrapper Grafik (Reusable)
const ChartCard = ({ title, children }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
        <h3 className="text-sm font-bold text-gray-700 mb-6 text-center uppercase tracking-wide border-b border-gray-50 pb-4">
            {title}
        </h3>
        <div className="flex-1 min-h-[350px] w-full">
            {children}
        </div>
    </div>
);

// 3. Custom Tooltip yang Elegan
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/95 backdrop-blur-sm border border-gray-100 p-4 rounded-xl shadow-xl text-xs">
                <p className="font-bold text-gray-700 mb-2 text-sm border-b pb-2">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.fill || entry.color }} />
                        <span className="text-gray-500 font-medium min-w-[60px]">{entry.name}:</span>
                        <span className="font-bold text-gray-800">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const DetailDistribusiMatakuliahKaprodi = () => {
    const navigate = useNavigate();
    // Ambil mataKuliahId dari URL jika tersedia, atau gunakan fallback untuk data dummy
    const { mataKuliahId } = useParams();

    // --- DATA DUMMY ---
    const mataKuliahInfo = {
        nama: "STRUKTUR DATA",
        kode: "5616563",
    };

    // Data Grafik
    const dataCPLRataRata = [
        { name: "CPL 1", nilai: 80, fill: "#3b82f6" },
        { name: "CPL 2", nilai: 65, fill: "#f59e0b" },
        { name: "CPL 3", nilai: 74, fill: "#10b981" },
    ];

    const dataCPMKRataRata = [
        { name: "CPMK 1", nilai: 82, fill: "#3b82f6" },
        { name: "CPMK 2", nilai: 75, fill: "#f59e0b" },
        { name: "CPMK 3", nilai: 69, fill: "#10b981" },
        { name: "CPMK 4", nilai: 77, fill: "#ef4444" },
        { name: "CPMK 5", nilai: 73, fill: "#8b5cf6" },
        { name: "CPMK 6", nilai: 68, fill: "#ec4899" },
    ];

    const dataCPLPerKelas = [
        { kelas: "Kelas A", CPL1: 78, CPL2: 74, CPL3: 75 },
        { kelas: "Kelas B", CPL1: 75, CPL2: 71, CPL3: 73 },
        { kelas: "Kelas C", CPL1: 77, CPL2: 73, CPL3: 74 },
        { kelas: "Kelas D", CPL1: 74, CPL2: 70, CPL3: 72 },
    ];

    const dataCPMKPerKelas = [
        { kelas: "Kelas A", CPMK1: 82, CPMK2: 78, CPMK3: 70, CPMK4: 75, CPMK5: 72, CPMK6: 69 },
        { kelas: "Kelas B", CPMK1: 77, CPMK2: 73, CPMK3: 67, CPMK4: 74, CPMK5: 70, CPMK6: 68 },
        { kelas: "Kelas C", CPMK1: 79, CPMK2: 74, CPMK3: 69, CPMK4: 76, CPMK5: 71, CPMK6: 70 },
        { kelas: "Kelas D", CPMK1: 75, CPMK2: 71, CPMK3: 65, CPMK4: 73, CPMK5: 69, CPMK6: 67 },
    ];

    // --- DATA DUMMY KELAS ---
    const dataKelas = [
        { id: 1, kode: "IF265365", matkul: "Struktur Data", kelas: "Struktur Data A", dosen: "Rizka Andayani, S.T., M.T.", periode: "2024 Genap" },
        { id: 2, kode: "IF265365", matkul: "Struktur Data", kelas: "Struktur Data B", dosen: "Rizka Andayani, S.T., M.T.", periode: "2024 Genap" },
        { id: 3, kode: "IF265365", matkul: "Struktur Data", kelas: "Struktur Data C", dosen: "Dr. Budi Santoso, S.Kom., M.Cs.", periode: "2024 Genap" },
        { id: 4, kode: "IF265365", matkul: "Struktur Data", kelas: "Struktur Data D", dosen: "Dr. Budi Santoso, S.Kom., M.Cs.", periode: "2024 Genap" },
    ];

    const targetLine = 70;
    const [periode, setPeriode] = useState("2024 Genap");
    const [searchKelas, setSearchKelas] = useState(""); // State untuk pencarian kelas

    // Filter data kelas
    const filteredKelas = dataKelas.filter(kelas =>
        kelas.kelas.toLowerCase().includes(searchKelas.toLowerCase()) ||
        kelas.dosen.toLowerCase().includes(searchKelas.toLowerCase())
    );

    // Handler untuk navigasi ke detail kelas
    const handleViewDetail = (kelasId) => {
        // Gunakan mataKuliahId dari URL jika ada, jika tidak gunakan dummy id dari data info
        const currentMataKuliahId = mataKuliahId || mataKuliahInfo.kode;
        navigate(`/dashboard/kaprodi/detail_distribusi_matakuliah/${currentMataKuliahId}/${kelasId}`);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* --- 1. Header Info --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoCard label="Nama Mata Kuliah" value={mataKuliahInfo.nama} icon={FiBook} />
                    <InfoCard label="Kode Mata Kuliah" value={mataKuliahInfo.kode} icon={FiHash} />
                </div>

                {/* --- 2. Grafik Rata-rata (Baris 1) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ChartCard title="Perbandingan Target Dengan Rata-rata CPL">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataCPLRataRata} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} dy={10} />
                                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f4f6" }} />
                                <ReferenceLine y={targetLine} label={{ value: "Target", position: "right", fill: "#0ea5e9", fontSize: 10 }} stroke="#0ea5e9" strokeDasharray="4 4" />
                                <Bar dataKey="nilai" radius={[8, 8, 0, 0]} barSize={50}>
                                    <LabelList dataKey="nilai" position="top" fill="#374151" fontSize={12} fontWeight="bold" offset={10} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Perbandingan Target Dengan Rata-rata CPMK">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataCPMKRataRata} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} dy={10} />
                                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f4f6" }} />
                                <ReferenceLine y={targetLine} label={{ value: "Target", position: "right", fill: "#0ea5e9", fontSize: 10 }} stroke="#0ea5e9" strokeDasharray="4 4" />
                                <Bar dataKey="nilai" radius={[6, 6, 0, 0]} barSize={35}>
                                    <LabelList dataKey="nilai" position="top" fill="#374151" fontSize={11} fontWeight="bold" offset={5} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                {/* --- 3. Filter Periode --- */}
                <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center pt-6 border-t border-gray-200">
                    <div className="mb-4 sm:mb-0">
                        <h2 className="text-lg font-bold text-gray-800">Analisis Per Kelas</h2>
                        <p className="text-sm text-gray-500">Lihat detail distribusi nilai berdasarkan kelas dan periode</p>
                    </div>

                    <div className="relative min-w-[200px]">
                        <select
                            value={periode}
                            onChange={(e) => setPeriode(e.target.value)}
                            className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2.5 pl-4 pr-10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer font-medium text-sm transition-all"
                        >
                            <option value="2024 Genap">Periode: 2024 Genap</option>
                            <option value="2024 Ganjil">Periode: 2024 Ganjil</option>
                            <option value="2023 Genap">Periode: 2023 Genap</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                            <FiChevronDown />
                        </div>
                    </div>
                </div>

                {/* --- 4. Grafik Per Kelas (Baris 2) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ChartCard title="Nilai CPL per Kelas">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataCPLPerKelas} margin={{ top: 20, right: 30, left: -20, bottom: 0 }} barGap={4}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="kelas" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 600 }} dy={10} />
                                <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f4f6" }} />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px", fontSize: "12px" }} />
                                <ReferenceLine y={targetLine} stroke="#0ea5e9" strokeDasharray="4 4" />

                                <Bar dataKey="CPL1" name="CPL 1" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="CPL2" name="CPL 2" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="CPL3" name="CPL 3" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Nilai CPMK per Kelas">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataCPMKPerKelas} margin={{ top: 20, right: 30, left: -20, bottom: 0 }} barGap={2}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="kelas" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 600 }} dy={10} />
                                <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f4f6" }} />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px", fontSize: "11px" }} />
                                <ReferenceLine y={targetLine} stroke="#0ea5e9" strokeDasharray="4 4" />

                                <Bar dataKey="CPMK1" name="CPMK 1" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                                <Bar dataKey="CPMK2" name="CPMK 2" fill="#f59e0b" radius={[3, 3, 0, 0]} />
                                <Bar dataKey="CPMK3" name="CPMK 3" fill="#10b981" radius={[3, 3, 0, 0]} />
                                <Bar dataKey="CPMK4" name="CPMK 4" fill="#ef4444" radius={[3, 3, 0, 0]} />
                                <Bar dataKey="CPMK5" name="CPMK 5" fill="#8b5cf6" radius={[3, 3, 0, 0]} />
                                <Bar dataKey="CPMK6" name="CPMK 6" fill="#ec4899" radius={[3, 3, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                {/* --- 5. Tabel Daftar Kelas (BARU) --- */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <h3 className="text-lg font-bold text-gray-800">
                            Daftar Kelas Mata Kuliah {mataKuliahInfo.nama} Periode {periode}
                        </h3>

                        {/* Search Kelas */}
                        <div className="relative w-full md:w-72">
                            <input
                                type="text"
                                placeholder="Cari Kelas..."
                                value={searchKelas}
                                onChange={(e) => setSearchKelas(e.target.value)}
                                className="w-full pl-10 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                            <FiSearch className="absolute left-3.5 top-3 text-gray-400" size={16} />
                            <button className="absolute right-1.5 top-1.5 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <FiSearch size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-blue-600 text-white uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Kode MK</th>
                                    <th className="px-6 py-4 font-semibold">Nama Mata Kuliah</th>
                                    <th className="px-6 py-4 font-semibold">Nama Kelas</th>
                                    <th className="px-6 py-4 font-semibold">Dosen</th>
                                    <th className="px-6 py-4 font-semibold">Periode</th>
                                    <th className="px-6 py-4 text-center font-semibold">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredKelas.length > 0 ? (
                                    filteredKelas.map((kelas) => (
                                        <tr key={kelas.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{kelas.kode}</td>
                                            <td className="px-6 py-4 text-gray-700">{kelas.matkul}</td>
                                            <td className="px-6 py-4 text-gray-900 font-semibold">{kelas.kelas}</td>
                                            <td className="px-6 py-4 text-gray-600">{kelas.dosen}</td>
                                            <td className="px-6 py-4 text-gray-600">
                                                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium">
                                                    {kelas.periode}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => handleViewDetail(kelas.id)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full text-xs font-medium transition-colors"
                                                >
                                                    Lihat <FiEye size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                                            Tidak ada data kelas yang ditemukan.
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

export default DetailDistribusiMatakuliahKaprodi;