import api from '../../api/api'

const PemetaanCPLService = {
  getByMataKuliah: async (mataKuliahId) => {
    const response = await api.post('/pemetaan-cpl', {
      action: 'view',
      mata_kuliah_id: mataKuliahId,
    })
    console.log(response.data)
    return response.data
  },

  store: async ({ mata_kuliah_id, cpls }) => {
    const response = await api.post('/pemetaan-cpl', {
      action: 'store',
      mata_kuliah_id,
      cpls,
    })
    return response.data
  },

  update: async ({ mata_kuliah_id, cpls }) => {
    const response = await api.post('/pemetaan-cpl', {
      action: 'update',
      mata_kuliah_id,
      cpls,
    })
    return response.data
  },

  delete: async ({ cpl_mata_kuliah_id }) => {
    if (!cpl_mata_kuliah_id) {
      throw new Error('cpl_mata_kuliah_id wajib diisi untuk menghapus data')
    }

    const response = await api.post('/pemetaan-cpl', {
      action: 'delete',
      cpl_mata_kuliah_id,
    })

    return response.data
  },
}

export default PemetaanCPLService
