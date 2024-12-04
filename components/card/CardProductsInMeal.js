import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/styles";

const CardProductsInMeal = ({ data }) => {
  const navigation = useNavigation();
  const SelectItem = () => {
    navigation.navigate("DetailProductsMeal", {
      dataItem: data.product,
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
          <Image
            style={styles.image}
            source={{ uri: `${data.product.image}` }}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.textInnerContainer}>
            <Text style={styles.textName}>{data.product.productName}</Text>
            <Text style={styles.textName}>x {data.amount}</Text>
          </View>

          <Text style={styles.textPriedDate}>{data.product.expiredDate}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.textPrice}>{data.product.price}</Text>
            <Text style={{ fontSize: 10, fontWeight: "400" }}>$</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CardProductsInMeal;

const styles = StyleSheet.create({
  textInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 250,
  },
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
