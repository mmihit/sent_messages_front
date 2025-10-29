import { Tabs } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import Toast from 'react-native-toast-message';
import KeyboardView from '../src/components/keyboardView';
import { ToastConfig } from '../src/components/toastConfig';
import { AuthProvider, UseAuth } from '../src/contexts/AuthContext';

// Create a wrapper component that waits for auth
function AuthGate({ children }) {
    const { loading } = UseAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return children;
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <KeyboardView
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
                enableOnAndroid={true}
            >
                <AuthGate>
                    <Tabs screenOptions={{ headerShown: false }}>
                        <Tabs.Screen name="index" options={{ title: 'Home' }} />
                        <Tabs.Screen name="login/index" options={{ title: 'Login' }} />
                    </Tabs>
                </AuthGate>

                <Toast config={ToastConfig} />
            </KeyboardView>
        </AuthProvider>
    );
}
