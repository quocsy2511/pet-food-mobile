import {
  ImageBackground,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import img from "../../assets/bgHeader1.jpg";
import Search from "../search/Search";

const HeaderHome = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={img} resizeMode="cover" style={styles.imgBg}>
        <View style={styles.imgContainer}>
          <Search />
          <View style={styles.headerNotification}>
            <Pressable
              android_ripple={{ color: "#cccccc" }}
              onPress={() => console.log("click")}
              style={({ pressed }) => [
                styles.button,
                pressed ? styles.buttonPressed : null,
              ]}
            >
              <View style={styles.headerNotification}>
                <Ionicons
                  name="ios-notifications-outline"
                  size={23}
                  color="black"
                />
              </View>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  imgBg: {
    height: 290,
  },
  imgContainer: {
    position: "relative",
    top: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  titleHeader: {
    position: "relative",
    top: 35,
    left: 85,
    width: 200,
    borderRadius: 20,
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  headerNotification: {
    width: 34,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.grey,
    backgroundColor: Colors.light,

    elevation: 12, //android
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    overflow: "hidden",
  },
});
