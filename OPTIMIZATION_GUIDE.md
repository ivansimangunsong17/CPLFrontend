# React Component Optimization Guide

## Standard Optimization Pattern

Ketika diminta untuk **"optimize"**, terapkan pola optimasi berikut secara konsisten:

### 1. Import Hooks yang Diperlukan
```javascript
import React, { useState, useMemo, useCallback, useContext, useEffect } from "react";
```

### 2. Data Extraction dengan useMemo
```javascript
// Memoized data extraction
const data = useMemo(() => queryResult.data || [], [queryResult.data]);
const isLoading = queryResult.isLoading;
const error = queryResult.error;
```

### 3. Form Fields Memoization
```javascript
// Memoized form fields
const formFields = useMemo(() => [
  { name: 'field1', label: 'Label 1', type: 'text', required: true },
  // ... other fields
], []);
```

### 4. Filtered Data dengan useMemo
```javascript
// Memoized filtered data
const filteredData = useMemo(() => {
  return data.filter((item) => {
    const term = (searchTerm || "").toLowerCase().trim();
    return (
      item.field1?.toLowerCase().includes(term) ||
      item.field2?.toLowerCase().includes(term)
    );
  });
}, [data, searchTerm]);
```

### 5. Computed States dengan useMemo
```javascript
// Memoized computed states
const isAllSelected = useMemo(() => {
  const allFilteredIds = filteredData.map((item) => item.id);
  return allFilteredIds.length > 0 && allFilteredIds.every(id => selectedRows.includes(id));
}, [filteredData, selectedRows]);

const isMutating = useMemo(() => {
  return createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;
}, [createMutation.isPending, updateMutation.isPending, deleteMutation.isPending]);
```

### 6. Event Handlers dengan useCallback
```javascript
// Form handlers
const handleAdd = useCallback((formData) => {
  // validation logic
  if (editData) {
    updateMutation.mutate({ id: editData.id, ...formData });
  } else {
    createMutation.mutate(formData);
  }
}, [editData, createMutation, updateMutation]);

const handleCancelForm = useCallback(() => {
  setIsFormOpen(false);
  setEditData(null);
}, []);

// CRUD handlers
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

// Selection handlers
const toggleSelectAll = useCallback(() => {
  if (isAllSelected) {
    setSelectedRows([]);
  } else {
    const allIds = filteredData.map((item) => item.id);
    setSelectedRows(allIds);
  }
}, [isAllSelected, filteredData]);

const toggleSelectRow = useCallback((id) => {
  setSelectedRows(prev => 
    prev.includes(id) 
      ? prev.filter(rowId => rowId !== id)
      : [...prev, id]
  );
}, []);
```

### 7. Excel Functions dengan useCallback (jika ada)
```javascript
// Excel Export
const handleExport = useCallback(() => {
  try {
    const exportData = data.map((item, index) => ({
      'No': index + 1,
      'Field 1': item.field1 || '',
      'Field 2': item.field2 || ''
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    
    ws['!cols'] = [
      { wch: 5 },   // No
      { wch: 15 },  // Field 1
      { wch: 25 }   // Field 2
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Data Export');
    
    const timestamp = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `data-export-${timestamp}.xlsx`);
    
    toast.success('Data berhasil diekspor ke Excel!');
  } catch (error) {
    toast.error('Gagal mengekspor data ke Excel!');
  }
}, [data]);

// Excel Template Download
const handleDownloadTemplate = useCallback(() => {
  try {
    const templateData = [
      { 'Field 1': 'Example 1', 'Field 2': 'Example 2' }
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(templateData);
    
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, 'template.xlsx');
    
    toast.success('Template berhasil didownload!');
  } catch (error) {
    toast.error('Gagal mendownload template!');
  }
}, []);

// Excel Import
const handleImport = useCallback((event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (!user || !user.prodi_id) {
    toast.error('Informasi prodi tidak ditemukan.');
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

      // Process and validate data
      const importedData = jsonData.map((row, index) => {
        const rowNum = index + 2;
        
        // Validation logic
        if (!row['Field 1'] || !row['Field 2']) {
          throw new Error(`Baris ${rowNum}: Field wajib diisi`);
        }
        
        return {
          field1: row['Field 1'],
          field2: row['Field 2'],
          prodi_id: user.prodi_id
        };
      });

      // Import data
      importedData.forEach(item => createMutation.mutate(item));
      
      toast.success(`Berhasil mengimpor ${importedData.length} data!`);
    } catch (error) {
      toast.error(error.message || 'Gagal mengimpor data!');
    }
  };
  
  reader.readAsArrayBuffer(file);
  event.target.value = '';
}, [user, createMutation]);
```

