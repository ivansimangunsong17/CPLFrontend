import React, { useState, useMemo } from "react";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";
import { FiChevronDown, FiFilter } from "react-icons/fi";

// --- DATA DUMMY ---
const dataByYear = {
    "2020": [
        { cpl: "CPL-1", target: 80, aktual: 65 },
        { cpl: "CPL-2", target: 85, aktual: 70 },
        { cpl: "CPL-3", target: 78, aktual: 60 },
        { cpl: "CPL-4", target: 88, aktual: 75 },
        { cpl: "CPL-5", target: 90, aktual: 80 },
        { cpl: "CPL-6", target: 82, aktual: 72 },
        { cpl: "CPL-7", target: 76, aktual: 68 },
        { cpl: "CPL-8", target: 84, aktual: 70 },
        { cpl: "CPL-9", target: 79, aktual: 65 },
        { cpl: "CPL-10", target: 83, aktual: 74 },
    ],
    "2021": [
        { cpl: "CPL-1", target: 80, aktual: 75 },
        { cpl: "CPL-2", target: 85, aktual: 82 },
        { cpl: "CPL-3", target: 78, aktual: 70 },
        { cpl: "CPL-4", target: 88, aktual: 85 },
        { cpl: "CPL-5", target: 90, aktual: 92 },
        { cpl: "CPL-6", target: 82, aktual: 80 },
        { cpl: "CPL-7", target: 76, aktual: 74 },
        { cpl: "CPL-8", target: 84, aktual: 77 },
        { cpl: "CPL-9", target: 79, aktual: 72 },
        { cpl: "CPL-10", target: 83, aktual: 80 },
    ],
    "2022": [
        { cpl: "CPL-1", target: 80, aktual: 78 },
        { cpl: "CPL-2", target: 85, aktual: 84 },
        { cpl: "CPL-3", target: 78, aktual: 75 },
        { cpl: "CPL-4", target: 88, aktual: 87 },
        { cpl: "CPL-5", target: 90, aktual: 94 },
        { cpl: "CPL-6", target: 82, aktual: 81 },
        { cpl: "CPL-7", target: 76, aktual: 75 },
        { cpl: "CPL-8", target: 84, aktual: 80 },
        { cpl: "CPL-9", target: 79, aktual: 76 },
        { cpl: "CPL-10", target: 83, aktual: 82 },
    ],
    "2023": [
        { cpl: "CPL-1", target: 80, aktual: 82 },
        { cpl: "CPL-2", target: 85, aktual: 86 },
        { cpl: "CPL-3", target: 78, aktual: 79 },
        { cpl: "CPL-4", target: 88, aktual: 90 },
        { cpl: "CPL-5", target: 90, aktual: 95 },
        { cpl: "CPL-6", target: 82, aktual: 84 },
        { cpl: "CPL-7", target: 76, aktual: 78 },
        { cpl: "CPL-8", target: 84, aktual: 85 },
        { cpl: "CPL-9", target: 79, aktual: 80 },
        { cpl: "CPL-10", target: 83, aktual: 85 },
    ],
    "2024": [
        { cpl: "CPL-1", target: 80, aktual: 85 },
        { cpl: "CPL-2", target: 85, aktual: 88 },
        { cpl: "CPL-3", target: 78, aktual: 82 },
        { cpl: "CPL-4", target: 88, aktual: 92 },
        { cpl: "CPL-5", target: 90, aktual: 96 },
        { cpl: "CPL-6", target: 82, aktual: 88 },
        { cpl: "CPL-7", target: 76, aktual: 80 },
        { cpl: "CPL-8", target: 84, aktual: 88 },
        { cpl: "CPL-9", target: 79, aktual: 85 },
        { cpl: "CPL-10", target: 83, aktual: 89 },
    ],
};

