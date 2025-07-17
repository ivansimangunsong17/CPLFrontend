import { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const safeParse = (item) => {
            try {
                return item ? JSON.parse(item) : null
            } catch {
                return null
            }
        }

        const storedUser = safeParse(localStorage.getItem('user'))
        const storedRoles = safeParse(localStorage.getItem('roles'))

        if (storedUser) setUser(storedUser)
        if (storedRoles) setRoles(storedRoles)
        setLoading(false)
    }, [])

    const login = ({ user, token, roles }) => {
        console.log('AuthContext.login - received:', { user, token, roles }); // Debug log
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('roles', JSON.stringify(roles || []));
        setUser(user);
        setRoles(roles || []);
        console.log('AuthContext.login - state updated'); // Debug log
    };

    const logout = () => {
        localStorage.clear()
        setUser(null)
        setRoles([])
    }

    // Helper function untuk mendapatkan role slug
    const getUserRoleSlug = () => {
        return roles?.[0]?.toLowerCase().replace(/\s+/g, "_");
    }

    // Helper function untuk mendapatkan dashboard URL
    const getDashboardUrl = (userData = null, rolesData = null) => {
        const currentUser = userData || user;
        const currentRoles = rolesData || roles;

        console.log('getDashboardUrl - currentUser:', currentUser); // Debug log
        console.log('getDashboardUrl - currentRoles:', currentRoles); // Debug log

        const roleSlug = currentRoles?.[0]?.toLowerCase().replace(/\s+/g, "_");
        console.log('getDashboardUrl - roleSlug:', roleSlug); // Debug log

        // Untuk semua role, gunakan URL standar tanpa parameter dynamic
        if (roleSlug) {
            const url = `/dashboard/${roleSlug}`;
            console.log('getDashboardUrl - standard URL:', url); // Debug log
            return url;
        }

        // Fallback jika tidak ada role
        console.log('getDashboardUrl - no role found, returning fallback'); // Debug log
        return '/dashboard';
    }

    return (
        <AuthContext.Provider value={{
            user,
            roles,
            loading,
            login,
            logout,
            getUserRoleSlug,
            getDashboardUrl
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
