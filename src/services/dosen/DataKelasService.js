import api from '../../api/api'
import { toast } from 'react-toastify'

// 🔹 Ambil semua data kelas
export const getKelas = async ({ kelas_id = null, mata_kuliah_id = null, dosen_id = null } = {}) => {
  const payload = { action: 'view' }
  if (kelas_id) {
    payload.kelas_id = kelas_id
  }
  if (mata_kuliah_id) {
    payload.mata_kuliah_id = mata_kuliah_id
  }
  // ▼▼▼ TAMBAHKAN BLOK INI ▼▼▼
  if (dosen_id) {
    payload.dosen_id = dosen_id
  }
  // ▲▲▲ BATAS TAMBAHAN ▲▲▲

  try {
    const response = await api.get('/data-kelas-mata-kuliah', { params: payload })
    const resData = response.data?.data

    let kelasArray = []
    if (Array.isArray(resData)) kelasArray = resData
    else if (resData) kelasArray = [resData]

    return kelasArray
  } catch (error) {
    if (error.response && error.response.status === 403) {
      toast.error('Error 403: Anda tidak memiliki izin untuk mengakses data ini.')
    } else {
      console.error('Error fetching data kelas:', error)
      toast.error(error.response?.data?.message || 'Gagal mengambil data kelas')
    }
    throw error
  }
}
