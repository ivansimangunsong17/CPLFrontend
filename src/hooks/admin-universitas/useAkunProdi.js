import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import akunService from '../../services/admin-universitas/AkunService'

export const useAdminProdiList = () =>
  useQuery({
    queryKey: ['akun-prodi'],
    queryFn: () => akunService.adminProdi.getAll().then((res) => res.data.data),
  })

export const useAddAdminProdi = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: akunService.adminProdi.create,
    onSuccess: (data) => {
      console.log('Add Admin Prodi success:', data)
      queryClient.invalidateQueries({ queryKey: ['akun-prodi'] })
    },
    onError: (error) => {
      console.error('Add Admin Prodi error:', error)
    },
  })
}

export const useUpdateAdminProdi = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: akunService.adminProdi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['akun-prodi'] })
    },
  })
}

export const useDeleteAdminProdi = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: akunService.adminProdi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['akun-prodi'] })
    },
  })
}
