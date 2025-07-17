import { toast } from 'react-toastify'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCPMK, createCPMK, updateCPMK, deleteCPMK } from '../../services/admin-prodi/DataCPMKService'

export const useCPMK = (prodiId) => {
  const queryClient = useQueryClient()

  console.log('useCPMK hook called with prodiId:', prodiId)

  const cpmkQuery = useQuery({
    queryKey: ['cpmk', prodiId],
    queryFn: () => {
      console.log('Query function called for prodiId:', prodiId)
      return getCPMK(prodiId)
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!prodiId, // Only run query if prodiId is available
    retry: (failureCount, error) => {
      // Don't retry on 422 errors
      if (error?.response?.status === 422) {
        return false
      }
      return failureCount < 1
    },
    onSuccess: (data) => {
      console.log('CPMK Query Success:', data)
    },
    onError: (error) => {
      console.error('CPMK Query Error:', error)
    },
  })

  const createMutation = useMutation({
    mutationFn: (data) => {
      console.log('useCPMK createMutation called with:', data)
      return createCPMK(data)
    },
    onSuccess: (result) => {
      console.log('useCPMK createMutation success:', result)
      toast.success('CPMK berhasil ditambahkan')
      queryClient.invalidateQueries(['cpmk', prodiId])
    },
    onError: (error) => {
      console.error('useCPMK createMutation error:', error)
      toast.error(error.message || 'Gagal menambahkan CPMK')
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateCPMK,
    onSuccess: () => {
      toast.success('Data CPMK berhasil diperbarui')
      queryClient.invalidateQueries(['cpmk', prodiId])
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal memperbarui CPMK')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteCPMK,
    onSuccess: () => {
      toast.success('CPMK berhasil dihapus')
      queryClient.invalidateQueries(['cpmk', prodiId])
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal menghapus CPMK')
    },
  })

  return {
    cpmkQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
