import api from '../../api/api'

// Ambil semua CPMK berdasarkan ID Mata Kuliah
export const getJenisPenilaian = async () => {
  try {
    const response = await api.get('/data-jenis-penilaian-prodi', {
      action: 'view',
    })
    // Pastikan mengembalikan array data kosong jika tidak ada data
    return response.data?.data || []
  } catch (error) {
    console.error('Error fetching Jenis Penilaian:', error)
    throw error
  }
}
