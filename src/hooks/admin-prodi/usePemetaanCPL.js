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

  const createMutation = useMutation({
    mutationFn: PemetaanCPLService.store,
    onSuccess: () => {
    
      queryClient.invalidateQueries(['pemetaan-cpl', mataKuliahId])
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Gagal menambahkan pemetaan CPL')
    },
  })

  const updateMutation = useMutation({
    mutationFn: PemetaanCPLService.update,
    onSuccess: () => {
   
      queryClient.invalidateQueries(['pemetaan-cpl', mataKuliahId])
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Gagal memperbarui pemetaan CPL')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: PemetaanCPLService.delete,
    onSuccess: () => {
      
      queryClient.invalidateQueries(['pemetaan-cpl', mataKuliahId])
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Gagal menghapus pemetaan CPL')
    },
  })

  return {
    pemetaanQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
