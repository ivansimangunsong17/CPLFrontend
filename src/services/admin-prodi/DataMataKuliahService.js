// services/mataKuliahService.js
import api from '../../api/api'

export const getMataKuliah = async () => {
  try {
    const res = await api.post('/kelola-data-mata-kuliah', {
      action: 'view',
    })

    if (!res.data || !res.data.data) {
      throw new Error('Invalid response format')
    }

    const rawData = res.data.data

    // Mapping sesuai dengan struktur response backend
    const mataKuliah = rawData.map((mk) => ({
      ...mk,
      id: mk.mata_kuliah_id, // untuk keperluan React key dan selection
      kode: mk.kode_mata_kuliah, // untuk konsistensi dengan komponen
      nama: mk.nama_mata_kuliah, // untuk konsistensi dengan komponen
    }))

    return mataKuliah
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Gagal mengambil data mata kuliah')
  }
}

export const createMataKuliah = async (data) => {
  try {
    const res = await api.post('/kelola-data-mata-kuliah', {
      action: 'store',
      ...data,
    })
    const mk = res.data.data
    return {
      ...mk,
      id: mk.mata_kuliah_id,
      kode: mk.kode_mata_kuliah,
      nama: mk.nama_mata_kuliah,
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Gagal menambahkan data mata kuliah')
  }
}

export const updateMataKuliah = async ({ id, ...data }) => {
  try {
    const res = await api.post('/kelola-data-mata-kuliah', {
      action: 'update',
      mata_kuliah_id: id,
      ...data,
    })
    const mataKuliah = res.data.data
    return {
      ...mataKuliah,
      id: mataKuliah.mata_kuliah_id,
      kode: mataKuliah.kode_mata_kuliah,
      nama: mataKuliah.nama_mata_kuliah,
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Gagal memperbarui data mata kuliah')
  }
}

export const deleteMataKuliah = async (ids) => {
  try {
    // Delete mata kuliah one by one sequentially
    for (const id of ids) {
      await api.post('/kelola-data-mata-kuliah', {
        action: 'delete',
        mata_kuliah_id: id,
      })
    }
    return { message: 'Data mata kuliah berhasil dihapus.' }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Gagal menghapus data mata kuliah')
  }
}

// Alternative format sesuai dengan service lain
const mataKuliahService = {
  getAll: () =>
    api.post('/kelola-data-mata-kuliah', {
      action: 'view',
    }),

  create: (data) =>
    api.post('/kelola-data-mata-kuliah', {
      action: 'store',
      ...data,
    }),

  update: (data) =>
    api.post('/kelola-data-mata-kuliah', {
      action: 'update',
      mata_kuliah_id: data.id,
      ...data,
    }),

  delete: (mata_kuliah_id) =>
    api.post('/kelola-data-mata-kuliah', {
      action: 'delete',
      mata_kuliah_id,
    }),
}

export default mataKuliahService
