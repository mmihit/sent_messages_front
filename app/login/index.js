import { Ionicons } from "@expo/vector-icons"; // 👈 icon library
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';
import { Styles } from "../../assets/style/style.js";
import MyButton from "../../src/components/button.js";
import { Backend_URL } from "../../src/constants/config.js";
import { UseAuth } from "../../src/contexts/AuthContext.js";
import { Post } from "../../src/helpers/fetch.js";
import { SetToken } from "../../src/helpers/token.js";

export default function index() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loginClick, setLoginClick] = useState(false);
    const [loginMessage, setLoginMessage] = useState({ isError: false, message: "" });
    const { reload } = UseAuth();
    // const [registerHover, setRegisterHover] = useState(false)

    useEffect(() => {
        const sentData = async () => {
            console.log("click here: ", loginClick)
            const response = await Post(Backend_URL, "/login", { login: login, password: password });
            if (response.code < 200 || response.code > 200) {
                setLoginMessage({
                    isError: true,
                    message: response.code >= 500 ? "something wrong" : response.data
                });
            } else {
                setLoginMessage({
                    isError: false,
                    message: response.data.message
                });
                await SetToken(response.data.token);
                reload()
            }
        };

        if (loginClick) {
            if (!login.trim() || !password.trim()) {
                setLoginMessage({
                    isError: true,
                    message: "Please fill all fields!"
                })
            } else {
                sentData()
            }
        };

        if (loginMessage.message) {
            if (loginMessage.isError) {
                Toast.show({
                    type: 'error',
                    text1: 'Login Failed!',
                    text2: loginMessage.message,
                    visibilityTime: 4000,
                    autoHide: true,
                    topOffset: 60,
                });
            } else {
                Toast.show({
                    type: 'success',
                    text1: 'Welcome back!',
                    text2: loginMessage.message,
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 60,
                });
            }
            setLoginMessage({ isError: false, message: "" });
        }
        setLoginClick(false);
    }, [loginClick, loginMessage]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
                <View style={[styles.container, Styles.container]}>
                    <View style={styles.top}>
                        <Text style={styles.title}>Achifaa Tadkir JJ</Text>
                        <Text style={styles.description}>Simplify your clinic’s daily workflow.
                            Manage patients, track appointments, and stay organized — all in one place.
                        </Text>
                    </View>

                    <View style={styles.inputSection}>

                        <TextInput
                            style={Styles.input}
                            placeholder="Email/Clinique Name..."
                            onChangeText={setLogin}
                            value={login}
                        />
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[Styles.input, { flex: 1 }]}
                                secureTextEntry={!showPassword}
                                placeholder="Password..."
                                onChangeText={setPassword}
                                value={password}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
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
                        <MyButton title="submit" onPress={() => setLoginClick(true)} />
                        <Pressable>
                            <Text style={[styles.register]}>Register</Text>
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
        cursor: "pointer",
        fontWeight: 600
    },
    registerHover: {
        fontWeight: 800
    }
});
