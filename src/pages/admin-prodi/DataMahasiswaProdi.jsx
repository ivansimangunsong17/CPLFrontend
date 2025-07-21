import React, { useState, useMemo, useCallback, useContext, useEffect } from "react";
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

  const handleAddMahasiswa = useCallback((formData) => {
    // Validasi dasar
    if (!formData.name || !formData.npm || !formData.email || !formData.angkatan) {
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

    // Validasi Angkatan
    const angkatan = parseInt(formData.angkatan);
    const currentYear = new Date().getFullYear();
    if (isNaN(angkatan) || angkatan < 2000 || angkatan > currentYear + 1) {
      toast.error(`Angkatan harus berupa tahun yang valid (2000-${currentYear + 1})`);
      return;
    }

    createMutation.mutate(formData);
  }, [createMutation]);

  const handleEditMahasiswa = useCallback((formData) => {
    if (!editData) return;

    // Validasi sama seperti handleAddMahasiswa
    if (!formData.name || !formData.npm || !formData.email || !formData.angkatan) {
      toast.error('Semua field wajib diisi');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Format email tidak valid');
      return;
    }

    if (!/^\d{8,}$/.test(formData.npm)) {
      toast.error('NPM harus berupa angka minimal 8 digit');
      return;
    }

    const angkatan = parseInt(formData.angkatan);
    const currentYear = new Date().getFullYear();
    if (isNaN(angkatan) || angkatan < 2000 || angkatan > currentYear + 1) {
      toast.error(`Angkatan harus berupa tahun yang valid (2000-${currentYear + 1})`);
      return;
    }

    const dataToUpdate = {
      id: editData.id,
      ...formData
    };

    updateMutation.mutate(dataToUpdate);
  }, [editData, updateMutation]);

  const handleDeleteMahasiswa = useCallback(() => {
    if (selectedRows.length === 0) return;

    // Call delete with array of IDs as expected by the service
    deleteMutation.mutate(selectedRows);
  }, [selectedRows, deleteMutation]);

  const openDeleteModal = useCallback((id) => {
    setSelectedRows([id]);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((item) => {
    setEditData(item);
    setIsFormOpen(true);
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedRows([]);
    } else {
      const allIds = filteredData.map((item) => item.id);
      setSelectedRows(allIds);
    }
  }, [isAllSelected, filteredData]);

  const toggleSelectRow = useCallback((mahasiswa_id) => {
    const newSelectedRows = selectedRows.includes(mahasiswa_id)
      ? selectedRows.filter((rowId) => rowId !== mahasiswa_id)
      : [...selectedRows, mahasiswa_id];

    setSelectedRows(newSelectedRows);
  }, [selectedRows]);

  const handleCancelForm = useCallback(() => {
    setIsFormOpen(false);
    setEditData(null);
  }, []);

  // Fungsi Export ke Excel
  const handleExport = useCallback(() => {
    try {
      // Siapkan data untuk export
      const exportData = data.map((item, index) => ({
        'No': index + 1,
        'Nama': item.nama || '',
        'NPM': item.npm || '',
        'Email': item.email || '',
        'Angkatan': item.angkatan || ''
      }));

      // Buat workbook dan worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);

      // Set lebar kolom
      ws['!cols'] = [
        { wch: 5 },   // No
        { wch: 20 },  // Nama
        { wch: 15 },  // NPM
        { wch: 25 },  // Email
        { wch: 10 }   // Angkatan
      ];

      // Tambahkan worksheet ke workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Data Mahasiswa');

      // Generate nama file dengan timestamp
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `data-mahasiswa-${timestamp}.xlsx`;

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
          'Nama': 'John Doe',
          'NPM': '12345678',
          'Email': 'john.doe@email.com',
          'Angkatan': '2024'
        },
        {
          'Nama': 'Jane Smith',
          'NPM': '87654321',
          'Email': 'jane.smith@email.com',
          'Angkatan': '2023'
        }
      ];

      // Buat workbook dan worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(templateData);

      // Set lebar kolom
      ws['!cols'] = [
        { wch: 20 },  // Nama
        { wch: 15 },  // NPM
        { wch: 25 },  // Email
        { wch: 10 },  // Angkatan
      ];

      // Tambahkan worksheet ke workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Template Mahasiswa');

      // Download file
      XLSX.writeFile(wb, 'template-mahasiswa.xlsx');

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
          if (!row['Nama'] || !row['NPM'] || !row['Email'] || !row['Angkatan']) {
            throw new Error(`Baris ${rowNum}: Nama, NPM, Email, dan Angkatan wajib diisi`);
          }

          // Validasi email format
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row['Email'])) {
            throw new Error(`Baris ${rowNum}: Format email tidak valid`);
          }

          // Validasi NPM (harus berupa angka dan minimal 8 karakter)
          if (!/^\d{8,}$/.test(row['NPM'])) {
            throw new Error(`Baris ${rowNum}: NPM harus berupa angka minimal 8 digit`);
          }

          // Validasi Angkatan (harus berupa angka 4 digit dan dalam rentang yang wajar)
          const angkatan = parseInt(row['Angkatan']);
          const currentYear = new Date().getFullYear();
          if (isNaN(angkatan) || angkatan < 2000 || angkatan > currentYear + 1) {
            throw new Error(`Baris ${rowNum}: Angkatan harus berupa tahun yang valid (2000-${currentYear + 1})`);
          }

          return {
            name: row['Nama']?.toString().trim(),
            npm: row['NPM']?.toString().trim(),
            email: row['Email']?.toString().trim(),
            angkatan: angkatan,
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

        toast.success(`Berhasil mengimpor ${importedData.length} data mahasiswa untuk prodi ${user.prodi_nama || 'Anda'}!`);

      } catch (error) {
        console.error('Error saat import:', error);
        toast.error(error.message || 'Gagal mengimpor data dari Excel!');
      }
    };

    reader.readAsArrayBuffer(file);
    // Reset input file
    event.target.value = '';
  }, [user, createMutation]);

  if (isLoading) return <LoadingScreen />;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      {isMutating && <LoadingScreen />}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Data Mahasiswa Program Studi</h1>
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
            htmlFor="import-file"
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-gray-700 rounded-lg hover:bg-blue-200 transition cursor-pointer"
          >
            <FiDownloadCloud size={18} />
            <span>Import</span>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleImport}
              className="hidden"
              id="import-file"
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
            <span>{editData ? "Simpan" : "Tambah"}</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari berdasarkan nama, NPM, email, atau angkatan..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="p-4 text-left">Nama</th>
                <th className="p-4 text-left">NPM</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Angkatan</th>
                <th className="p-4 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <TableSkeleton />
              ) : filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => toggleSelectRow(item.id)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-800">{item.nama}</td>
                    <td className="p-4 text-gray-600">{item.npm}</td>
                    <td className="p-4 text-gray-600">{item.email}</td>
                    <td className="p-4 text-gray-600">{item.angkatan}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                        >
                          <AiFillEdit size={16} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(item.id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                        >
                          <AiFillDelete size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    {searchTerm ? "Tidak ada data yang sesuai dengan pencarian" : "Belum ada data mahasiswa"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteMahasiswa}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus ${selectedRows.length} mahasiswa? Tindakan ini tidak dapat dibatalkan.`}
        isLoading={deleteMutation.isPending}
      />

      <FormBox
        isOpen={isFormOpen}
        onCancel={handleCancelForm}
        title={editData ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
        fields={formFields}
        onSubmit={editData ? handleEditMahasiswa : handleAddMahasiswa}
        initialData={editData}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
};

export default DataMahasiswaProdi;
