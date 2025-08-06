import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import PemetaanCPLService from '../../services/admin-prodi/PemetaanCPLService'

export const usePemetaanCPL = (mataKuliahId) => {
  const queryClient = useQueryClient()

  const pemetaanQuery = useQuery({
    queryKey: ['pemetaan-cpl', mataKuliahId],
    queryFn: () => PemetaanCPLService.getByMataKuliah(mataKuliahId),
    select: (res) => res.data || [],
    enabled: !!mataKuliahId,
    staleTime: 1000 * 60,
  })

  const storeMutation = useMutation({
    mutationFn: (data) => PemetaanCPLService.store(data),
    onSuccess: () => {
      toast.success('Pemetaan CPL berhasil ditambahkan')
      queryClient.invalidateQueries(['pemetaan-cpl', mataKuliahId])
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Gagal menambahkan pemetaan CPL')
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data) => PemetaanCPLService.update(data),
    onSuccess: () => {
      toast.success('Pemetaan CPL berhasil diperbarui')
      queryClient.invalidateQueries(['pemetaan-cpl', mataKuliahId])
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Gagal memperbarui pemetaan CPL')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (data) => PemetaanCPLService.delete(data),
    onSuccess: () => {
      toast.success('Pemetaan CPL berhasil dihapus')
      queryClient.invalidateQueries(['pemetaan-cpl', mataKuliahId])
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Gagal menghapus pemetaan CPL')
    },
  })

  return {
    pemetaanData: pemetaanQuery.data,
    isLoading: pemetaanQuery.isLoading,
    isError: pemetaanQuery.isError,

    storePemetaan: storeMutation.mutate,
    updatePemetaan: updateMutation.mutate,
    deletePemetaan: deleteMutation.mutate,

    isStoring: storeMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    refetch: pemetaanQuery.refetch,
  }
}
