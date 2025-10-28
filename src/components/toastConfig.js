// toastConfig.js
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export const ToastConfig = {
    success: (props) => (
        <BaseToast
            {...props}
            style={styles.successToast}
            contentContainerStyle={styles.contentContainer}
            text1Style={styles.text1}
            text2Style={styles.text2}
            text1NumberOfLines={2}
            text2NumberOfLines={3}
            renderTrailingIcon={() => (
                <TouchableOpacity
                    onPress={() => Toast.hide()}
                    style={styles.closeButton}
                >
                    <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
            )}
        />
    ),
    error: (props) => (
        <ErrorToast
            {...props}
            style={styles.errorToast}
            contentContainerStyle={styles.contentContainer}
            text1Style={styles.text1}
            text2Style={styles.text2}
            text1NumberOfLines={2}
            text2NumberOfLines={3}
            renderTrailingIcon={() => (
                <TouchableOpacity
                    onPress={() => Toast.hide()}
                    style={styles.closeButton}
                >
                    <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
            )}
        />
    ),
};

const styles = StyleSheet.create({
    successToast: {
        borderLeftWidth:0,
        borderRadius:30,
        backgroundColor: 'green',
        height: 'auto',
        minHeight: 70,
    },
    errorToast: {
        borderLeftWidth:0,
        borderRadius:30,
        backgroundColor: 'red',
        height: 'auto',
        minHeight: 70,
    },
    contentContainer: {
        paddingHorizontal: 25,
        paddingVertical: 10,
    },
    text1: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
        textTransform:'capitalize',
    },
    text2: {
        fontSize: 14,
        color: '#f0f0f0ff',
        marginTop: 4,
    },
    closeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: '100%',
    },
    closeButtonText: {
        fontSize: 20,
        color: '#f5f5f5ff',
        fontWeight: 'bold',
    },
});