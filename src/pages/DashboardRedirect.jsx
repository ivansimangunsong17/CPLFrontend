import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from '../components/LoadingScreen';

const DashboardRedirect = () => {
    const navigate = useNavigate();
    const { user, roles, loading, getDashboardUrl } = useAuth();

    useEffect(() => {
        if (!loading && user && roles.length > 0) {
            const dashboardUrl = getDashboardUrl();
            console.log('DashboardRedirect - redirecting to:', dashboardUrl);
            navigate(dashboardUrl, { replace: true });
        } else if (!loading && !user) {
            console.log('DashboardRedirect - no user, redirecting to login');
            navigate('/login', { replace: true });
        }
    }, [loading, user, roles, navigate, getDashboardUrl]);

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Mengarahkan ke dashboard...</h2>
                <LoadingScreen />
            </div>
        </div>
    );
};

export default DashboardRedirect;
