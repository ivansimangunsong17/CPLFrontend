import React from "react";
import { useParams } from "react-router-dom";

const DetailHasilPerhitunganKelasUniv = () => {
    const { prodiId, kelasId } = useParams();

    // ====== DUMMY DATA KELAS (DIPERBARUI) ========
    // Data baru ditambahkan:
    // - data_asesmen_cpmk (array)
    // ===========================================
    const dummyKelas = [
        {
            // ===== KELAS 1 (STRUKTUR DATA A) =====
            kelas_id: "1",
            program_studi: "TEKNIK INFORMATIKA S1",
            tahun_ajaran: "2023/2024",
            semester: "Genap",
            mata_kuliah: {
                kode_mata_kuliah: "IF1323415256",
                nama_mata_kuliah: "STRUKTUR DATA",
            },
            nama_kelas: "STRUKTUR DATA A",
            dosen_pengampu: "Taufik Hidayat, S.T., M.T.",
            deskripsi_pelaksanaan:
                "Deskripsi pelaksanaan perkuliahan, kesesuaian yang direncanakan di RPS dengan yang terlaksana sudah baik dan sesuai.",
            materi_praktikum: [
                "Konsep Array dan Linked List",
                "Implementasi Stack dan Queue",
                "Konsep Tree dan Graph",
                "Analisis Kompleksitas Algoritma",
            ],
            metode_pembelajaran: "Problem Based Learning",
            metode_asesmen: ["Tugas", "UTS", "UAS"],
            pemetaan_cpl_cpmk: [
                {
                    cpl: {
                        kode: "CPL-01",
                        deskripsi:
                            "Menguasai konsep teoretis struktur data dan algoritma.",
                    },
                    cpmk_list: [
                        {
                            kode: "CPMK-SD-01",
                            deskripsi: "Mampu memahami konsep dasar struktur data",
                        },
                        {
                            kode: "CPMK-SD-04",
                            deskripsi: "Mampu menganalisis kompleksitas algoritma",
                        },
                    ],
                },
                {
                    cpl: {
                        kode: "CPL-02",
                        deskripsi:
                            "Mampu menerapkan struktur data yang tepat untuk memecahkan masalah komputasi.",
                    },
                    cpmk_list: [
                        {
                            kode: "CPMK-SD-02",
                            deskripsi:
                                "Mampu mengimplementasikan struktur data linear (Array, Linked List, Stack, Queue)",
                        },
                        {
                            kode: "CPMK-SD-03",
                            deskripsi:
                                "Mampu mengimplementasikan struktur data non-linear (Tree, Graph)",
                        },
                    ],
                },
            ],
            data_skor_cpmk: [
                { kode: "CPMK-SD-01", persentase: 85.5 },
                { kode: "CPMK-SD-02", persentase: 70.2 },
                { kode: "CPMK-SD-03", persentase: 55.8 },
                { kode: "CPMK-SD-04", persentase: 62.1 },
            ],
            data_nilai_matkul: [
                { nilai: "A", jumlah: 10, persentase: 21.3 },
                { nilai: "B", jumlah: 15, persentase: 31.9 },
                { nilai: "C", jumlah: 12, persentase: 25.5 },
                { nilai: "D", jumlah: 6, persentase: 12.8 },
                { nilai: "E", jumlah: 4, persentase: 8.5 },
            ],
            // ====== DATA BARU (SESUAI GAMBAR) ======
            data_asesmen_cpmk: [
                { cpl: "CPL-01", cpmk: "CPMK-SD-01", asesmen: "Tugas", bobot: "50.00%", rerata_skor: 85.5 },
                { cpl: "CPL-01", cpmk: "CPMK-SD-01", asesmen: "UTS", bobot: "50.00%", rerata_skor: 85.5 },
                { cpl: "CPL-01", cpmk: "CPMK-SD-04", asesmen: "UAS", bobot: "100.00%", rerata_skor: 62.1 },
                { cpl: "CPL-02", cpmk: "CPMK-SD-02", asesmen: "Tugas", bobot: "40.00%", rerata_skor: 70.2 },
                { cpl: "CPL-02", cpmk: "CPMK-SD-02", asesmen: "UAS", bobot: "60.00%", rerata_skor: 70.2 },
                { cpl: "CPL-02", cpmk: "CPMK-SD-03", asesmen: "Tugas", bobot: "30.00%", rerata_skor: 55.8 },
                { cpl: "CPL-02", cpmk: "CPMK-SD-03", asesmen: "UTS", bobot: "30.00%", rerata_skor: 55.8 },
                { cpl: "CPL-02", cpmk: "CPMK-SD-03", asesmen: "UAS", bobot: "40.00%", rerata_skor: 55.8 },
            ],
        },
        {
            // ===== KELAS 2 (STRUKTUR DATA B) =====
            kelas_id: "2",
            program_studi: "TEKNIK INFORMATIKA S1",
            tahun_ajaran: "2023/2024",
            semester: "Genap",
            mata_kuliah: {
                kode_mata_kuliah: "IF265365",
                nama_mata_kuliah: "Struktur Data",
            },
            nama_kelas: "Struktur Data B",
            dosen_pengampu: "Dr. Indah Lestari, M.Kom.",
            deskripsi_pelaksanaan:
                "Pelaksanaan perkuliahan berjalan lancar, materi praktikum disesuaikan dengan studi kasus terbaru.",
            materi_praktikum: [
                "Pengenalan Array",
                "Implementasi Linked List",
                "Struktur Tree dan Graf",
            ],
            metode_pembelajaran: "Project Based Learning",
            metode_asesmen: ["Tugas Individu", "Presentasi Kelompok", "UAS"],
            pemetaan_cpl_cpmk: [
                {
                    cpl: {
                        kode: "CPL-01",
                        deskripsi:
                            "Menguasai konsep teoretis struktur data dan algoritma.",
                    },
                    cpmk_list: [
                        {
                            kode: "CPMK-SD-01",
                            deskripsi: "Mampu memahami konsep dasar struktur data",
                        },
                    ],
                },
                {
                    cpl: {
                        kode: "CPL-02",
                        deskripsi:
                            "Mampu menerapkan struktur data yang tepat untuk memecahkan masalah komputasi.",
                    },
                    cpmk_list: [
                        {
                            kode: "CPMK-SD-02",
                            deskripsi:
                                "Mampu mengimplementasikan struktur data linear (Array, Linked List, Stack, Queue)",
                        },
                    ],
                },
            ],
            data_skor_cpmk: [
                { kode: "CPMK-SD-01", persentase: 90.0 },
                { kode: "CPMK-SD-02", persentase: 72.5 },
            ],
            data_nilai_matkul: [
                { nilai: "A", jumlah: 12, persentase: 25.0 },
                { nilai: "B", jumlah: 20, persentase: 41.7 },
                { nilai: "C", jumlah: 10, persentase: 20.8 },
                { nilai: "D", jumlah: 3, persentase: 6.25 },
                { nilai: "E", jumlah: 3, persentase: 6.25 },
            ],
            // ====== DATA BARU (DUMMY) ======
            data_asesmen_cpmk: [
                { cpl: "CPL-01", cpmk: "CPMK-SD-01", asesmen: "Tugas", bobot: "40.00%", rerata_skor: 90.0 },
                { cpl: "CPL-01", cpmk: "CPMK-SD-01", asesmen: "UTS", bobot: "60.00%", rerata_skor: 90.0 },
                { cpl: "CPL-02", cpmk: "CPMK-SD-02", asesmen: "Tugas", bobot: "50.00%", rerata_skor: 72.5 },
                { cpl: "CPL-02", cpmk: "CPMK-SD-02", asesmen: "UAS", bobot: "50.00%", rerata_skor: 72.5 },
            ],
        },
        {
            // ===== KELAS 3 (RPL A) =====
            kelas_id: "3",
            program_studi: "TEKNIK INFORMATIKA S1",
            tahun_ajaran: "2023/2024",
            semester: "Genap",
            mata_kuliah: {
                kode_mata_kuliah: "IF765461",
                nama_mata_kuliah: "Rekayasa Perangkat Lunak",
            },
            nama_kelas: "Rekayasa Perangkat Lunak A",
            dosen_pengampu: "Prof. Budi Santoso, Ph.D.",
            deskripsi_pelaksanaan:
                "Mahasiswa aktif berpartisipasi dalam diskusi. Metode agile diterapkan dalam pengerjaan proyek.",
            materi_praktikum: [
                "Software Development Life Cycle (SDLC)",
                "Metodologi Agile (Scrum)",
                "UML Diagram",
            ],
            metode_pembelajaran: "Case Study & Team-Based Project",
            metode_asesmen: ["Quiz", "Proyek Tim", "Ujian Lisan"],
            pemetaan_cpl_cpmk: [
                {
                    cpl: {
                        kode: "CPL-03",
                        deskripsi:
                            "Mampu menganalisis dan merancang perangkat lunak.",
                    },
                    cpmk_list: [
                        {
                            kode: "CPMK-RPL-01",
                            deskripsi: "Mampu memahami dan memilih SDLC",
                        },
                        {
                            kode: "CPMK-RPL-03",
                            deskripsi: "Mampu membuat permodelan sistem (UML)",
                        },
                    ],
                },
                {
                    cpl: {
                        kode: "CPL-04",
                        deskripsi:
                            "Mampu bekerja dalam tim menggunakan metodologi modern.",
                    },
                    cpmk_list: [
                        {
                            kode: "CPMK-RPL-02",
                            deskripsi:
                                "Mampu menerapkan metodologi Agile dan Scrum",
                        },
                    ],
                },
            ],
            data_skor_cpmk: [
                { kode: "CPMK-RPL-01", persentase: 88.0 },
                { kode: "CPMK-RPL-02", persentase: 75.5 },
                { kode: "CPMK-RPL-03", persentase: 65.0 },
            ],
            data_nilai_matkul: [
                { nilai: "A", jumlah: 15, persentase: 30.0 },
                { nilai: "B", jumlah: 25, persentase: 50.0 },
                { nilai: "C", jumlah: 10, persentase: 20.0 },
                { nilai: "D", jumlah: 0, persentase: 0.0 },
                { nilai: "E", jumlah: 0, persentase: 0.0 },
            ],
            // ====== DATA BARU (DUMMY) ======
            data_asesmen_cpmk: [
                { cpl: "CPL-03", cpmk: "CPMK-RPL-01", asesmen: "Tugas 1", bobot: "50.00%", rerata_skor: 88.0 },
                { cpl: "CPL-03", cpmk: "CPMK-RPL-01", asesmen: "UTS", bobot: "50.00%", rerata_skor: 88.0 },
                { cpl: "CPL-04", cpmk: "CPMK-RPL-02", asesmen: "Tugas Tim", bobot: "100.00%", rerata_skor: 75.5 },
                { cpl: "CPL-03", cpmk: "CPMK-RPL-03", asesmen: "Tugas 2", bobot: "40.00%", rerata_skor: 65.0 },
                { cpl: "CPL-03", cpmk: "CPMK-RPL-03", asesmen: "UAS", bobot: "60.00%", rerata_skor: 65.0 },
            ],
        },
        {
            // ===== KELAS 4 (RPL B) =====
            kelas_id: "4",
            program_studi: "TEKNIK INFORMATIKA S1",
            tahun_ajaran: "2023/2024",
            semester: "Genap",
            mata_kuliah: {
                kode_mata_kuliah: "IF765461",
                nama_mata_kuliah: "Rekayasa Perangkat Lunak",
            },
            nama_kelas: "Rekayasa Perangkat Lunak B",
            dosen_pengampu: "Prof. Budi Santoso, Ph.D.",
            deskripsi_pelaksanaan:
                "Mahasiswa aktif berpartisipasi dalam diskusi. Metode agile diterapkan dalam pengerjaan proyek.",
            materi_praktikum: [
                "Software Development Life Cycle (SDLC)",
                "Metodologi Agile (Scrum)",
                "UML Diagram",
            ],
            metode_pembelajaran: "Case Study & Team-Based Project",
            metode_asesmen: ["Quiz", "Proyek Tim", "Ujian Lisan"],
            pemetaan_cpl_cpmk: [
                {
                    cpl: {
                        kode: "CPL-03",
                        deskripsi:
                            "Mampu menganalisis dan merancang perangkat lunak.",
                    },
                    cpmk_list: [
                        {
                            kode: "CPMK-RPL-01",
                            deskripsi: "Mampu memahami dan memilih SDLC",
                        },
                        {
                            kode: "CPMK-RPL-03",
                            deskripsi: "Mampu membuat permodelan sistem (UML)",
                        },
                    ],
                },
                {
                    cpl: {
                        kode: "CPL-04",
                        deskripsi:
                            "Mampu bekerja dalam tim menggunakan metodologi modern.",
                    },
                    cpmk_list: [
                        {
                            kode: "CPMK-RPL-02",
                            deskripsi:
                                "Mampu menerapkan metodologi Agile dan Scrum",
                        },
                    ],
                },
            ],
            data_skor_cpmk: [
                { kode: "CPMK-RPL-01", persentase: 85.0 },
                { kode: "CPMK-RPL-02", persentase: 72.5 },
                { kode: "CPMK-RPL-03", persentase: 68.0 },
            ],
            data_nilai_matkul: [
                { nilai: "A", jumlah: 8, persentase: 20.0 },
                { nilai: "B", jumlah: 18, persentase: 45.0 },
                { nilai: "C", jumlah: 10, persentase: 25.0 },
                { nilai: "D", jumlah: 4, persentase: 10.0 },
                { nilai: "E", jumlah: 0, persentase: 0.0 },
            ],
            // ====== DATA BARU (DUMMY) ======
            data_asesmen_cpmk: [
                { cpl: "CPL-03", cpmk: "CPMK-RPL-01", asesmen: "Tugas 1", bobot: "50.00%", rerata_skor: 85.0 },
                { cpl: "CPL-03", cpmk: "CPMK-RPL-01", asesmen: "UTS", bobot: "50.00%", rerata_skor: 85.0 },
                { cpl: "CPL-04", cpmk: "CPMK-RPL-02", asesmen: "Tugas Tim", bobot: "100.00%", rerata_skor: 72.5 },
                { cpl: "CPL-03", cpmk: "CPMK-RPL-03", asesmen: "Tugas 2", bobot: "40.00%", rerata_skor: 68.0 },
                { cpl: "CPL-03", cpmk: "CPMK-RPL-03", asesmen: "UAS", bobot: "60.00%", rerata_skor: 68.0 },
            ],
        },
        {
            // ===== KELAS 5 (RPL C) =====
            kelas_id: "5",
            program_studi: "TEKNIK INFORMATIKA S1",
            tahun_ajaran: "2023/2024",
            semester: "Genap",
            mata_kuliah: {
                kode_mata_kuliah: "IF765461",
                nama_mata_kuliah: "Rekayasa Perangkat Lunak",
            },
            nama_kelas: "Rekayasa Perangkat Lunak C",
            dosen_pengampu: "Prof. Budi Santoso, Ph.D.",
            deskripsi_pelaksanaan:
                "Mahasiswa aktif berpartisipasi dalam diskusi. Metode agile diterapkan dalam pengerjaan proyek.",
            materi_praktikum: [
                "Software Development Life Cycle (SDLC)",
                "Metodologi Agile (Scrum)",
                "UML Diagram",
            ],
            metode_pembelajaran: "Case Study & Team-Based Project",
            metode_asesmen: ["Quiz", "Proyek Tim", "Ujian Lisan"],
            pemetaan_cpl_cpmk: [
                {
                    cpl: {
                        kode: "CPL-03",
                        deskripsi:
                            "Mampu menganalisis dan merancang perangkat lunak.",
                    },
                    cpmk_list: [
                        {
                            kode: "CPMK-RPL-01",
                            deskripsi: "Mampu memahami dan memilih SDLC",
                        },
                        {
                            kode: "CPMK-RPL-03",
                            deskripsi: "Mampu membuat permodelan sistem (UML)",
                        },
                    ],
                },
                {
                    cpl: {
                        kode: "CPL-04",
                        deskripsi:
                            "Mampu bekerja dalam tim menggunakan metodologi modern.",
                    },
                    cpmk_list: [
                        {
                            kode: "CPMK-RPL-02",
                            deskripsi:
                                "Mampu menerapkan metodologi Agile dan Scrum",
                        },
                    ],
                },
            ],
            data_skor_cpmk: [
                { kode: "CPMK-RPL-01", persentase: 91.0 },
                { kode: "CPMK-RPL-02", persentase: 70.0 },
                { kode: "CPMK-RPL-03", persentase: 58.5 },
            ],
            data_nilai_matkul: [
                { nilai: "A", jumlah: 12, persentase: 28.0 },
                { nilai: "B", jumlah: 22, persentase: 55.0 },
                { nilai: "C", jumlah: 3, persentase: 7.0 },
                { nilai: "D", jumlah: 3, persentase: 7.0 },
                { nilai: "E", jumlah: 1, persentase: 3.0 },
            ],
            // ====== DATA BARU (DUMMY) ======
            data_asesmen_cpmk: [
                { cpl: "CPL-03", cpmk: "CPMK-RPL-01", asesmen: "Tugas 1", bobot: "50.00%", rerata_skor: 91.0 },
                { cpl: "CPL-03", cpmk: "CPMK-RPL-01", asesmen: "UTS", bobot: "50.00%", rerata_skor: 91.0 },
                { cpl: "CPL-04", cpmk: "CPMK-RPL-02", asesmen: "Tugas Tim", bobot: "100.00%", rerata_skor: 70.0 },
                { cpl: "CPL-03", cpmk: "CPMK-RPL-03", asesmen: "Tugas 2", bobot: "40.00%", rerata_skor: 58.5 },
                { cpl: "CPL-03", cpmk: "CPMK-RPL-03", asesmen: "UAS", bobot: "60.00%", rerata_skor: 58.5 },
            ],
        },
    ];

    // Ambil data kelas yang sesuai kelasId
    const kelasDetail = dummyKelas.find((item) => item.kelas_id === kelasId);

    if (!kelasDetail) {
        return (
            <div className="p-6 min-h-screen bg-gray-50">
                <h1 className="text-xl text-red-600 font-semibold">
                    Kelas dengan ID {kelasId} tidak ditemukan. (Prodi ID dari URL:{" "}
                    {prodiId})
                </h1>
            </div>
        );
    }

    // ===========================================
    //       TAMPILAN JSX (DENGAN BOX 6 BARU)
    // ===========================================
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Detail Pelaksanaan Pembelajaran
            </h1>

            {/* Box 1: Info Kelas */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                    {/* Kolom 1 */}
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Program Studi
                            </p>
                            <p className="text-md font-semibold text-gray-800">
                                {kelasDetail.program_studi}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Tahun Ajaran
                            </p>
                            <p className="text-md font-semibold text-gray-800">
                                {kelasDetail.tahun_ajaran}
                            </p>
                        </div>
                    </div>
                    {/* Kolom 2 */}
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Mata Kuliah
                            </p>
                            <p className="text-md font-semibold text-gray-800">
                                {kelasDetail.mata_kuliah.kode_mata_kuliah} —{" "}
                                {kelasDetail.mata_kuliah.nama_mata_kuliah}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Nama Kelas
                            </p>
                            <p className="text-md font-semibold text-gray-800">
                                {kelasDetail.nama_kelas}
                            </p>
                        </div>
                    </div>
                    {/* Kolom 3 */}
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Dosen Pengampu
                            </p>
                            <p className="text-md font-semibold text-gray-800">
                                {kelasDetail.dosen_pengampu}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Box 2: Pelaksanaan Pembelajaran */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
                <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                    PELAKSANAAN PEMBELAJARAN
                </h2>
                <p className="text-gray-700 mb-6 italic">
                    {kelasDetail.deskripsi_pelaksanaan}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Materi */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-2">
                            Materi/Praktikum yang diberikan
                        </h3>
                        <ol className="list-decimal list-inside pl-2 space-y-1 text-gray-700">
                            {kelasDetail.materi_praktikum.map((materi, index) => (
                                <li key={index}>{materi}</li>
                            ))}
                        </ol>
                    </div>
                    {/* Metode Pembelajaran */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-2">
                            Metode pembelajaran yang dilaksanakan
                        </h3>
                        <p className="text-gray-700">
                            {kelasDetail.metode_pembelajaran}
                        </p>
                    </div>
                    {/* Metode Asesmen */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-2">
                            Metode asesmen yang dilaksanakan
                        </h3>
                        <ol className="list-decimal list-inside pl-2 space-y-1 text-gray-700">
                            {kelasDetail.metode_asesmen.map((asesmen, index) => (
                                <li key={index}>{asesmen}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>

            {/* Box 3: MATRIKS CPL-CPMK */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-6">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">
                        CPL dan CPMK yang dibebankan pada MK
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        {/* Header Tabel */}
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                                    CPL
                                </th>
                                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                                    CPMK
                                </th>
                            </tr>
                        </thead>
                        {/* Body Tabel */}
                        <tbody className="bg-white divide-y divide-gray-200">
                            {kelasDetail.pemetaan_cpl_cpmk.map((pemetaan) => (
                                <React.Fragment key={pemetaan.cpl.kode}>
                                    <tr>
                                        {/* Sel CPL */}
                                        <td
                                            className="px-6 py-4 align-top border-r border-gray-200"
                                            rowSpan={pemetaan.cpmk_list.length || 1}
                                        >
                                            <p className="font-semibold text-gray-900">
                                                {pemetaan.cpl.kode}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {pemetaan.cpl.deskripsi}
                                            </p>
                                        </td>

                                        {/* Sel CPMK Pertama */}
                                        <td className="px-6 py-4 align-top">
                                            {pemetaan.cpmk_list.length > 0 ? (
                                                <>
                                                    <p className="font-semibold text-gray-900">
                                                        {pemetaan.cpmk_list[0].kode}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {pemetaan.cpmk_list[0].deskripsi}
                                                    </p>
                                                </>
                                            ) : (
                                                <p className="text-sm text-gray-500 italic">
                                                    Belum ada CPMK
                                                </p>
                                            )}
                                        </td>
                                    </tr>

                                    {/* Sisa CPMK (dimulai dari indeks 1) */}
                                    {pemetaan.cpmk_list.slice(1).map((cpmk) => (
                                        <tr key={cpmk.kode}>
                                            <td className="px-6 py-4 align-top">
                                                <p className="font-semibold text-gray-900">
                                                    {cpmk.kode}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {cpmk.deskripsi}
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Box 4: SKOR CPMK */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-6">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">
                        Presentase mahasiswa yang mencapai skor CPMK sangat memuaskan
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        (sumber data: skor mahasiswa per asesmen sesuai CPMK)
                    </p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        {/* Header Tabel */}
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                                    CPMK
                                </th>
                                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                                    % Mahasiswa Yang Mencapai Skor CPMK Minimal 80
                                </th>
                            </tr>
                        </thead>
                        {/* Body Tabel */}
                        <tbody className="bg-white divide-y divide-gray-200">
                            {kelasDetail.data_skor_cpmk.map((item) => (
                                <tr key={item.kode}>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                        {item.kode}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowPrap text-gray-800">
                                        {item.persentase}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Box 5: NILAI MATA KULIAH */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-6">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">
                        Nilai Mata Kuliah
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        {/* Header Tabel */}
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                                    Nilai Mata Kuliah
                                </th>
                                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                                    Jumlah dan Persentase Mahasiswa
                                </th>
                            </tr>
                        </thead>
                        {/* Body Tabel */}
                        <tbody className="bg-white divide-y divide-gray-200">
                            {kelasDetail.data_nilai_matkul.map((item) => (
                                <tr key={item.nilai}>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                                        {item.nilai}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                        {item.jumlah} ({item.persentase}%)
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* =========================================== */}
            {/* Box 6: DETAIL ASESMEN CPMK (BARU)         */}
            {/* =========================================== */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-6">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">
                        Detail Bobot Asesmen per CPMK
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        (sumber data: pemetaan asesmen ke CPMK dan CPL)
                    </p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        {/* Header Tabel */}
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                                    CPL yang dibebankan pada MK
                                </th>
                                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                                    CPMK
                                </th>
                                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                                    Bentuk Asesmen
                                </th>
                                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                                    Bobot
                                </th>
                                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider">
                                    Rerata Skor Mahasiswa (0-100)
                                </th>
                            </tr>
                        </thead>
                        {/* Body Tabel */}
                        <tbody className="bg-white divide-y divide-gray-200">
                            {kelasDetail.data_asesmen_cpmk.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                        {item.cpl}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                        {item.cpmk}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                        {item.asesmen}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                        {item.bobot}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                        {item.rerata_skor}
                                    </td>
                                </tr>
                            ))}
                            {kelasDetail.data_asesmen_cpmk.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-6 text-gray-500"
                                    >
                                        Belum ada data detail asesmen untuk kelas ini.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DetailHasilPerhitunganKelasUniv;