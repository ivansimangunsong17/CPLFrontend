import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import PemetaanCPMKService from '../../services/admin-prodi/PemetaanCPMKService';


export const usePemetaanCPMK = (mataKuliahId) => {
  const queryClient = useQueryClient();
  const queryKey = ['pemetaan-cpmk', mataKuliahId];

  // Query untuk mengambil data pemetaan
  const pemetaanCPMKQuery = useQuery({
    queryKey: queryKey,
    queryFn: () => PemetaanCPMKService.getByMataKuliah(mataKuliahId),
    select: (res) => res.data || [], // Mengambil array data dari response
    enabled: !!mataKuliahId,
    staleTime: 1000 * 60 * 5,
  });

  // Opsi umum untuk semua mutasi
  const mutationOptions = {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKey });
      
      switch (context.action) {
        case 'create':
          toast.success('Pemetaan CPMK berhasil ditambahkan!');
          break;
        case 'update':
          toast.success('Pemetaan CPMK berhasil diperbarui!');
          break;
        case 'delete':
          toast.success('Pemetaan CPMK berhasil dihapus.');
          break;
        default:
          toast.success(data.message || 'Aksi berhasil dilakukan!');
      }
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Terjadi kesalahan pada server.';
      toast.error(message);
    },
  };

  // Mutasi untuk menambahkan pemetaan baru
  const createCPMKMutation = useMutation({
    ...mutationOptions,
    mutationFn: PemetaanCPMKService.store,
    onMutate: () => ({ action: 'create' }),
  });

  // Mutasi untuk memperbarui pemetaan
  const updateCPMKMutation = useMutation({
    ...mutationOptions,
    mutationFn: PemetaanCPMKService.update,
    onMutate: () => ({ action: 'update' }),
  });

  // Mutasi untuk menghapus satu pemetaan
  const deleteCPMKMutation = useMutation({
    ...mutationOptions,
    mutationFn: PemetaanCPMKService.delete,
    onMutate: () => ({ action: 'delete' }),
  });

  return {
    pemetaanCPMKQuery,
    createCPMKMutation,
    updateCPMKMutation,
    deleteCPMKMutation,
  };
};

