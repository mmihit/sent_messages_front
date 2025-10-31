import { useEffect, useState } from "react";
import {
    StyleSheet,
    TextInput,
    View
} from "react-native";
import Toast from "react-native-toast-message";
import { Styles } from "../../assets/style/style";
import { PatientsList } from "../../src/components/patientList";
import { Backend_URL } from "../../src/constants/config";
import { Get } from "../../src/helpers/fetch";

export default function PatientsScreen() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [patients, setPatients] = useState([]);

    const filtered = patients.filter((p) =>
        p.first_name.toLowerCase().includes(search.toLowerCase()) || p.last_name.toLowerCase().includes(search.toLowerCase())
    );

    async function getPatients() {
        try {
            const resp = await Get(Backend_URL, "/get_all_patients")
            if (resp?.code == 200) {
                setPatients(resp.data)
                console.log("response:", resp.data)
                // setPatients([
                //     { id: 1, name: "Patient Name 1", code: "FBXXXX", city: "Taourirt", age: 60, date: "2025-11-01" },
                //     { id: 2, name: "Patient Name 2", code: "FBXXXX", city: "Oujda", age: 45, date: "2025-10-22" },
                // ])
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Get Patients Error!',
                    text2: resp.data,
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 60,
                });
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
        setLoading(false)
    }

    useEffect(() => {
        getPatients()
    }, [])

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <TextInput
                style={Styles.input}
                placeholder="Search for patient..."
                value={search}
                onChangeText={setSearch}
            />

            {/* Patients List */}
            <View style={{flex:1}}>
                <PatientsList data={filtered} loading={loading} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        gap: 25
    },
});
