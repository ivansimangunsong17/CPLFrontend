import React, { useState, useMemo, useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { AiFillDelete, AiOutlinePlus, AiFillEdit, AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/Modal/ConfModal';
import FormBox from '../../components/Form/FormBox';
import LoadingScreen from '../../components/LoadingScreen';
import TableSkeleton from '../../components/TableSkeleton';
import CardSkeleton from '../../components/CardSkeleton';
import { useCPMK } from '../../hooks/admin-prodi/useCPMK';
import { useKelas } from "../../hooks/admin-prodi/useKelas";
import { AuthContext } from '../../context/AuthContext';
import { getMataKuliah } from '../../services/admin-prodi/DataMataKuliahService';
import { useAkunDosen } from "../../hooks/admin-prodi/useAkunDosen"
import { BsEyeFill } from 'react-icons/bs';


const DetailMatakuliahProdi = () => {
    const { user } = useContext(AuthContext);
    const { mataKuliahId } = useParams();
    const navigate = useNavigate();
    const handleViewDetail = useCallback((kelasId) => {
        // Navigasi sesuai route: detail_kelas/:kelasId
        navigate(`/dashboard/admin_prodi/detail_kelas/${kelasId}`);
    }, [navigate]);


    // === ambil data dosen untuk dropdown ===
    const { akunDosenQuery } = useAkunDosen();
    const dosenOptions = akunDosenQuery.data?.map((d) => ({
        value: d.id,
        label: d.name,
    })) || [];

    const { cpmkQuery, createMutation, updateMutation, deleteMutation } = useCPMK(mataKuliahId);
    const {
        kelasQuery,
        createMutation: createKelasMutation,
        updateMutation: updateKelasMutation,
        deleteMutation: deleteKelasMutation,
    } = useKelas({ mata_kuliah_id: mataKuliahId });

    const [mataKuliahInfo, setMataKuliahInfo] = useState({ kode_mata_kuliah: '', nama_mata_kuliah: '' });

    // CPMK state
    const [selectedRows, setSelectedRows] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Kelas state
    const [isModalKelasOpen, setIsModalKelasOpen] = useState(false);
    const [isFormKelasOpen, setIsFormKelasOpen] = useState(false);
    const [editKelas, setEditKelas] = useState(null);
    const [kelasToDelete, setKelasToDelete] = useState(null);

    // Data Kelas
    const dataKelas = useMemo(() => (Array.isArray(kelasQuery.data) ? kelasQuery.data : []), [kelasQuery.data]);
    const isLoadingKelas = kelasQuery.isPending;


    // Base form fields kelas
    const formFieldsKelas = [
        { name: "kode_kelas", label: "Kode Kelas", type: "text", required: true },
        { name: "nama_kelas", label: "Nama Kelas", type: "text", required: true },
        { name: "semester", label: "Semester", type: "number", required: true },
        { name: "tahun_ajaran", label: "Tahun Ajaran", type: "text", required: true },
        { name: "dosen_utama_id", label: "Dosen Utama", type: "select", required: true, options: [] },
        // PERBAIKAN: Jadikan opsional
        { name: "dosen_pendamping_1_id", label: "Dosen Pendamping 1 (Opsional)", type: "select", required: false, options: [] },
        { name: "dosen_pendamping_2_id", label: "Dosen Pendamping 2 (Opsional)", type: "select", required: false, options: [] },
    ];
    // Inject dosenOptions ke field kelas
    const dynamicFormFieldsKelas = useMemo(() => {
        // PERBAIKAN: Tentukan field mana saja yang perlu diisi options dosen
        const dosenFieldNames = ["dosen_utama_id", "dosen_pendamping_1_id", "dosen_pendamping_2_id"];
        return formFieldsKelas.map((field) =>
            dosenFieldNames.includes(field.name)
                ? { ...field, options: dosenOptions }
                : field
        );
    }, [formFieldsKelas, dosenOptions]);

    // Submit kelas
    // Submit kelas
    // Submit kelas
    const handleSubmitKelas = (formData) => {
        // 1. Ambil semua ID dosen dari form
        const {
            dosen_utama_id,
            dosen_pendamping_1_id,
            dosen_pendamping_2_id
        } = formData;

        // 2. Filter ID yang tidak kosong (membuang string kosong "")
        const selectedDosenIds = [
            dosen_utama_id,
            dosen_pendamping_1_id,
            dosen_pendamping_2_id
        ].filter(id => id); // filter(id => id) akan menghapus string kosong atau null

        // 3. Validasi duplikat HANYA pada ID yang dipilih
        const uniqueDosenIds = new Set(selectedDosenIds);
        if (uniqueDosenIds.size !== selectedDosenIds.length) {
            toast.error("Dosen yang sama tidak boleh dipilih untuk jabatan yang berbeda.");
            return;
        }

        // 4. Buat array 'dosens' secara dinamis
        // 4. Buat array 'dosens' secara dinamis
        const dosensPayload = [];

        // Selalu tambahkan dosen utama (karena 'required: true')
        dosensPayload.push({
            dosen_id: Number(dosen_utama_id),
            jabatan: "Dosen Utama", // Ini sudah benar
        });

        // Hanya tambahkan dosen pendamping JIKA dipilih
        if (dosen_pendamping_1_id) {
            dosensPayload.push({
                dosen_id: Number(dosen_pendamping_1_id),
                jabatan: "Pendamping Dosen 1", // PERBAIKAN: Sesuai Enum
            });
        }
        if (dosen_pendamping_2_id) {
            dosensPayload.push({
                dosen_id: Number(dosen_pendamping_2_id),
                jabatan: "Pendamping Dosen 2", // PERBAIKAN: Sesuai Enum
            });
        }

        const payload = {
            action: editKelas ? "update" : "store",
            kelas_id: editKelas ? editKelas.kelas_id : undefined,
            kode_kelas: formData.kode_kelas,
            nama_kelas: formData.nama_kelas,
            semester: Number(formData.semester),
            tahun_ajaran: formData.tahun_ajaran,
            mata_kuliah_id: Number(mataKuliahId),
            dosens: dosensPayload, // Gunakan payload dinamis yang baru
        };

        if (editKelas) {
            updateKelasMutation.mutate(payload);
        } else {
            createKelasMutation.mutate(payload);
        }

        setIsFormKelasOpen(false);
        setEditKelas(null);
    };



    // Delete kelas (satu per satu)
    const handleDeleteKelas = (kelas_id) => {
        deleteKelasMutation.mutate(kelas_id, {
            onSuccess: () => {
                toast.success("Kelas berhasil dihapus");
                setIsModalKelasOpen(false);
                setKelasToDelete(null);
            },
            onError: (err) => {
                toast.error(err.response?.data?.message || "Gagal menghapus kelas");
                setIsModalKelasOpen(false);
                setKelasToDelete(null);
            },
        });
    };

    // CPMK data
    const data = useMemo(() => (Array.isArray(cpmkQuery.data) ? cpmkQuery.data : []), [cpmkQuery.data]);
    const isLoading = cpmkQuery.isPending;
    const error = cpmkQuery.error;

    const filteredData = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return data.filter((item) =>
            (item.kode_cpmk || '').toLowerCase().includes(term) ||
            (item.nama_cpmk || '').toLowerCase().includes(term) ||
            (item.deskripsi || '').toLowerCase().includes(term)
        );
    }, [data, searchTerm]);

    const isAllSelected = useMemo(() => {
        const allIds = filteredData.map((item) => item.cpmk_id);
        return allIds.length > 0 && allIds.every((id) => selectedRows.includes(id));
    }, [filteredData, selectedRows]);

    useEffect(() => {
        if (mataKuliahId) {
            getMataKuliah()
                .then((mataKuliahs) => {
                    const matkul = mataKuliahs.find((mk) => mk.mata_kuliah_id === Number(mataKuliahId));
                    if (matkul) {
                        setMataKuliahInfo({
                            kode_mata_kuliah: matkul.kode_mata_kuliah,
                            nama_mata_kuliah: matkul.nama_mata_kuliah,
                        });
                    }
                })
                .catch(() => toast.error('Gagal mengambil informasi mata kuliah'));
        }
    }, [mataKuliahId]);

    // CPMK form fields
    const formFields = [
        { name: 'kode_cpmk', label: 'Kode CPMK', type: 'text', required: true },
        { name: 'nama_cpmk', label: 'Nama CPMK', type: 'text', required: true },
        { name: 'deskripsi', label: 'Deskripsi', type: 'textarea', required: true },
    ];

    const handleSubmit = useCallback((formData) => {
        if (!user?.prodi_id) {
            toast.error('Informasi program studi tidak ditemukan');
            return;
        }
        const payload = {
            ...formData,
            mata_kuliah_id: Number(mataKuliahId),
            prodi_id: Number(user.prodi_id),
        };
        if (editData) {
            updateMutation.mutate({ ...payload, id: editData.cpmk_id });
        } else {
            createMutation.mutate(payload);
        }
        setIsFormOpen(false);
        setEditData(null);
    }, [editData, mataKuliahId, user, createMutation, updateMutation]);

    const handleDelete = useCallback(() => {
        if (selectedRows.length === 0) {
            toast.error('Pilih CPMK yang ingin dihapus');
            return;
        }

        deleteMutation.mutate(selectedRows, {
            onSuccess: () => {
                toast.success(`${selectedRows.length} CPMK berhasil dihapus`);
                setIsModalOpen(false);
                setSelectedRows([]);
            },
            onError: (error) => {
                toast.error(error.response?.data?.message || 'Gagal menghapus CPMK');
                setIsModalOpen(false);
            }
        });
    }, [selectedRows, deleteMutation]);

    const toggleSelectRow = (id) => {
        setSelectedRows((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    };

    const toggleSelectAll = () => {
        setSelectedRows(isAllSelected ? [] : filteredData.map((item) => item.cpmk_id));
    };

    if (error) return <div className="text-red-500">Error: {error.message}</div>;
    return (
        <div className="p-6 max-w-7xl mx-auto">
            {(createMutation.isPending || updateMutation.isPending || deleteMutation.isPending) && <LoadingScreen />}
            {(createKelasMutation.isPending || updateKelasMutation.isPending || deleteKelasMutation.isPending) && <LoadingScreen />}


            {/* Header Mata Kuliah */}
            {isLoading ? (
                // Jika sedang loading, tampilkan CardSkeleton
                <CardSkeleton />
            ) : (
                // Jika sudah selesai, tampilkan data
                <div className="mb-6 bg-white p-4 shadow rounded-lg flex justify-between">
                    <div>
                        <p className="text-sm text-gray-500">Kode Mata Kuliah</p>
                        <p className="text-lg font-bold">{mataKuliahInfo.kode_mata_kuliah || '-'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Nama Mata Kuliah</p>
                        <p className="text-lg font-bold">{mataKuliahInfo.nama_mata_kuliah || '-'}</p>
                    </div>
                </div>
            )}

            {/* === CPMK Section === */}
            {/* Actions */}

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Capaian Pembelajaran Mata Kuliah (CPMK)</h2>
                <div className="flex gap-3">
                    <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${selectedRows.length > 0 ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-500'
                            }`}
                        disabled={selectedRows.length === 0}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <AiFillDelete size={20} />
                        <span>Hapus</span>
                    </button>
                    <button
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => setIsFormOpen(true)}
                    >
                        <AiOutlinePlus size={20} />
                        <span>Tambah CPMK</span>
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <AiOutlineSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari CPMK..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table CPMK */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-blue-100 text-black">
                        <tr>
                            <th className="p-4 w-12 text-center">
                                <input type="checkbox" checked={isAllSelected} onChange={toggleSelectAll} />
                            </th>
                            <th className="p-4 text-left">Kode</th>
                            <th className="p-4 text-left">Nama CPMK</th>
                            <th className="p-4 text-left">Deskripsi</th>
                            <th className="p-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <TableSkeleton rows={5} columns={5} />
                        ) : filteredData.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-gray-500">
                                    {searchTerm ? 'Tidak ada data yang sesuai pencarian' : 'Belum ada data CPMK'}
                                </td>
                            </tr>
                        ) : (
                            filteredData.map((item) => (
                                <tr key={item.cpmk_id} className="hover:bg-gray-50">
                                    <td className="p-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(item.cpmk_id)}
                                            onChange={() => toggleSelectRow(item.cpmk_id)}
                                        />
                                    </td>
                                    <td className="p-4">{item.kode_cpmk}</td>
                                    <td className="p-4">{item.nama_cpmk}</td>
                                    <td className="p-4">{item.deskripsi}</td>
                                    <td className="p-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditData(item);
                                                    setIsFormOpen(true);
                                                }}
                                                className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                            >
                                                <AiFillEdit size={20} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedRows([item.cpmk_id]);
                                                    setIsModalOpen(true);
                                                }}
                                                className="p-1 text-red-600 hover:bg-red-100 rounded"
                                            >
                                                <AiFillDelete size={20} />
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* === Kelas Section === */}
            <div className="mt-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Data Kelas</h2>
                    <button
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => setIsFormKelasOpen(true)}
                    >
                        <AiOutlinePlus size={20} />
                        <span>Tambah Kelas</span>
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-blue-100 text-black">
                            <tr>
                                <th className="p-4 text-left">Kode</th>
                                <th className="p-4 text-left">Nama Kelas</th>
                                <th className="p-4 text-left">Dosen</th>
                                <th className="p-4 text-left">Jabatan</th>
                                <th className="p-4 text-left">Periode</th>
                                <th className="p-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoadingKelas ? (
                                <TableSkeleton rows={5} columns={6} />
                            ) : dataKelas.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">
                                        Belum ada data kelas
                                    </td>
                                </tr>
                            ) : (
                                dataKelas.map((item) => (

                                    <tr key={item.kelas_id} className="hover:bg-gray-50">
                                        <td className="p-4">{item.kode_kelas}</td>
                                        <td className="p-4">{item.nama_kelas}</td>
                                        <td className='p-4'>{item.dosens?.[0]?.name}</td>

                                        <td className="p-4">{item.dosens?.[0]?.pivot?.jabatan || "-"}</td>
                                        <td className="p-4">{item.tahun_ajaran}</td>
                                        <td className="p-4 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditKelas(item);
                                                        setIsFormKelasOpen(true);
                                                    }}
                                                    className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                                >
                                                    <AiFillEdit size={20} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setKelasToDelete(item.kelas_id);
                                                        setIsModalKelasOpen(true);
                                                    }}
                                                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                                                >
                                                    <AiFillDelete size={20} />
                                                </button>
                                                <button
                                                    onClick={() => handleViewDetail(item.kelas_id)}
                                                    className="p-1 text-green-600 hover:bg-green-100 rounded"
                                                >
                                                    <BsEyeFill size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Confirm Delete CPMK */}
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                title="Konfirmasi Hapus"
                description={`Anda yakin ingin menghapus ${selectedRows.length} CPMK yang dipilih?`}
                confirmText="Hapus"
                isLoading={deleteMutation.isLoading}
            />

            {/* Form CPMK */}
            <FormBox
                isOpen={isFormOpen}
                onCancel={() => {
                    setIsFormOpen(false);
                    setEditData(null);
                }}
                title={editData ? 'Edit CPMK' : 'Tambah CPMK Baru'}
                subtitle={editData ? 'Perbarui informasi CPMK' : 'Lengkapi data CPMK baru'}
                fields={formFields}
                initialData={(() => {
                    // Default untuk mode 'Tambah'
                    if (!editKelas) return {
                        kode_kelas: "",
                        nama_kelas: "",
                        semester: "",
                        tahun_ajaran: "",
                        dosen_utama_id: "",
                        dosen_pendamping_1_id: "",
                        dosen_pendamping_2_id: "",
                    };

                    // Helper untuk mencari ID dosen berdasarkan jabatan
                    const findDosenIdByJabatan = (jabatan) => {
                        const dosen = editKelas.dosens?.find(d => d.pivot?.jabatan === jabatan);
                        return dosen ? dosen.id : ""; // API Anda mungkin mengembalikan ID di `dosen.id`
                    };

                    // Data untuk mode 'Edit'
                    return {
                        kode_kelas: editKelas.kode_kelas,
                        nama_kelas: editKelas.nama_kelas,
                        semester: editKelas.semester,
                        tahun_ajaran: editKelas.tahun_ajaran,
                        dosen_utama_id: findDosenIdByJabatan("Dosen Utama"),
                        dosen_pendamping_1_id: findDosenIdByJabatan("Dosen Pendamping 1"),
                        dosen_pendamping_2_id: findDosenIdByJabatan("Dosen Pendamping 2"),
                    };
                })()}
                onSubmit={handleSubmit}
                submitText={editData ? 'Perbarui' : 'Tambah'}
                isLoading={editData ? updateMutation.isLoading : createMutation.isLoading}
            />

            {/* Confirm Delete Kelas */}
            <ConfirmModal
                isOpen={isModalKelasOpen}
                onClose={() => setIsModalKelasOpen(false)}
                onConfirm={() => handleDeleteKelas(kelasToDelete)}
                title="Konfirmasi Hapus Kelas"
                description="Anda yakin ingin menghapus kelas ini?"
                confirmText="Hapus"
                isLoading={deleteKelasMutation.isLoading}
            />

            {/* Form Kelas */}
            <FormBox
                isOpen={isFormKelasOpen}
                onCancel={() => {
                    setIsFormKelasOpen(false);
                    setEditKelas(null);
                }}
                title={editKelas ? 'Edit Kelas' : 'Tambah Kelas Baru'}
                subtitle={editKelas ? 'Perbarui informasi Kelas' : 'Lengkapi data kelas baru'}
                fields={dynamicFormFieldsKelas}
                initialData={
                    editKelas
                        ? {
                            kode_kelas: editKelas.kode_kelas,
                            nama_kelas: editKelas.nama_kelas,
                            semester: editKelas.semester,
                            tahun_ajaran: editKelas.tahun_ajaran,
                            dosen_id: editKelas.dosens?.[0]?.id || "",
                        }
                        : {}
                }
                onSubmit={handleSubmitKelas}
                submitText={editKelas ? 'Perbarui' : 'Tambah'}
                isLoading={editKelas ? updateKelasMutation.isLoading : createKelasMutation.isLoading}
            />
        </div>
    );
};

export default DetailMatakuliahProdi;
