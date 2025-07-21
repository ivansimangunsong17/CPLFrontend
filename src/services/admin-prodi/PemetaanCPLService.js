import api from '../../api/api'

const PemetaanCPLService = {
  // Menyimpan pemetaan CPL
  storePemetaan: async (data) => {
    try {
      const response = await api.post('/pemetaan-cpl', data)
      return response.data
    } catch (error) {
      console.error('Error storing pemetaan CPL:', error)
      throw error
    }
  },

  // Mengambil data pemetaan berdasarkan mata kuliah
  getPemetaanByMataKuliah: async (mataKuliahId) => {
    try {
      const response = await api.get(`/pemetaan-cpl/mata-kuliah/${mataKuliahId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching pemetaan CPL:', error)
      throw error
    }
  },

  // Mengambil semua data pemetaan
  getAllPemetaan: async () => {
    try {
      const response = await api.get('/pemetaan-cpl')
      return response.data
    } catch (error) {
      console.error('Error fetching all pemetaan CPL:', error)
      throw error
    }
  },

  // Update pemetaan CPL
  updatePemetaan: async (id, data) => {
    try {
      const response = await api.put(`/pemetaan-cpl/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Error updating pemetaan CPL:', error)
      throw error
    }
  },

  // Menghapus pemetaan CPL
  deletePemetaan: async (id) => {
    try {
      const response = await api.delete(`/pemetaan-cpl/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting pemetaan CPL:', error)
      throw error
    }
  },
}

export default PemetaanCPLService
