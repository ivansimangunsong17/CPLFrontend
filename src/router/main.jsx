import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '../index.css';
import PrivateRoutes from '../routes/PrivateRoutes';
import { AuthProvider } from '../context/AuthContext';

import {
  LoginPage,
  NotFoundPage,
  DashboardLayout,

  DashboardUniversitas,
  AkunUniversitas,
  HasilPerhitunganUniv,
  DataFakultasUniv,
  DataProdiUniv,

  DashboardProdi,
  AkunProdi,
  PemetaanCPLProdi,
  PemetaanCPMKProdi,
  HasilPerhitunganProdi,
  DataProdi,
  DataMahasiswaProdi,
  DataMataKuliahProdi,

  DashboardKaprodi,
  DataMahasiswaKaprodi,
  DataMataKuliahKaprodi,
  DataProdiKaprodi,
  HasilPerhitunganKaprodi,
  PemetaanCPLKaprodi,
  PemetaanCPMKKaprodi,


  DashboardDosen,
  HasilPerhitunganDosen,
  InputNilaiDosen,



} from './index';

import DashboardLanding from '../pages/DashboardLanding';


const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/login", element: <LoginPage /> },
  {
    path: "dashboard",
    element: <PrivateRoutes />,
    children: [
      { path: "", element: <DashboardLanding /> },
      {
        path: "admin_universitas",
        element: <DashboardLayout />, // Layout
        children: [
          { path: "", element: <DashboardUniversitas /> }, // Default halaman utama
          { path: "data_akun", element: <AkunUniversitas /> },
          { path: "data_fakultas", element: <DataFakultasUniv />},
          { path: "data_prodi", element: <DataProdiUniv /> },
          { path: "hasil_perhitungan", element: <HasilPerhitunganUniv /> },

        ],
      },
      {
        path: "admin_prodi",
        element: <DashboardLayout />,
        children: [
          { path: "", element: <DashboardProdi /> },
          { path: "data_akun", element: <AkunProdi /> },
          { path: "data_prodi", element: <DataProdi /> },
          { path: "data_mahasiswa", element: <DataMahasiswaProdi /> },
          { path: "data_matakuliah", element: <DataMataKuliahProdi /> },
          { path: "pemetaan_cpl", element: <PemetaanCPLProdi /> },
          { path: "pemetaan_cpmk", element: <PemetaanCPMKProdi /> },
          { path: "hasil_perhitungan", element: <HasilPerhitunganProdi /> },
        ],
      },
      {
        path: "kaprodi",
        element: <DashboardLayout />,
        children: [
          { path: "", element: <DashboardKaprodi /> },
          { path: "data_prodi", element: <DataProdiKaprodi /> },
          { path: "data_mahasiswa", element: <DataMahasiswaKaprodi /> },
          { path: "data_matakuliah", element: <DataMataKuliahKaprodi /> },
          { path: "pemetaan_cpl", element: <PemetaanCPLKaprodi /> },
          { path: "pemetaan_cpmk", element: <PemetaanCPMKKaprodi /> },
          { path: "hasil_perhitungan", element: <HasilPerhitunganKaprodi /> },
        ],
      },
      {
        path: "dosen",
        element: <DashboardLayout />,
        children: [
          { path: "", element: <DashboardDosen /> },
          { path: "input_nilai", element: <InputNilaiDosen /> },
          { path: "hasil_perhitungan", element: <HasilPerhitunganDosen /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
