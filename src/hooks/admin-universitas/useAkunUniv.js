import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import akunService from '../../services/admin-universitas/AkunService'

export const useAdminUnivList = () =>
  useQuery({
    queryKey: ['akun-univ'],
    queryFn: () => akunService.adminUniv.getAll().then((res) => res.data.data),
  })

export const useAddAdminUniv = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: akunService.adminUniv.create,
    onSuccess: (data) => {
      console.log('Add Admin Univ success:', data)
      queryClient.invalidateQueries({ queryKey: ['akun-univ'] })
    },
    onError: (error) => {
      console.error('Add Admin Univ error:', error)
    },
  })
}

export const useUpdateAdminUniv = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: akunService.adminUniv.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['akun-univ'] })
    },
  })
}

export const useDeleteAdminUniv = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: akunService.adminUniv.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['akun-univ'] })
    },
  })
}
