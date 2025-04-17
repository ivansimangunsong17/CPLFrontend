import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (username, password) => {
        const validUsers = {
            "admin": { role: "admin_universitas" },
            "prodi": { role: "admin_prodi" },
            "kaprodi": { role: "kaprodi" },
            "dosen": { role: "dosen" }
        };

        if (validUsers[username]) {
            setUser(validUsers[username]);
            localStorage.setItem("user", JSON.stringify(validUsers[username]));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
