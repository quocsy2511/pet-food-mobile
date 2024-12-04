import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar, Caption, Title, TouchableRipple } from "react-native-paper";
import {
  AntDesign,
  MaterialCommunityIcons,
  Feather,
  Octicons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../constants/styles";
import { initUser } from "../../redux/user/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducers.user);

  const openModalChange = () => {
    navigation.navigate("ChangePassword", {
      user: user,
    });
  };

  const logOut = () => {
    dispatch(initUser({ user: {} }));
    AsyncStorage.removeItem("user");
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Avatar.Image
              source={{
                uri: `${user.avatar}`,
              }}
              size={80}
            />
            <View style={{ marginLeft: 20, marginTop: 5 }}>
              <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>
                {user.fullName}
              </Title>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Octicons name="dot-fill" size={20} color="green" />
                <Caption style={styles.caption}>@user</Caption>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="email-fast-outline"
              size={20}
              color={Colors.dark}
            />
            <Text style={styles.infText}>{user.email}</Text>
          </View>
          <View style={styles.row}>
            <AntDesign name="calendar" size={20} color={Colors.dark} />
            <Text style={styles.infText}>{user.dob}</Text>
          </View>
          <View style={styles.row}>
            <Feather name="phone" size={20} color={Colors.dark} />
            <Text style={styles.infText}>{user.phoneNumber}</Text>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => console.log("click")}>
            <View style={styles.menuItem}>
              <View style={styles.innerMenuItem}>
                <Ionicons
                  name="heart-circle-outline"
                  size={25}
                  color="#FF6347"
                />
                <Text style={styles.menuItemText}>My Favorite</Text>
              </View>
              <MaterialIcons name="navigate-next" size={25} color="black" />
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => console.log("click")}>
            <View style={styles.menuItem}>
              <View style={styles.innerMenuItem}>
                <MaterialIcons name="payment" size={25} color="#FF6347" />
                <Text style={styles.menuItemText}>Payment</Text>
              </View>
              <MaterialIcons name="navigate-next" size={25} color="black" />
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => console.log("click")}>
            <View style={styles.menuItem}>
              <View style={styles.innerMenuItem}>
                <Feather name="share" size={25} color="#FF6347" />
                <Text style={styles.menuItemText}>Share With Friend</Text>
              </View>
              <MaterialIcons name="navigate-next" size={25} color="black" />
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => console.log("click")}>
            <View style={styles.menuItem}>
              <View style={styles.innerMenuItem}>
                <MaterialIcons
                  name="contact-support"
                  size={25}
                  color="#FF6347"
                />
                <Text style={styles.menuItemText}>Support</Text>
              </View>
              <MaterialIcons name="navigate-next" size={25} color="black" />
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={openModalChange}>
            <View style={[styles.menuItem]}>
              <View style={styles.innerMenuItem}>
                <AntDesign name="setting" size={25} color="#FF6347" />
                <Text style={styles.menuItemText}>Change Password</Text>
              </View>
              <MaterialIcons name="navigate-next" size={25} color="black" />
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={logOut}>
            <View
              style={[styles.menuItem, { borderBottomColor: Colors.pink100 }]}
            >
              <View style={styles.innerMenuItem}>
                <AntDesign name="logout" size={25} color="#FF6347" />
                <Text style={styles.menuItemText}>Logout</Text>
              </View>
              <MaterialIcons name="navigate-next" size={25} color="black" />
            </View>
          </TouchableRipple>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pink100,
    paddingTop: 50,
  },
  userInfoSection: {
    marginTop: 10,
    paddingHorizontal: 30,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
    marginLeft: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 10,
  },
  infText: {
    color: "#777777",
    fontWeight: "500",
    fontSize: 13,
    marginLeft: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  menuWrapper: {
    marginHorizontal: 30,
    marginVertical: 20,
    // backgroundColor: Colors.brown700,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#c4c4c4",
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    // paddingHorizontal: 10,
    // backgroundColor: Colors.brown700,
    marginHorizontal: 25,
    marginVertical: 8,
    borderBottomColor: "#c4c4c4",
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  innerMenuItem: {
    flexDirection: "row",
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontSize: 16,
    lineHeight: 26,
    fontWeight: "600",
  },
});
