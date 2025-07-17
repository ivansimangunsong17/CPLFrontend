import api from '../../api/api'

const prodiService = {
  getAll: () =>
    api.post('/kelola-data-prodi', {
      action: 'view',
    }),

  create: (data) =>
    api.post('/kelola-data-prodi', {
      action: 'store',
      ...data,
    }),

  update: (data) =>
    api.post('/kelola-data-prodi', {
      action: 'update',
      ...data,
    }),

  delete: (prodi_id) =>
    api.post('/kelola-data-prodi', {
      action: 'delete',
      prodi_id,
    }),
}

export default prodiService
