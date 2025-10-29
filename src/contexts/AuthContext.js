import { usePathname, useRootNavigationState, useRouter } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';
import { Backend_URL } from '../constants/config';
import { Get } from '../helpers/fetch';
import { RemoveToken } from '../helpers/token';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const pathName = usePathname();
    const router = useRouter();
    const rootNavigationState = useRootNavigationState();

    const validPaths = ["/", "/login", "/register"];

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const response = await Get(Backend_URL, '/get_me');
            console.log("response: ", response);

            if (response.code === 200) {
                console.log("User authenticated");
                setProfile(response.data);
            } else {
                await RemoveToken();
                setProfile(null);
            }
        } catch (err) {
            console.log('Error fetching /get_me:', err);
            await RemoveToken();
            setProfile(null);
        } finally {
            setLoading(false);
        }
    };

    // Run once at startup
    useEffect(() => {
        fetchProfile();
    }, []);

    // Handle navigation when router is ready
    useEffect(() => {
        // Wait until navigation is ready and auth check is complete
        if (!rootNavigationState?.key || loading) return;

        console.log("Route guard:", { pathName, profile, loading });

        if (profile && pathName === "/login") {
            console.log("Redirecting to home");
            router.replace("/");
        } else if (!profile && pathName !== "/login" && pathName !== "/register") {
            console.log("Redirecting to login");
            router.replace("/login");
        } else if (!validPaths.includes(pathName)) {
            console.log("Invalid path, redirecting to home");
            router.replace("/");
        }
    }, [pathName, profile, loading, rootNavigationState?.key]);

    return (
        <AuthContext.Provider
            value={{
                profile,
                reload: fetchProfile,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const UseAuth = () => useContext(AuthContext);