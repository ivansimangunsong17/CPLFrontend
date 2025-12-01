import React from 'react';
import MahasiswaChart from '../../components/Chart/MahasiswaChart'; // Pastikan path ini sesuai

const DetailDistribusiMahasiswaKaprodi = () => {

    // --- DATA DUMMY CPL (Ditambahkan kembali) ---
    const dataCPL = [
        {
            id: "CPL-01",
            kode_cpl: "CPL-01",
            total_rata_rata: 73.9,
            cpmk_list: [
                {
                    kode: "CPMK-01",
                    bobot_cpmk: 10,
                    rata_rata_cpmk: 79.5,
                    penilaian: [
                        { bentuk: "Tugas 1", bobot: 4, nilai: 75 },
                        { bentuk: "Tugas 2", bobot: 3, nilai: 80 },
                        { bentuk: "Kuis 1", bobot: 3, nilai: 85 },
                    ]
                },
                {
                    kode: "CPMK-02",
                    bobot_cpmk: 20,
                    rata_rata_cpmk: 73.5,
                    penilaian: [
                        { bentuk: "Tugas 1", bobot: 10, nilai: 72 },
                        { bentuk: "Kuis 2", bobot: 5, nilai: 74 },
                        { bentuk: "Tugas 3", bobot: 5, nilai: 76 },
                    ]
                },
                {
                    kode: "CPMK-03",
                    bobot_cpmk: 20,
                    rata_rata_cpmk: 71.5,
                    penilaian: [
                        { bentuk: "Kuis 3", bobot: 10, nilai: 70 },
                        { bentuk: "Hasil Projek", bobot: 5, nilai: 72 },
                        { bentuk: "Aktivitas Partisipasi", bobot: 5, nilai: 74 },
                    ]
                }
            ]
        },
        {
            id: "CPL-02",
            kode_cpl: "CPL-02",
            total_rata_rata: 82.5,
            cpmk_list: [
                {
                    kode: "CPMK-04",
                    bobot_cpmk: 10,
                    rata_rata_cpmk: 82.5,
                    penilaian: [
                        { bentuk: "Tugas 4", bobot: 5, nilai: 80 },
                        { bentuk: "Kuis 4", bobot: 5, nilai: 85 },
                    ]
                },
                {
                    kode: "CPMK-05",
                    bobot_cpmk: 20,
                    rata_rata_cpmk: 82.5, // Nilai dummy
                    penilaian: [
                        { bentuk: "UAS", bobot: 10, nilai: 85 },
                        { bentuk: "Proyek Akhir", bobot: 10, nilai: 80 },
                    ]
                }
            ]
        },
        {
            id: "CPL-03",
            kode_cpl: "CPL-03",
            total_rata_rata: 78.0,
            cpmk_list: [
                {
                    kode: "CPMK-06",
                    bobot_cpmk: 20,
                    rata_rata_cpmk: 78.0,
                    penilaian: [
                        { bentuk: "Tugas 5", bobot: 10, nilai: 75 },
                        { bentuk: "Presentasi", bobot: 10, nilai: 81 },
                    ]
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans">
            {/* --- 1. Bagian Chart --- */}
            <div className="mb-10">
                <MahasiswaChart />
            </div>

            {/* --- 2. Bagian Tabel Detail --- */}
            <div className="max-w-7xl mx-auto space-y-10">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Detail CPL Yang Dibebankan Pada Mata Kuliah</h2>
                    <p className="text-gray-500 mt-1">Rincian nilai CPMK dan komponen penilaian mahasiswa</p>
                </div>

                {dataCPL.map((cpl) => (
                    <div key={cpl.id} className="flex flex-col gap-3">
                        {/* Judul CPL */}
                        <h3 className="text-lg font-bold text-gray-900 pl-1 border-l-4 border-blue-600">
                            {cpl.kode_cpl}
                        </h3>

                        {/* Container Tabel */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-blue-600 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider border-r border-blue-500 w-1/6">
                                                CPMK
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider border-r border-blue-500 w-1/6">
                                                Bobot CPMK
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider border-r border-blue-500 w-1/3">
                                                Bentuk Penilaian
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider border-r border-blue-500 w-1/6">
                                                Bobot Penilaian
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider w-1/6">
                                                Nilai (0-100)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
                                        {cpl.cpmk_list.map((cpmk) => (
                                            <React.Fragment key={cpmk.kode}>
                                                {cpmk.penilaian.map((nilai, idx) => (
                                                    <tr key={`${cpmk.kode}-${idx}`} className="hover:bg-gray-50 transition-colors">
                                                        {/* Kolom CPMK & Bobot (Digabung dengan rowSpan) */}
                                                        {idx === 0 && (
                                                            <>
                                                                <td
                                                                    rowSpan={cpmk.penilaian.length}
                                                                    className="px-6 py-4 whitespace-nowrap text-center font-medium text-gray-900 border-r border-gray-200 align-middle bg-white"
                                                                >
                                                                    {cpmk.kode}
                                                                </td>
                                                                <td
                                                                    rowSpan={cpmk.penilaian.length}
                                                                    className="px-6 py-4 whitespace-nowrap text-center text-gray-600 border-r border-gray-200 align-middle bg-white"
                                                                >
                                                                    {cpmk.bobot_cpmk}
                                                                </td>
                                                            </>
                                                        )}

                                                        {/* Kolom Detail Penilaian */}
                                                        <td className="px-6 py-3 whitespace-nowrap text-center border-r border-gray-200">
                                                            {nilai.bentuk}
                                                        </td>
                                                        <td className="px-6 py-3 whitespace-nowrap text-center border-r border-gray-200">
                                                            {nilai.bobot}
                                                        </td>
                                                        <td className="px-6 py-3 whitespace-nowrap text-center font-semibold text-gray-800">
                                                            {nilai.nilai}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </tbody>

                                    {/* Footer Total Rata-Rata */}
                                    <tfoot className="bg-gray-50">
                                        {/* Judul Section */}
                                        <tr>
                                            <td colSpan={5} className="px-6 py-2 text-center text-sm font-bold text-gray-800 border-t border-gray-300 bg-gray-100">
                                                Total Nilai Rata-Rata
                                            </td>
                                        </tr>
                                        {/* Total Nilai CPL */}
                                        <tr>
                                            <td colSpan={5} className="px-6 py-3 text-center text-base font-bold text-gray-900 border-t border-gray-200 bg-white">
                                                {cpl.kode_cpl} : <span className="text-blue-600 text-lg">{cpl.total_rata_rata}</span>
                                            </td>
                                        </tr>
                                        {/* Rincian per CPMK */}
                                        <tr>
                                            <td colSpan={5} className="p-0 border-t border-gray-200 bg-white">
                                                <div className="flex divide-x divide-gray-200">
                                                    {cpl.cpmk_list.map((cpmk) => (
                                                        <div key={cpmk.kode} className="flex-1 py-3 px-4 text-center text-sm text-gray-700 bg-gray-50">
                                                            {cpmk.kode} : <strong className="text-gray-900">{cpmk.rata_rata_cpmk}</strong>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DetailDistribusiMahasiswaKaprodi;