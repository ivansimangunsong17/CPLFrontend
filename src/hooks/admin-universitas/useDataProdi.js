import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import prodiService from '../../services/admin-universitas/DataProdiService'

export const useProdiList = () => {
  return useQuery({
    queryKey: ['prodi'],
    queryFn: () => prodiService.getAll().then((res) => res.data.data),
  })
}

export const useAddProdi = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: prodiService.create,
    onSuccess: () => queryClient.invalidateQueries(['prodi']),
  })
}

export const useUpdateProdi = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: prodiService.update,
    onSuccess: () => queryClient.invalidateQueries(['prodi']),
  })
}

export const useDeleteProdi = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: prodiService.delete,
    onSuccess: () => queryClient.invalidateQueries(['prodi']),
  })
}

export const useProdiDetail = (prodiId) => {
  return useQuery({
    queryKey: ['prodi', prodiId],
    queryFn: () =>
      prodiService.getAll().then((res) => {
        const prodiList = res.data.data
        return prodiList.find((item) => item.prodi_id.toString() === prodiId.toString())
      }),
    enabled: !!prodiId,
  })
}
