import React from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

// Contoh data perkembangan CPL tiap angkatan
const data = [
    { year: 2021, "CPL-1": 74, "CPL-2": 70, "CPL-3": 65, "CPL-4": 68, "CPL-5": 72, "CPL-6": 75, "CPL-7": 60, "CPL-8": 62, "CPL-9": 58, "CPL-10": 70 },
    { year: 2022, "CPL-1": 77, "CPL-2": 72, "CPL-3": 68, "CPL-4": 70, "CPL-5": 74, "CPL-6": 76, "CPL-7": 62, "CPL-8": 64, "CPL-9": 59, "CPL-10": 72 },
    { year: 2023, "CPL-1": 78, "CPL-2": 73, "CPL-3": 69, "CPL-4": 71, "CPL-5": 75, "CPL-6": 77, "CPL-7": 63, "CPL-8": 65, "CPL-9": 60, "CPL-10": 74 },
    { year: 2024, "CPL-1": 79, "CPL-2": 74, "CPL-3": 70, "CPL-4": 72, "CPL-5": 77, "CPL-6": 78, "CPL-7": 65, "CPL-8": 66, "CPL-9": 61, "CPL-10": 75 },
    { year: 2025, "CPL-1": 80, "CPL-2": 75, "CPL-3": 71, "CPL-4": 73, "CPL-5": 78, "CPL-6": 79, "CPL-7": 67, "CPL-8": 67, "CPL-9": 62, "CPL-10": 77 },
];

const LineChartCPL = () => {
    return (
        <div className="flex justify-center items-center bg-white p-6 rounded-2xl">
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: "Angkatan", position: "insideBottomRight", offset: -5 }} />
                    <YAxis domain={[50, 90]} label={{ value: "Nilai CPL", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Legend />

                    {/* 10 garis CPL */}
                    <Line type="monotone" dataKey="CPL-1" stroke="#facc15" strokeWidth={2} dot />
                    <Line type="monotone" dataKey="CPL-2" stroke="#92400e" strokeWidth={2} dot />
                    <Line type="monotone" dataKey="CPL-3" stroke="#000000" strokeWidth={2} dot />
                    <Line type="monotone" dataKey="CPL-4" stroke="#ec4899" strokeWidth={2} dot />
                    <Line type="monotone" dataKey="CPL-5" stroke="#06b6d4" strokeWidth={2} dot />
                    <Line type="monotone" dataKey="CPL-6" stroke="#1d4ed8" strokeWidth={2} dot />
                    <Line type="monotone" dataKey="CPL-7" stroke="#22c55e" strokeWidth={2} dot />
                    <Line type="monotone" dataKey="CPL-8" stroke="#84cc16" strokeWidth={2} dot />
                    <Line type="monotone" dataKey="CPL-9" stroke="#0ea5e9" strokeWidth={2} dot />
                    <Line type="monotone" dataKey="CPL-10" stroke="#ef4444" strokeWidth={2} dot />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChartCPL;
