import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function KeyboardView({ children }) {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      enableOnAndroid={true}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}
