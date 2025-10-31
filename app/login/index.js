import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';
import { Styles } from "../../assets/style/style.js";
import { MyButton } from "../../src/components/button.js";
import { Backend_URL } from "../../src/constants/config.js";
import { UseAuth } from "../../src/contexts/AuthContext.js";
import { Post } from "../../src/helpers/fetch.js";
import { SetToken } from "../../src/helpers/token.js";

export default function Login({ navigation }) {
    const { reload } = UseAuth();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        // Validation
        if (!login.trim() || !password.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Please fill all fields!',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 60,
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await Post(Backend_URL, "/login", { 
                login: login.trim(), 
                password: password 
            });

            if (response.code !== 200) {
                Toast.show({
                    type: 'error',
                    text1: 'Login Failed!',
                    text2: response.code >= 500 ? "Something went wrong" : response.data,
                    visibilityTime: 4000,
                    autoHide: true,
                    topOffset: 60,
                });
            } else {
                Toast.show({
                    type: 'success',
                    text1: 'Welcome back!',
                    text2: response.data.message,
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 60,
                });
                
                await SetToken(response.data.token);
                reload();
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'An unexpected error occurred',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 60,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = () => {
        // Navigate to register screen
        // navigation.navigate('Register');
        console.log('Navigate to register');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[styles.container, Styles.container]}>
                <View style={styles.top}>
                    <Text style={styles.title}>Achifaa Tadkir JJ</Text>
                    <Text style={styles.description}>
                        Simplify your clinic's daily workflow.
                        Manage patients, track appointments, and stay organized — all in one place.
                    </Text>
                </View>

                <View style={styles.inputSection}>
                    <TextInput
                        style={Styles.input}
                        placeholder="Email/Clinique Name..."
                        onChangeText={setLogin}
                        value={login}
                        autoCapitalize="none"
                        autoCorrect={false}
                        editable={!isLoading}
                    />
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[Styles.input, { flex: 1 }]}
                            placeholder="Password..."
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            editable={!isLoading}
                        />
                        <TouchableOpacity 
                            onPress={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                        >
                            <Ionicons
                                name={showPassword ? "eye-off" : "eye"}
                                size={24}
                                color="gray"
                                style={styles.eyeIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.buttonsSection}>
                    <MyButton 
                        title={isLoading ? "Loading..." : "Submit"} 
                        onPress={handleLogin}
                        disabled={isLoading}
                    />
                    <Pressable onPress={handleRegister} disabled={isLoading}>
                        <Text style={styles.register}>Register</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 20,
    },

    top: {
        width: 300,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },

    title: {
        fontSize: 40,
        fontWeight: "900",
        textAlign: "center",
    },

    description: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginTop: 10,
        lineHeight: 20,
    },

    inputSection: {
        width: 300,
        gap: 7,
        paddingHorizontal: 20,
    },

    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    eyeIcon: {
        marginLeft: -35,
        marginRight: 10,
    },

    buttonsSection: {
        gap: 3,
    },

    register: {
        textAlign: "center",
        textDecorationLine: "underline",
        fontWeight: "600",
        color: "black",
    },
});