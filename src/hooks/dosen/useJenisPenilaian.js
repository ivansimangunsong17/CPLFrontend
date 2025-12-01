import { useQuery } from '@tanstack/react-query'

// Dummy data for jenis penilaian
const dummyJenisPenilaian = [
  {
    penilaian_id: 1,
    nama_penilaian: 'UTS',
    bobot: 30,
  },
  {
    penilaian_id: 2,
    nama_penilaian: 'UAS',
    bobot: 40,
  },
  {
    penilaian_id: 3,
    nama_penilaian: 'Tugas',
    bobot: 20,
  },
  {
    penilaian_id: 4,
    nama_penilaian: 'Kuis',
    bobot: 10,
  },
]

export function useJenisPenilaian() {
  const jenisPenilaianQuery = useQuery({
    queryKey: ['jenisPenilaian'],
    queryFn: () => Promise.resolve(dummyJenisPenilaian), // Return dummy data
  })

  return { jenisPenilaianQuery }
}
