import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { Backend_URL } from '../src/constants/config.js';
import { Get } from '../src/helpers/fetch.js';
export default function Home() {
    const router = useRouter(); 
    useEffect(() => {
        const fetchData = async () => {
            const data = await Get(Backend_URL, "/get_all_patients");
            console.log(data);
        };
        fetchData();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text style={{ fontSize: 24 }}>Homme page</Text>
            <Button title="go to login" onPress={()=>router.push("/login")}/>
        </View>
    );
}
