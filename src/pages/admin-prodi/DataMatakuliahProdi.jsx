import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillDelete, AiOutlinePlus, AiFillEdit, AiOutlineSearch } from "react-icons/ai";
import { FiDownloadCloud, FiEye, FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/Modal/ConfModal";
import FormBox from "../../components/Form/FormBox";
import { useMataKuliah } from "../../hooks/admin-prodi/useMataKuliah";
import LoadingScreen from "../../components/LoadingScreen";
import TableSkeleton from "../../components/TableSkeleton";


const DataMatakuliahProdi = () => {
  const navigate = useNavigate();
  const {
    mataKuliahQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useMataKuliah();

  const [selectedRows, setSelectedRows] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const data = mataKuliahQuery.data || [];
  const isLoading = mataKuliahQuery.isLoading;
  const error = mataKuliahQuery.error;

  const formFields = [
    {
      name: "kode_mata_kuliah",
      label: "Kode MK",
      type: "text",
      placeholder: "Masukkan kode mata kuliah",
      required: true,
    },
    {
      name: "nama_mata_kuliah",
      label: "Nama Mata Kuliah",
      type: "text",
      placeholder: "Masukkan nama mata kuliah",
      required: true,
    },
  ];

  const handleAddMataKuliah = (formData) => {
    // Validasi dasar
    if (!formData.kode_mata_kuliah || !formData.nama_mata_kuliah) {
      toast.error('Kode mata kuliah dan nama mata kuliah wajib diisi');
      return;
    }

    // Validasi format kode mata kuliah (contoh: minimal 3 karakter)
    if (formData.kode_mata_kuliah.length < 3) {
      toast.error('Kode mata kuliah minimal 3 karakter');
      return;
    }

    // Validasi nama mata kuliah (minimal 5 karakter)
    if (formData.nama_mata_kuliah.length < 5) {
      toast.error('Nama mata kuliah minimal 5 karakter');
      return;
    }

    if (editData) {
      updateMutation.mutate({ id: editData.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
    setIsFormOpen(false);
    setEditData(null);
  };

  const handleDelete = () => {
    if (selectedRows.length === 0) {
      toast.error('Pilih data yang akan dihapus');
      return;
    }
    deleteMutation.mutate(selectedRows);
    setSelectedRows([]);
    setAllSelected(false);
    setIsModalOpen(false);
  };

  const openEditModal = (item) => {
    setEditData(item);
    setIsFormOpen(true);
  };

  const handleDeleteSingle = (id) => {
    setSelectedRows([id]);
    setIsModalOpen(true);
  };

  const handleViewDetail = (mataKuliahId) => {
    navigate(`/dashboard/admin_prodi/detail_matakuliah/${mataKuliahId}`);
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      const allIds = filteredData.map((item) => item.id);
      setSelectedRows(allIds);
    }
    setAllSelected(!allSelected);
  };

  const toggleSelectRow = (mata_kuliah_id) => {
    if (selectedRows.includes(mata_kuliah_id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== mata_kuliah_id));
    } else {
      setSelectedRows([...selectedRows, mata_kuliah_id]);
    }
  };

  const filteredData = data.filter((item) => {
    const term = (searchTerm || "").toLowerCase().trim();
    return (
      item.nama?.toLowerCase().includes(term) ||
      item.kode?.toLowerCase().includes(term)
    );
  });

  const isMutating = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      {isMutating && <LoadingScreen />}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Data Mata Kuliah Program Studi</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">

            <FiUploadCloud size={18} />
            <span>Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
            <FiDownloadCloud size={18} />
            <span>Import</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${selectedRows.length > 0 && !deleteMutation.isPending
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            disabled={selectedRows.length === 0 || deleteMutation.isPending}
            onClick={() => setIsModalOpen(true)}
          >
            <AiFillDelete size={18} />
            <span>Hapus</span>
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => setIsFormOpen(true)}
            disabled={createMutation.isPending}
          >
            <AiOutlinePlus size={18} />
            <span>Tambah</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <AiOutlineSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Cari mata kuliah atau kode..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
            <p className="font-medium">Error memuat data:</p>
            <p className="text-sm">{error.message}</p>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-100 text-black">
              <tr>
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                  />
                </th>
                <th className="p-4 text-left">Kode MK</th>
                <th className="p-4 text-left">Nama Mata Kuliah</th>
                <th className="p-4 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <TableSkeleton rows={5} columns={4} />
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-500">
                    Tidak ada data mata kuliah.
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item.id ?? index} className="hover:bg-gray-50 transition">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => toggleSelectRow(item.id)}
                        className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-800">{item.kode}</td>
                    <td className="p-4 text-gray-600">{item.nama}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                        >
                          <AiFillEdit size={20} />

                        </button>
                        <button
                          onClick={() => handleDeleteSingle(item.id)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
                        >
                          <AiFillDelete size={20} />

                        </button>
                        <button
                          onClick={() => handleViewDetail(item.id)}
                          className="flex items-center gap-1 text-green-600 hover:text-green-800 transition"
                        >
                          <FiEye size={20} />

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

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Konfirmasi Hapus"
        description={`Anda akan menghapus ${selectedRows.length} ${selectedRows.length === 1 ? 'mata kuliah' : 'mata kuliah'}. Lanjutkan?`}
        confirmText="Hapus"
        cancelText="Batal"
      />

      {/* Form Modal */}
      <FormBox
        title={editData ? "Edit Mata Kuliah" : "Tambah Mata Kuliah Baru"}
        subtitle={editData ? "Perbarui informasi mata kuliah" : "Lengkapi data untuk mata kuliah baru"}
        fields={formFields}
        initialData={editData ? {
          kode_mata_kuliah: editData.kode || "",
          nama_mata_kuliah: editData.nama || ""
        } : {}}
        onSubmit={handleAddMataKuliah}
        onCancel={() => {
          setIsFormOpen(false);
          setEditData(null);
        }}
        isLoading={createMutation.isPending || updateMutation.isPending}
        isOpen={isFormOpen}
      />
    </div>
  );
};

export default DataMatakuliahProdi;
