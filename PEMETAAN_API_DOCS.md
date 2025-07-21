# Dokumentasi API Pemetaan CPL

## Hook dan Service Baru untuk Pemetaan CPL

### 1. PemetaanCPLService.js
**Lokasi:** `src/services/admin-prodi/PemetaanCPLService.js`

Service yang menangani komunikasi dengan API backend untuk operasi pemetaan CPL:

#### Endpoint API:
- Base URL: `http://localhost:8000/api/pemetaan-cpl`

#### Methods:
- `storePemetaan(data)` - Menyimpan pemetaan CPL baru
- `getPemetaanByMataKuliah(mataKuliahId)` - Mengambil pemetaan berdasarkan mata kuliah
- `getAllPemetaan()` - Mengambil semua data pemetaan
- `updatePemetaan(id, data)` - Update pemetaan yang sudah ada
- `deletePemetaan(id)` - Menghapus pemetaan

### 2. usePemetaanCPL.js Hook
**Lokasi:** `src/hooks/admin-prodi/usePemetaanCPL.js`

React hook yang menggunakan TanStack Query untuk state management:

#### Features:
- Automatic caching dan refetching
- Loading states untuk semua operasi
- Error handling dengan toast notifications
- Optimistic updates

#### Usage:
```javascript
const {
  pemetaanData,
  isLoading,
  storePemetaan,
  deletePemetaan,
  isStoring,
  isDeleting
} = usePemetaanCPL(mataKuliahId);
```

### 3. Integrasi di DetailPemetaanProdi.jsx

#### Format Data Payload:
```json
{
  "action": "store",
  "mata_kuliah_id": 1,
  "cpls": [
    {
      "cpl_id": 1,
      "bobot": 50.00
    },
    {
      "cpl_id": 2, 
      "bobot": 50.00
    }
  ]
}
```

#### Alur Kerja:
1. User klik tombol "Tambah" pada header tabel
2. Modal FormBox terbuka dengan dropdown CPL dari API
3. User memilih CPL dan memasukkan bobot
4. Data validasi di frontend
5. Data dikirim ke backend menggunakan format JSON di atas
6. Setelah sukses, data otomatis di-refresh dari API
7. Toast notification menampilkan status operasi

#### Fitur Validasi:
- CPL tidak boleh duplikat
- Bobot harus antara 0-100%
- Field wajib diisi

#### State Management:
- Data lokal disinkronisasi dengan API
- Loading states untuk semua operasi
- Error handling yang komprehensif

### 4. Improvements yang Dilakukan:

1. **API Integration**: Menggunakan real API calls alih-alih state lokal
2. **Data Persistence**: Data tersimpan di database
3. **Error Handling**: Komprehensif error handling dengan toast
4. **Loading States**: Loading indicators untuk UX yang lebih baik
5. **Data Validation**: Client-side validation sebelum API call
6. **Auto Refresh**: Data ter-refresh otomatis setelah operasi

### 5. Testing:
- Development server berjalan di: http://localhost:5174/
- Endpoint dapat ditest dengan tools seperti Postman
- UI terintegrasi dengan backend API

### 6. Next Steps:
- Test endpoint backend
- Implementasi edit functionality
- Add CPMK management features
- Error boundary implementation
