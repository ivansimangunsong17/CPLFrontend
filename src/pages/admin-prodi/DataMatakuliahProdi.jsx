import React, { useState, useCallback, useContext, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillDelete, AiOutlinePlus, AiFillEdit, AiOutlineSearch } from "react-icons/ai";
import { FiDownloadCloud, FiEye, FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import ConfirmModal from "../../components/Modal/ConfModal";
import FormBox from "../../components/Form/FormBox";
import { useMataKuliah } from "../../hooks/admin-prodi/useMataKuliah";
import LoadingScreen from "../../components/LoadingScreen";
import TableSkeleton from "../../components/TableSkeleton";
import { AuthContext } from "../../context/AuthContext";


const DataMatakuliahProdi = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {
    mataKuliahQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useMataKuliah();

  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Memoized data extraction
  const data = useMemo(() => mataKuliahQuery.data || [], [mataKuliahQuery.data]);
  const isLoading = mataKuliahQuery.isLoading;
  const error = mataKuliahQuery.error;

  // Memoized form fields
  const formFields = useMemo(() => [
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
  ], []);

  // Memoized filtered data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const term = (searchTerm || "").toLowerCase().trim();
      return (
        item.nama?.toLowerCase().includes(term) ||
        item.kode?.toLowerCase().includes(term)
      );
    });
  }, [data, searchTerm]);

  // Memoized allSelected state
  const isAllSelected = useMemo(() => {
    const allFilteredIds = filteredData.map((item) => item.id);
    return allFilteredIds.length > 0 && allFilteredIds.every(id => selectedRows.includes(id));
  }, [filteredData, selectedRows]);

  const isMutating = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  // Close modal when mutations are successful
  useEffect(() => {
    if (createMutation.isSuccess || updateMutation.isSuccess) {
      setIsFormOpen(false);
      setEditData(null);
    }
  }, [createMutation.isSuccess, updateMutation.isSuccess]);

  // Close delete modal and reset selection when delete is successful
  useEffect(() => {
    if (deleteMutation.isSuccess) {
      setIsModalOpen(false);
      setSelectedRows([]);
    }
  }, [deleteMutation.isSuccess]);

  const handleAddMataKuliah = useCallback((formData) => {
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
  }, [editData, createMutation, updateMutation]);

  // Fungsi Export ke Excel
  const handleExport = useCallback(() => {
    try {
      // Siapkan data untuk export
      const exportData = data.map((item, index) => ({
        'No': index + 1,
        'Kode MK': item.kode || '',
        'Nama Mata Kuliah': item.nama || ''
      }));

      // Buat workbook dan worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);

      // Set lebar kolom
      ws['!cols'] = [
        { wch: 5 },   // No
        { wch: 15 },  // Kode MK
        { wch: 40 }   // Nama Mata Kuliah
      ];

      // Tambahkan worksheet ke workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Data Mata Kuliah');

      // Generate nama file dengan timestamp
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `data-mata-kuliah-${timestamp}.xlsx`;

      // Download file
      XLSX.writeFile(wb, filename);

      toast.success('Data berhasil diekspor ke Excel!');
    } catch (error) {
      console.error('Error saat export:', error);
      toast.error('Gagal mengekspor data ke Excel!');
    }
  }, [data]);

  // Fungsi Download Template Excel
  const handleDownloadTemplate = useCallback(() => {
    try {
      // Siapkan template dengan contoh data
      const templateData = [
        {
          'Kode MK': 'MK001',
          'Nama Mata Kuliah': 'Pemrograman Dasar'
        },
        {
          'Kode MK': 'MK002',
          'Nama Mata Kuliah': 'Basis Data'
        }
      ];

      // Buat workbook dan worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(templateData);

      // Set lebar kolom
      ws['!cols'] = [
        { wch: 15 },  // Kode MK
        { wch: 40 }   // Nama Mata Kuliah
      ];

      // Tambahkan worksheet ke workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Template Mata Kuliah');

      // Download file
      XLSX.writeFile(wb, 'template-mata-kuliah.xlsx');

      toast.success('Template berhasil didownload!');
    } catch (error) {
      console.error('Error saat download template:', error);
      toast.error('Gagal mendownload template!');
    }
  }, []);

  // Fungsi Import dari Excel
  const handleImport = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validasi user login dan prodi_id
    if (!user || !user.prodi_id) {
      toast.error('Tidak dapat mengimpor data. Informasi prodi tidak ditemukan.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Validasi dan proses data
        const importedData = jsonData.map((row, index) => {
          const rowNum = index + 2; // +2 karena header di row 1 dan index dimulai dari 0

          // Validasi required fields
          if (!row['Kode MK'] || !row['Nama Mata Kuliah']) {
            throw new Error(`Baris ${rowNum}: Kode MK dan Nama Mata Kuliah wajib diisi`);
          }

          // Validasi format kode mata kuliah (minimal 3 karakter)
          if (row['Kode MK'].toString().trim().length < 3) {
            throw new Error(`Baris ${rowNum}: Kode mata kuliah minimal 3 karakter`);
          }

          // Validasi nama mata kuliah (minimal 5 karakter)
          if (row['Nama Mata Kuliah'].toString().trim().length < 5) {
            throw new Error(`Baris ${rowNum}: Nama mata kuliah minimal 5 karakter`);
          }

          return {
            kode_mata_kuliah: row['Kode MK']?.toString().trim(),
            nama_mata_kuliah: row['Nama Mata Kuliah']?.toString().trim(),
            prodi_id: user.prodi_id // Otomatis menambahkan prodi_id dari user yang login
          };
        });

        // Proses import data (bisa disesuaikan dengan API)
        console.log('Data yang akan diimpor:', importedData);
        console.log('Prodi ID yang digunakan:', user.prodi_id);

        // Contoh implementasi batch import
        importedData.forEach(item => {
          createMutation.mutate(item);
        });

        toast.success(`Berhasil mengimpor ${importedData.length} data mata kuliah untuk prodi ${user.prodi_nama || 'Anda'}!`);

      } catch (error) {
        console.error('Error saat import:', error);
        toast.error(error.message || 'Gagal mengimpor data dari Excel!');
      }
    };

    reader.readAsArrayBuffer(file);
    // Reset input file
    event.target.value = '';
  }, [user, createMutation]);

  const handleDelete = useCallback(() => {
    if (selectedRows.length === 0) {
      toast.error('Pilih data yang akan dihapus');
      return;
    }
    deleteMutation.mutate(selectedRows);
  }, [selectedRows, deleteMutation]);

  const openEditModal = useCallback((item) => {
    setEditData(item);
    setIsFormOpen(true);
  }, []);

  const handleDeleteSingle = useCallback((id) => {
    setSelectedRows([id]);
    setIsModalOpen(true);
  }, []);

  const handleViewDetail = useCallback((mataKuliahId) => {
    navigate(`/dashboard/admin_prodi/detail_matakuliah/${mataKuliahId}`);
  }, [navigate]);

  const toggleSelectAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedRows([]);
    } else {
      const allIds = filteredData.map((item) => item.id);
      setSelectedRows(allIds);
    }
  }, [isAllSelected, filteredData]);

  const toggleSelectRow = useCallback((mata_kuliah_id) => {
    const newSelectedRows = selectedRows.includes(mata_kuliah_id)
      ? selectedRows.filter((rowId) => rowId !== mata_kuliah_id)
      : [...selectedRows, mata_kuliah_id];

    setSelectedRows(newSelectedRows);
  }, [selectedRows]);

  const handleCancelForm = useCallback(() => {
    setIsFormOpen(false);
    setEditData(null);
  }, []);

  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      {isMutating && <LoadingScreen />}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Data Mata Kuliah Program Studi</h1>
        <div className="flex gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-gray-700 rounded-lg hover:bg-yellow-200 transition"
            onClick={handleExport}
            disabled={data.length === 0}
          >
            <FiUploadCloud size={18} />
            <span>Export</span>
          </button>

          <div className="relative">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-green-100 text-gray-700 rounded-lg hover:bg-green-200 transition"
              onClick={handleDownloadTemplate}
            >
              <FiDownloadCloud size={18} />
              <span>Template</span>
            </button>
          </div>

          <label
            htmlFor="import-file-matakuliah"
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-gray-700 rounded-lg hover:bg-blue-200 transition cursor-pointer"
          >
            <FiDownloadCloud size={18} />
            <span>Import</span>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleImport}
              className="hidden"
              id="import-file-matakuliah"
            />
          </label>

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
                <th className="p-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                  />
                </th>
                <th className="p-4 text-left">Kode MK</th>
                <th className="p-4 text-left">Nama Mata Kuliah</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <TableSkeleton rows={5} columns={4} />
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">
                    {searchTerm ? "Tidak ada data yang sesuai dengan pencarian" : "Belum ada data mata kuliah"}
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item.id ?? index} className="hover:bg-gray-50 transition">
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => toggleSelectRow(item.id)}
                        className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-800">{item.kode}</td>
                    <td className="p-4 text-gray-600">{item.nama}</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                        >
                          <AiFillEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteSingle(item.id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                        >
                          <AiFillDelete size={20} />
                        </button>
                        <button
                          onClick={() => handleViewDetail(item.id)}
                          className="p-1 text-green-600 hover:bg-green-100 rounded"
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
        onCancel={handleCancelForm}
        isLoading={createMutation.isPending || updateMutation.isPending}
        isOpen={isFormOpen}
      />
    </div>
  );
};

export default DataMatakuliahProdi;
