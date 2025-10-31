import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../src/components/header";
import TabNavigator from "../../src/components/tabNavigator";

export default function TabLayout() {

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <Header />

      {/* Tab Navigator */}
      <View style={styles.content}>
        <TabNavigator />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
});
