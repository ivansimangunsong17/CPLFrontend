import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useParams } from 'react-router-dom';

const DebugInfo = () => {
    const { user, roles } = useAuth();
    const location = useLocation();
    const params = useParams();

    if (process.env.NODE_ENV !== 'development') return null;

    return (
        <div className="fixed bottom-4 right-4 bg-black text-white p-3 rounded-lg text-xs max-w-sm z-50">
            <div className="font-bold mb-2">Debug Info</div>
            <div><strong>User ID:</strong> {user?.id}</div>
            <div><strong>Prodi ID:</strong> {user?.prodi_id}</div>
            <div><strong>Email:</strong> {user?.email}</div>
            <div><strong>Role:</strong> {roles?.[0]}</div>
            <div><strong>Path:</strong> {location.pathname}</div>
            <div><strong>Params:</strong> {JSON.stringify(params)}</div>
        </div>
    );
};

export default DebugInfo;
