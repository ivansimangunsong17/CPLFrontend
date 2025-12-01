import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiBookOpen, FiFileText, FiCheckCircle, FiClipboard } from "react-icons/fi";
import TabelCapaianCPMK from "../../components/Chart/TabelCapaianCPMK";

const DetailHasilPerhitunganKaprodi = () => {
    const navigate = useNavigate();

    // ====================== DUMMY DATA KELAS ======================
    const kelas = {
        kelas_id: "MK-1101",
        nama_kelas: "Struktur Data A",
        periode: "Ganjil 2023/2024",
        mata_kuliah: {
            kode_mata_kuliah: "MK-1101",
            nama_mata_kuliah: "Struktur Data"
        },
        dosens: [
            { name: "Taufik Hidayat, S.T., M.T." },
            { name: "Rina Sari, S.Kom., M.Kom." }
        ]
    };
    // ============================================================

    const detail = {
        programStudi: "Teknik Informatika S1",
        tahunAjaran: "2023/2024",
        kodeMataKuliah: kelas.mata_kuliah.kode_mata_kuliah,
        namaMataKuliah: kelas.mata_kuliah.nama_mata_kuliah,
        namaKelas: kelas.nama_kelas,
        dosenPengampu: kelas.dosens.map(d => d.name).join(", "),
        deskripsiPelaksanaan:
            "Pelaksanaan perkuliahan telah sesuai dengan perencanaan pada RPS, metode Problem-Based Learning diterapkan secara konsisten, asesmen dilakukan berbasis indikator capaian tiap pertemuan.",
        materiPraktikum: [
            "Array & Linked List",
            "Stack & Queue",
            "Trees & Graph",
            "Hash Table"
        ],
        metodePembelajaran: "Problem Based Learning (PBL)",
        metodeAsesmen: ["Tugas", "UTS", "UAS", "Kuis"]
    };

    // ================= DUMMY PEMETAAN CPL ========================
    const pemetaanCPL = [
        {
            id: 1,
            kode_cpl: "CPL-01",
            deskripsi: "Mampu memahami konsep dan implementasi struktur data dasar."
        },
        {
            id: 2,
            kode_cpl: "CPL-02",
            deskripsi: "Mampu menganalisis dan memilih struktur data optimal."
        },
        {
            id: 3,
            kode_cpl: "CPL-03",
            deskripsi: "Mampu mengimplementasikan penyelesaian studi kasus kompleks."
        }
    ];
    // ============================================================

    // ================ DUMMY PEMETAAN CPMK =======================
    const pemetaanCPMK = [
        { id: 101, cpl_id: 1, nama_cpmk: "CPMK-01", bobot: 15, deskripsi: "Memahami array dan linked list." },
        { id: 102, cpl_id: 1, nama_cpmk: "CPMK-02", bobot: 15, deskripsi: "Mengimplementasikan operasi linear." },

        { id: 201, cpl_id: 2, nama_cpmk: "CPMK-03", bobot: 20, deskripsi: "Memahami stack, queue, dan tree." },
        { id: 202, cpl_id: 2, nama_cpmk: "CPMK-04", bobot: 20, deskripsi: "Menganalisis kompleksitas struktur data." },

        { id: 301, cpl_id: 3, nama_cpmk: "CPMK-05", bobot: 30, deskripsi: "Menyelesaikan studi kasus graph dan hashing." },
        { id: 302, cpl_id: 3, nama_cpmk: "CPMK-06", bobot: 20, deskripsi: "Implementasi hash table untuk pencarian data." }
    ];
    // ============================================================

    

    return (
        <div className="min-h-screen bg-[#F7F9FC] p-6 font-sans text-gray-900">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                    >
                        <FiArrowLeft size={18} />
                    </button>
                    <h1 className="text-2xl font-bold">Detail Hasil Perhitungan</h1>
                </div>

                {/* Card Info */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <span className="text-xs text-gray-500 uppercase font-medium">Program Studi</span>
                            <p className="mt-1 font-semibold">{detail.programStudi}</p>
                        </div>

                        <div>
                            <span className="text-xs text-gray-500 uppercase font-medium">Tahun Ajaran</span>
                            <p className="mt-1 font-semibold">{detail.tahunAjaran}</p>
                        </div>

                        <div>
                            <span className="text-xs text-gray-500 uppercase font-medium">Kode Mata Kuliah</span>
                            <p className="mt-1 font-bold font-mono text-indigo-600">{detail.kodeMataKuliah}</p>
                        </div>

                        <div>
                            <span className="text-xs text-gray-500 uppercase font-medium">Nama Mata Kuliah</span>
                            <p className="mt-1 font-semibold">{detail.namaMataKuliah}</p>
                        </div>

                        <div>
                            <span className="text-xs text-gray-500 uppercase font-medium">Kelas</span>
                            <p className="mt-1 font-semibold">{detail.namaKelas}</p>
                        </div>

                        <div>
                            <span className="text-xs text-gray-500 uppercase font-medium">Dosen Pengampu</span>
                            <p className="mt-1 font-semibold">{detail.dosenPengampu}</p>
                        </div>

                        <div className="sm:col-span-2">
                            <span className="text-xs text-gray-500 uppercase font-medium">Metode Pembelajaran</span>
                            <p className="mt-1 font-semibold">{detail.metodePembelajaran}</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-100"></div>

                    {/* Detail pelaksanaan */}
                    <div className="space-y-5">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <FiFileText />
                                <span className="text-sm font-semibold">Deskripsi Pelaksanaan</span>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">{detail.deskripsiPelaksanaan}</p>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <FiCheckCircle />
                                <span className="text-sm font-semibold">Materi Praktikum</span>
                            </div>
                            <ul className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
                                {detail.materiPraktikum.map((m, i) => <li key={i}>{m}</li>)}
                            </ul>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <FiClipboard />
                                <span className="text-sm font-semibold">Metode Asesmen</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {detail.metodeAsesmen.map((a, i) => (
                                    <span key={i} className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100">
                                        {a}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ====== TABEL CPL & CPMK ====== */}
                <h2 className="text-xl font-bold">CPL dan CPMK yang dibebankan</h2>

                <section className="bg-white rounded-2xl shadow-sm border border-gray-300 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="p-3">CPL</th>
                                    <th className="p-3">CPMK</th>
                                    <th className="p-3 text-center">Bobot (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(
                                    pemetaanCPL.reduce((acc, cpl) => {
                                        acc[cpl.kode_cpl] = pemetaanCPMK.filter(r => r.cpl_id === cpl.id);
                                        return acc;
                                    }, {})
                                ).map(([kodeCPL, rows]) =>
                                    rows.map((row, i) => (
                                        <tr key={row.id} className="border-b border-gray-200">
                                            {i === 0 && (
                                                <td rowSpan={rows.length} className="p-3 font-bold bg-gray-50 border-r">{kodeCPL}</td>
                                            )}
                                            <td className="p-3">{row.nama_cpmk}</td>
                                            <td className="p-3 text-center font-semibold">{row.bobot}%</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>

                            
                          
                        </table>
                    </div>
                </section>

                {/* Passing ke komponen tabel / chart jika perlu */}
                <TabelCapaianCPMK />

               

            </div>
        </div>
    );
};

export default DetailHasilPerhitunganKaprodi;
