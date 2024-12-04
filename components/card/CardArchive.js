import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { updateCustomerMeal } from "../../services/meal";
import { useSelector } from "react-redux";

const CardArchive = ({
  data,
  isDelete,
  mealCustomer,
  setMealCustomer,
  isArchieve,
}) => {
  const navigation = useNavigation();
  const accessToken = useSelector(
    (state) => state.userReducers.user.accessToken
  );

  const SelectItem = () => {
    navigation.navigate("Detail", {
      dataItem: data,
      itemType: "meal",
      isArchieve: isArchieve,
    });
  };

  function handleDelete() {
    Alert.alert("Are you sure?", "You are removing your own custom meal", [
      {
        text: "No",
        style: "destructive",
      },
      {
        text: "Yes",
        onPress: () => {
          async function updateApi() {
            const response = await updateCustomerMeal(data.id, accessToken);
            if (response.status === "Success") {
              setMealCustomer(
                mealCustomer.filter((item) => item.id !== data.id)
              );
            }
          }
          updateApi();
        },
      },
    ]);
  }

  function handleUpdate() {
    navigation.navigate("CustomMeal", { meal: data, isUpdate: true });
  }

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
          <Text style={styles.textName}>{data.title}</Text>
          <Text style={styles.textDes}>{data.description}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="star" size={16} color={Colors.yellow100} />
              <AntDesign name="star" size={16} color={Colors.yellow100} />
              <AntDesign name="star" size={16} color={Colors.yellow100} />
              <AntDesign name="star" size={16} color={Colors.yellow100} />
              <AntDesign name="star" size={16} color={Colors.yellow100} />
              <Text style={styles.textStart}>( 5 )</Text>
            </View>
            {isDelete && (
              <View style={{ flexDirection: "row", flex: 1, marginLeft: 70 }}>
                <Pressable onPress={handleDelete}>
                  <Feather name="trash-2" size={24} color="black" />
                </Pressable>
                <View style={{ width: 10 }} />
                <Pressable onPress={handleUpdate}>
                  <MaterialIcons name="update" size={24} color="black" />
                </Pressable>
              </View>
            )}
          </View>
        </View>
        <View style={styles.starContainer}></View>
      </View>
    </Pressable>
  );
};

export default CardArchive;

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  itemContainer: {
    flexDirection: "row",

    // backgroundColor: Colors.white,
    paddingVertical: 20,
    overflow: "hidden",
    backgroundColor: Colors.white,
    borderRadius: 30,
    marginVertical: 10,
  },
  innerContainer: {},
  imageContainer: {
    height: 86,
    width: 86,
    borderWidth: 1,
    marginLeft: 20,
    borderColor: Colors.grey,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    resizeMode: "contain",
    height: "100%",
    width: "100%",
  },
  textContainer: {
    height: 86,
    width: "100%",
    marginLeft: 10,
  },
  textName: {
    fontSize: 17,
    fontWeight: "600",
  },
  textDes: {
    fontSize: 10,
    fontWeight: "600",
    marginBottom: 15,
    color: "gray",
    marginTop: 5,
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 12,
  },
  textStart: {
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 2,
  },
});
