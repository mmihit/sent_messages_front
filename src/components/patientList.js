import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Loading } from "./loading";

export function PatientsList({ data, loading }) {
    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
            renderItem={({ item }) =>
            (
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => router.push(`/patients/${item.id}`)}
                >
                    <View style={styles.cardHeader}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.name}>{item.first_name} </Text>
                            <Text style={styles.name}>{item.last_name}</Text>
                        </View>
                        <Text style={styles.date}>{item.JJ_stent_removal}</Text>
                    </View>
                    <Text style={styles.code}>{item.card_id}</Text>
                    <Text style={styles.info}>
                        Taourirt, {item.age} years
                    </Text>
                </TouchableOpacity>
            )}
            ItemSeparatorComponent={<View style={{ height: 10 }}></View>}

        />
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 16,
        borderWidth: 2,
        borderColor: "black",
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    name: {
        fontSize: 16,
        fontWeight: "700",
    },
    date: {
        fontSize: 14,
        fontWeight: "600",
    },
    code: {
        fontWeight: "500",
        color: "#444",
    },
    info: {
        color: "#666",
    },
})