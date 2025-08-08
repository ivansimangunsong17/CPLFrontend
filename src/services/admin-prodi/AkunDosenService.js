// services/AkunDosenService.js
import api from '../../api/api'

export const getAkunDosen = async (userProdiId = null) => {
  try {
    const res = await api.post('/kelola-akun-dosen', {
      action: 'view',
    })

    if (!res.data || !res.data.data) {
      throw new Error('Invalid response format')
    }

    const rawData = res.data.data


    // Filter berdasarkan prodi admin yang login jika userProdiId diberikan
    let filteredData = rawData
    if (userProdiId) {
      filteredData = rawData.filter((akun) => akun.prodi_id === userProdiId || akun.prodi_id === null)
     
    }

    // Mapping sesuai dengan struktur response backend
    const akunDosen = filteredData.map((akun) => ({
      ...akun,
      nama: akun.name, // untuk konsistensi dengan komponen
      prodi_nama: akun.prodi?.nama_prodi || 'Belum Assigned',
    }))

    return akunDosen
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Gagal mengambil data akun dosen')
  }
}

export const createAkunDosen = async (data, userProdiId = null) => {
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

    const res = await api.post('/kelola-akun-dosen', payload)
    const akun = res.data.data
    return {
      ...akun,
      nama: akun.name,
      prodi_nama: akun.prodi?.nama_prodi || 'Belum Assigned',
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Gagal menambahkan akun dosen')
  }
}

export const updateAkunDosen = async ({ id, ...data }) => {
  try {
    const res = await api.post('/kelola-akun-dosen', {
      action: 'update',
      id: id,
      ...data,
    })
    const akun = res.data.data
    return {
      ...akun,
      nama: akun.name,
      prodi_nama: akun.prodi?.nama_prodi || 'Belum Assigned',
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Gagal memperbarui akun dosen')
  }
}

export const deleteAkunDosen = async (ids) => {
  try {
    // Delete akun dosen one by one sequentially
    for (const id of ids) {
      await api.post('/kelola-akun-dosen', {
        action: 'delete',
        id: id,
      })
    }
    return { message: 'Akun dosen berhasil dihapus.' }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Gagal menghapus akun dosen')
  }
}

// Alternative format sesuai dengan service lain
const akunDosenService = {
  getAll: () =>
    api.post('/kelola-akun-dosen', {
      action: 'view',
    }),

  create: (data) =>
    api.post('/kelola-akun-dosen', {
      action: 'store',
      ...data,
    }),

  update: (data) =>
    api.post('/kelola-akun-dosen', {
      action: 'update',
      id: data.id,
      ...data,
    }),

  delete: (id) =>
    api.post('/kelola-akun-dosen', {
      action: 'delete',
      id,
    }),
}

export default akunDosenService
