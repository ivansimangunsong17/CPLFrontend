import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCPMKByMatkul, createCPMK, updateCPMK, deleteCPMK } from '../../services/admin-prodi/DataCPMKService'
import { toast } from 'react-toastify'

export function useCPMK(mataKuliahId) {
  const queryClient = useQueryClient()

  const cpmkQuery = useQuery({
    queryKey: ['cpmk', Number(mataKuliahId)],
    queryFn: () => getCPMKByMatkul(Number(mataKuliahId)),
    select: (data) => {
      // Data sudah berupa array dari service
      return data.filter((item) => item.mata_kuliah_id === Number(mataKuliahId))
    },
    enabled: Boolean(mataKuliahId),
  })

  // Tambah CPMK
  const createMutation = useMutation({
    mutationFn: createCPMK,
    onSuccess: () => {
      toast.success('CPMK berhasil ditambahkan')
      queryClient.invalidateQueries(['cpmk-matkul', mataKuliahId])
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Gagal menambahkan CPMK'),
  })

  // Update CPMK
  const updateMutation = useMutation({
    mutationFn: updateCPMK,
    onSuccess: () => {
      toast.success('CPMK berhasil diperbarui')
      queryClient.invalidateQueries(['cpmk-matkul', mataKuliahId])
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Gagal memperbarui CPMK'),
  })

  // Hapus CPMK
  const deleteMutation = useMutation({
    mutationFn: deleteCPMK,
    onSuccess: () => {
      queryClient.invalidateQueries(['cpmk-matkul', mataKuliahId])
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Gagal menghapus CPMK'),
  })

  return { cpmkQuery, createMutation, updateMutation, deleteMutation }
}
