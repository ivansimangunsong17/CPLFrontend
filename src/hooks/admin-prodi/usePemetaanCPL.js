import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import PemetaanCPLService from '../../services/admin-prodi/PemetaanCPLService'

export const usePemetaanCPL = (mataKuliahId) => {
  const queryClient = useQueryClient()

  // Query untuk mengambil data pemetaan
  const pemetaanQuery = useQuery({
    queryKey: ['pemetaan-cpl', mataKuliahId],
    queryFn: () => PemetaanCPLService.getByMataKuliah(mataKuliahId),
    select: (res) => res.data || [],
    enabled: !!mataKuliahId, // Query hanya berjalan jika mataKuliahId ada
    staleTime: 1000 * 60 * 5, // Cache data selama 5 menit
  })

  // Opsi umum untuk semua mutasi (create, update, delete)
  const mutationOptions = {
    onSuccess: (data, variables, context) => {
      // Setelah mutasi berhasil, invalidasi query agar data di-refetch
      queryClient.invalidateQueries({ queryKey: ['pemetaan-cpl', mataKuliahId] })

      // Tampilkan notifikasi toast sesuai dengan aksi yang dilakukan
      switch (context.action) {
        case 'create':
          toast.success('Pemetaan berhasil ditambahkan!')
          break
        case 'update':
          toast.success('Pemetaan berhasil diperbarui!')
          break
        case 'delete':
          toast.success('Pemetaan berhasil dihapus.')
          break
        case 'deleteAll':
          toast.success('Semua pemetaan berhasil dihapus.')
          break
        default:
          toast.success('Aksi berhasil dilakukan!')
      }
    },
    onError: (error) => {
      // Tangani error secara global
      const message = error?.response?.data?.message || 'Terjadi kesalahan pada server.'
      toast.error(message)
    },
  }

  // Mutasi untuk menambahkan pemetaan baru
  const createMutation = useMutation({
    ...mutationOptions,
    mutationFn: PemetaanCPLService.store,
    onMutate: () => ({ action: 'create' }), // Kirim konteks untuk notifikasi
  })

  // Mutasi untuk memperbarui pemetaan
  const updateMutation = useMutation({
    ...mutationOptions,
    mutationFn: PemetaanCPLService.update,
    onMutate: () => ({ action: 'update' }),
  })

  // Mutasi untuk menghapus satu pemetaan
  const deleteMutation = useMutation({
    ...mutationOptions,
    mutationFn: PemetaanCPLService.delete,
    onMutate: () => ({ action: 'delete' }),
  })

  // Mutasi untuk menghapus semua pemetaan
  const deleteAllMutation = useMutation({
    ...mutationOptions,
    mutationFn: PemetaanCPLService.deleteAll,
    onMutate: () => ({ action: 'deleteAll' }),
  })

  return {
    pemetaanQuery, // Pastikan ini diekspor!
    createMutation,
    updateMutation,
    deleteMutation,
    deleteAllMutation,
  }
}
