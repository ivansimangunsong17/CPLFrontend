// services/admin-prodi/DataCPMKService.js
import api from '../../api/api'

export const getCPMK = async (prodiId) => {
  try {
    console.log('Fetching CPMK for prodi_id:', prodiId)

    // Validasi prodi_id
    if (!prodiId) {
      throw new Error('Prodi ID tidak tersedia')
    }

    // Menggunakan POST dengan action seperti service lainnya
    const res = await api.post('/kelola-data-cpmk', {
      action: 'view',
      prodi_id: prodiId,
    })

    console.log('CPMK API Response:', res.data)

    if (!res.data) {
      throw new Error('Response tidak valid')
    }

    // Handle jika tidak ada data (empty array)
    if (!res.data.data || res.data.data.length === 0) {
      console.log('No CPMK data found for prodi_id:', prodiId)
      return []
    }

    const rawData = res.data.data

    // Mapping sesuai dengan struktur response backend
    const cpmk = rawData.map((item) => ({
      ...item,
      id: item.cpmk_id, // untuk keperluan React key dan selection
      kode: item.kode_cpmk, // untuk konsistensi dengan komponen
      nama: item.nama_cpmk, // untuk konsistensi dengan komponen
      deskripsi: item.deskripsi,
      prodiId: item.prodi_id,
      prodi: item.prodi,
    }))

    console.log('Mapped CPMK data:', cpmk)
    return cpmk
  } catch (error) {
    console.error('Error fetching CPMK:', error)
    console.error('Error response:', error.response?.data)

    // Jika error 422, kemungkinan prodi_id tidak valid atau data tidak ditemukan
    if (error.response?.status === 422) {
      console.warn('Prodi ID mungkin tidak valid atau tidak memiliki data CPMK:', prodiId)
      return [] // Return empty array instead of throwing error
    }

    throw new Error(error.response?.data?.message || 'Gagal mengambil data CPMK')
  }
}

export const createCPMK = async (data) => {
  try {
    console.log('=== CREATE CPMK DEBUG ===')
    console.log('Input data:', data)
    
    // Mengikuti pattern dari DataMahasiswaService yang menggunakan 'store'
    const payload = {
      action: 'store',
      kode_cpmk: data.kode_cpmk,
      nama_cpmk: data.nama_cpmk, 
      deskripsi: data.deskripsi,
      prodi_id: data.prodi_id
    }
    
    console.log('Payload being sent:', payload)
    console.log('API endpoint:', '/kelola-data-cpmk')
    
    const res = await api.post('/kelola-data-cpmk', payload)
    console.log('Create CPMK SUCCESS response:', res.data)
    
    // Return consistent format like createMahasiswa
    const cpmk = res.data.data
    return {
      ...cpmk,
      id: cpmk.cpmk_id || cpmk.id, // ensure id field exists
    }
  } catch (error) {
    console.error('=== CREATE CPMK ERROR ===')
    console.error('Error object:', error)
    console.error('Error response:', error.response?.data)
    console.error('Error status:', error.response?.status)
    console.error('Error message:', error.message)
    
    throw new Error(error.response?.data?.message || 'Gagal menambahkan CPMK')
  }
}

export const updateCPMK = async (data) => {
  try {
    console.log('Updating CPMK:', data)
    const res = await api.post('/kelola-data-cpmk', {
      action: 'update',
      cpmk_id: data.cpmk_id,
      ...data,
    })
    return res.data
  } catch (error) {
    console.error('Error updating CPMK:', error)
    throw new Error(error.response?.data?.message || 'Gagal memperbarui CPMK')
  }
}

export const deleteCPMK = async (cpmkId) => {
  try {
    console.log('Deleting CPMK:', cpmkId)
    const res = await api.post('/kelola-data-cpmk', {
      action: 'delete',
      cpmk_id: cpmkId,
    })
    return res.data
  } catch (error) {
    console.error('Error deleting CPMK:', error)
    throw new Error(error.response?.data?.message || 'Gagal menghapus CPMK')
  }
}
