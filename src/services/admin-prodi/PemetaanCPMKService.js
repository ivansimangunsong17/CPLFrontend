import api from '../../api/api'

const PemetaanCPMKService = {
  getByMataKuliah: async (mataKuliahId) => {
    const response = await api.post('/pemetaan-cpmk', {
      action: 'view',
      mata_kuliah_id: mataKuliahId,
    })
    return response.data
  },

  store: async ({ mata_kuliah_id, cpmks }) => {
    const response = await api.post('/pemetaan-cpmk', {
      action: 'store',
      mata_kuliah_id,
      cpmks,
    })
    return response.data
  },

  update: async ({ mata_kuliah_id, cpmks }) => {
    const response = await api.post('/pemetaan-cpmk', {
      action: 'update',
      mata_kuliah_id,
      cpmks,
    })
    return response.data
  },

  delete: async ({ cpmk_mata_kuliah_id }) => {
  if (!cpmk_mata_kuliah_id) {
    throw new Error("cpmk_mata_kuliah_id wajib diisi untuk menghapus data");
  }

  const response = await api.post('/pemetaan-cpmk', {
    action: 'delete',
    cpmk_mata_kuliah_id,
  });

  return response.data;
},

}

export default PemetaanCPMKService
