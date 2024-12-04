import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { getMealsByBirdIdFunctions } from "../../services/meal";
import CardArchive from "../../components/card/CardArchive";
const dWith = Dimensions.get("window").width;
const dHeight = Dimensions.get("window").height;

const FilterMealsScreen = ({ route }) => {
  const accessToken = useSelector(
    (state) => state.userReducers.user.accessToken
  );

  const navigation = useNavigation();
  const data = route.params.Bird;
  const idBird = data.id;
  const [meal, setMeal] = useState([]);

  useEffect(() => {
    getMealsByBirdId(accessToken);
  }, [accessToken]);

  const getMealsByBirdId = async (accessToken) => {
    try {
      const response = await getMealsByBirdIdFunctions(idBird, accessToken);
      if (response?.status === "Success") {
        setMeal(response.data);
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const renderItem = (itemData) => {
    return (
      <View>
        <CardArchive data={itemData.item} isArchieve={false} />
      </View>
    );
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerBtn}>
          <Ionicons
            name="chevron-back"
            size={25}
            color={Colors.dark}
            onPress={navigation.goBack}
          />
        </View>
        <View style={styles.innerHeader}>
          <View>
            <Text style={styles.title}>{data.birdName}</Text>
          </View>
        </View>
      </View>
      <SafeAreaView
        style={{
          flex: 1,
          paddingBottom: 50,
          backgroundColor: Colors.pink100,
        }}
      >
        <View style={styles.container}>
          <View style={styles.productContainer}>
            {meal.length !== 0 ? (
              <FlatList
                data={meal}
                key={(item) => item.id}
                renderItem={renderItem}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{fontSize:16}}>
                  This bird don't have any{" "}
                  <Text style={{ fontWeight: "bold" }}>meal</Text> yet!
                </Text>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default FilterMealsScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.pink100,
    paddingTop: dHeight * 0.065,
    paddingBottom: 10,
  },
  innerHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: dWith * 0.8,
  },
  headerBtn: {
    height: 30,
    width: 30,
    borderRadius: 99999,
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 13,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontFamily: "SeaweedScript",
  },
  container: {
    flex: 1,
    marginHorizontal: 30,
  },
  productContainer: {
    marginBottom: 20,
    marginTop: 20,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textEmpty: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
});