### 8. useEffect untuk Auto-Close Modal
```javascript
// Auto-close modals when mutations succeed
useEffect(() => {
  if (createMutation.isSuccess || updateMutation.isSuccess) {
    setIsFormOpen(false);
    setEditData(null);
  }
}, [createMutation.isSuccess, updateMutation.isSuccess]);

useEffect(() => {
  if (deleteMutation.isSuccess) {
    setIsModalOpen(false);
    setSelectedRows([]);
  }
}, [deleteMutation.isSuccess]);
```

### 9. Table Style Standard
```jsx
{/* Table dengan style konsisten */}
<div className="bg-white rounded-lg shadow overflow-hidden">
  <div className="overflow-x-auto">
    <table className="min-w-full">
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
          <th className="p-4 text-left">Column 1</th>
          <th className="p-4 text-left">Column 2</th>
          <th className="p-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {isLoading ? (
          <TableSkeleton rows={5} columns={4} />
        ) : filteredData.length === 0 ? (
          <tr>
            <td colSpan="4" className="p-8 text-center text-gray-500">
              {searchTerm ? "Tidak ada data yang sesuai dengan pencarian" : "Belum ada data"}
            </td>
          </tr>
        ) : (
          filteredData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="p-4 text-center">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(item.id)}
                  onChange={() => toggleSelectRow(item.id)}
                  className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                />
              </td>
              <td className="p-4 font-medium text-gray-800">{item.field1}</td>
              <td className="p-4 text-gray-600">{item.field2}</td>
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
```

## Checklist Optimasi

Saat melakukan optimasi, pastikan:

- [ ] ✅ Import hooks yang diperlukan
- [ ] ✅ Data extraction dengan useMemo
- [ ] ✅ Form fields dimemoization
- [ ] ✅ Filtered data dengan useMemo
- [ ] ✅ Computed states dengan useMemo
- [ ] ✅ Event handlers dengan useCallback
- [ ] ✅ Excel functions dengan useCallback (jika ada)
- [ ] ✅ useEffect untuk auto-close modal
- [ ] ✅ Table style konsisten
- [ ] ✅ Loading states dengan TableSkeleton
- [ ] ✅ Error handling yang proper
- [ ] ✅ Dependencies array yang tepat
- [ ] ✅ Tidak ada duplikasi variabel
- [ ] ✅ Clean code structure

## Performance Benefits

Optimasi ini memberikan:
- **Reduced Re-renders** - useMemo dan useCallback mencegah re-calculation
- **Stable References** - Event handlers tidak berubah setiap render
- **Better Memory Management** - Mengurangi object creation
- **Improved UX** - Response lebih cepat karena less computation
- **Code Consistency** - Pattern yang sama di semua komponen

## Perintah Standard

Ketika diminta **"optimize"**, terapkan semua pola di atas tanpa menghilangkan fungsi existing.

## Contoh Implementasi Lengkap

```javascript
// Template lengkap untuk komponen yang dioptimasi
const OptimizedComponent = () => {
  const { user } = useContext(AuthContext);
  const { query, createMutation, updateMutation, deleteMutation } = useHook();
  
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Memoized values
  const data = useMemo(() => query.data || [], [query.data]);
  const formFields = useMemo(() => [...], []);
  const filteredData = useMemo(() => ..., [data, searchTerm]);
  const isAllSelected = useMemo(() => ..., [filteredData, selectedRows]);
  const isMutating = useMemo(() => ..., [mutations]);

  // Callbacks
  const handleAdd = useCallback(...);
  const handleDelete = useCallback(...);
  const toggleSelectAll = useCallback(...);
  
  // Effects
  useEffect(() => { /* auto-close logic */ }, [mutations]);

  return (/* JSX dengan pattern standard */);
};
```