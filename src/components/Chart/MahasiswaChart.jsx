import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUser, FiMaximize2 } from "react-icons/fi";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Legend,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

// --- DATA DUMMY ---
const mahasiswaInfo = {
    nama: "BUDI SIREGAR",
    npm: "214544646446",
    kelas: "Struktur Data A",
};

// Ubah data ini untuk menguji fallback (misal hapus satu item)
const dataCPL = [
    { subject: "CPL-01", target: 70, nilai: 85, fullMark: 100 },
    { subject: "CPL-02", target: 70, nilai: 65, fullMark: 100 },
    { subject: "CPL-03", target: 70, nilai: 90, fullMark: 100 }
];

const dataCPMK = [
    { subject: "CPMK-01", target: 70, nilai: 82, fullMark: 100 },
    { subject: "CPMK-02", target: 70, nilai: 75, fullMark: 100 },
    { subject: "CPMK-03", target: 70, nilai: 69, fullMark: 100 },
    { subject: "CPMK-04", target: 70, nilai: 77, fullMark: 100 },
    { subject: "CPMK-05", target: 70, nilai: 73, fullMark: 100 },
    { subject: "CPMK-06", target: 70, nilai: 68, fullMark: 100 },
];

// --- KOMPONEN CUSTOM TOOLTIP ---
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/80 backdrop-blur-md border border-white/20 p-3 rounded-xl shadow-lg text-xs z-50">
                <p className="font-bold text-gray-700 mb-1">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 mb-1 last:mb-0">
                        <div
                            className="w-2 h-2 rounded-full shadow-sm"
                            style={{ backgroundColor: entry.stroke || entry.fill }}
                        />
                        <span className="text-gray-500 font-medium">{entry.name}:</span>
                        <span className="font-bold text-gray-800">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

// --- KOMPONEN CHART CARD (REUSABLE) ---
const ChartCard = ({ title, data }) => {
    // Cek jumlah data untuk menentukan jenis grafik
    const isRadarSuitable = data.length >= 3;

    return (
        <div className="flex flex-col items-center w-full">
            <h3 className="text-sm font-semibold text-gray-500 mb-6 text-center uppercase tracking-wide">
                {title}
            </h3>
            <div className="w-full h-[350px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    {isRadarSuitable ? (
                        // Tampilkan RADAR CHART jika data >= 3
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                            <PolarGrid stroke="#e2e8f0" strokeDasharray="4 4" />
                            <PolarAngleAxis
                                dataKey="subject"
                                tick={{ fill: "#64748b", fontSize: 11, fontWeight: 600 }}
                            />
                            <PolarRadiusAxis
                                angle={90}
                                domain={[0, 100]}
                                tick={false}
                                axisLine={false}
                            />
                            <Radar
                                name="Target"
                                dataKey="target"
                                stroke="#3b82f6"
                                strokeWidth={1.5}
                                fill="#3b82f6"
                                fillOpacity={0.05}
                            />
                            <Radar
                                name="Nilai Mahasiswa"
                                dataKey="nilai"
                                stroke="#f59e0b"
                                strokeWidth={2.5}
                                fill="#f59e0b"
                                fillOpacity={0.3}
                                activeDot={{ r: 4, strokeWidth: 0, fill: "#f59e0b" }}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={false} />
                            <Legend
                                iconType="circle"
                                iconSize={8}
                                wrapperStyle={{ paddingTop: "10px", fontSize: "11px", color: "#64748b" }}
                            />
                        </RadarChart>
                    ) : (
                        // Tampilkan BAR CHART jika data < 3 (Fallback)
                        <BarChart
                            data={data}
                            margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
                            barGap={2}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis
                                dataKey="subject"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                                dy={10}
                            />
                            <YAxis
                                domain={[0, 100]}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#64748b", fontSize: 12 }}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f4f6" }} />
                            <Legend
                                iconType="circle"
                                iconSize={8}
                                wrapperStyle={{ paddingTop: "20px", fontSize: "11px", color: "#64748b" }}
                            />
                            <Bar
                                dataKey="target"
                                name="Target"
                                fill="#3b82f6"
                                radius={[4, 4, 0, 0]}
                                barSize={40}
                                fillOpacity={0.6} // Sedikit transparan agar beda
                            />
                            <Bar
                                dataKey="nilai"
                                name="Nilai Mahasiswa"
                                fill="#f59e0b"
                                radius={[4, 4, 0, 0]}
                                barSize={40}
                            />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const MahasiswaChart = () => {
    const navigate = useNavigate();

    return (
        <div className="p-6 w-full font-sans text-gray-800">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* --- Header Halaman --- */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="group p-2 rounded-full bg-white text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm border border-gray-100 hover:border-blue-100"
                        >
                            <FiArrowLeft size={20} className="transform group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Detail Capaian Mahasiswa</h1>
                            <p className="text-sm text-gray-500 font-medium">Analisis visual performa individu</p>
                        </div>
                    </div>

                    {/* Chip Info Mahasiswa */}
                    <div className="bg-white py-2.5 px-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                            <FiUser size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mahasiswa</span>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-800 text-sm">{mahasiswaInfo.nama}</span>
                                <span className="text-gray-300 text-xs">|</span>
                                <span className="text-gray-500 text-sm font-mono">{mahasiswaInfo.npm}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Kartu Utama Grafik --- */}
                <div className="bg-white rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-50 p-8 md:p-10">

                    {/* Judul Besar Tengah */}
                    <div className="text-center mb-12">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                            Laporan Capaian Pembelajaran
                        </h2>
                        <p className="text-gray-500">
                            Kelas <span className="font-semibold text-gray-700">{mahasiswaInfo.kelas}</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative">

                        {/* Divider Vertikal (Hanya Desktop) */}
                        <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent -translate-x-1/2"></div>

                        {/* Grafik Kiri: CPL */}
                        <ChartCard
                            title="Perbandingan Target vs Nilai CPL"
                            data={dataCPL}
                        />

                        {/* Grafik Kanan: CPMK */}
                        <ChartCard
                            title="Perbandingan Target vs Nilai CPMK"
                            data={dataCPMK}
                        />

                    </div>
                </div>

            </div>
        </div>
    );
};

export default MahasiswaChart;