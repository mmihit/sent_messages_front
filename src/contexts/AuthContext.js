import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from 'react';
import { Backend_URL } from '../constants/config';
import { Get } from '../helpers/fetch';
import { GetToken, RemoveToken } from '../helpers/token';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setTokenState] = useState(null);
    const [role, setRole] = useState(null); // <-- user role
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Helper to load token from storage
    const loadToken = async () => {
        try {
            const storedToken = await GetToken();
            if (storedToken) {
                // Optionally validate token via backend
                const response = await Get(Backend_URL, '/validate-token');
                if (response.code === 200) {
                    setTokenState(storedToken);
                    router.push('/'); // go to home if valid
                } else {
                    await RemoveToken();
                    setTokenState(null);
                    router.push('/login'); // invalid token
                }
            } else {
                router.push('/login'); // no token
            }
        } catch (e) {
            console.log('Auth load error:', e);
            router.push('/login');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadToken();
    }, []);

    const setToken = async (newToken) => {
        if (newToken) {
            await SecureStore.setItemAsync('token', newToken);
            setTokenState(newToken);
        } else {
            await SecureStore.deleteItemAsync('token');
            setTokenState(null);
            router.push('/login');
        }
    };

    return (
        <AuthContext.Provider value={{ token, setToken, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy usage
export const useAuth = () => useContext(AuthContext);
