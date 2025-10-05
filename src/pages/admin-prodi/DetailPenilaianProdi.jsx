import React, { useState } from "react";

const DetailPenilaianProdi = () => {
    const [penilaian] = useState([
        { jenis: "Tugas", subs: ["Tugas 1", "Tugas 2", "Tugas 3", "Tugas 4", "Tugas 5", "Tugas 6"] },
        { jenis: "Kuis", subs: ["Kuis 1", "Kuis 2", "Kuis 3"] },
        { jenis: "UTS", subs: ['UTS'] },
        { jenis: "UAS", subs: ['UAS'] },
    ]);

    const [data, setData] = useState([
        { cpl: "CPL-01", cpmk: "CPMK-01", bobotAcuan: 10, nilai: { "Tugas 1": 10, "Tugas 2": 5 } },
        { cpl: "CPL-01", cpmk: "CPMK-02", bobotAcuan: 20, nilai: { "Tugas 2": 15 } },
        { cpl: "CPL-02", cpmk: "CPMK-03", bobotAcuan: 15, nilai: { "UTS": 80 } },
        { cpl: "CPL-03", cpmk: "CPMK-04", bobotAcuan: 25, nilai: { "Kuis 1": 90 } },
        { cpl: "CPL-03", cpmk: "CPMK-05", bobotAcuan: 10, nilai: { "UAS": 75, "Tugas 1": 5 } },
        { cpl: "CPL-04", cpmk: "CPMK-06", bobotAcuan: 20, nilai: { "Tugas 3": 12 } },
    ]);

    const handleChange = (rowIndex, field, value) => {
        const newData = [...data];
        if (!newData[rowIndex].nilai) {
            newData[rowIndex].nilai = {};
        }
        newData[rowIndex].nilai[field] = parseInt(value) || 0;
        setData(newData);
    };

    const totalPerRow = (row) =>
        Object.values(row.nilai || {}).reduce((a, b) => a + b, 0);

    const totalPerColumn = (field) => {
        return data.reduce((total, row) => {
            return total + (row.nilai?.[field] || 0);
        }, 0);
    };

    const grandTotal = () => {
        return data.reduce((total, row) => total + totalPerRow(row), 0);
    };

    return (
        <div className="p-4 bg-gray-50 h-full flex flex-col space-y-4">
            <h1 className="text-2xl font-bold text-gray-800 flex-shrink-0">
                Tabel Penilaian Prodi
            </h1>

            <div className="flex-1 grid grid-cols-[minmax(0,1fr)]">
                <div className="overflow-auto rounded-xl shadow-md border scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500">
                    <table className="border-collapse text-sm">
                        <thead className="sticky top-0 z-20">
                            <tr className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm">
                                {/* PERUBAHAN: Padding dan lebar kolom dikurangi */}
                                <th rowSpan={2} className="px-2 py-2 text-left  border-blue-400 sticky left-0 bg-blue-600 min-w-[80px]">CPL</th>
                                <th rowSpan={2} className="px-2 py-2 text-left  border-blue-400 sticky left-[80px] bg-blue-600 min-w-[90px]">CPMK</th>
                                <th rowSpan={2} className="px-2 py-2 text-center  border-blue-400 sticky left-[170px] bg-blue-600 min-w-[90px]">Bobot Acuan</th>
                                {penilaian.map((p, i) => (
                                    <th key={i} colSpan={p.subs.length || 1} className="px-3 py-2 text-center  border-blue-400">{p.jenis}</th>
                                ))}
                                <th rowSpan={2} className="px-3 py-2 text-center sticky right-0 bg-blue-600 min-w-[140px]">Total Bobot per CPMK</th>
                            </tr>
                            <tr className="bg-blue-100 text-gray-700 text-xs">
                                {penilaian.map((p, i) =>
                                    p.subs.length > 0 && (
                                        p.subs.map((sub, j) => (
                                            <th key={`${i}-${j}`} className="px-2 py-1.5 text-center font-semibold  border-gray-200 min-w-[90px]">{sub}</th>
                                        ))
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex} className="text-center border-b hover:bg-gray-50 transition">
                                    {/* PERUBAHAN: Padding dan posisi 'left' disesuaikan */}
                                    <td className="px-2 py-1.5 text-left font-medium text-gray-700  sticky left-0 bg-white hover:bg-gray-50 z-10">{row.cpl}</td>
                                    <td className="px-2 py-1.5 text-left text-gray-600  sticky left-[80px] bg-white hover:bg-gray-50 z-10">{row.cpmk}</td>
                                    <td className="px-2 py-1.5 text-gray-800 font-semibold  sticky left-[170px] bg-white hover:bg-gray-50 z-10">{row.bobotAcuan}</td>
                                    {penilaian.map((p, pi) =>
                                        p.subs.length > 0 ? (
                                            p.subs.map((sub, si) => (
                                                <td key={`${pi}-${si}`} className="p-1 ">
                                                    {/* PERUBAHAN: Ukuran input diperkecil */}
                                                    <input
                                                        type="number"
                                                        className="w-16 border rounded-md p-1 text-center text-xs focus:ring-2 focus:ring-blue-400 outline-none"
                                                        value={row.nilai[sub] || ""}
                                                        onChange={(e) => handleChange(rowIndex, sub, e.target.value)}
                                                    />
                                                </td>
                                            ))
                                        ) : (
                                            <td key={pi} className="p-1 ">
                                                <input
                                                    type="number"
                                                    className="w-16 border rounded-md p-1 text-center text-xs focus:ring-2 focus:ring-blue-400 outline-none"
                                                    value={row.nilai[p.jenis] || ""}
                                                    onChange={(e) => handleChange(rowIndex, p.jenis, e.target.value)}
                                                />
                                            </td>
                                        )
                                    )}
                                    <td className="px-2 py-1.5 font-bold text-blue-600 sticky right-0 bg-white hover:bg-gray-50 z-10">{totalPerRow(row)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="sticky bottom-0 z-10">
                            <tr className="bg-gray-100 font-bold text-gray-800">
                                <td colSpan={3} className="px-2 py-2 text-right sticky left-0 bg-gray-100 ">Total Per Penilaian</td>
                                {penilaian.map((p, pi) =>
                                    p.subs.length > 0 ? (
                                        p.subs.map((sub, si) => (
                                            <td key={`${pi}-${si}`} className="px-2 py-2 text-center ">{totalPerColumn(sub)}</td>
                                        ))
                                    ) : (
                                        <td key={pi} className="px-2 py-2 text-center ">{totalPerColumn(p.jenis)}</td>
                                    )
                                )}
                                <td className="px-2 py-2 text-center sticky right-0 bg-gray-100">{grandTotal()}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DetailPenilaianProdi;

