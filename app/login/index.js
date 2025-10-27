import { useEffect, useState } from "react";
import { SafeAreaView, TextInput } from "react-native";
import { Styles } from "../../assets/style/style.js";
import MyButton from "../../src/components/button.js";
import { Backend_URL } from "../../src/constants/config.js";
import { Post } from "../../src/helpers/fetch.js";

export default function index() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [click, setClick] = useState(false);

    useEffect(() => {
        const sentData = async () => {
            const response = await Post(Backend_URL, "/login", {login:login, password:password})
            console.log(response)
            setClick(false);
        }
        if (click) sentData()
    }, [click])

    return (
        <SafeAreaView>
            <TextInput style={Styles.input} placeholder="Email/Clinique Name..." onChangeText={setLogin} />
            <TextInput style={Styles.input} placeholder="Password..." onChangeText={setPassword}/>
            <MyButton title="submit" onPress={() => setClick(true)} />
        </SafeAreaView>
    )
}