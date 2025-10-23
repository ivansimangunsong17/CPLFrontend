import api from '../../api/api'; // Pastikan path ini benar

const BASE_URL = '/kelola-sub-penilaian';

// GET: Mengambil semua sub-penilaian untuk kelas tertentu
export const getSubPenilaianByKelas = async (kelas_id) => {
  try {
    const response = await api.post(BASE_URL, {
      action: 'view',
      kelas_id,
    });
    // Asumsi API mengembalikan data dalam response.data.data
    return response.data?.data || [];
  } catch (error) {
    console.error('Error fetching Sub Penilaian:', error);
    throw error; // Lempar error agar React Query bisa menangkapnya
  }
};

// CREATE: Menambah sub-penilaian baru beserta pemetaan CPMK awal
export const createSubPenilaian = async (payload) => {
  // Payload harus berisi: penilaian_id, kelas_id, nama_sub_penilaian, cpmks (array)
  try {
    const response = await api.post(BASE_URL, {
      action: 'store',
      ...payload, // Kirim semua data dari payload
    });
    return response.data; // Kembalikan seluruh respons
  } catch (error) {
    console.error('Error creating Sub Penilaian:', error);
    throw error;
  }
};

// UPDATE: Memperbarui nama sub-penilaian (asumsi hanya nama)
export const updateSubPenilaian = async ({ sub_penilaian_id, nama_sub_penilaian }) => {
  try {
    const response = await api.post(BASE_URL, {
      action: 'update',
      sub_penilaian_id, // ID dari sub-penilaian yang akan diupdate
      nama_sub_penilaian, // Nama baru
    });
    return response.data;
  } catch (error) {
    console.error('Error updating Sub Penilaian:', error);
    throw error;
  }
};

// DELETE: Menghapus sub-penilaian
export const deleteSubPenilaian = async ({ sub_penilaian_id }) => {
  try {
    const response = await api.post(BASE_URL, {
      action: 'delete',
      sub_penilaian_id, // ID dari sub-penilaian yang akan dihapus
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting Sub Penilaian:', error);
    throw error;
  }
};