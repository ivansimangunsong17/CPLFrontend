import React, { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';
import FormBox from "../../components/Form/FormBox";
import { useKelas } from "../../hooks/admin-prodi/useKelas";
import { useJenisPenilaian } from "../../hooks/admin-prodi/useJenisPenilaian";
import { usePemetaanCPMK } from "../../hooks/admin-prodi/usePemetaanCPMK";
import { useSubPenilaian } from "../../hooks/admin-prodi/useSubPenilaian";
import TableSkeleton from "../../components/TableSkeleton";
import ConfModal from "../../components/Modal/ConfModal";
import CardSkeleton from "../../components/CardSkeleton";
import { AiOutlineArrowLeft } from "react-icons/ai";
import LoadingScreen from "../../components/LoadingScreen";

const DetailAturPenilaianProdi = () => {
    // --- 1. Panggil Semua Hook ---
    const navigate = useNavigate();
    const { kelasId } = useParams();

    const { kelasQuery } = useKelas({ kelas_id: kelasId });
    const { jenisPenilaianQuery } = useJenisPenilaian();
    const {
        subPenilaianQuery,
        createMutation: createSubPenilaianMutation,
        deleteMutation: deleteSubPenilaianMutation
    } = useSubPenilaian(kelasId);

    const mataKuliahId = useMemo(() => kelasQuery.data?.[0]?.mata_kuliah?.mata_kuliah_id, [kelasQuery.data]);
    const { pemetaanCPMKQuery } = usePemetaanCPMK(mataKuliahId);

    // --- 2. Proses Data Hasil Query ---
    const kelasData = useMemo(() => kelasQuery.data?.[0], [kelasQuery.data]);
    const isKelasLoading = kelasQuery.isLoading; // Loading awal untuk info kelas

    const assessments = useMemo(() => jenisPenilaianQuery.data || [], [jenisPenilaianQuery.data]);
const subAssessments = useMemo(() => subPenilaianQuery.data || [], [subPenilaianQuery.data]);
   

    // Untuk Skeleton (hanya true saat data belum ada/cache)
    const isInitialDataLoading =
        jenisPenilaianQuery.isLoading ||
        subPenilaianQuery.isLoading;

    // Untuk LoadingScreen
    const isMutating =
        createSubPenilaianMutation.isPending ||
        deleteSubPenilaianMutation.isPending;

    // Struktur Data Gabungan (Logika ini sudah benar)
    const combinedAssessments = useMemo(() => {
        if (jenisPenilaianQuery.isLoading || subPenilaianQuery.isLoading) return [];

        const subMap = new Map();
        subAssessments.forEach(sub => {
            const parentId = sub.penilaian_id; // Asumsi FK
            if (!subMap.has(parentId)) {
                subMap.set(parentId, []);
            }
            subMap.get(parentId).push(sub);
        });

        return assessments.map(assessment => ({
            ...assessment,
            subs: subMap.get(assessment.penilaian_id) || []
        }));
    }, [assessments, subAssessments, jenisPenilaianQuery.isLoading, subPenilaianQuery.isLoading]);

    // --- 3. State dan Handler ---
    const handleBack = () => navigate("/dashboard/admin_prodi/atur_penilaian");
    const [isSubFormOpen, setIsSubFormOpen] = useState(false);
    const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);
    const [newSubName, setNewSubName] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [subToDelete, setSubToDelete] = useState(null);

    const fieldsSubPenilaian = [{ name: "sub", label: "Nama Sub Penilaian", type: "text", required: true }];

    // Handler untuk 'onSubmit' dari FormBox (setelah konfirmasi)
    const handleAddSubAssessment = () => {
        // PERBAIKAN: Hapus pengecekan loading, karena tombol sudah di-disable
        if (selectedAssessmentId === null || !kelasId || !newSubName) {
            toast.error("Terjadi kesalahan, ID penilaian atau nama baru tidak ditemukan.");
            return;
        }

        const payload = {
            penilaian_id: selectedAssessmentId,
            kelas_id: Number(kelasId),
            nama_sub_penilaian: newSubName,
        };

        createSubPenilaianMutation.mutate(payload, {
            onSuccess: () => {
                setIsSubFormOpen(false);
                setSelectedAssessmentId(null);
                setNewSubName("");
            },
        });
    };

    const removeAssessment = (assessmentId) => {
        if (!window.confirm("Yakin ingin menghapus jenis penilaian ini?")) return;
        console.log("Menghapus penilaian (API Call needed), ID:", assessmentId);
        // TODO: Panggil mutasi hapus jenis penilaian
    };

    const removeSub = (subPenilaianId) => {
        setSubToDelete(subPenilaianId);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteSub = () => {
        if (subToDelete) {
            deleteSubPenilaianMutation.mutate({ sub_penilaian_id: subToDelete });
            setIsDeleteModalOpen(false);
            setSubToDelete(null);
        }
    };

    const cancelDeleteSub = () => {
        setIsDeleteModalOpen(false);
        setSubToDelete(null);
    };

    const handleSave = () => {
        console.log("Menyimpan semua perubahan (API Call needed):", assessments);
        alert("Fungsi simpan belum terhubung ke API.");
    };

    // --- 4. Render Komponen ---
    if (isKelasLoading) {
        return (
            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <CardSkeleton />
                <div className="bg-white rounded-xl shadow-md overflow-hidden mt-8">
                    <table className="w-full"><tbody><TableSkeleton columns={3} rows={5} /></tbody></table>
                </div>
            </div>
        );
    }

    if (!kelasData) {
        return (
            <div className="p-8 text-center">
                <h3 className="text-lg font-medium text-red-600 mb-2">Data Kelas Tidak Ditemukan</h3>
                <p className="text-gray-500">Pastikan ID kelas pada URL sudah benar.</p>
                <button onClick={handleBack} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Kembali
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {isMutating && <LoadingScreen />}

            <div className="mb-6 flex items-center justify-between">
                <button onClick={handleBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                    <AiOutlineArrowLeft size={20} />
                    <span>Kembali</span>
                </button>
                <h2 className="text-xl font-semibold text-gray-800 text-right">
                    Atur Penilaian - {kelasData.mata_kuliah?.nama_mata_kuliah} ({kelasData.nama_kelas})
                </h2>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 border rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-500">Mata Kuliah</p>
                        <p className="font-semibold">{kelasData.mata_kuliah?.nama_mata_kuliah || "-"}</p>
                    </div>
                    <div className="p-3 border rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-500">Kode Kelas</p>
                        <p className="font-semibold">{kelasData.kode_kelas || "-"}</p>
                    </div>
                    <div className="p-3 border rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-500">Nama Kelas</p>
                        <p className="font-semibold">{kelasData.nama_kelas || "-"}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-700">Jenis Penilaian</h2>
                <div className="flex gap-3">
                    <button
                        onClick={handleSave}
                        disabled
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300"
                    >
                        Simpan Perubahan
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full text-gray-700">
                    <thead>
                        <tr className="bg-blue-600 text-white text-sm uppercase">
                            <th className="px-6 py-3 text-left">Penilaian</th>
                            <th className="px-6 py-3 text-left">Sub - Penilaian</th>
                            <th className="px-6 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {/* PERBAIKAN: Gunakan `isInitialDataLoading` untuk Skeleton */}
                        {isInitialDataLoading ? (
                            <TableSkeleton rows={5} columns={3} />
                        ) : (
                            combinedAssessments.map((assessment) => {
                                const subs = assessment.subs || [];
                                const rowSpan = Math.max(1, subs.length);
                                // PERBAIKAN: Tombol nonaktif hanya saat mutasi
                                const isButtonDisabled = isMutating;

                                return (
                                    <React.Fragment key={assessment.penilaian_id}>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium align-top" rowSpan={rowSpan}>
                                                <div className="flex justify-between items-center">
                                                    {assessment.nama_penilaian}
                                                    <button
                                                        onClick={() => {
                                                            const parentName = assessment.nama_penilaian;
                                                            const existingSubs = assessment.subs;
                                                            let nextNumber = 1;
                                                            if (existingSubs.length > 0) {
                                                                const lastSubName = existingSubs[existingSubs.length - 1]?.nama_sub_penilaian || "";
                                                                const match = lastSubName.match(/\d+$/);
                                                                if (match) {
                                                                    nextNumber = parseInt(match[0], 10) + 1;
                                                                } else {
                                                                    nextNumber = existingSubs.length + 1;
                                                                }
                                                            }
                                                            const generatedName = `${parentName} ${nextNumber}`;

                                                            setSelectedAssessmentId(assessment.penilaian_id);
                                                            setNewSubName(generatedName);
                                                            setIsSubFormOpen(true);
                                                        }}
                                                        disabled={isButtonDisabled}
                                                        className="bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                                                        title="Tambah Sub-Penilaian Berikutnya"
                                                    >
                                                        {createSubPenilaianMutation.isPending && selectedAssessmentId === assessment.penilaian_id ? (
                                                            <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                        ) : (
                                                            <FaPlus size={12} />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                            <td className={`px-6 py-4 text-sm font-semibold ${subs.length === 0 ? 'italic text-gray-400' : ''}`}>
                                                {subs[0]?.nama_sub_penilaian || "-"}
                                            </td>
                                            <td className="px-6 py-4 text-center align-top">
                                                {subs[0] ? (
                                                    <button
                                                        onClick={() => removeSub(subs[0].sub_penilaian_id)}
                                                        disabled={isButtonDisabled}
                                                        className="text-red-500 hover:text-red-700 transition disabled:text-gray-300"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => removeAssessment(assessment.penilaian_id)}
                                                        disabled={isButtonDisabled}
                                                        className="text-red-500 hover:text-red-700 transition disabled:text-gray-300"
                                                        title="Hapus Penilaian"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                        {subs.slice(1).map((sub) => (
                                            <tr key={sub.sub_penilaian_id} className="hover:bg-gray-50">
                                                <td className="px-6 text-sm font-semibold py-4">{sub.nama_sub_penilaian}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => removeSub(sub.sub_penilaian_id)}
                                                        disabled={isButtonDisabled}
                                                        className="text-red-500 hover:text-red-700 transition disabled:text-gray-300"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Konfirmasi Tambah Sub Penilaian */}
            <FormBox
                title="Konfirmasi Tambah Sub Penilaian"
                subtitle={`Anda akan menambahkan sub-penilaian baru dengan nama: "${newSubName}". Lanjutkan?`}
                fields={[]}
                initialData={{}}
                onSubmit={handleAddSubAssessment}
                onCancel={() => {
                    setIsSubFormOpen(false);
                    setSelectedAssessmentId(null);
                    setNewSubName("");
                }}
                isOpen={isSubFormOpen}
                submitText="Ya, Tambahkan"
                isLoading={createSubPenilaianMutation.isPending}
            />

            {/* Modal Konfirmasi Hapus Sub Penilaian */}
            <ConfModal
                isOpen={isDeleteModalOpen}
                onClose={cancelDeleteSub}
                onConfirm={confirmDeleteSub}
                message="Apakah Anda yakin ingin menghapus sub-penilaian ini?"
            />
        </div>
    );
};

export default DetailAturPenilaianProdi;

