import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import PemetaanCPLService from '../../services/admin-prodi/PemetaanCPLService'
import { toast } from 'react-toastify'

export const usePemetaanCPL = (mataKuliahId = null) => {
  const queryClient = useQueryClient()

  // Query untuk mengambil data pemetaan berdasarkan mata kuliah
  const pemetaanQuery = useQuery({
    queryKey: ['pemetaan-cpl', mataKuliahId],
    queryFn: () => {
      if (mataKuliahId) {
        return PemetaanCPLService.getPemetaanByMataKuliah(mataKuliahId)
      }
      return PemetaanCPLService.getAllPemetaan()
    },
    enabled: !!mataKuliahId || mataKuliahId === null,
    staleTime: 5 * 60 * 1000, // 5 menit
    cacheTime: 10 * 60 * 1000, // 10 menit
  })

  // Mutation untuk menyimpan pemetaan CPL
  const storePemetaanMutation = useMutation({
    mutationFn: PemetaanCPLService.storePemetaan,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['pemetaan-cpl'])
      toast.success('Pemetaan CPL berhasil disimpan')
    },
    onError: (error) => {
      console.error('Error storing pemetaan:', error)
      const errorMessage = error.response?.data?.message || 'Gagal menyimpan pemetaan CPL'
      toast.error(errorMessage)
    },
  })

  // Mutation untuk update pemetaan CPL
  const updatePemetaanMutation = useMutation({
    mutationFn: ({ id, data }) => PemetaanCPLService.updatePemetaan(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['pemetaan-cpl'])
      toast.success('Pemetaan CPL berhasil diperbarui')
    },
    onError: (error) => {
      console.error('Error updating pemetaan:', error)
      const errorMessage = error.response?.data?.message || 'Gagal memperbarui pemetaan CPL'
      toast.error(errorMessage)
    },
  })

  // Mutation untuk menghapus pemetaan CPL
  const deletePemetaanMutation = useMutation({
    mutationFn: PemetaanCPLService.deletePemetaan,
    onSuccess: () => {
      queryClient.invalidateQueries(['pemetaan-cpl'])
      toast.success('Pemetaan CPL berhasil dihapus')
    },
    onError: (error) => {
      console.error('Error deleting pemetaan:', error)
      const errorMessage = error.response?.data?.message || 'Gagal menghapus pemetaan CPL'
      toast.error(errorMessage)
    },
  })

  // Helper function untuk menyimpan pemetaan
  const storePemetaan = (mataKuliahId, cplData) => {
    const payload = {
      action: 'store',
      mata_kuliah_id: mataKuliahId,
      cpls: cplData.map((cpl) => ({
        cpl_id: cpl.cpl_id,
        bobot: parseFloat(cpl.bobot),
      })),
    }

    storePemetaanMutation.mutate(payload)
  }

  // Helper function untuk update pemetaan
  const updatePemetaan = (id, mataKuliahId, cplData) => {
    const payload = {
      action: 'update',
      mata_kuliah_id: mataKuliahId,
      cpls: cplData.map((cpl) => ({
        cpl_id: cpl.cpl_id,
        bobot: parseFloat(cpl.bobot),
      })),
    }

    updatePemetaanMutation.mutate({ id, data: payload })
  }

  // Helper function untuk menghapus pemetaan
  const deletePemetaan = (id) => {
    deletePemetaanMutation.mutate(id)
  }

  return {
    // Data
    pemetaanData: pemetaanQuery.data,
    isLoading: pemetaanQuery.isLoading,
    isError: pemetaanQuery.isError,
    error: pemetaanQuery.error,

    // Actions
    storePemetaan,
    updatePemetaan,
    deletePemetaan,

    // Mutation states
    isStoring: storePemetaanMutation.isPending,
    isUpdating: updatePemetaanMutation.isPending,
    isDeleting: deletePemetaanMutation.isPending,

    // Refetch
    refetch: pemetaanQuery.refetch,
  }
}
