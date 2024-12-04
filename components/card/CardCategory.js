import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

const CardCategory = ({ onPress, data }) => {
  const navigation = useNavigation();
  const SelectMealsByBird = () => {
    navigation.navigate("FilterMeals", {
      Bird: data,
    });
  };
  
  return (
    <View style={styles.categoryContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        android_ripple={{ color: "#cccccc" }}
        onPress={SelectMealsByBird}
      >
        <View
          style={[styles.innerContainer, { backgroundColor: Colors.white }]}
        >
          <View
            style={{
              height: 50,
              width: 60,
              marginTop: 2,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
              overflow: "hidden",
              marginBottom: 2,
            }}
          >
            <Image source={{ uri: data.images }} style={styles.ImgCategory} />
          </View>
          <Text style={styles.titleText}>{data.birdName}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CardCategory;

const styles = StyleSheet.create({
  categoryContainer: {
    height: 75,
    width: 75,
    justifyContent: "space-between",
    borderRadius: 15,
    backgroundColor: "white",

    // elevation: 8,
    // shadowColor: "black",
    // shadowOpacity: 0.3,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 5,
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  ImgCategory: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#545151",
  },
});
