import { useEffect } from 'react';
import { View } from 'react-native';
import { Get } from '../src/helpers/fetch.js';
export default function Home() {
    useEffect(() => {
        const fetchData = async () => {
            const data = await Get("http://localhost:8080", "get_all_patients");
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
            <text style={{ fontSize: 24 }}>Homme page</text>
        </View>
    );
}
