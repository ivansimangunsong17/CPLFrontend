import React from "react";

const DetailPemetaanKaprodi = () => {
    // === Dummy pemetaan CPL dengan CPMK dalam satu mata kuliah ===
    const mapping = [
        { cpl: "CPL-01", cpmk: "CPMK-01", bobot: 10 },
        { cpl: "CPL-01", cpmk: "CPMK-02", bobot: 15 },
        { cpl: "CPL-01", cpmk: "CPMK-03", bobot: 10 },
        { cpl: "CPL-02", cpmk: "CPMK-04", bobot: 20 },
        { cpl: "CPL-02", cpmk: "CPMK-05", bobot: 10 },
        { cpl: "CPL-03", cpmk: "CPMK-06", bobot: 5 },
        { cpl: "CPL-03", cpmk: "CPMK-07", bobot: 10 },
        { cpl: "CPL-04", cpmk: "CPMK-08", bobot: 10 },
        { cpl: "CPL-04", cpmk: "CPMK-09", bobot: 15 },
    ];

    // Hitung total bobot (sum dari seluruh mapping)
    const totalBobot = mapping.reduce((sum, row) => sum + row.bobot, 0);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-xl font-bold text-gray-800">Pemetaan CPL dengan CPMK</h1>

            {/* Tabel */}
            <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="bg-blue-600 text-white font-semibold">
                            <th className="p-3 text-left">Capaian Lulusan (CPL)</th>
                            <th className="p-3 text-left">Capaian Mata Kuliah (CPMK)</th>
                            <th className="p-3 text-center">Bobot (%)</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Object.entries(
                            mapping.reduce((acc, row) => {
                                if (!acc[row.cpl]) acc[row.cpl] = [];
                                acc[row.cpl].push(row);
                                return acc;
                            }, {})
                        ).map(([cpl, rows]) =>
                            rows.map((row, idx) => (
                                <tr key={row.cpmk} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                    {idx === 0 && (
                                        <td
                                            rowSpan={rows.length}
                                            className="p-3 font-bold text-gray-900 border-r border-gray-100 bg-gray-50 align-top"
                                        >
                                            {cpl}
                                        </td>
                                    )}
                                    <td className="p-3 text-gray-700">{row.cpmk}</td>
                                    <td className="p-3 text-center font-semibold text-gray-900">{row.bobot}%</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

           
        </div>
    );
};

export default DetailPemetaanKaprodi;
