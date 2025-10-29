import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import MyButton from '../src/components/button';
import { UseAuth } from '../src/contexts/AuthContext.js';
import { RemoveToken } from '../src/helpers/token.js';

export default function Home() {
    const router = useRouter();
    const [goToLoginClick, setGoToLoginClick] = useState(false);
    const { profile, reload } = UseAuth();


    useEffect(() => {
        const handleLogout = async () => {
            if (goToLoginClick) {
                await RemoveToken();
                await reload();
                setGoToLoginClick(false);
                router.replace('/login');
            }
        };
        handleLogout();
    }, [goToLoginClick]);



    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 24 }}>Welcome {profile?.user_name || 'Guest'}</Text>
            <MyButton title="go to login" onPress={() => setGoToLoginClick(true)} />
        </View>
    );
}