import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Header() {
    const router = useRouter()
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.profileBtn}
                onPress={() => router.push("/profile")}
            >
                <Ionicons name="person-circle" size={30} color="black" />
                <Text style={styles.profileText}>My Profile</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        height: 60,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    content: {
        flex: 1,
    },
    profileBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    profileText: {
        fontSize: 17,
        fontWeight: "600",
        color: "black",
    },
});