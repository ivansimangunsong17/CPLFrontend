
import api from '../../api/api';



export const getAdminUniversitas = () => {
  return api.post('/kelola-akun-admin-universitas', {
    action: 'view',
  });
};

export const getAdminProdi = () => {
  return api.post('/kelola-akun-admin-prodi', {
    action: 'view',
  });
};

export const saveAkun = (data, target, mode) => {
  const endpoint = target === 'adminUniv' ? '/kelola-akun-admin-universitas' : '/kelola-akun-admin-prodi';

  const payload = {
    action: mode === 'create' ? 'store' : 'update',
    name: data.name,
    email: data.email,
    ...(data.password && { password: data.password }),
    ...(data.password_confirmation && { password_confirmation: data.password_confirmation }),
    ...(mode === 'edit' && { id: data.id }),
    ...(target === 'adminProdi' && { prodi_id: data.prodi_id }),
  };



  return api.post(endpoint, payload);
};

export const deleteAkun = (id, isUniv) => {
  const endpoint = isUniv ? '/kelola-akun-admin-universitas' : '/kelola-akun-admin-prodi';

  return api.post(endpoint, {
    action: 'delete',
    id,
  });
};

const akunService = {
  adminUniv: {
    getAll: () =>
      api.post('/kelola-akun-admin-universitas', {
        action: 'view',
      }),

    create: (data) =>
      api.post('/kelola-akun-admin-universitas', {
        action: 'store',
        ...data,
      }),

    update: (data) =>
      api.post('/kelola-akun-admin-universitas', {
        action: 'update',
        ...data,
      }),

    delete: (id) =>
      api.post('/kelola-akun-admin-universitas', {
        action: 'delete',
        id,
      }),
  },

  adminProdi: {
    getAll: () =>
      api.post('/kelola-akun-admin-prodi', {
        action: 'view',
      }),

    create: (data) =>
      api.post('/kelola-akun-admin-prodi', {
        action: 'store',
        ...data,
      }),

    update: (data) =>
      api.post('/kelola-akun-admin-prodi', {
        action: 'update',
        ...data,
      }),

    delete: (id) =>
      api.post('/kelola-akun-admin-prodi', {
        action: 'delete',
        id,
      }),
  },
};

export default akunService;
