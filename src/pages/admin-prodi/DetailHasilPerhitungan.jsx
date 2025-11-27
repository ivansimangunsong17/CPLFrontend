import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useKelas } from "../../hooks/admin-prodi/useKelas";
import TableSkeleton from "../../components/TableSkeleton";
import { FiArrowLeft, FiBookOpen, FiFileText, FiCheckCircle, FiClipboard } from "react-icons/fi";
import TabelCapaianCPMK from "../../components/Chart/TabelCapaianCPMK";

const DetailHasilPerhitungan = () => {
    const { mataKuliahId } = useParams();
    const { kelasQuery } = useKelas();
    const navigate = useNavigate();

    // ======== DUMMY DATA PEMETAAN CPL =========
    const dummyPemetaanCPL = [
        {
            id: 1,
            kode_cpl: "CPL-01",
            bobot: 40,
            deskripsi_cpl: "Mampu memahami konsep dan implementasi struktur data dasar dalam penyelesaian masalah komputasi."
        },
        {
            id: 2,
            kode_cpl: "CPL-02",
            bobot: 60,
            deskripsi_cpl: "Mampu menganalisis, memilih, dan mengoptimasi struktur data sesuai kebutuhan problem dunia nyata."
        }
    ];

    // ======= DUMMY DATA PEMETAAN CPMK =========
    const dummyPemetaanCPMK = [
        {
            cpmk_mata_kuliah_id: 101,
            cpl_id: 1,
            nama_cpmk: "CPMK-01",
            bobot: 20,
            deskripsi: "Memahami karakteristik array, linked list, dan implementasinya."
        },
        {
            cpmk_mata_kuliah_id: 102,
            cpl_id: 1,
            nama_cpmk: "CPMK-02",
            bobot: 20,
            deskripsi: "Mengimplementasikan operasi dasar struktur data linear."
        },
        {
            cpmk_mata_kuliah_id: 201,
            cpl_id: 2,
            nama_cpmk: "CPMK-03",
            bobot: 60,
            deskripsi: "Mampu menyelesaikan studi kasus menggunakan struktur data optimal."
        }
    ];
    // =========================================

    // Saat API tersedia, tinggal ganti:
    // const pemetaanCPL = pemetaanQuery.data || [];
    // const pemetaanCPMK = pemetaanCPMKQuery.data || [];
    const pemetaanCPL = dummyPemetaanCPL;
    const pemetaanCPMK = dummyPemetaanCPMK;

    if (kelasQuery.isLoading) {
        return <TableSkeleton rows={4} columns={2} />;
    }

    if (kelasQuery.isError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-red-500 bg-gray-50">
                <p className="font-semibold">Gagal memuat data</p>
                <p className="text-sm">{kelasQuery.error.message}</p>
            </div>
        );
    }

    const dataKelas = Array.isArray(kelasQuery.data)
        ? kelasQuery.data
        : kelasQuery.data?.data
            ? [kelasQuery.data.data]
            : [];

    const kelas = dataKelas.find(k => String(k.kelas_id) === mataKuliahId);

    if (!kelas) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500 bg-gray-50">
                Data kelas tidak ditemukan
            </div>
        );
    }

    const detail = {
        programStudi: "Teknik Informatika S1",
        tahunAjaran: "2023/2024",
        kodeMataKuliah: kelas.mata_kuliah?.kode_mata_kuliah || "IF13234152656",
        namaMataKuliah: kelas.mata_kuliah?.nama_mata_kuliah || "Struktur Data",
        namaKelas: kelas.nama_kelas || "Struktur Data A",
        dosenPengampu: kelas.dosens?.map(d => d.name).join(", ") || "Taufik Hidayat, S.T., M.T.",
        deskripsiPelaksanaan:
            "Pelaksanaan perkuliahan telah sesuai dengan perencanaan pada RPS, metode Problem-Based Learning diterapkan secara konsisten, dan asesmen berjalan berdasarkan indikator capaian pembelajaran tiap pertemuan.",
        materiPraktikum: [
            "Sejarah OOP",
            "Perbandingan Prosedural Dengan OOP",
            "OOP dalam Java"
        ],
        metodePembelajaran: "Problem Based Learning",
        metodeAsesmen: ["Tugas", "UTS", "UAS"]
    };

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
                    <h1 className="text-2xl font-bold tracking-tight">
                        Detail Hasil Perhitungan
                    </h1>
                </div>

                {/* Card info */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <span className="text-xs text-gray-500 uppercase font-medium tracking-wide">Program Studi</span>
                            <p className="mt-1 font-semibold">{detail.programStudi}</p>
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 uppercase font-medium tracking-wide">Tahun Ajaran</span>
                            <p className="mt-1 font-semibold">{detail.tahunAjaran}</p>
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 uppercase font-medium tracking-wide">Kode Mata Kuliah</span>
                            <p className="mt-1 font-bold font-mono text-indigo-600">{detail.kodeMataKuliah}</p>
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 uppercase font-medium tracking-wide">Nama Mata Kuliah</span>
                            <p className="mt-1 font-semibold">{detail.namaMataKuliah}</p>
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 uppercase font-medium tracking-wide">Nama Kelas</span>
                            <p className="mt-1 font-semibold">{detail.namaKelas}</p>
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 uppercase font-medium tracking-wide">Dosen Pengampu</span>
                            <p className="mt-1 font-semibold">{detail.dosenPengampu}</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100"></div>

                    {/* Pelaksanaan pembelajaran */}
                    <div className="space-y-5">
                        <header>
                            <div className="flex items-center gap-2 text-gray-700 mb-1">
                                <FiBookOpen />
                                <h2 className="text-lg font-bold uppercase tracking-wide">Pelaksanaan Pembelajaran</h2>
                            </div>
                            <p className="text-xs text-gray-500">Kesesuaian perencanaan pada RPS dengan implementasi di kelas</p>
                        </header>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <FiFileText className="text-gray-600" />
                                <span className="text-sm font-semibold">Deskripsi Pelaksanaan</span>
                            </div>
                            <p className="text-sm leading-relaxed text-gray-700">{detail.deskripsiPelaksanaan}</p>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <FiCheckCircle className="text-gray-600" />
                                <span className="text-sm font-semibold">Materi / Praktikum</span>
                            </div>
                            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                                {detail.materiPraktikum.map((m, i) => <li key={i}>{m}</li>)}
                            </ol>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <FiBookOpen className="text-gray-600" />
                                <span className="text-sm font-semibold">Metode Pembelajaran</span>
                            </div>
                            <span className="inline-text-xs font-semibold bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full border border-indigo-100">
                                {detail.metodePembelajaran}
                            </span>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <FiClipboard className="text-gray-600" />
                                <span className="text-sm font-semibold">Metode Asesmen</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {detail.metodeAsesmen.map((a, i) => (
                                    <span key={i} className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100 font-medium">
                                        {a}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== Tabel CPL & CPMK ===== */}

                <div className=" text-black pt-3 text-xl  font-bold">
                    CPL dan CPMK yang dibebankan pada Mata Kuliah
                </div>
                <section className="bg-white rounded-2xl shadow-sm border border-gray-300 overflow-hidden">

                    <div className="overflow-x-auto">
                        <table className="w-full text-left table-fixed">
                            <thead>
                                <tr className="border-b border-gray-300 text-sm uppercase font-medium tracking-wide">
                                    <th className="p-4 font-bold">CPL</th>
                                    <th className="p-4 font-bold">CPMK</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pemetaanCPL.map(cpl => {
                                    const cpmkRows = pemetaanCPMK.filter(r => r.cpl_id === cpl.id);
                                    const total = cpmkRows.reduce((sum, r) => sum + Number(r.bobot), 0);

                                    return (
                                        <tr key={cpl.id} className="group border border-gray-300 hover:bg-gray-50 transition">
                                            <td className="p-4 align-top border-1 border-gray-300">
                                                <p className="font-bold ">{cpl.kode_cpl}</p>
                                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{cpl.deskripsi}</p>

                                            </td>

                                            <td className="p-4 align-top space-y-3 border-1 border-gray-300">
                                                {cpmkRows.map(row => (
                                                    <div key={row.cpmk_mata_kuliah_id} className="space-y-1">
                                                        <p className="text-sm font-semibold">{row.nama_cpmk}</p>
                                                        <p className="text-sm text-gray-800">{row.deskripsi}</p>

                                                    </div>
                                                ))}


                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
                {/* =========================== */}
                <TabelCapaianCPMK />
            </div>
        </div>
    );
};

export default DetailHasilPerhitungan;
