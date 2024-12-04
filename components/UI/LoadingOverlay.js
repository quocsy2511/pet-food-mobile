import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Lottie from "lottie-react-native";

export default function LoadingOverlay(color) {
  return (
    <View style={styles.container}>
      <Lottie
        source={require("../../assets/animations/lottie_loading.json")}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
