import React from 'react'


const dummyEvaluasiCPMK = [
    { cpl: "CPL-02", cpmk: "CPMK-01", asesmen: "Tugas", bobot: "50.00%", skor: 46.57 },
    { cpl: "CPL-02", cpmk: "CPMK-01", asesmen: "UTS", bobot: "20.00%", skor: 46.57 },
    { cpl: "CPL-02", cpmk: "CPMK-01", asesmen: "UAS", bobot: "30.00%", skor: 46.57 },
    { cpl: "CPL-03", cpmk: "CPMK-01", asesmen: "Tugas", bobot: "50.00%", skor: 46.57 },
    { cpl: "CPL-03", cpmk: "CPMK-01", asesmen: "UTS", bobot: "20.00%", skor: 46.57 },
    { cpl: "CPL-03", cpmk: "CPMK-01", asesmen: "UAS", bobot: "30.00%", skor: 46.57 },
    { cpl: "CPL-04", cpmk: "CPMK-02", asesmen: "Tugas", bobot: "50.00%", skor: 46.57 },
    { cpl: "CPL-04", cpmk: "CPMK-02", asesmen: "UTS", bobot: "20.00%", skor: 46.57 },
    { cpl: "CPL-04", cpmk: "CPMK-02", asesmen: "UAS", bobot: "30.00%", skor: 54.58 },
    { cpl: "CPL-05", cpmk: "CPMK-03", asesmen: "Tugas", bobot: "50.00%", skor: 54.58 },
    { cpl: "CPL-05", cpmk: "CPMK-03", asesmen: "UTS", bobot: "20.00%", skor: 54.58 }
];

const TabelCapaianCPMK = () => {
    return (
        <div>
            {/* ===== TABEL DUMMY: Evaluasi Ketercapaian CPMK Mahasiswa ===== */}
            <div className=" text-black pt-4 text-sx  font-bold text-xl">
                Penilaian dan Evaluasi Ketercapaian CPMK Mahasiswa
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mt-6">
                <div className="overflow-x-auto">
                    <table className="w-full table-fixed">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="p-4 text-left text-sm font-semibold">CPL yang dibebankan</th>
                                <th className="p-4 text-left text-sm font-semibold">CPMK</th>
                                <th className="p-4 text-left text-sm font-semibold">Bentuk Asesmen</th>
                                <th className="p-4 text-left text-sm font-semibold">Bobot</th>
                                <th className="p-4 text-left text-sm font-semibold">Rerata Skor (0-100)</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {dummyEvaluasiCPMK.map((row, i) => (
                                <tr key={i} className="border-b border-gray-100 last:border-0">
                                    <td className="p-4 text-xs font-medium text-gray-600">{row.cpl}</td>
                                    <td className="p-4 text-xs font-medium text-gray-900">{row.cpmk}</td>
                                    <td className="p-4 text-xs font-medium text-gray-700">{row.asesmen}</td>
                                    <td className="p-4 text-xs font-medium text-gray-700">{row.bobot}</td>
                                    <td className="p-4 text-xs font-medium text gray-700">{row.skor}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className=" text-black pt-3 text-xs font-bold">
                Kriterian Hasil : Sangat memuaskan jika rerata skor &ge; 85, Memuaskan jika 70 &le; skor &lt; 85, Cukup jika 55 &le; skor &lt; 70, Kurang jika 40 &le; skor &lt; 55, Sangat Kurang jika skor &lt; 40
            </div>
            {/* TABLE PERSENTASE CPMK */}
            <div className=" text-black font-bold text-sm pt-6 py-2">
                Persentase mahasiswa yang mencapai skor CPMK sangat memuaskan
                <p className='text-gray-600 text-xs italic'>Sumber data: Skor mahasiswa per assesment sesuai CPMK </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">


                <table className="w-full text-gray-800">
                    <thead>
                        <tr className="bg-blue-500 text-white text-sm uppercase tracking-wide">
                            <th className="py-3 px-4 text-center">CPMK</th>
                            <th className="py-3 px-4 text-center">% Mahasiswa yang Mencapai Skor CPMK ≥ 80</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { cpmk: "CPMK-01", persen: "6.38%" },
                            { cpmk: "CPMK-02", persen: "17.02%" },
                            { cpmk: "CPMK-03", persen: "6.38%" },
                            { cpmk: "CPMK-04", persen: "8.51%" },
                            { cpmk: "CPMK-05", persen: "10.64%" }
                        ].map((row, i) => (
                            <tr key={i} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition">
                                <td className="py-3 px-4 text-center font-medium text-sm">{row.cpmk}</td>
                                <td className="py-3 px-4 text-center text-sm">{row.persen}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>

            {/* Nilai Matakuliah */}
            <div className=" text-black font-bold text-sm pt-6 py-2">
                Nilai Mata Kuliah
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">


                <table className="w-full text-gray-800">
                    <thead>
                        <tr className="bg-blue-500 text-white text-sm uppercase tracking-wide">
                            <th className="py-3 px-4 text-center">Nilai Mata Kuliah</th>
                            <th className="py-3 px-4 text-center">Jumlah dan Persentase Mahasiswa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { nilai: "A", persen: "6.38%" },
                            { nilai: "B", persen: "17.02%" },
                            { nilai: "C", persen: "6.38%" },
                            { nilai: "D", persen: "8.51%" },
                            { nilai: "E", persen: "10.64%" }
                        ].map((row, i) => (
                            <tr key={i} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition">
                                <td className="py-3 px-4 text-center font-medium text-sm">{row.nilai}</td>
                                <td className="py-3 px-4 text-center text-sm">{row.persen}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TabelCapaianCPMK