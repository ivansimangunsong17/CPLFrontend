import api from '../../api/api'

const PemetaanCPLService = {
  getByMataKuliah: async (mataKuliahId) => {
    const response = await api.post('/pemetaan-cpl', {
      action: 'view',
      mata_kuliah_id: mataKuliahId,
    })
    return response.data
  },

  store: async ({ mata_kuliah_id, cpl_id, bobot }) => {
    const response = await api.post('/pemetaan-cpl', {
      action: 'store',
      mata_kuliah_id,
      cpls: [
        {
          cpl_id: parseInt(cpl_id),
          bobot: bobot,
        },
      ],
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

  delete: async ({ mata_kuliah_id, cpl_id = null }) => {
    const response = await api.post('/pemetaan-cpl', {
      action: 'delete',
      mata_kuliah_id,
      ...(cpl_id ? { cpl_id } : {}), // hanya kirim cpl_id jika ada
    })
    return response.data
  },
}

export default PemetaanCPLService
