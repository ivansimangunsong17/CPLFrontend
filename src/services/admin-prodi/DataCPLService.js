// services/DataCPLService.js
import api from '../../api/api'

export const getDataCPL = async (userProdiId = null) => {
  try {
    const res = await api.post('/kelola-data-cpl', {
      action: 'view',
    })

    if (!res.data || !res.data.data) {
      throw new Error('Invalid response format')
    }

    const rawData = res.data.data

    // Filter berdasarkan prodi admin yang login jika userProdiId diberikan
    let filteredData = rawData
    if (userProdiId) {
      filteredData = rawData.filter((cpl) => cpl.prodi_id === userProdiId)
    }

    // Mapping sesuai dengan struktur response backend
    const dataCPL = filteredData.map((cpl) => ({
      ...cpl,
      id: cpl.cpl_id, // untuk keperluan React key dan selection
      prodi_nama: cpl.prodi?.nama_prodi || 'Belum Assigned',
    }))

    return dataCPL
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Gagal mengambil data CPL')
  }
}

export const createDataCPL = async (data, userProdiId = null) => {
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

    const res = await api.post('/kelola-data-cpl', payload)
    const cpl = res.data.data
    return {
      ...cpl,
      id: cpl.cpl_id,
      prodi_nama: cpl.prodi?.nama_prodi || 'Belum Assigned',
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Gagal menambahkan data CPL')
  }
}

export const updateDataCPL = async ({ id, ...data }) => {
  try {
    const res = await api.post('/kelola-data-cpl', {
      action: 'update',
      cpl_id: id,
      ...data,
    })
    const cpl = res.data.data
    return {
      ...cpl,
      id: cpl.cpl_id,
      prodi_nama: cpl.prodi?.nama_prodi || 'Belum Assigned',
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Gagal memperbarui data CPL')
  }
}

export const deleteDataCPL = async (ids) => {
  try {
    const deletePromises = ids.map((id) =>
      api.post('/kelola-data-cpl', {
        action: 'delete',
        cpl_id: id,
      })
    )

    await Promise.all(deletePromises)
    return { success: true }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Gagal menghapus data CPL')
  }
}
