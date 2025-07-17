// services/mahasiswaService.js
import api from '../../api/api'

export const getMahasiswa = async (userProdiId = null) => {
  try {
    const res = await api.post('/kelola-data-mahasiswa', {
      action: 'view',
    })

    if (!res.data || !res.data.data) {
      throw new Error('Invalid response format')
    }

    const rawData = res.data.data

    // Filter berdasarkan prodi admin yang login jika userProdiId diberikan
    let filteredData = rawData
    if (userProdiId) {
      filteredData = rawData.filter((mhs) => mhs.prodi_id === userProdiId)
    }

    // Mapping sesuai dengan struktur response backend
    const mahasiswa = filteredData.map((mhs) => ({
      ...mhs,
      id: mhs.mahasiswa_id, // untuk keperluan React key dan selection
      nama: mhs.name, // untuk konsistensi dengan komponen
    }))

    return mahasiswa
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Gagal mengambil data mahasiswa')
  }
}

export const createMahasiswa = async (data, userProdiId = null) => {
  try {
    // Pastikan prodi_id sesuai dengan prodi admin yang login
    const payload = {
      action: 'store',
      ...data,
    }

    // Jika userProdiId tersedia dan tidak ada prodi_id di data, set ke prodi admin
    if (userProdiId && !data.prodi_id) {
      payload.prodi_id = userProdiId
    }

    const res = await api.post('/kelola-data-mahasiswa', payload)
    const mhs = res.data.data
    return {
      ...mhs,
      id: mhs.mahasiswa_id,
      nama: mhs.name,
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Gagal menambahkan data mahasiswa')
  }
}

export const updateMahasiswa = async ({ id, ...data }) => {
  try {
    const res = await api.post('/kelola-data-mahasiswa', {
      action: 'update',
      mahasiswa_id: id,
      ...data,
    })
    const mahasiswa = res.data.data
    return {
      ...mahasiswa,
      id: mahasiswa.mahasiswa_id,
      nama: mahasiswa.name,
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Gagal memperbarui data mahasiswa')
  }
}

export const deleteMahasiswa = async (ids) => {
  try {
    // Delete mahasiswa one by one sequentially
    for (const id of ids) {
      await api.post('/kelola-data-mahasiswa', {
        action: 'delete',
        mahasiswa_id: id,
      })
    }
    return { message: 'Data mahasiswa berhasil dihapus.' }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Gagal menghapus data mahasiswa')
  }
}

// Alternative format sesuai dengan service lain
const mahasiswaService = {
  getAll: () =>
    api.post('/kelola-data-mahasiswa', {
      action: 'view',
    }),

  create: (data) =>
    api.post('/kelola-data-mahasiswa', {
      action: 'store',
      ...data,
    }),

  update: (data) =>
    api.post('/kelola-data-mahasiswa', {
      action: 'update',
      mahasiswa_id: data.id,
      ...data,
    }),

  delete: (mahasiswa_id) =>
    api.post('/kelola-data-mahasiswa', {
      action: 'delete',
      mahasiswa_id,
    }),
}

export default mahasiswaService
