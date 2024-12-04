import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

const DetailNewScreen = ({ route }) => {
  const data = route.params.DataNew;
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        // paddingBottom: 20,
        backgroundColor: Colors.pink100,
        flex: 1,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 10 }}
      >
        <View style={styles.desContainer}>
          <View style={styles.ImgBgContainer}>
            <ImageBackground source={{ uri: data.image }} style={styles.image}>
              <View style={styles.header}>
                <View style={styles.headerBtn}>
                  <Ionicons
                    name="chevron-back"
                    size={22}
                    color="black"
                    onPress={navigation.goBack}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.titleNews}>
            <Text style={styles.titleText}>{data.title}</Text>
          </View>
          <View style={styles.nameNews}>
            <Text style={styles.nameText}>{data.name}</Text>
          </View>
          <View style={styles.desDetailContainer}>
            <Text style={styles.desDetailText}>{data.desc}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailNewScreen;

const styles = StyleSheet.create({
  ImgBgContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    elevation: 20,
    height: 350,
  },
  image: {
    resizeMode: "cover",
    borderRadius: 20,
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerBtn: {
    height: 35,
    width: 35,
    backgroundColor: Colors.white,
    borderRadius: 99999,
    justifyContent: "center",
    alignItems: "center",
  },
  desContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: "hidden",

    elevation: 8,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    marginBottom: 10,
  },
  titleNews: {
    marginTop: 15,
  },
  titleText: {
    paddingHorizontal: 20,
    // paddingVertical: 10,
    paddingTop: 15,
    fontSize: 40,
    fontWeight: "600",
    color: Colors.redPastel200,
  },
  nameNews: {
    paddingHorizontal: 20,
  },
  nameText: {
    fontSize: 14,
    fontWeight: "600",
    color: "gray",
    marginBottom: 5,
  },
  desDetailContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  desDetailText: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 20,
  },
});