// --- HELPER: Menghitung Rata-Rata ---
const calculateAverageData = () => {
    const years = Object.keys(dataByYear);
    const numYears = years.length;
    const cplKeys = dataByYear[years[0]].map((item) => item.cpl);

    return cplKeys.map((cplKey, index) => {
        const target = dataByYear[years[0]][index].target;
        const totalAktual = years.reduce((sum, year) => {
            return sum + dataByYear[year][index].aktual;
        }, 0);
        const averageAktual = Math.round(totalAktual / numYears);

        return {
            cpl: cplKey,
            target: target,
            aktual: averageAktual,
            fullMark: 100,
        };
    });
};

const averageData = calculateAverageData();

// --- KOMPONEN TOOLTIP ---
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/95 backdrop-blur-sm border border-gray-100 p-3 rounded-lg shadow-lg text-xs z-50">
                <p className="font-bold text-gray-700 mb-2 border-b pb-1">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 mb-1 last:mb-0">
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-gray-500">{entry.name}:</span>
                        <span className="font-semibold text-gray-800 ml-auto">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

// --- KOMPONEN UTAMA ---
const SpiderChartCPL = ({ enableFilter = false }) => {
    const [selectedYear, setSelectedYear] = useState("2021");

    // Logika Pemilihan Data
    // Jika enableFilter = true, gunakan data tahunan. Jika false, gunakan data rata-rata.
    const chartData = useMemo(() => {
        return enableFilter ? (dataByYear[selectedYear] || []) : averageData;
    }, [enableFilter, selectedYear]);

    // Judul dan Subjudul Dinamis
    const title = enableFilter ? "Capaian Per Angkatan" : "Rata-rata Capaian";
    const subtitle = enableFilter ? `Angkatan ${selectedYear}` : "Semua Angkatan (2020-2024)";
    const seriesName = enableFilter ? `Aktual ${selectedYear}` : "Rata-rata Aktual";

    return (
        <div className="w-full flex flex-col bg-white p-5 rounded-2xl border border-gray-100 shadow-sm h-full relative">

            {/* Header Chart */}
            <div className="flex justify-between items-start mb-2 h-10">
                <div>
                    <h3 className="text-sm font-bold text-gray-800">{title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
                </div>

                {/* Dropdown Filter (Hanya Muncul Jika enableFilter = true) */}
                {enableFilter && (
                    <div className="relative">
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="appearance-none bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-medium py-1.5 pl-3 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors cursor-pointer"
                        >
                            {Object.keys(dataByYear).map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <FiChevronDown className="h-3 w-3" />
                        </div>
                    </div>
                )}

                {/* Indikator Mode Rata-rata (Jika Filter Mati) */}
                {!enableFilter && (
                    <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-[10px] font-semibold tracking-wide uppercase">
                        Average
                    </div>
                )}
            </div>

            {/* Area Chart */}
            <div className="flex-1 w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                        <PolarGrid stroke="#e5e7eb" strokeDasharray="4 4" />

                        <PolarAngleAxis
                            dataKey="cpl"
                            tick={{ fill: "#6b7280", fontSize: 10, fontWeight: 600 }}
                        />

                        <PolarRadiusAxis
                            angle={30}
                            domain={[0, 100]}
                            tick={{ fill: "#9ca3af", fontSize: 9 }}
                            axisLine={false}
                        />

                        {/* Area Target (Latar Belakang) */}
                        <Radar
                            name="Target Prodi"
                            dataKey="target"
                            stroke="#94a3b8" // Slate-400
                            strokeWidth={1.5}
                            strokeDasharray="3 3"
                            fill="#94a3b8"
                            fillOpacity={0.1}
                        />

                        {/* Area Aktual (Data Utama) */}
                        <Radar
                            name={seriesName}
                            dataKey="aktual"
                            stroke="#3b82f6" // Blue-500
                            strokeWidth={2.5}
                            fill="#3b82f6"
                            fillOpacity={0.3}
                            activeDot={{ r: 4, strokeWidth: 0 }}
                        />

                        <Tooltip content={<CustomTooltip />} cursor={false} />

                        <Legend
                            iconType="circle"
                            iconSize={8}
                            wrapperStyle={{ paddingTop: "10px", fontSize: "11px", color: "#6b7280" }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SpiderChartCPL;