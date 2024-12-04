import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import box from "../../assets/homeTab.png";
import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

const AddButtonTab = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Home")}
        >
          <View style={[styles.addButtonInner]}>
            <Image source={box} style={styles.imgAdd} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddButtonTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 0,
    alignItems: "center",
  },
  box: {
    width: 60,
    height: 60,
    position: "relative",
    bottom: 28,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.pink100,
    overflow: "hidden",
    borderWidth: 2,
    borderBottomColor: Colors.pink100,
    borderTopColor: Colors.purple400,
    borderLeftColor: Colors.pink100,
    borderRightColor: Colors.pink100,
  },
  addButton: {
    shadowColor: Colors.dark,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    padding: 1,
  },
  addButtonInner: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.green,
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  imgAdd: {
    width: 50,
    height: 50,
  },
});
