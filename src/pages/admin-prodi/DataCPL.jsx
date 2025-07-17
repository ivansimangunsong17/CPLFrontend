import React, { useState } from "react";
import { AiFillDelete, AiOutlinePlus, AiFillEdit, AiOutlineSearch } from "react-icons/ai";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/Modal/ConfModal";
import FormBox from "../../components/Form/FormBox";
import { useDataCPL } from "../../hooks/admin-prodi/useDataCPL";
import LoadingScreen from "../../components/LoadingScreen";
import TableSkeleton from "../../components/TableSkeleton";
import { FiUploadCloud, FiDownloadCloud } from "react-icons/fi";

const DataCPL = () => {
  const {
    dataCPLQuery,
    createMutation,
    updateMutation,
    deleteMutation,
    user,
    userProdiId,
  } = useDataCPL();

  const [selectedRows, setSelectedRows] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const data = dataCPLQuery.data || [];
  const isLoading = dataCPLQuery.isLoading;
  const error = dataCPLQuery.error;

  const formFields = [
    {
      name: "kode_cpl",
      label: "Kode CPL",
      type: "text",
      placeholder: "Masukkan kode CPL (contoh: CPL-1)",
      required: true,
    },
    {
      name: "nama_cpl",
      label: "Nama CPL",
      type: "text",
      placeholder: "Masukkan nama CPL",
      required: true,
    },
    {
      name: "deskripsi",
      label: "Deskripsi",
      type: "textarea",
      placeholder: "Masukkan deskripsi capaian pembelajaran lulusan",
      required: true,
    },
  ];

  const handleAddCPL = (formData) => {
    // Validasi dasar
    if (!formData.kode_cpl || !formData.nama_cpl || !formData.deskripsi) {
      toast.error('Semua field wajib diisi');
      return;
    }

    // Validasi format kode CPL (contoh: CPL-1, CPL-2, dll)
    if (!/^CPL-\d+$/.test(formData.kode_cpl)) {
      toast.error('Format kode CPL harus: CPL-[angka] (contoh: CPL-1)');
      return;
    }

    // Validasi panjang nama CPL
    if (formData.nama_cpl.length < 10) {
      toast.error('Nama CPL minimal 10 karakter');
      return;
    }

    // Validasi panjang deskripsi
    if (formData.deskripsi.length < 20) {
      toast.error('Deskripsi minimal 20 karakter');
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

  const toggleSelectRow = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      const validIds = filteredData.map(item => item.id);
      setSelectedRows(validIds);
    }
    setAllSelected(!allSelected);
  };

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    const term = (searchTerm || "").toLowerCase().trim();
    return (
      item.kode_cpl?.toLowerCase().includes(term) ||
      item.nama_cpl?.toLowerCase().includes(term) ||
      item.deskripsi?.toLowerCase().includes(term)
    );
  });

  const isMutating = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;



  return (
    <div className="p-6 max-w-7xl mx-auto">
      {isMutating && <LoadingScreen />}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Data Capaian Pembelajaran Lulusan</h2>

          </div>
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
              <AiFillDelete size={20} />
              <span>Hapus</span>
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => setIsFormOpen(true)}
              disabled={createMutation.isPending}
            >
              <AiOutlinePlus size={20} />
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
              placeholder="Cari data CPL..."
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
                <th className="p-4 text-left">Kode CPL</th>
                <th className="p-4 text-left">Nama CPL</th>
                <th className="p-4 text-left">Deskripsi</th>
                <th className="p-4 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <TableSkeleton rows={5} columns={5} />
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    Tidak ada data CPL.
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
                    <td className="p-4 font-medium text-gray-600">{item.kode_cpl}</td>
                    <td className="p-4 font-medium text-gray-800">{item.nama_cpl}</td>
                    <td className="p-4 text-gray-600">
                      <div className="max-w-xs truncate" title={item.deskripsi}>
                        {item.deskripsi}
                      </div>
                    </td>
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
        description={`Anda akan menghapus ${selectedRows.length} ${selectedRows.length === 1 ? 'data CPL' : 'data CPL'}. Lanjutkan?`}
        confirmText="Hapus"
        isLoading={deleteMutation.isPending}
      />

      {/* Form Modal */}
      <FormBox
        isOpen={isFormOpen}
        onCancel={() => {
          setIsFormOpen(false);
          setEditData(null);
        }}
        title={editData ? "Edit Data CPL" : "Tambah Data CPL Baru"}
        subtitle={editData ? "Perbarui informasi capaian pembelajaran lulusan" : "Lengkapi data untuk CPL baru"}
        fields={formFields}
        initialData={editData || {}}
        onSubmit={handleAddCPL}
        submitText={editData ? "Perbarui" : "Tambah"}
        isLoading={editData ? updateMutation.isPending : createMutation.isPending}
      />
    </div>
  );
};

export default DataCPL;