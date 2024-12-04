import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={"large"} color={Colors.brown700} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
