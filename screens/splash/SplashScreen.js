import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Lottie from "lottie-react-native";
import { useSelector } from "react-redux";

export default function SplashScreen({ navigation, route }) {
  const [isDone, setIsDone] = useState(false);
  const user = useSelector((state) => state.userReducers.user);
  const hasLaunched = route.params.hasLaunched;

  useLayoutEffect(() => {
    setTimeout(() => {
      setIsDone(true);
    }, 4000);
  }, []);

  useEffect(() => {
    if (hasLaunched) {
      if (isDone) {
        Object.keys(user).length === 0
          ? navigation.replace("Login")
          : navigation.replace("Store");
      }
    } else {
      setTimeout(() => {
        navigation.replace("Onboard");
      }, 4000);
    }
  }, [isDone, navigation, user, hasLaunched]);

  return (
    <View style={styles.rootContainer}>
      <View style={{ flex: 1.5 }}></View>
      <View style={{ flex: 1.5 }}>
        <Lottie
          source={require("../../assets/animations/lottie_animation.json")}
          autoPlay
          loop
          style
        />
      </View>
      <View style={{ flex: 3 }}>
        <Image
          // resizeMode="contain"
          source={require("../../assets/images/bg.jpg")}
          style={styles.backgoundImage}
        />
        <Text style={styles.text}>Pet Food</Text>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#f4e7d7",
  },
  backgoundImage: {
    width: "100%",
    height: "100%",
  },
  text: {
    position: "absolute",
    top: "20%",
    right: 0,
    left: 0,
    textAlign: "center",
    fontSize: 35,
    fontWeight: "600",
  },
});
