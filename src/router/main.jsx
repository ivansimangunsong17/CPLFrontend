import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PrivateRoutes from '../routes/PrivateRoutes';
import { AuthProvider } from '../context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../index.css';

// import semua komponen dari index.js
import {
  LoginPage,
  NotFoundPage,
  UnauthorizedPage,
  DashboardLayout,
  DashboardRedirect,
  DashboardUniversitas,
  AkunUniversitas,
  HasilPerhitunganUniv,
  DetailHasilPerhitunganUniv,
  DetailHasilPerhitunganKelasUniv,
  DataProdiUniv,
  DashboardProdi,
  AkunProdi,
  HasilPerhitunganProdi,
  DataCPL,
  DataMahasiswaProdi,
  DataMataKuliahProdi,
  DetailMataKuliahProdi,
  DetailAturPenilaianProdi,
  DetailKelasProdi,
  PemetaanProdi,
  DetailPemetaanProdi,
  AturPenilaianProdi,
  DashboardKaprodi,
  HasilPerhitunganKaprodi,
  DashboardDosen,
  HasilPerhitunganDosen,
  PenilaianDosen,
  DetailPenilaianProdi,
  DetailHasilPerhitungan,
  AturPenilaianDosen,
  DetailAturPenilaianDosen,
  DetailDistribusiMatakuliah,
  DetailDistribusiKelas,
  DetailDistribusiMahasiswa,
  DetailMonitoringMahasiswa,
  DetailMonitoringMatakuliahMahasiswa,
  DetailDistribusiDosen,
  DetailDistribusiMahasiswaDosen,
  DetailHasilPerhitunganDosen,
  DetailMonitoringMahasiswaKaprodi,
  DetailDistribusiMatakuliahKaprodi,
  DetailDistribusiKelasKaprodi,
  DetailDistribusiMahasiswaKaprodi,
  PemetaanKaprodi,
  DetailDataMasterKaprodi,
  DetailPemetaanKaprodi,

} from './index';
import DetailPenilaianDosen from '../pages/dosen/DetailPenilaianDosen';
import DataMasterKaprodi from '../pages/kaprodi/DataMasterKaprodi';
import DetailHasilPerhitunganKaprodi from '../pages/kaprodi/DetailHasilPerhitunganKaprodi';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/login", element: <LoginPage /> },
  {
    path: "dashboard",
    children: [
      {
        path: "",
        element: <DashboardRedirect />
      },
      {
        path: "admin_universitas",
        element: <PrivateRoutes allowedRoles={["admin_universitas"]} />,
        children: [
          {
            path: "", element: <DashboardLayout />, children: [
              { path: "", element: <DashboardUniversitas /> },
              { path: "data_akun", element: <AkunUniversitas /> },
              { path: "data_prodi", element: <DataProdiUniv /> },
              { path: "hasil_perhitungan", element: <HasilPerhitunganUniv /> },
              { path: "hasil_perhitungan/:prodiId", element: <DetailHasilPerhitunganUniv /> },
              {
                path: "hasil_perhitungan/:prodiId/:kelasId", element: <DetailHasilPerhitunganKelasUniv />
              },
            ]
          },
        ],
      },

      {
        path: "admin_prodi",
        element: <PrivateRoutes allowedRoles={["admin_prodi"]} />,
        children: [
          {
            path: "", element: <DashboardLayout />, children: [
              { path: "", element: <DashboardProdi /> },
              { path: "data_akun", element: <AkunProdi /> },
              { path: "data_cpl", element: <DataCPL /> },
              { path: "data_mahasiswa", element: <DataMahasiswaProdi /> },
              { path: "data_matakuliah", element: <DataMataKuliahProdi /> },
              { path: "detail_matakuliah/:mataKuliahId", element: <DetailMataKuliahProdi /> },
              { path: "pemetaan_cpl", element: <PemetaanProdi /> },
              { path: "detail_pemetaan/:mataKuliahId", element: <DetailPemetaanProdi /> },
              { path: "detail_kelas/:kelasId", element: <DetailKelasProdi /> },
              { path: "hasil_perhitungan", element: <HasilPerhitunganProdi /> },
              { path: "atur_penilaian", element: <AturPenilaianProdi /> },
              { path: "atur_penilaian/:kelasId", element: <DetailAturPenilaianProdi /> },
              { path: "detail_penilaian/:mataKuliahId", element: <DetailPenilaianProdi /> },
              { path: "detail_hasil_perhitungan/:mataKuliahId", element: <DetailHasilPerhitungan /> },
              { path: "detail_distribusi_matakuliah/:mataKuliahId", element: <DetailDistribusiMatakuliah /> },
              { path: "detail_distribusi_matakuliah/:mataKuliahId/:kelasId", element: <DetailDistribusiKelas /> },
              { path: "detail_distribusi_matakuliah/:mataKuliahId/:kelasId/:mahasiswaId", element: <DetailDistribusiMahasiswa /> },
              { path: "detail_monitoring_mahasiswa/:mahasiswaId", element: <DetailMonitoringMahasiswa /> },
              { path: "detail_monitoring_mahasiswa/:mahasiswaId/:matakuliahId", element: <DetailMonitoringMatakuliahMahasiswa /> },


            ]
          },
        ],
      },
      {
        path: "kaprodi",
        element: <PrivateRoutes allowedRoles={["kaprodi"]} />,
        children: [
          {
            path: "", element: <DashboardLayout />, children: [
              { path: "", element: <DashboardKaprodi /> },
              { path: "detail_distribusi_matakuliah/:mataKuliahId", element: <DetailDistribusiMatakuliahKaprodi /> },
              { path: "detail_distribusi_matakuliah/:mataKuliahId/:kelasId", element: <DetailDistribusiKelasKaprodi /> },
              { path: "detail_monitoring_mahasiswa/:mahasiswaId", element: <DetailMonitoringMahasiswaKaprodi /> },
              { path: "detail_monitoring_mahasiswa/:mahasiswaId/:matakuliahId", element: <DetailMonitoringMatakuliahMahasiswa /> },
              { path: "detail_distribusi_matakuliah/:mataKuliahId/:kelasId/:mahasiswaId", element: <DetailDistribusiMahasiswaKaprodi /> },
              { path: "data_master", element: <DataMasterKaprodi /> },
              { path: "data_master/:mataKuliahId", element: <DetailDataMasterKaprodi /> },
              { path: "pemetaan", element: <PemetaanKaprodi /> },
              { path: "pemetaan/:mataKuliahId", element: <DetailPemetaanKaprodi /> },
              { path: "hasil_perhitungan", element: <HasilPerhitunganKaprodi /> },
              { path: "hasil_perhitungan/:matakuliahId", element: <DetailHasilPerhitunganKaprodi /> },
            ]
          },
        ],
      },
      {
        path: "dosen",
        element: <PrivateRoutes allowedRoles={["dosen"]} />,
        children: [
          {
            path: "", element: <DashboardLayout />, children: [
              { path: "", element: <DashboardDosen /> },
              { path: "detail_distribusi_kelas/:kelasId", element: <DetailDistribusiDosen /> },
              { path: "detail_distribusi_kelas/:kelasId/:mahasiswaId", element: <DetailDistribusiMahasiswaDosen /> },
              { path: "atur_penilaian", element: <AturPenilaianDosen /> },
              { path: "atur_penilaian/:kelasId", element: <DetailAturPenilaianDosen /> },
              { path: "detail_penilaian/:mataKuliahId", element: <DetailPenilaianDosen /> },
              { path: "penilaian", element: <PenilaianDosen /> },
              { path: "hasil_perhitungan", element: <HasilPerhitunganDosen /> },
              { path: "hasil_perhitungan/:kelasId", element: <DetailHasilPerhitunganDosen /> },

            ]
          },
        ],
      },
    ],
  },
  { path: "/unauthorized", element: <UnauthorizedPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 9999 }} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
