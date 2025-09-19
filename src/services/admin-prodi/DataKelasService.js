import api from '../../api/api'

// 🔹 Ambil semua data kelas
export const getKelas = async ({ kelas_id = null, mata_kuliah_id = null } = {}) => {
  const payload = { action: 'view' }
  if (kelas_id) payload.kelas_id = kelas_id

  const response = await api.post('/kelola-data-kelas', payload)
  const resData = response.data?.data

  let kelasArray = []
  if (Array.isArray(resData)) kelasArray = resData
  else if (resData) kelasArray = [resData]

  // 🔹 Filter manual di frontend berdasarkan mata_kuliah_id
  if (mata_kuliah_id) {
    kelasArray = kelasArray.filter((k) => k.mata_kuliah_id === Number(mata_kuliah_id))
  }

  return kelasArray
}

// 🔹 Tambah kelas baru
export const createKelas = async (kelasData) => {
  const response = await api.post('/kelola-data-kelas', {
    action: 'store',
    ...kelasData,
  })
  return response.data
}

// 🔹 Update kelas
export const updateKelas = async (kelasData) => {
  const response = await api.post('/kelola-data-kelas', {
    action: 'update',
    ...kelasData,
  })
  return response.data
}

// 🔹 Hapus kelas
export const deleteKelas = async (kelas_id) => {
  const response = await api.post('/kelola-data-kelas', {
    action: 'delete',
    kelas_id,
  })
  return response.data
}
