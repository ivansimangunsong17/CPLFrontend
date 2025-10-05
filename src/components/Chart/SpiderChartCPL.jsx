import React from "react";
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

const data = [
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
];

const SpiderChartCPL = () => {
    return (
        <div className="flex justify-center items-center  ">
            <RadarChart
                cx={300}
                cy={250}
                outerRadius={120}
                width={600}
                height={400}
                data={data}
            >
                <PolarGrid />
                <PolarAngleAxis dataKey="cpl" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                    name="Target CPL"
                    dataKey="target"
                    stroke="#2563eb"
                    fill="#2563eb"
                    fillOpacity={0.2}
                />
                <Radar
                    name="Aktual CPL"
                    dataKey="aktual"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.3}
                />

            </RadarChart>
        </div>
    );
};

export default SpiderChartCPL;
