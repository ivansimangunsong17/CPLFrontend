import React, { useState, useMemo, useCallback, useContext } from "react";
import { AiFillDelete, AiOutlinePlus, AiFillEdit, AiOutlineSearch } from "react-icons/ai";
import { FiDownloadCloud, FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import ConfirmModal from "../../components/Modal/ConfModal";
import FormBox from "../../components/Form/FormBox";
import { useMahasiswa } from "../../hooks/admin-prodi/useMahasiswa";
import LoadingScreen from "../../components/LoadingScreen";
import TableSkeleton from "../../components/TableSkeleton";
import { AuthContext } from "../../context/AuthContext";

const DataMahasiswaProdi = () => {
  const { user } = useContext(AuthContext);
  const {
    mahasiswaQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useMahasiswa();

  const [selectedRows, setSelectedRows] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Memoized data extraction
  const data = useMemo(() => mahasiswaQuery.data || [], [mahasiswaQuery.data]);
  const isLoading = mahasiswaQuery.isLoading;
  const error = mahasiswaQuery.error;

  // Memoized form fields
  const formFields = useMemo(() => [
    { name: 'name', label: 'Nama', type: 'text', required: true },
    { name: 'npm', label: 'NPM', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'angkatan', label: 'Angkatan', type: 'number', required: true },
  ], []);

  // Memoized filtered data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const term = (searchTerm || "").toLowerCase().trim();
      return (
        item.nama?.toLowerCase().includes(term) ||
        item.npm?.toLowerCase().includes(term) ||
        item.email?.toLowerCase().includes(term) ||
        item.angkatan?.toString().includes(term)
      );
    });
  }, [data, searchTerm]);

  // Remove duplicate declaration of isMutating

  const handleAddMahasiswa = (formData) => {
    // Validasi dasar
    if (!formData.name || !formData.npm || !formData.email) {
      toast.error('Semua field wajib diisi');
      return;
    }

    // Validasi email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Format email tidak valid');
      return;
    }

    // Validasi NPM (asumsi harus berupa angka dan minimal 8 karakter)
    if (!/^\d{8,}$/.test(formData.npm)) {
      toast.error('NPM harus berupa angka minimal 8 digit');
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

  const handleDeleteSingle = (id) => {
    setSelectedRows([id]);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditData(item);
    setIsFormOpen(true);
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

  const toggleSelectRow = (mahasiswa_id) => {
    if (selectedRows.includes(mahasiswa_id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== mahasiswa_id));
    } else {
      setSelectedRows([...selectedRows, mahasiswa_id]);
    }
  };

  const isMutating = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      {isMutating && <LoadingScreen />}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Data Mahasiswa Program Studi</h1>
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
            <span>{deleteMutation.isPending ? "Menghapus..." : "Hapus"}</span>
          </button>

          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${createMutation.isPending || updateMutation.isPending
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            onClick={() => setIsFormOpen(true)}
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            <AiOutlinePlus size={18} />
            <span>{editData ? "Simpan" : "Tambah"}</span>
          </button>
        </div>
      </div>

      {/* Loading feedback */}

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <AiOutlineSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Cari mahasiswa atau NPM..."
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
                <th className="p-4 text-left">Nama</th>
                <th className="p-4 text-left">NPM</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Program Studi</th>
                <th className="p-4 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <TableSkeleton rows={5} columns={6} />
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-6 text-center text-gray-500">
                    Tidak ada data mahasiswa.
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
                    <td className="p-4 font-medium text-gray-800">{item.nama}</td>
                    <td className="p-4 text-gray-600">{item.npm}</td>
                    <td className="p-4 text-gray-600">{item.email}</td>
                    <td className="p-4 text-gray-600">{item.prodi?.nama_prodi}</td>
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
        description={`Anda akan menghapus ${selectedRows.length} ${selectedRows.length === 1 ? 'mahasiswa' : 'mahasiswa'}. Lanjutkan?`}
        confirmText="Hapus"
        cancelText="Batal"
      />

      {/* Form Modal */}
      <FormBox
        title={editData ? "Edit Data Mahasiswa" : "Tambah Mahasiswa Baru"}
        subtitle={editData ? "Perbarui informasi data mahasiswa" : "Lengkapi data untuk mahasiswa baru"}
        fields={formFields}
        initialData={editData || {}}
        onSubmit={handleAddMahasiswa}
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

export default DataMahasiswaProdi;
