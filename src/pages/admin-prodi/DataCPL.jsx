import React, { useState, useMemo, useCallback, useContext, useEffect } from "react";
import { AiFillDelete, AiOutlinePlus, AiFillEdit, AiOutlineSearch } from "react-icons/ai";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import ConfirmModal from "../../components/Modal/ConfModal";
import FormBox from "../../components/Form/FormBox";
import { useDataCPL } from "../../hooks/admin-prodi/useDataCPL";
import LoadingScreen from "../../components/LoadingScreen";
import TableSkeleton from "../../components/TableSkeleton";
import { FiUploadCloud, FiDownloadCloud } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";

const DataCPL = () => {
  const { user } = useContext(AuthContext);
  const {
    dataCPLQuery,
    createMutation,
    updateMutation,
    deleteMutation,
    userProdiId,
  } = useDataCPL();

  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Memoized data extraction
  const data = useMemo(() => dataCPLQuery.data || [], [dataCPLQuery.data]);
  const isLoading = dataCPLQuery.isLoading;
  const error = dataCPLQuery.error;

  // Memoized form fields
  const formFields = useMemo(() => [
    {
      name: "kode_cpl",
      label: "Kode CPL",
      type: "text",
      placeholder: "Masukkan kode CPL (contoh: CPL-1)",
      required: true,
    },
    {
      name: "deskripsi",
      label: "Deskripsi",
      type: "textarea",
      placeholder: "Masukkan deskripsi capaian pembelajaran lulusan",
      required: true,
    },
  ], []);

  // Memoized filtered data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const term = (searchTerm || "").toLowerCase().trim();
      return (
        item.kode_cpl?.toLowerCase().includes(term) ||
        item.deskripsi?.toLowerCase().includes(term)
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

  const handleAddCPL = useCallback((formData) => {
    // Validasi dasar
    if (!formData.kode_cpl || !formData.deskripsi) {
      toast.error('Semua field wajib diisi');
      return;
    }

    // // Validasi format kode CPL (contoh: CPL-1, CPL-2, dll)
    // if (!/^CPL-\d+$/.test(formData.kode_cpl)) {
    //   toast.error('Format kode CPL harus: CPL-[angka] (contoh: CPL-1)');
    //   return;
    // }

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
  }, [editData, createMutation, updateMutation]);

  // Fungsi Export ke Excel
  const handleExport = useCallback(() => {
    try {
      // Siapkan data untuk export
      const exportData = data.map((item, index) => ({
        'No': index + 1,
        'Kode CPL': item.kode_cpl || '',
        'Deskripsi': item.deskripsi || ''
      }));

      // Buat workbook dan worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);

      // Set lebar kolom
      ws['!cols'] = [
        { wch: 5 },   // No
        { wch: 15 },  // Kode CPL
        { wch: 25 },  // Nama CPL
        { wch: 50 }   // Deskripsi
      ];

      // Tambahkan worksheet ke workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Data CPL');

      // Generate nama file dengan timestamp
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `data-cpl-${timestamp}.xlsx`;

      // Download file
      XLSX.writeFile(wb, filename);

      toast.success('Data berhasil diekspor ke Excel!');
    } catch (error) {
      toast.error('Gagal mengekspor data ke Excel!');
    }
  }, [data]);

  // Fungsi Download Template Excel
  const handleDownloadTemplate = useCallback(() => {
    try {
      // Siapkan template dengan contoh data
      const templateData = [
        {
          'Kode CPL': 'CPL-1',
          'Deskripsi': 'Mahasiswa mampu menerapkan pengetahuan matematika, ilmu alam, ilmu rekayasa dan ilmu komputer untuk menyelesaikan permasalahan rekayasa di bidang informatika'
        },
        {
          'Kode CPL': 'CPL-2',
          'Deskripsi': 'Mahasiswa mampu merancang dan mengimplementasikan solusi berbasis teknologi informasi untuk memenuhi kebutuhan pengguna'
        }
      ];

      // Buat workbook dan worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(templateData);

      // Set lebar kolom
      ws['!cols'] = [
        { wch: 15 },  // Kode CPL
        { wch: 50 }   // Deskripsi
      ];

      // Tambahkan worksheet ke workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Template CPL');

      // Download file
      XLSX.writeFile(wb, 'template-cpl.xlsx');

      toast.success('Template berhasil didownload!');
    } catch (error) {
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
          if (!row['Kode CPL'] || !row['Deskripsi']) {
            throw new Error(`Baris ${rowNum}: Kode CPL dan Deskripsi wajib diisi`);
          }

          // Validasi format kode CPL (CPL-angka)
          if (!/^CPL-\d+$/.test(row['Kode CPL'].toString().trim())) {
            throw new Error(`Baris ${rowNum}: Format kode CPL harus: CPL-[angka] (contoh: CPL-1)`);
          }


          // Validasi deskripsi (minimal 20 karakter)
          if (row['Deskripsi'].toString().trim().length < 20) {
            throw new Error(`Baris ${rowNum}: Deskripsi minimal 20 karakter`);
          }

          return {
            kode_cpl: row['Kode CPL']?.toString().trim(),
            deskripsi: row['Deskripsi']?.toString().trim(),
            prodi_id: user.prodi_id // Otomatis menambahkan prodi_id dari user yang login
          };
        });

        // Proses import data
        // Batch import
        importedData.forEach(item => {
          createMutation.mutate(item);
        });

        toast.success(`Berhasil mengimpor ${importedData.length} data CPL untuk prodi ${user.prodi_nama || 'Anda'}!`);

      } catch (error) {
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

  const handleDeleteSingle = useCallback((id) => {
    setSelectedRows([id]);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((item) => {
    setEditData(item);
    setIsFormOpen(true);
  }, []);

  const toggleSelectRow = useCallback((id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedRows([]);
    } else {
      const validIds = filteredData.map(item => item.id);
      setSelectedRows(validIds);
    }
  }, [isAllSelected, filteredData]);

  const handleCancelForm = useCallback(() => {
    setIsFormOpen(false);
    setEditData(null);
  }, []);

  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {isMutating && <LoadingScreen />}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Data Capaian Pembelajaran Lulusan</h2>

          </div>
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
              htmlFor="import-file-cpl"
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-gray-700 rounded-lg hover:bg-blue-200 transition cursor-pointer"
            >
              <FiDownloadCloud size={18} />
              <span>Import</span>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleImport}
                className="hidden"
                id="import-file-cpl"
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
              <AiFillDelete size={20} />
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
                <th className="p-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                  />
                </th>
                <th className="p-4 text-left">Kode CPL</th>
                <th className="p-4 text-left">Deskripsi</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <TableSkeleton rows={5} columns={4} />
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    {searchTerm ? "Tidak ada data yang sesuai dengan pencarian" : "Belum ada data CPL"}
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
                    <td className="p-4 w-32 font-medium text-gray-600">{item.kode_cpl}</td>
                    <td className="p-4 text-gray-600">
                      <div className="max-w " title={item.deskripsi}>
                        {item.deskripsi}
                      </div>
                    </td>
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
        onCancel={handleCancelForm}
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