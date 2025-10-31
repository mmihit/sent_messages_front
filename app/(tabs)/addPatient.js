import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import Toast from "react-native-toast-message";
import { Styles } from "../../assets/style/style";
import { MyButton } from "../../src/components/button";
import { Backend_URL } from "../../src/constants/config";
import { Post } from "../../src/helpers/fetch";

// Date Picker Component
function DatePickerInput({ placeholder, value, onChange }) {
    const [showPicker, setShowPicker] = useState(false);

    // For web, use native HTML date input
    if (Platform.OS === 'web') {
        return (
            <View style={[Styles.input, { width: '100%', maxWidth: 600 }]}>
                <input
                    type="date"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    style={{
                        width: '100%',
                        padding: 0,
                        border: 'none',
                        outline: 'none',
                        fontSize: 16,
                        backgroundColor: 'transparent',
                    }}
                />
            </View>
        );
    }

    // For mobile, use DateTimePicker
    return (
        <>
            <TouchableOpacity
                style={[Styles.input, { width: '100%', maxWidth: 600 }]}
                onPress={() => setShowPicker(true)}
            >
                <Text style={{ fontSize: 14, fontWeight: 400, color: value ? 'black' : '#a5a5a5ff' }}>
                    {value || placeholder}
                </Text>
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    value={value ? new Date(value) : new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedDate) => {
                        setShowPicker(false);
                        if (selectedDate) {
                            onChange(selectedDate.toISOString().split('T')[0]);
                        }
                    }}
                />
            )}
        </>
    );
}

export default function AddPatient() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        card_id: "",
        age: 0,
        city: "",
        email: "",
        insertion_stent_JJ: "",
        removal_stent_JJ: "",
        whatsapp_number1: "",
        whatsapp_number2: "",
        diagnostic: ""
    });
    const router = useRouter()

    const handleSubmit = () => {
        console.log("Form Data:", formData);
        const sentData = async () => {
            try {
                const resp = await Post(Backend_URL, "/add_patient", formData)
                if (resp.code != 200) {
                    Toast.show({
                        type: 'error',
                        text1: 'Validation Error',
                        text2: resp.data,
                        visibilityTime: 3000,
                        autoHide: true,
                        topOffset: 60,
                    })
                } else {
                    Toast.show({
                        type: 'success',
                        text1: 'Add Patient Done!',
                        text2: resp.data,
                        visibilityTime: 3000,
                        autoHide: true,
                        topOffset: 60,
                    })
                    router.replace("/")
                }
            } catch {
                Toast.show({
                    type: 'error',
                    text1: 'Validation Error!',
                    text2: 'Something wrong, Please reopen the app!',
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 60,
                })
            }
        }
        sentData()
    };

    const inputStyle = [Styles.input, { width: '100%', maxWidth: 600 }];

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <MaterialIcons name="person-add" size={70} color="black" />
                <Text style={styles.title}>Add a Patient</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
                <TextInput
                    placeholder="First Name..."
                    style={inputStyle}
                    value={formData.first_name}
                    onChangeText={(text) => setFormData({ ...formData, first_name: text })}
                />

                <TextInput
                    placeholder="Last Name..."
                    style={inputStyle}
                    value={formData.last_name}
                    onChangeText={(text) => setFormData({ ...formData, last_name: text })}
                />

                <View style={styles.row}>
                    <TextInput
                        placeholder="Card ID..."
                        style={[Styles.input, { flex: 2 }]}
                        value={formData.card_id}
                        onChangeText={(text) => setFormData({ ...formData, card_id: text })}
                    />
                    <TextInput
                        placeholder="Age..."
                        style={[Styles.input, { flex: 1 }]}
                        keyboardType="numeric"
                        value={formData.age}
                        onChangeText={(text) => setFormData({ ...formData, age: Number(text) })}
                    />
                </View>

                <TextInput
                    placeholder="City..."
                    style={inputStyle}
                    value={formData.city}
                    onChangeText={(text) => setFormData({ ...formData, city: text })}
                />

                <TextInput
                    placeholder="Email..."
                    style={inputStyle}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                />

                <DatePickerInput
                    placeholder="JJ Stent Insertion Date..."
                    value={formData.insertion_stent_JJ}
                    onChange={(date) => setFormData({ ...formData, insertion_stent_JJ: date })}
                />

                <DatePickerInput
                    placeholder="JJ Stent Removal Date..."
                    value={formData.removal_stent_JJ}
                    onChange={(date) => setFormData({ ...formData, removal_stent_JJ: date })}
                />

                <TextInput
                    placeholder="WhatsApp Number 1..."
                    style={inputStyle}
                    keyboardType="phone-pad"
                    value={formData.whatsapp_number1}
                    onChangeText={(text) => setFormData({ ...formData, whatsapp_number1: text })}
                />

                <TextInput
                    placeholder="WhatsApp Number 2 (Optional)..."
                    style={inputStyle}
                    keyboardType="phone-pad"
                    value={formData.whatsapp_number2}
                    onChangeText={(text) => setFormData({ ...formData, whatsapp_number2: text })}
                />

                <TextInput
                    placeholder="Diagnostic..."
                    style={[inputStyle, { height: 100, textAlignVertical: 'top' }]}
                    multiline
                    numberOfLines={4}
                    value={formData.diagnostic}
                    onChangeText={(text) => setFormData({ ...formData, diagnostic: text })}
                />

                <MyButton title='Add Patient' onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        gap: 10,
    },
    title: {
        fontSize: 35,
        textTransform: 'capitalize',
        fontWeight: '600',
    },
    form: {
        gap: 15,
        width: '100%',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        maxWidth: 600,
        gap: 10,
    },
});