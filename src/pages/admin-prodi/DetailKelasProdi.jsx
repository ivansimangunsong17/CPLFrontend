import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
    AiOutlinePlus,
    AiOutlineSearch,
    AiFillDelete,
    AiFillEdit,
} from "react-icons/ai";
import { FiDownloadCloud, FiUploadCloud } from "react-icons/fi";
import { toast } from 'react-toastify';
import ConfirmModal from "../../components/Modal/ConfModal";
import FormBox from "../../components/Form/FormBox";
import LoadingScreen from "../../components/LoadingScreen";
import CardSkeleton from "../../components/CardSkeleton";
import TableSkeleton from "../../components/TableSkeleton";
import * as XLSX from "xlsx";


// Hooks
import { useKelas } from "../../hooks/admin-prodi/useKelas";
import { useMahasiswaKelas } from "../../hooks/admin-prodi/useMahasiswaKelas";

const DetailKelasProdi = () => {
    const { kelasId } = useParams();

    // Query kelas
    const { kelasQuery } = useKelas({ kelas_id: kelasId });
    const kelas = kelasQuery.data?.[0];

    // Query mahasiswa
    const {
        mahasiswaQuery,
        createMutation,
        updateMutation,
        deleteMutation,
    } = useMahasiswaKelas({ kelas_id: kelasId });

    // State UI
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);

    // helper to derive stable unique id for a mahasiswa item
    const getMhsId = (m, idx) => m?.id ?? m?.mahasiswa_id ?? m?.mahasiswaId ?? (m?.npm ? `${m.npm}-${idx}` : `m-${idx}`);

    // Filter mahasiswa
    const filtered = (mahasiswaQuery.data ?? []).filter(
        (m) =>
            m.npm?.toLowerCase().includes(search.toLowerCase()) ||
            m.name?.toLowerCase().includes(search.toLowerCase())
    )


    const handleSubmit = (values) => {
        if (editing) {
            // update
            updateMutation.mutate(
                { id: editing.mahasiswa_id, ...values }, // <--- PERBAIKAN DI SINI
                {
                    onSuccess: () => {
                        setShowForm(false)
                        setEditing(null)
                        // Ganti alert dengan toast agar konsisten
                        toast.success("Mahasiswa berhasil diperbarui");
                    },
                    onError: (error) => {
                        toast.error(error.message || 'Gagal memperbarui mahasiswa'); // Ganti alert
                    },
                }
            )
        } else {
            

            // ▼▼▼ TAMBAHKAN VALIDASI DUPLIKAT DI SINI ▼▼▼
            const isDuplicate = (mahasiswaQuery.data || []).some(
                (mhs) => mhs.npm === values.npm
            );

            if (isDuplicate) {
                toast.warn(`Mahasiswa dengan NPM ${values.npm} sudah terdaftar di kelas ini`);
                return; // Hentikan fungsi
            }
            // ▲▲▲ BATAS TAMBAHAN ▲▲▲

            createMutation.mutate(
                [values], // HANYA KIRIM ARRAY-NYA
                {
                    onSuccess: () => {
                        setShowForm(false)
                    },
                    onError: (error) => {
                        alert(error.message || 'Gagal menambahkan mahasiswa')
                    },
                }
            )
        }
    }


    // Hapus (satu/banyak sekaligus)
    const handleDelete = () => {
        console.log("🔥 handleDelete jalan, selectedIds:", selectedIds);
        if (selectedIds.length === 0) return;
        deleteMutation.mutate(
            { mahasiswa_ids: selectedIds },
            {
                onSuccess: () => {
                    console.log("✅ sukses hapus");
                    setShowConfirm(false);
                    setSelectedIds([]);
                },
                onError: (err) => console.error("❌ error hapus", err),
            }
        );
    };

    const handleExportExcel = (data) => {
        try {
            if (!data || data.length === 0) {
                toast.error("Tidak ada data untuk diekspor");
                return;
            }

            const exportData = data.map((m, i) => ({
                No: i + 1,
                NPM: m.npm,
                Nama: m.name,
                Angkatan: m.angkatan,
            }));

            const ws = XLSX.utils.json_to_sheet(exportData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Mahasiswa");

            const fileName = `data-mahasiswa-${new Date().toISOString().slice(0, 10)}.xlsx`;
            XLSX.writeFile(wb, fileName);

            toast.success("Data berhasil diekspor");
        } catch (err) {
            console.error("Export gagal", err);
            toast.error("Gagal mengekspor data");
        }
    };

    const handleImportExcel = (e, onImport) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: "binary" });
                const ws = wb.Sheets[wb.SheetNames[0]];
                const json = XLSX.utils.sheet_to_json(ws);

                const mapped = json.map((row) => ({
                    npm: row["NPM"]?.toString() || "",
                    name: row["Nama"] || "",
                    angkatan: parseInt(row["Angkatan"]) || "",
                }));

                if (mapped.length === 0) {
                    toast.error("File kosong atau format tidak sesuai");
                    return;
                }

                if (typeof onImport === "function") {
                    onImport(mapped); // ✅ sekali request array
                }

            } catch (err) {
                console.error("Import gagal", err);
                toast.error("Gagal mengimpor file");
            }
        };
        reader.readAsBinaryString(file);

        e.target.value = "";
    };




    // ✅ Download template kosong
    const handleDownloadTemplate = () => {
        try {
            // PERBAIKAN 1: Tambahkan "No" pada data template
            const template = [{ No: "", NPM: "", Nama: "", Angkatan: "" }];

            // PERBAIKAN 2: Tentukan urutan header secara eksplisit
            const headers = ["No", "NPM", "Nama", "Angkatan"];

            // PERBAIKAN 3: Gunakan 'headers' untuk memastikan urutan kolom
            const ws = XLSX.utils.json_to_sheet(template, { header: headers });

            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Template");

            XLSX.writeFile(wb, "template-mahasiswa.xlsx");
            toast.success("Template berhasil diunduh");
        } catch (err) {
            console.error("Template gagal dibuat", err);
            toast.error("Gagal mengunduh template");
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen space-y-6">


            {/* Global Loading */}
            {(createMutation.isPending ||
                updateMutation.isPending ||
                deleteMutation.isPending) && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20">
                        <LoadingScreen />
                    </div>
                )}


            {/* Header */}
            {kelasQuery.isLoading ? (
                <CardSkeleton className="h-24 w-full" />
            ) : kelasQuery.error ? (
                <p className="p-6 text-red-500">
                    Gagal memuat detail kelas: {kelasQuery.error.message}
                </p>
            ) : (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Detail Kelas</h1>
                            <p className="text-sm text-gray-500">
                                Informasi dan daftar peserta kelas
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => handleExportExcel(mahasiswaQuery.data)}
                                className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-gray-700 rounded-lg hover:bg-yellow-200 transition"
                            >
                                <FiUploadCloud size={18} />
                                <span>Export</span>
                            </button>


                            <button
                                onClick={handleDownloadTemplate}
                                className="flex items-center gap-2 px-4 py-2 bg-green-100 text-gray-700 rounded-lg hover:bg-green-200 transition">
                                <FiDownloadCloud size={18} />
                                <span>Template</span>
                            </button>

                            <label className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-gray-700 rounded-lg hover:bg-blue-200 transition cursor-pointer">
                                <FiDownloadCloud size={18} />
                                <span>Import</span>
                                <input
                                    type="file"
                                    accept=".xlsx,.xls"
                                    className="hidden"
                                    onChange={(e) =>
                                        handleImportExcel(e, (rows) => {
                                            // 🚀 kirim semua sekaligus
                                            createMutation.mutate(
                                                rows // HANYA KIRIM ARRAY-NYA
                                            );
                                        })
                                    }
                                />

                            </label>


                            <button
                                onClick={() => setShowConfirm(true)}
                                disabled={selectedIds.length === 0}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
                            >
                                <AiFillDelete size={18} />
                                <span>Hapus</span>
                            </button>

                            <button
                                onClick={() => {
                                    setEditing(null);
                                    setShowForm(true);
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                            >
                                <AiOutlinePlus size={18} />
                                <span>Tambah</span>
                            </button>
                        </div>
                    </div>

                    {/* Kelas info */}
                    <div className="grid grid-cols-3 gap-4 bg-white rounded-xl shadow p-6">
                        <div>
                            <p className="text-gray-500 text-sm">Kode Kelas</p>
                            <p className="font-semibold">{kelas?.kode_kelas || "-"}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Nama Kelas</p>
                            <p className="font-semibold">{kelas?.nama_kelas || "-"}</p>
                        </div>
                    </div>

                    {/* Toolbar + Search */}
                    <div className="flex items-center gap-4 pt-4">
                        <div className="flex items-center border rounded-lg px-3 py-2 w-64">
                            <AiOutlineSearch className="text-gray-400 mr-3" />
                            <input
                                type="text"
                                placeholder="Cari Mahasiswa..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-grow outline-none text-sm"
                            />
                        </div>
                    </div>
                </div>
            )}


            {/* Tabel Mahasiswa */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-blue-100 text-black">
                            <tr>
                                <th className="p-4 w-12 text-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded accent-blue-500"
                                        checked={
                                            filtered?.length > 0 &&
                                            selectedIds.length === filtered.length
                                        }
                                        onChange={(e) =>
                                            setSelectedIds(
                                                e.target.checked
                                                    ? filtered.map((m) => m.mahasiswa_id)
                                                    : []
                                            )
                                        }
                                    />
                                </th>
                                <th className="p-4 text-left">NPM</th>
                                <th className="p-4 text-left">Nama Lengkap</th>
                                <th className="p-4 text-left">Angkatan</th>
                                <th className="p-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {mahasiswaQuery.isLoading ? (
                                <TableSkeleton cols={5} />
                            ) : mahasiswaQuery.error ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-red-500">
                                        Gagal memuat data mahasiswa: {mahasiswaQuery.error.message}
                                    </td>
                                </tr>
                            ) : filtered?.length ? (
                                filtered.map((mhs, idx) => (
                                    <tr key={getMhsId(mhs, idx)}>
                                        <td className="p-4 text-center">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded accent-blue-500"
                                                checked={selectedIds.includes(mhs.mahasiswa_id)} // ✅ konsisten pakai mahasiswa_id
                                                onChange={(e) =>
                                                    setSelectedIds((prev) =>
                                                        e.target.checked
                                                            ? [...prev, mhs.mahasiswa_id] // ✅
                                                            : prev.filter((id) => id !== mhs.mahasiswa_id) // ✅
                                                    )
                                                }
                                            />
                                        </td>
                                        <td className="p-4">{mhs.npm}</td>
                                        <td className="p-4">{mhs.name}</td>
                                        <td className="p-4">{mhs.angkatan || "-"}</td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => {
                                                    setEditing(mhs);
                                                    setShowForm(true);
                                                }}
                                                className="text-blue-600 hover:text-blue-800 gap-2 mr-4"
                                            >
                                                <AiFillEdit size={18} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedIds([mhs.mahasiswa_id]); // ✅
                                                    setShowConfirm(true);
                                                }}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <AiFillDelete size={18} />
                                            </button>

                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="p-8 text-center text-gray-500 italic"
                                    >
                                        Belum ada mahasiswa terdaftar.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Form */}
            {showForm && (
                <FormBox
                    title={editing ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
                    onCancel={() => {
                        setShowForm(false);
                        setEditing(null);
                    }}
                    onSubmit={handleSubmit}
                    initialData={
                        editing || {
                            npm: "",
                            name: "",
                            angkatan: "",
                        }
                    }
                    isOpen={showForm}
                    isSubmitting={createMutation.isPending || updateMutation.isPending} // ✅ tambahin ini
                    fields={[
                        { name: "npm", label: "NPM", type: "text", required: true },
                        { name: "name", label: "Nama Lengkap", type: "text", required: true },
                        { name: "angkatan", label: "Angkatan", type: "text" },
                    ]}
                />

            )}


            {/* Modal Konfirmasi Hapus */}
            {showConfirm && (
                <ConfirmModal
                    isOpen={showConfirm}
                    message={`Apakah yakin ingin menghapus ${selectedIds.length} mahasiswa?`}
                    onClose={() => setShowConfirm(false)}
                    onConfirm={handleDelete}
                    isDeleting={deleteMutation.isLoading}
                />

            )}
        </div>
    );
};

export default DetailKelasProdi;