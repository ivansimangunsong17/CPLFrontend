import api from '../../api/api'

const BASE_URL = '/daftar-mahasiswa-ke-kelas'

export const getMahasiswaKelas = async (kelas_id) => {
  const res = await api.post(BASE_URL, {
    action: 'view',
    kelas_id,
  })
  return res.data?.data || res.data
}

export const createMahasiswaKelas = async ({ kelas_id, mahasiswas }) => {
  const res = await api.post(BASE_URL, {
    action: 'store',
    kelas_id,
    mahasiswas,
  })
  return res.data
}

export const updateMahasiswaKelas = async ({ id, ...payload }) => {
  const res = await api.post(BASE_URL, {
    action: 'update',
    mahasiswa_id: id,
    ...payload,
  })
  return res.data
}

export const deleteMahasiswaKelas = async ({ mahasiswa_ids, kelas_id }) => {
  if (!Array.isArray(mahasiswa_ids) || mahasiswa_ids.length === 0) {
    throw new Error('mahasiswa_ids harus array berisi minimal 1 id')
  }

  const body = {
    action: 'delete',
    kelas_id,
    mahasiswa_id: mahasiswa_ids.length === 1 ? mahasiswa_ids[0] : mahasiswa_ids,
  }

  const res = await api.post(BASE_URL, body)
  return res.data
}
