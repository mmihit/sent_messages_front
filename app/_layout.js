import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import KeyboardView from '../src/components/keyboardView.js';
import { Loading } from '../src/components/loading.js';
import { ToastConfig } from '../src/components/toastConfig.js';
import { SCREENS } from '../src/constants/screens.js';
import { AuthProvider, UseAuth } from '../src/contexts/AuthContext.js';
import TabLayout from './(tabs)/_layout.js';
import Login from './login/index.js';

const Stack = createStackNavigator();

function AuthGate({ children }) {
    const { loading } = UseAuth();

    if (loading) {
        return (
            <Loading />
        );
    }

    return children;
}

function AuthStack() {
    const { isLogin } = UseAuth();

    useEffect(() => {
        console.log("is login: ", isLogin);

    }, [isLogin]);  

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            {isLogin ? (
                <Stack.Screen name={SCREENS.Tabs} component={TabLayout} />
            ) : (
                <Stack.Screen name={SCREENS.Login} component={Login} />
            )}
        </Stack.Navigator>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <KeyboardView enableOnAndroid={true}>
                <AuthGate>
                    <AuthStack />
                </AuthGate>
                <Toast config={ToastConfig} />
            </KeyboardView>
        </AuthProvider>
    );
}