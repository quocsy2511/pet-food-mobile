import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import bg from "../../assets/saleBackground.png";
import avatar from "../../assets/avatarSale.png";
import { Colors } from "../../constants/styles";

const BannerSale = ({ title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
        {/* <Text style={styles.moreText}>See all </Text> */}
      </View>
      <ImageBackground
        source={bg}
        imageStyle={styles.bgImage}
        style={styles.bg}
      >
        <Image source={avatar} style={styles.avatarImage} />
      </ImageBackground>
    </View>
  );
};

export default BannerSale;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    paddingTop: 13,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.dark,
  },
  moreText: {
    color: "green",
  },
  bg: {
    height: 175,
  },
  bgImage: {
    resizeMode: "cover",
    width: "100%",
    borderRadius: 8,
  },
  avatarImage: {
    position: "relative",
    width: "40%",
    height: "80%",
    left: 10,
  },
});
