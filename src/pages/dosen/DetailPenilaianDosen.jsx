import React, { useState, useMemo, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useKelas } from "../../hooks/dosen/useKelas";
import TableSkeleton from "../../components/TableSkeleton";
import { FiEdit2, FiSearch, FiUpload, FiDownload } from "react-icons/fi";

const DetailPenilaianDosen = () => {
    const { user } = useContext(AuthContext);
    const dosenId = user?.id;
    const { kelasQuery } = useKelas({ dosen_id: dosenId });
    const kelasData = useMemo(() => kelasQuery.data?.[0] || {}, [kelasQuery.data]);
    const [tampilan, setTampilan] = useState("CPMK"); // default tampilan awal


    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMhs, setSelectedMhs] = useState(null);
    const [inputNilai, setInputNilai] = useState({ tugas: "", kuis: "", uts: "", uas: "" });

    const handleOpenModal = (mhs) => {
        setSelectedMhs(mhs);
        setInputNilai({ tugas: mhs.tugas, kuis: mhs.kuis, uts: mhs.uts, uas: mhs.uas });
        setModalOpen(true);
    };

    const handleSaveNilai = () => {
        setMahasiswa(prev =>
            prev.map(m =>
                m.npm === selectedMhs.npm && m.nama === selectedMhs.nama
                    ? {
                        ...m,
                        tugas: +inputNilai.tugas,
                        kuis: +inputNilai.kuis,
                        uts: +inputNilai.uts,
                        uas: +inputNilai.uas,
                        total: ((+inputNilai.tugas + +inputNilai.kuis + +inputNilai.uts + +inputNilai.uas) / 4).toFixed(2)
                    }
                    : m
            )
        );
        setModalOpen(false);
    };

    // ========= DUMMY DATA ==========
    const [mahasiswa] = useState([
        { npm: "2115061066", nama: "Tasya", tugas: 85, kuis: 80, uts: 90, uas: 88, bobot: "A" },
        { npm: "2115061067", nama: "Agustiono", tugas: 75, kuis: 70, uts: 78, uas: 80, bobot: "B+" },
        { npm: "2115061068", nama: "Budiono Siregar", tugas: 65, kuis: 60, uts: 70, uas: 72, bobot: "B" },
        { npm: "2115061069", nama: "Akbar", tugas: 50, kuis: 55, uts: 60, uas: 58, bobot: "C+" },
        { npm: "2115061070", nama: "Muhammad Riko", tugas: 90, kuis: 92, uts: 95, uas: 94, bobot: "A" },
        { npm: "2115061071", nama: "Faizal Permana", tugas: 40, kuis: 42, uts: 50, uas: 48, bobot: "D" },
        { npm: "2115061072", nama: "Rizky Ridho", tugas: 70, kuis: 68, uts: 74, uas: 76, bobot: "B" },
        { npm: "2115061073", nama: "Pratama Arhan", tugas: 55, kuis: 58, uts: 62, uas: 60, bobot: "C" },
        { npm: "2115061074", nama: "Marselino Ferdinan", tugas: 82, kuis: 80, uts: 85, uas: 87, bobot: "A-" },
        { npm: "2115061075", nama: "Jesica", tugas: 88, kuis: 90, uts: 92, uas: 95, bobot: "A" },
    ]);

    // ========= DUMMY DATA UNTUK TABEL CPMK BARU ==========
    const cpmkDummy = [
        { npm: "2115061066", nama: "Tasya", cpmk1: 76.5, cpmk2: 71, cpmk3: 73.5, cpmk4: 78, cpmk5: 75.5, cpmk6: 79 },
        { npm: "2115061067", nama: "Agustiono", cpmk1: 72, cpmk2: 70, cpmk3: 72, cpmk4: 70, cpmk5: 70, cpmk6: 70 },
        { npm: "2115061068", nama: "Budiono Siregar", cpmk1: 75.5, cpmk2: 75, cpmk3: 79, cpmk4: 70, cpmk5: 70, cpmk6: 70 },
        { npm: "2115061069", nama: "Akbar", cpmk1: 77, cpmk2: 78, cpmk3: 71, cpmk4: 70, cpmk5: 70, cpmk6: 70 },
        { npm: "2115061070", nama: "Muhammad Riko", cpmk1: 74, cpmk2: 80, cpmk3: 75, cpmk4: 70, cpmk5: 70, cpmk6: 70 },
        { npm: "2115061071", nama: "Faizal Permana", cpmk1: 76, cpmk2: 75.5, cpmk3: 73.5, cpmk4: 70, cpmk5: 70, cpmk6: 70 },
        { npm: "2115061072", nama: "Rizky Ridho", cpmk1: 79.5, cpmk2: 71, cpmk3: 71.5, cpmk4: 70, cpmk5: 70, cpmk6: 70 },
        { npm: "2115061073", nama: "Pratama Arhan", cpmk1: 78, cpmk2: 72.5, cpmk3: 77.5, cpmk4: 70, cpmk5: 70, cpmk6: 70 },
        { npm: "2115061074", nama: "Marselino Ferdinan", cpmk1: 73, cpmk2: 72.5, cpmk3: 74, cpmk4: 70, cpmk5: 70, cpmk6: 70 },
        { npm: "2115061075", nama: "Jesica", cpmk1: 74.5, cpmk2: 75, cpmk3: 77.5, cpmk4: 70, cpmk5: 70, cpmk6: 70 }
    ];

    // ========= DUMMY DATA UNTUK TABEL CPL ==========
    const cplDummy = [
        { npm: "2115061066", nama: "Rama Wahyu Ajie Pratama", cpl1: 76.5, cpl2: 71, cpl3: 74, cpl4: 78, cpl5: 77.5, cpl6: 73.5 },
        { npm: "2115061067", nama: "Agustiono", cpl1: 72, cpl2: 70, cpl3: 74, cpl4: 78, cpl5: 77.5, cpl6: 72 },
        { npm: "2115061068", nama: "Budiono Siregar", cpl1: 75.5, cpl2: 75, cpl3: 74, cpl4: 78, cpl5: 77.5, cpl6: 79 },
        { npm: "2115061069", nama: "Akbar", cpl1: 77, cpl2: 78, cpl3: 74, cpl4: 78, cpl5: 77.5, cpl6: 71 },
        { npm: "2115061070", nama: "Muhammad Riko", cpl1: 74, cpl2: 80, cpl3: 74, cpl4: 78, cpl5: 77.5, cpl6: 75 },
        { npm: "2115061071", nama: "Faizal Permana", cpl1: 76, cpl2: 75.5, cpl3: 74, cpl4: 78, cpl5: 77.5, cpl6: 73.5 },
        { npm: "2115061072", nama: "Rizky Ridho", cpl1: 79.5, cpl2: 71, cpl3: 74, cpl4: 78, cpl5: 77.5, cpl6: 71.5 },
        { npm: "2115061073", nama: "Pratama Arhan", cpl1: 78, cpl2: 72.5, cpl3: 74, cpl4: 78, cpl5: 77.5, cpl6: 79 },
        { npm: "2115061074", nama: "Marselino Ferdinan", cpl1: 73, cpl2: 72.5, cpl3: 74, cpl4: 78, cpl5: 77.5, cpl6: 74 },
        { npm: "2115061075", nama: "Jesica", cpl1: 74.5, cpl2: 75, cpl3: 74, cpl4: 78, cpl5: 77.5, cpl6: 77.5 },
    ];


    const [search, setSearch] = useState("");

    // Hitung total otomatis
    const dataDenganTotal = mahasiswa.map(mhs => {
        const total = ((mhs.tugas + mhs.kuis + mhs.uts + mhs.uas) / 4).toFixed(2);
        return { ...mhs, total };
    });

    // Filter search
    const filteredData = dataDenganTotal.filter(mhs =>
        mhs.nama.toLowerCase().includes(search.toLowerCase()) ||
        mhs.npm.includes(search)
    );

    if (kelasQuery.isLoading) return <TableSkeleton rows={5} cols={6} />;

    const handleDownloadTemplate = () => {
        const header = ["npm", "nama", "tugas", "kuis", "uts", "uas", "bobot"];
        const csvRows = [
            header.join(","),
            ...mahasiswa.map(m => [
                m.npm,
                m.nama,
                m.tugas,
                m.kuis,
                m.uts,
                m.uas,
                m.bobot
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvRows], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "template_nilai_mahasiswa.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    // Upload file nilai (sementara hanya log)
    const handleUploadNilai = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        console.log("File diupload:", file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log("Isi file:", e.target.result);
        };
        reader.readAsText(file);
    };

    // Search submit button (sementara hanya log karena filter sudah realtime)
    const handleSearchSubmit = () => {
        console.log("Search di-submit:", search);
    };

    return (
        <div>
            {/* ===== HEADER ===== */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 border rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-500">Mata Kuliah</p>
                        <p className="font-semibold">{kelasData.nama_mata_kuliah || "-"}</p>
                    </div>
                    <div className="p-3 border rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-500">Kode Matakuliah</p>
                        <p className="font-semibold">{kelasData.kode_mata_kuliah || "-"}</p>
                    </div>
                    <div className="p-3 border rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-500">Nama Kelas</p>
                        <p className="font-semibold">{kelasData.nama_kelas || "-"}</p>
                    </div>
                </div>
            </div>

            {/* ===== TOOLBAR (Download, Upload, Search) ===== */}
            <div className="bg-white rounded-lg shadow p-4 mb-4 flex flex-wrap items-center justify-between gap-3">

                {/* KIRI */}
                <div className="font-bold text-base text-gray-700">Daftar Peserta Kelas</div>

                {/* KANAN */}
                <div className="flex flex-wrap items-center gap-3">

                    {/* Download Template */}
                    <button
                        onClick={handleDownloadTemplate}
                        className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                    >
                        <FiDownload /> Download Template
                    </button>

                    {/* Upload Nilai */}
                    <label className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer">
                        <FiUpload /> Upload Nilai
                        <input
                            type="file"
                            className="hidden"
                            accept=".csv"
                            onChange={handleUploadNilai}
                        />
                    </label>

                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cari Mahasiswa..."
                            className="border px-4 py-2 rounded-lg pl-10 focus:outline-none w-64"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FiSearch className="absolute left-3 top-3 text-gray-500" />
                    </div>

                    {/* Search Submit (opsional kalau mau icon button) */}
                    <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
                        <FiSearch size={18} />
                    </button>

                </div>
            </div>

            {/* ===== TABEL ===== */}
            <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
                <table className="min-w-full border-collapse text-sm">
                    <thead>
                        <tr className=" text-white bg-blue-600">
                            <th className="p-3 text-left ">NPM</th>
                            <th className="p-3 text-left">Nama Mahasiswa</th>
                            <th className="p-3 text-center">Tugas</th>
                            <th className="p-3 text-center">Kuis</th>
                            <th className="p-3 text-center">UTS</th>
                            <th className="p-3 text-center">UAS</th>
                            <th className="p-3 text-center">Total</th>
                            <th className="p-3 text-center">Bobot</th>
                            <th className="p-3 text-center">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredData.length === 0 ? (
                            <tr>
                                <td colSpan={10} className="text-center p-4 text-gray-500">Tidak ada data</td>
                            </tr>
                        ) : (
                            filteredData.map((mhs, i) => (
                                <tr key={i} className="border-b border-gray-300 hover:bg-gray-50">
                                    <td className="p-3">{mhs.npm}</td>
                                    <td className="p-3">{mhs.nama}</td>
                                    <td className="p-3 text-center">{mhs.tugas}</td>
                                    <td className="p-3 text-center">{mhs.kuis}</td>
                                    <td className="p-3 text-center">{mhs.uts}</td>
                                    <td className="p-3 text-center">{mhs.uas}</td>
                                    <td className="p-3 text-center font-semibold">{mhs.total}</td>
                                    <td className="p-3 text-center">{mhs.bobot}</td>

                                    <td className="p-3 text-center">
                                        <button className=" text-blue-700 p-2 rounded hover:text-blue-300"
                                            onClick={() => handleOpenModal(mhs)}>
                                            <FiEdit2 size={15} />

                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex gap-3 mb-4 pt-4 px-4">
                <button
                    onClick={() => setTampilan("CPMK")}
                    className={`px-5 py-2 rounded-lg font-semibold transition ${tampilan === "CPMK" ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                >
                    Data CPMK
                </button>

                <button
                    onClick={() => setTampilan("CPL")}
                    className={`px-5 py-2 rounded-lg font-semibold transition ${tampilan === "CPL" ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                >
                    Data CPL
                </button>
            </div>

            {/* ===== TABEL CPMK ===== */}
            {tampilan === "CPMK" && (
                <div className="bg-white rounded-lg shadow p-4 mt-8 overflow-x-auto">
                    <h2 className="text-lg font-bold mb-4 text-gray-700">Penilaian CPMK Mahasiswa</h2>
                    <table className="min-w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="p-3 text-left">NPM</th>
                                <th className="p-3 text-left">Nama Mahasiswa</th>
                                <th className="p-3 text-center">CPMK-01</th>
                                <th className="p-3 text-center">CPMK-02</th>
                                <th className="p-3 text-center">CPMK-03</th>
                                <th className="p-3 text-center">CPMK-04</th>
                                <th className="p-3 text-center">CPMK-05</th>
                                <th className="p-3 text-center">CPMK-06</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cpmkDummy.map((mhs, i) => (
                                <tr key={i} className="border-b border-gray-300 hover:bg-gray-50">
                                    <td className="p-3">{mhs.npm}</td>
                                    <td className="p-3">{mhs.nama}</td>
                                    <td className="p-3 text-center">{mhs.cpmk1}</td>
                                    <td className="p-3 text-center">{mhs.cpmk2}</td>
                                    <td className="p-3 text-center">{mhs.cpmk3}</td>
                                    <td className="p-3 text-center">{mhs.cpmk4}</td>
                                    <td className="p-3 text-center">{mhs.cpmk5}</td>
                                    <td className="p-3 text-center">{mhs.cpmk6}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ===== TABEL CPL ===== */}
            {tampilan === "CPL" && (
                <div className="bg-white rounded-lg shadow p-4 mt-8 overflow-x-auto">
                    <h2 className="text-lg font-bold mb-4 text-gray-700">Penilaian CPL Mahasiswa</h2>
                    <table className="min-w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="p-3 text-left">NPM</th>
                                <th className="p-3 text-left">Nama Mahasiswa</th>
                                <th className="p-3 text-center">CPL-01</th>
                                <th className="p-3 text-center">CPL-02</th>
                                <th className="p-3 text-center">CPL-03</th>
                                <th className="p-3 text-center">CPL-04</th>
                                <th className="p-3 text-center">CPL-05</th>
                                <th className="p-3 text-center">CPL-06</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cplDummy.map((mhs, i) => (
                                <tr key={i} className="border-b border-gray-300 hover:bg-gray-50">
                                    <td className="p-3">{mhs.npm}</td>
                                    <td className="p-3">{mhs.nama}</td>
                                    <td className="p-3 text-center">{mhs.cpl1}</td>
                                    <td className="p-3 text-center">{mhs.cpl2}</td>
                                    <td className="p-3 text-center">{mhs.cpl3}</td>
                                    <td className="p-3 text-center">{mhs.cpl4}</td>
                                    <td className="p-3 text-center">{mhs.cpl5}</td>
                                    <td className="p-3 text-center">{mhs.cpl6}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ===== MODAL INPUT NILAI (TAILWIND MURNI) ===== */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex justify-center items-center z-50 px-3">
                    <div className="bg-white w-full max-w-[500px] rounded-2xl shadow-md p-6 relative">

                        {/* tombol close */}
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
                        >
                            ✕
                        </button>

                        {/* header */}
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Input Nilai Mahasiswa</h2>
                            <p className="text-sm text-gray-500 mt-1">{selectedMhs?.npm} • {selectedMhs?.nama}</p>
                        </div>

                        {/* form input */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tugas</label>
                                <input
                                    type="number"
                                    value={inputNilai.tugas}
                                    onChange={(e) => setInputNilai(prev => ({ ...prev, tugas: e.target.value }))}
                                    placeholder="Masukkan nilai tugas"
                                    className="w-full border border-gray-200 px-3 py-2 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kuis</label>
                                <input
                                    type="number"
                                    value={inputNilai.kuis}
                                    onChange={(e) => setInputNilai(prev => ({ ...prev, kuis: e.target.value }))}
                                    placeholder="Masukkan nilai kuis"
                                    className="w-full border border-gray-200 px-3 py-2 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">UTS</label>
                                <input
                                    type="number"
                                    value={inputNilai.uts}
                                    onChange={(e) => setInputNilai(prev => ({ ...prev, uts: e.target.value }))}
                                    placeholder="Masukkan nilai UTS"
                                    className="w-full border border-gray-200 px-3 py-2 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">UAS</label>
                                <input
                                    type="number"
                                    value={inputNilai.uas}
                                    onChange={(e) => setInputNilai(prev => ({ ...prev, uas: e.target.value }))}
                                    placeholder="Masukkan nilai UAS"
                                    className="w-full border border-gray-200 px-3 py-2 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition"
                                />
                            </div>
                        </div>

                        {/* footer button */}
                        <div className="grid grid-cols-2 gap-3 mt-7">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="py-2.5 rounded-xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleSaveNilai}
                                className="py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-sm"
                            >
                                Simpan Nilai
                            </button>
                        </div>

                    </div>
                </div>
            )}



        </div>
    );
};

export default DetailPenilaianDosen;
