import React, { useState } from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

// Data dummy
const data = [
    { year: 2021, "CPL-1": 74, "CPL-2": 70, "CPL-3": 65, "CPL-4": 68, "CPL-5": 72, "CPL-6": 75, "CPL-7": 60, "CPL-8": 62, "CPL-9": 58, "CPL-10": 70 },
    { year: 2022, "CPL-1": 77, "CPL-2": 72, "CPL-3": 68, "CPL-4": 70, "CPL-5": 74, "CPL-6": 76, "CPL-7": 62, "CPL-8": 64, "CPL-9": 59, "CPL-10": 72 },
    { year: 2023, "CPL-1": 78, "CPL-2": 73, "CPL-3": 69, "CPL-4": 71, "CPL-5": 75, "CPL-6": 77, "CPL-7": 63, "CPL-8": 65, "CPL-9": 60, "CPL-10": 74 },
    { year: 2024, "CPL-1": 79, "CPL-2": 74, "CPL-3": 70, "CPL-4": 72, "CPL-5": 77, "CPL-6": 78, "CPL-7": 65, "CPL-8": 66, "CPL-9": 61, "CPL-10": 75 },
    { year: 2025, "CPL-1": 80, "CPL-2": 75, "CPL-3": 71, "CPL-4": 73, "CPL-5": 78, "CPL-6": 79, "CPL-7": 67, "CPL-8": 67, "CPL-9": 62, "CPL-10": 77 },
];

// Palet warna modern (Tailwind colors + custom) untuk 10 item
const colors = [
    "#3b82f6", // blue-500
    "#ef4444", // red-500
    "#10b981", // emerald-500
    "#f59e0b", // amber-500
    "#8b5cf6", // violet-500
    "#ec4899", // pink-500
    "#06b6d4", // cyan-500
    "#f97316", // orange-500
    "#6366f1", // indigo-500
    "#84cc16", // lime-500
];

// Custom Tooltip agar lebih rapi dan informatif
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        // Urutkan payload dari nilai terbesar ke terkecil agar mudah dibaca
        const sortedPayload = [...payload].sort((a, b) => b.value - a.value);

        return (
            <div className="bg-white/95 backdrop-blur-sm border border-gray-100 p-4 rounded-xl shadow-xl text-xs">
                <p className="font-bold text-gray-700 mb-2 text-sm border-b pb-2">
                    Tahun Angkatan {label}
                </p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    {sortedPayload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-gray-500 font-medium flex-1">
                                {entry.name}:
                            </span>
                            <span className="font-bold text-gray-800">{entry.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

// Custom Legend yang interaktif (Toggle hide/show)
const CustomLegend = (props) => {
    const { payload, hiddenSeries, setHiddenSeries } = props;

    const handleToggle = (dataKey) => {
        const newHidden = new Set(hiddenSeries);
        if (newHidden.has(dataKey)) {
            newHidden.delete(dataKey);
        } else {
            newHidden.add(dataKey);
        }
        setHiddenSeries(newHidden);
    };

    return (
        <div className="flex flex-wrap justify-center gap-3 mt-6">
            {payload.map((entry, index) => {
                const isHidden = hiddenSeries.has(entry.dataKey);
                return (
                    <button
                        key={`item-${index}`}
                        onClick={() => handleToggle(entry.dataKey)}
                        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all duration-200 border ${isHidden
                                ? "bg-gray-50 text-gray-400 border-gray-200 line-through opacity-60"
                                : "bg-white text-gray-700 border-gray-200 shadow-sm hover:shadow-md"
                            }`}
                    >
                        <div
                            className={`w-2.5 h-2.5 rounded-full transition-colors ${isHidden ? "bg-gray-300" : ""
                                }`}
                            style={{ backgroundColor: isHidden ? undefined : entry.color }}
                        />
                        <span className="font-medium">{entry.value}</span>
                    </button>
                );
            })}
        </div>
    );
};

const LineChartCPL = () => {
    // State untuk menyimpan CPL mana yang disembunyikan user
    const [hiddenSeries, setHiddenSeries] = useState(new Set());

    // Generate list key CPL (CPL-1 s.d CPL-10)
    const cplKeys = Array.from({ length: 10 }, (_, i) => `CPL-${i + 1}`);

    return (
        <div className="w-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        {/* Grid horizontal saja agar lebih bersih */}
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#e5e7eb"
                        />

                        <XAxis
                            dataKey="year"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#6b7280", fontSize: 12 }}
                            dy={10}
                        />

                        <YAxis
                            domain={[50, 90]} // Sesuaikan domain agar grafik tidak terlalu gepeng
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#6b7280", fontSize: 12 }}
                        />

                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#d1d5db", strokeWidth: 1, strokeDasharray: "4 4" }} />

                        <Legend
                            content={
                                <CustomLegend
                                    hiddenSeries={hiddenSeries}
                                    setHiddenSeries={setHiddenSeries}
                                />
                            }
                        />

                        {cplKeys.map((key, index) => (
                            <Line
                                key={key}
                                type="monotone" // Membuat garis melengkung halus
                                dataKey={key}
                                stroke={colors[index % colors.length]}
                                strokeWidth={hiddenSeries.has(key) ? 0 : 2.5} // Sembunyikan jika di toggle
                                dot={false} // Hilangkan dot default agar tidak berisik
                                activeDot={{ r: 6, strokeWidth: 0 }} // Dot hanya muncul saat hover
                                hide={hiddenSeries.has(key)} // Fitur hide bawaan Recharts
                                animationDuration={1500}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="text-center mt-4 text-xs text-gray-400 italic">
                * Klik pada label CPL di atas untuk menyembunyikan/menampilkan garis
            </div>
        </div>
    );
};

export default LineChartCPL;