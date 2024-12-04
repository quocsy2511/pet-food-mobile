import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/styles";

//card for product
const CardSearch = ({ type, data }) => {
  const navigation = useNavigation();
  const SelectItem = () => {
    navigation.navigate("Detail", {
      dataItem: data,
      itemType: type,
      isArchieve: true,
    });
  };

  return (
    <Pressable
      onPress={SelectItem}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPressed : null,
      ]}
      android_ripple={{ color: "#cccccc" }}
    >
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: `${data.image}` }} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textName}>{data.productName}</Text>
          <Text style={styles.textPriedDate}>{data.expiredDate}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.textPrice}>{data.price}</Text>
            <Text style={{ fontSize: 10, fontWeight: "400" }}>$</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CardSearch;

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  itemContainer: {
    flexDirection: "row",

    backgroundColor: Colors.white,
    paddingVertical: 20,
    borderWidth: 1,
    borderBottomColor: "#cdcdcd",
    borderTopColor: Colors.white,
    borderLeftColor: Colors.white,
    borderRightColor: Colors.white,
  },
  innerContainer: {},
  imageContainer: {
    height: 70,
    width: 70,
    borderWidth: 1,
    marginLeft: 20,
    borderColor: Colors.grey,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light,
  },
  image: {
    resizeMode: "contain",
    height: "100%",
    width: "100%",
  },
  textContainer: {
    marginLeft: 10,
  },
  textName: {
    fontSize: 17,
    fontWeight: "600",
  },
  textPriedDate: {
    fontSize: 10,
    fontWeight: "600",
    marginBottom: 15,
    color: "gray",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textPrice: {
    fontSize: 12,
    fontWeight: "500",
    marginRight: 2,
  },
});
