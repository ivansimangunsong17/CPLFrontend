import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UnauthorizedPage = () => {
    const navigate = useNavigate();
    const { getDashboardUrl } = useAuth();

    const handleGoToDashboard = () => {
        const dashboardUrl = getDashboardUrl();
        navigate(dashboardUrl);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
                <div className="mb-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Akses Ditolak</h1>
                    <p className="text-gray-600 mb-6">
                        Anda tidak memiliki izin untuk mengakses halaman ini.
                        Silakan hubungi administrator jika Anda yakin ini adalah kesalahan.
                    </p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={handleGoToDashboard}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Kembali ke Dashboard
                    </button>

                    <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                    >
                        Login Ulang
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
