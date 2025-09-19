import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiFillDelete, AiOutlineArrowLeft, AiOutlinePlus } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { toast } from "react-toastify";

// Hooks
import { useMataKuliah } from "../../hooks/admin-prodi/useMataKuliah";
import { useDataCPL } from "../../hooks/admin-prodi/useDataCPL";
import { usePemetaanCPL } from "../../hooks/admin-prodi/usePemetaanCPL";
import { useCPMK } from "../../hooks/admin-prodi/useCPMK";
import { usePemetaanCPMK } from "../../hooks/admin-prodi/usePemetaanCPMK";

// Components
import FormPemetaanCPL from "../../components/Form/FormPemetaanCPL";
import FormPemetaanCPMK from "../../components/Form/FormPemetaanCPMK";
import ConfirmModal from "../../components/Modal/ConfModal";
import TableSkeleton from "../../components/TableSkeleton";
import CardSkeleton from "../../components/CardSkeleton";
import LoadingScreen from "../../components/LoadingScreen";

const DetailPemetaanProdi = () => {
    const { mataKuliahId } = useParams();
    const navigate = useNavigate();

    // Hooks data & mutasi
    const { mataKuliahQuery } = useMataKuliah();
    const { dataCPLQuery } = useDataCPL();
    const {
        pemetaanQuery,
        createMutation,
        updateMutation,
        deleteMutation,
    } = usePemetaanCPL(mataKuliahId);

    const {
        pemetaanCPMKQuery,
        createCPMKMutation,
        updateCPMKMutation,
        deleteCPMKMutation,
    } = usePemetaanCPMK(mataKuliahId);

    const { cpmkQuery } = useCPMK(mataKuliahId);

    // State CPL
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    // State CPMK
    const [isCpmkModalOpen, setIsCpmkModalOpen] = useState(false);
    const [currentCplId, setCurrentCplId] = useState(null);
    const [editCpmkData, setEditCpmkData] = useState(null);

    // State delete confirm
    const [confirmDelete, setConfirmDelete] = useState({ type: null, id: null });

    // Status loading
    const isInitialLoading = mataKuliahQuery.isLoading || pemetaanQuery.isLoading;
    const isMutating =
        createMutation.isPending ||
        updateMutation.isPending ||
        deleteMutation.isPending ||
        createCPMKMutation.isPending ||
        updateCPMKMutation.isPending ||
        deleteCPMKMutation.isPending;

    const pemetaanData = pemetaanQuery.data;

    // Navigasi kembali
    const handleBack = () => navigate("/dashboard/admin_prodi/pemetaan_cpl");

    // Data memoized
    const mataKuliah = useMemo(() => {
        const data = mataKuliahQuery.data || [];
        return data.find(
            (mk) => mk.id == mataKuliahId || mk.mata_kuliah_id == mataKuliahId
        );
    }, [mataKuliahQuery.data, mataKuliahId]);

    const cplData = useMemo(() => {
        const allCPL = dataCPLQuery.data || [];
        const mappedIds = new Set(pemetaanData?.map((item) => item.cpl_id) || []);
        if (editData) mappedIds.delete(editData.cpl_id);
        return allCPL.filter((cpl) => !mappedIds.has(cpl.id));
    }, [dataCPLQuery.data, pemetaanData, editData]);

    // Handler CPL
    const handleAddCPL = () => {
        setEditData(null);
        setIsFormOpen(true);
    };


    const handleSubmitPemetaan = (formData) => {
        if ((!editData && !formData.cpl_id) || !formData.bobot) {
            return toast.error("Semua field wajib diisi.");
        }

        const bobot = parseFloat(formData.bobot);
        if (isNaN(bobot) || bobot < 0 || bobot > 100) {
            return toast.error("Bobot harus berupa angka antara 0-100.");
        }

        const commonOnSuccess = () => {
            setIsFormOpen(false);
            setEditData(null);
        };

        if (editData) {
            updateMutation.mutate(
                {
                    mata_kuliah_id: parseInt(mataKuliahId),
                    cpls: [{ cpl_id: parseInt(editData.cpl_id), bobot: bobot.toFixed(2) }],
                },
                { onSuccess: commonOnSuccess }
            );
        } else {
            createMutation.mutate(
                {
                    mata_kuliah_id: parseInt(mataKuliahId),
                    cpls: [{ cpl_id: parseInt(formData.cpl_id), bobot: parseFloat(bobot.toFixed(2)) }],
                },
                { onSuccess: commonOnSuccess }
            );

        }
    };



    const handleConfirmDelete = async () => {
        if (!confirmDelete.id) {
            toast.error("ID pemetaan tidak ditemukan!");
            return;
        }

        try {
            if (confirmDelete.type === "cpl") {
                await deleteMutation.mutateAsync({
                    cpl_mata_kuliah_id: confirmDelete.id,
                });
                toast.success("Pemetaan CPL berhasil dihapus");
            } else if (confirmDelete.type === "cpmk") {
                await deleteCPMKMutation.mutateAsync({
                    cpmk_mata_kuliah_id: confirmDelete.id,
                });
                toast.success("Pemetaan CPMK berhasil dihapus");
            }

            setConfirmDelete({ type: null, id: null });
        } catch (error) {
            console.error("Error delete:", error);
            toast.error("Gagal menghapus pemetaan");
        }
    };






    // Handler CPMK
    const handleAddCpmk = (cplId) => {
        setCurrentCplId(cplId);
        setEditCpmkData(null);
        setIsCpmkModalOpen(true);
    };

    const handleEditCpmk = (cplId, cpmk) => {
        setCurrentCplId(cplId);
        setEditCpmkData(cpmk);
        setIsCpmkModalOpen(true);
    };



    const submitCpmkMapping = (formData) => {
        if (!formData.cpmk_id) return toast.error("Pilih CPMK terlebih dahulu.");
        if (!formData.bobot) return toast.error("Masukkan bobot CPMK.");

        const bobotNum = Number(formData.bobot);
        if (isNaN(bobotNum) || bobotNum < 0 || bobotNum > 100) {
            return toast.error("Bobot harus angka antara 0-100.");
        }

        const existingTotal = (pemetaanCPMKQuery.data || [])
            .filter((cpmk) => cpmk.cpl_id === currentCplId)
            .reduce((sum, cpmk) => sum + Number(cpmk.bobot), 0);

        const cplMapping = pemetaanData.find((cpl) => cpl.cpl_id === currentCplId);
        const maxBobot = Number(cplMapping?.bobot || 0);

        const adjustedTotal = editCpmkData
            ? existingTotal - Number(editCpmkData.bobot) + bobotNum
            : existingTotal + bobotNum;

        if (adjustedTotal > maxBobot) {
            return toast.error(
                `Total bobot CPMK melebihi bobot acuan`
            );
        }

        const payload = {
            action: editCpmkData ? "update" : "store",
            mata_kuliah_id: parseInt(mataKuliahId),
            cpmks: [
                {
                    cpmk_id: Number(formData.cpmk_id),
                    cpl_id: parseInt(currentCplId),
                    bobot: bobotNum,
                },
            ],
        };

        const mutation = editCpmkData ? updateCPMKMutation : createCPMKMutation;
        mutation.mutate(payload, {
            onSuccess: () => {
                setIsCpmkModalOpen(false);
                setCurrentCplId(null);
                setEditCpmkData(null);
            },
        });
    };

    // Loading awal
    if (isInitialLoading) {
        return (
            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <CardSkeleton />
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <table className="w-full">
                        <tbody>
                            <TableSkeleton columns={3} rows={3} />
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    if (!mataKuliah) {
        return (
            <div className="p-6 max-w-7xl mx-auto text-center py-12">
                <h3 className="text-lg font-medium text-red-600 mb-2">
                    Mata Kuliah Tidak Ditemukan
                </h3>
                <button
                    onClick={handleBack}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Kembali ke Daftar
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {isMutating && <LoadingScreen message="Memproses permintaan Anda..." />}

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                    <AiOutlineArrowLeft size={20} />
                    <span>Kembali</span>
                </button>
                <h2 className="text-xl font-semibold text-gray-800 text-right">
                    Pemetaan CPL - {mataKuliah.nama_mata_kuliah}
                </h2>
            </div>

            {/* Info Mata Kuliah */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 border rounded-lg text-center bg-gray-50">
                        <p className="text-sm text-gray-500">Kode Mata Kuliah</p>
                        <p className="font-semibold">{mataKuliah.kode_mata_kuliah}</p>
                    </div>
                    <div className="p-3 border rounded-lg text-center bg-gray-50">
                        <p className="text-sm text-gray-500">Nama Mata Kuliah</p>
                        <p className="font-semibold">{mataKuliah.nama_mata_kuliah}</p>
                    </div>
                </div>
            </div>

            {/* Table CPL & CPMK */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="flex flex-wrap justify-between items-center px-4 py-3 border-b gap-3">
                    <h3 className="font-semibold text-gray-700">Daftar Pemetaan CPL</h3>
                    <div className="flex gap-3">
                        <button
                            onClick={handleAddCPL}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                            disabled={isMutating}
                        >
                            <AiOutlinePlus size={14} /> Tambah CPL
                        </button>

                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px]">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="p-4 text-left">CPL</th>
                                <th className="p-4 text-left">CPMK Terpetakan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pemetaanData?.map((item) => (
                                <tr key={item.cpl_mata_kuliah_id}>
                                    {/* Info CPL */}
                                    <td className="p-4 align-top">
                                        <p className="font-semibold">{item.kode_cpl}</p>
                                        <p className="text-sm text-gray-600">{item.deskripsi_cpl}</p>
                                        <div className="inline-flex items-center gap-2 text-xs  px-2 py-0.5 rounded mt-1">
                                            <p className="inline-flex items-center gap-2 text-xs bg-blue-100 px-4 py-1 rounded mt-1"> Bobot: {item.bobot}%</p>

                                            {/* Tombol aksi CPL */}
                                            <button
                                                onClick={() => { setEditData(item); setIsFormOpen(true); }}
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Edit CPL"
                                            >
                                                <FiEdit2 size={17} />
                                            </button>
                                            <button
                                                onClick={() => setConfirmDelete({ type: "cpl", id: item.cpl_mata_kuliah_id })}
                                                className="text-red-500 hover:text-red-700"
                                                title="Hapus CPL"
                                            >
                                                <AiFillDelete size={18} />
                                            </button>
                                        </div>
                                    </td>


                                    {/* CPMK List */}
                                    <td className="p-4 align-top">
                                        {pemetaanCPMKQuery.data
                                            ?.filter((row) => row.cpl_id === item.cpl_id)
                                            .map((row) => (
                                                <div key={row.cpmk_mata_kuliah_id} className="mb-2">
                                                    <p className="text-sm font-bold italic">
                                                        {cpmkQuery.data?.find((c) => c.cpmk_id === row.cpmk_id)?.nama_cpmk ||
                                                            `CPMK-${row.cpmk_id}`}
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        {cpmkQuery.data?.find((c) => c.cpmk_id === row.cpmk_id)?.deskripsi || "-"}
                                                    </p>
                                                    <div className="inline-flex items-center gap-2 text-xs px-2 py-0.5 rounded">
                                                        <p className="inline-flex items-center gap-2 text-xs bg-blue-100 px-4 py-1 rounded">
                                                            Bobot: {row.bobot}%
                                                        </p>
                                                        {/* Tombol aksi CPMK */}
                                                        <button
                                                            onClick={() => handleEditCpmk(item.cpl_id, row)}
                                                            className="text-blue-600 hover:text-blue-800"
                                                            title="Edit CPMK"
                                                        >
                                                            <FiEdit2 size={17} />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                setConfirmDelete({ type: "cpmk", id: row.cpmk_mata_kuliah_id })
                                                            }
                                                            className="text-red-500 hover:text-red-700"
                                                            title="Hapus CPMK"
                                                        >
                                                            <AiFillDelete size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}

                                        <button
                                            onClick={() => handleAddCpmk(item.cpl_id)}
                                            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                                        >
                                            <AiOutlinePlus size={14} className="inline" /> Tambah CPMK
                                        </button>

                                        {/* Status total bobot */}
                                        <div className="flex justify-end mt-2">
                                            {(() => {
                                                const total = (pemetaanCPMKQuery.data || [])
                                                    .filter((row) => row.cpl_id === item.cpl_id)
                                                    .reduce((sum, row) => sum + Number(row.bobot), 0);
                                                const max = Number(item.bobot || 0);

                                                if (total === 100) {
                                                    return (
                                                        <div className="p-2 rounded-lg text-xs font-medium bg-green-100 text-green-700 inline-block">
                                                            Total bobot: {total}%
                                                        </div>
                                                    );
                                                }
                                                if (total < 100) {
                                                    return (
                                                        <div className="p-2 rounded-lg text-xs font-medium bg-yellow-100 text-yellow-700 inline-block">
                                                            Total bobot: {total}%
                                                        </div>
                                                    );
                                                }
                                                return (
                                                    <div className="p-2 rounded-lg text-xs font-medium bg-red-100 text-red-700 inline-block">
                                                        Total bobot: {total}%
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    </td>



                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Konfirmasi Hapus */}
            <ConfirmModal
                isOpen={!!confirmDelete.type}
                onClose={() => setConfirmDelete({ type: null, id: null })}
                onConfirm={handleConfirmDelete}
                message={
                    confirmDelete.type === "cpl"
                        ? "Apakah Anda yakin ingin menghapus pemetaan CPL ini?"
                        : confirmDelete.type === "cpmk"
                            ? "Apakah Anda yakin ingin menghapus pemetaan CPMK ini?"
                            : "Apakah Anda yakin ingin menghapus SEMUA pemetaan CPL dan CPMK untuk mata kuliah ini? Tindakan ini tidak dapat dibatalkan."
                }
            />

            {/* Modal CPL */}
            {isFormOpen && (
                <FormPemetaanCPL
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleSubmitPemetaan}
                    cplOptions={cplData}
                    initialData={editData}
                    isLoading={isMutating}
                    pemetaanData={pemetaanData}
                />
            )}

            {/* Modal CPMK */}
            {isCpmkModalOpen && (
                <FormPemetaanCPMK
                    isOpen={isCpmkModalOpen}
                    onClose={() => {
                        setIsCpmkModalOpen(false);
                        setEditCpmkData(null);
                    }}
                    onSubmit={submitCpmkMapping}
                    cpmkOptions={(cpmkQuery.data || []).filter((cpmk) => {
                        const sudahDipetakan = pemetaanCPMKQuery.data?.some(
                            (row) => row.cpl_id === currentCplId && row.cpmk_id === cpmk.cpmk_id
                        );
                        if (editCpmkData && editCpmkData.cpmk_id === cpmk.cpmk_id) {
                            return true;
                        }
                        return !sudahDipetakan;
                    })}
                    isLoading={createCPMKMutation.isPending || updateCPMKMutation.isPending}
                    initialData={editCpmkData}
                    cplBobot={
                        pemetaanData.find((cpl) => cpl.cpl_id === currentCplId)?.bobot || 0
                    }
                    totalAcuan={
                        pemetaanCPMKQuery.data
                            ?.filter((row) => row.cpl_id === currentCplId)
                            ?.reduce((sum, row) => sum + Number(row.bobot), 0) || 0
                    }
                />
            )}
        </div>
    );
};

export default DetailPemetaanProdi;
