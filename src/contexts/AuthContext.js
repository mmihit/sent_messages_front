import { usePathname } from 'expo-router';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Backend_URL } from '../constants/config';
import { Get } from '../helpers/fetch';
import { RemoveToken } from '../helpers/token';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        profile: null,
        loading: true,
        isLogin: false,
    });

    const pathName = usePathname()
    
    const fetchProfile = useCallback(async () => {
        setAuthState(prev => ({ ...prev, loading: true }));
        
        try {
            const response = await Get(Backend_URL, '/get_me');
            console.log("response: ", response);
            
            if (response.code === 200) {
                console.log("User authenticated");
                // ✅ Update all state atomically in one call
                setAuthState({
                    profile: response.data,
                    isLogin: true,
                    loading: false,
                });
            } else {
                await RemoveToken();
                // ✅ Update all state atomically
                setAuthState({
                    profile: null,
                    isLogin: false,
                    loading: false,
                });
            }
        } catch (err) {
            console.log('Error fetching /get_me:', err);
            await RemoveToken();
            // ✅ Update all state atomically
            setAuthState({
                profile: null,
                isLogin: false,
                loading: false,
            });
        }
    }, []);
    
    // Run once at startup
    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    useEffect(()=>{
        console.log("update path: ", pathName)
    },[pathName])
    
    return (
        <AuthContext.Provider
            value={{
                profile: authState.profile,
                loading: authState.loading,
                isLogin: authState.isLogin,
                reload: fetchProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const UseAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('UseAuth must be used within an AuthProvider');
    }
    return context;
};