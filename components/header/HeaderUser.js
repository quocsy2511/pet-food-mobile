import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";

const HeaderUser = ({ name, image }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerUser}>
        <Image source={image} style={styles.avatar} />
        <View>
          <Text style={styles.headerTitle}> Hi {name} 👋 </Text>
          <Text style={styles.welcomeText}>Welcome back to Food Pet </Text>
        </View>
      </View>
      <View style={styles.headerNotification}>
        <Ionicons name="ios-notifications-outline" size={25} color="black" />
      </View>
    </View>
  );
};

export default HeaderUser;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  headerUser: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  avatar: {
    width: 52,
    aspectRatio: 1, //định rõ tỷ lệ khung hình cho một phần tử giao diện nghĩa là tỷ lệ giữa chiều rộng và chiều cao là 1:1, tức là phần tử sẽ có kích thước hình vuông.
    borderRadius: 52,
    resizeMode: "cover",
  },
  headerTitle: {
    fontSize: 18,
    marginBottom: 1,
    fontWeight: "600",
  },
  welcomeText: {
    color: "gray",
    opacity: 0.75,
  },
  headerNotification: {
    width: 52,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 52,
    borderWidth: 1,
    borderColor: Colors.grey,
  },
});
