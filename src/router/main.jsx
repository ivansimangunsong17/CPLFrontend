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
  DataProdiUniv,
  DetailProdiUniv,
  DashboardProdi,
  AkunProdi,
  HasilPerhitunganProdi,
  DataCPL,
  DataMahasiswaProdi,
  DataMataKuliahProdi,
  DetailMataKuliahProdi,
  PemetaanProdi,
  DetailPemetaanProdi,
  AturPenilaianProdi,
  DashboardKaprodi,
  DataMahasiswaKaprodi,
  DataMataKuliahKaprodi,
  DataProdiKaprodi,
  HasilPerhitunganKaprodi,
  PemetaanCPLKaprodi,
  DashboardDosen,
  HasilPerhitunganDosen,
  InputNilaiDosen
} from './index';

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
              { path: "detail_prodi/:prodiId", element: <DetailProdiUniv /> },
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
              { path: "hasil_perhitungan", element: <HasilPerhitunganProdi /> },
              { path: "atur_penilaian", element: <AturPenilaianProdi /> },
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
              { path: "data_prodi", element: <DataProdiKaprodi /> },
              { path: "data_mahasiswa", element: <DataMahasiswaKaprodi /> },
              { path: "data_matakuliah", element: <DataMataKuliahKaprodi /> },
              { path: "pemetaan_cpl", element: <PemetaanCPLKaprodi /> },
              { path: "hasil_perhitungan", element: <HasilPerhitunganKaprodi /> },
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
              { path: "input_nilai", element: <InputNilaiDosen /> },
              { path: "hasil_perhitungan", element: <HasilPerhitunganDosen /> },
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
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
