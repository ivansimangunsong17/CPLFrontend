import React, { useState } from "react";

const DetailPenilaianProdi = () => {
    const [penilaian] = useState([
        { jenis: "Tugas", subs: ["Tugas 1", "Tugas 2", "Tugas 3", "Tugas 4"] },
        { jenis: "UTS", subs: [] },
        { jenis: "UAS", subs: [] },
        { jenis: "Kuis", subs: ["Kuis 1", "Kuis 2"] },
    ]);

    const [data, setData] = useState([
        { cpl: "CPL-01", cpmk: "CPMK-01", bobotAcuan: 10, nilai: {} },
        { cpl: "CPL-01", cpmk: "CPMK-02", bobotAcuan: 20, nilai: {} },
        { cpl: "CPL-02", cpmk: "CPMK-03", bobotAcuan: 15, nilai: {} },
    ]);

    const handleChange = (rowIndex, field, value) => {
        const newData = [...data];
        newData[rowIndex].nilai[field] = parseInt(value) || 0;
        setData(newData);
    };

    const totalPerRow = (row) =>
        Object.values(row.nilai).reduce((a, b) => a + b, 0);

    return (
        <div className="p-6 bg-gray-50 min-h-screen space-y-6">
            <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    {/* Header Utama */}
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm">
                            <th rowSpan={2} className="p-3 text-left">CPL</th>
                            <th rowSpan={2} className="p-3 text-left">CPMK</th>
                            <th rowSpan={2} className="p-3 text-center">Bobot Acuan</th>

                            <th
                                colSpan={penilaian.reduce(
                                    (a, p) => a + (p.subs.length || 1),
                                    0
                                )}
                                className="p-3 text-center"
                            >
                                Penilaian
                            </th>

                            <th rowSpan={2} className="p-3 text-center">
                                Total Bobot CPMK
                            </th>
                        </tr>

                        {/* Sub Header */}
                        <tr className="bg-blue-100 text-gray-700 text-xs">
                            {penilaian.map((p, i) =>
                                p.subs.length > 0 ? (
                                    p.subs.map((sub, j) => (
                                        <th key={`${i}-${j}`} className="p-2 text-center">
                                            {sub}
                                        </th>
                                    ))
                                ) : (
                                    <th key={i} className="p-2 text-center">
                                        {p.jenis}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>

                    {/* Isi Tabel */}
                    <tbody>
                        {data.map((row, i) => (
                            <tr
                                key={i}
                                className="text-center border-b hover:bg-gray-50 transition"
                            >
                                <td className="p-3 text-left font-medium text-gray-700">{row.cpl}</td>
                                <td className="p-3 text-left text-gray-600">{row.cpmk}</td>
                                <td className="p-3 text-gray-800 font-semibold">{row.bobotAcuan}</td>

                                {/* Scrollable Penilaian */}
                                <td colSpan={penilaian.reduce((a, p) => a + (p.subs.length || 1), 0)} className="p-0">
                                    <div className="overflow-x-auto max-w-[600px]">
                                        <div className="flex">
                                            {penilaian.map((p, pi) =>
                                                p.subs.length > 0 ? (
                                                    p.subs.map((sub, si) => (
                                                        <div key={`${pi}-${si}`} className="p-2">
                                                            <input
                                                                type="number"
                                                                className="w-16 border rounded-lg px-2 py-1 text-center text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                                                                value={row.nilai[sub] || ""}
                                                                onChange={(e) =>
                                                                    handleChange(i, sub, e.target.value)
                                                                }
                                                            />
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div key={pi} className="p-2">
                                                        <input
                                                            type="number"
                                                            className="w-16 border rounded-lg px-2 py-1 text-center text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                                                            value={row.nilai[p.jenis] || ""}
                                                            onChange={(e) =>
                                                                handleChange(i, p.jenis, e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </td>

                                <td className="p-3 font-bold text-blue-600">
                                    {totalPerRow(row)}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default DetailPenilaianProdi;
