import api from '../../api/api'

// Ambil semua CPMK berdasarkan ID Mata Kuliah
export const getCPMKByMatkul = async (mataKuliahId) => {
  try {
    const response = await api.post('/kelola-data-cpmk', {
      action: 'view',
      mata_kuliah_id: mataKuliahId,
    })
    // Pastikan mengembalikan array data kosong jika tidak ada data
    return response.data?.data || []
  } catch (error) {
    console.error('Error fetching CPMK:', error)
    throw error
  }
}

// Tambah CPMK
export const createCPMK = async (payload) => {
  try {
    const response = await api.post('/kelola-data-cpmk', {
      action: 'store',
      kode_cpmk: payload.kode_cpmk,
      nama_cpmk: payload.nama_cpmk,
      deskripsi: payload.deskripsi,
      mata_kuliah_id: payload.mata_kuliah_id,
      prodi_id: payload.prodi_id,
    })
    return response.data
  } catch (error) {
    console.error('Error creating CPMK:', error)
    throw error
  }
}

// Update CPMK
export const updateCPMK = async (payload) => {
  try {
    const response = await api.post('/kelola-data-cpmk', {
      action: 'update',
      cpmk_id: payload.id,
      kode_cpmk: payload.kode_cpmk,
      nama_cpmk: payload.nama_cpmk,
      deskripsi: payload.deskripsi,
      mata_kuliah_id: payload.mata_kuliah_id,
      prodi_id: payload.prodi_id,
    })
    return response.data
  } catch (error) {
    console.error('Error updating CPMK:', error)
    throw error
  }
}

// Hapus CPMK by ID (single atau multiple)
export const deleteCPMK = async (ids) => {
  try {
    // Jika input array, delete satu per satu
    if (Array.isArray(ids)) {
      const results = []
      for (const id of ids) {
        const response = await api.post('/kelola-data-cpmk', {
          action: 'delete',
          cpmk_id: id,
        })
        results.push(response.data)
      }
      return results
    }
    // Jika single id
    const response = await api.post('/kelola-data-cpmk', {
      action: 'delete',
      cpmk_id: ids,
    })
    return response.data
  } catch (error) {
    console.error('Error deleting CPMK:', error)
    throw error
  }
}
