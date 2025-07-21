# Implementasi TableSkeleton pada DetailPemetaanProdi

## Perubahan yang Dilakukan

### 1. Import TableSkeleton Component
Menambahkan import untuk TableSkeleton component:
```javascript
import TableSkeleton from "../../components/TableSkeleton";
```

### 2. Pemisahan Loading States
Memisahkan loading states untuk kontrol yang lebih baik:
```javascript
// Loading states yang terpisah
const isInitialLoading = mataKuliahQuery.isLoading || dataCPLQuery.isLoading;
const isPemetaanDataLoading = isPemetaanLoading;
```

- `isInitialLoading`: Untuk loading mata kuliah dan data CPL (menampilkan LoadingScreen penuh)
- `isPemetaanDataLoading`: Untuk loading data pemetaan (menampilkan TableSkeleton)

### 3. Implementasi TableSkeleton di Tabel Pemetaan
Menambahkan kondisi untuk menampilkan TableSkeleton saat data pemetaan sedang loading:
```javascript
{isPemetaanDataLoading ? (
    <TableSkeleton columns={4} rows={3} />
) : pemetaanData.length === 0 ? (
    // Empty state
) : (
    // Data rows
)}
```

### 4. Loading States untuk Tombol-tombol
Menambahkan visual feedback untuk tombol yang sedang dalam proses:

#### Tombol Tambah (Header):
```javascript
<button
    onClick={handleAddCPL}
    className={`... ${isStoring ? 'opacity-50 cursor-not-allowed' : ''}`}
    disabled={isStoring}
>
    <span>{isStoring ? 'Menyimpan...' : 'Tambah'}</span>
</button>
```

#### Tombol Delete:
```javascript
<button
    onClick={() => handleDeleteCPL(pemetaan.cpl_id || pemetaan.id)}
    className={`... ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
    disabled={isDeleting}
>
    <AiFillDelete size={20} />
</button>
```

#### Tombol Tambah (Empty State):
```javascript
<button
    onClick={handleAddCPL}
    className={`... ${isStoring ? 'opacity-50 cursor-not-allowed' : ''}`}
    disabled={isStoring}
>
    {isStoring ? 'Menyimpan...' : 'Tambah Pemetaan CPL'}
</button>
```

## User Experience Improvements

### 1. **Progressive Loading**
- LoadingScreen untuk loading awal (mata kuliah & CPL data)
- TableSkeleton untuk loading data pemetaan
- Button loading states untuk operasi CRUD

### 2. **Visual Feedback**
- Skeleton rows menunjukkan struktur tabel yang akan datang
- Tombol disable dengan opacity 50% saat loading
- Text dinamis pada tombol (Tambah → Menyimpan...)

### 3. **Prevent Double Clicks**
- Tombol disabled saat operasi sedang berjalan
- Mencegah multiple API calls

## Konfigurasi TableSkeleton
```javascript
<TableSkeleton columns={4} rows={3} />
```
- **columns={4}**: Sesuai dengan jumlah kolom tabel (CPL, CPMK, Bobot CPMK, Aksi)
- **rows={3}**: Menampilkan 3 baris skeleton untuk memberikan preview yang cukup

## Testing
- Development server: http://localhost:5174/
- TableSkeleton akan muncul saat:
  - Pertama kali load halaman (untuk data pemetaan)
  - Setelah melakukan operasi CRUD
  - Saat API sedang proses

## Next Steps
- Test responsivitas TableSkeleton
- Implementasi error states
- Add loading animation enhancements
