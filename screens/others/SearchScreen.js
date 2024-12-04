import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/styles";
import { useSelector } from "react-redux";
import { getAllProduct } from "../../services/product";
import { getAllMeal } from "../../services/meal";
import filter from "lodash.filter";
import { Ionicons } from "@expo/vector-icons";
import CardSearch from "../../components/card/CardSearch";
import LoadingScreen from "../../components/loading/LoadingScreen";
import { useNavigation } from "@react-navigation/native";
import CardSearchMeal from "../../components/card/CardSearchMeal";

export default function SearchScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [dataProducts, setDataProducts] = useState([]);
  const [dataMeals, setDataMeals] = useState([]);
  const [fullData, setFullData] = useState([]);

  const accessToken = useSelector(
    (state) => state.userReducers.user.accessToken
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();

    const filteredData = filter(fullData, (item) => {
      return (
        contains(item.productName, formattedQuery) ||
        contains(item.title, formattedQuery)
      );
    });
    setDataProducts(filteredData.filter((item) => item.productName));
    setDataMeals(filteredData.filter((item) => item.title));
  };

  const contains = (item, query) => {
    return item && item.toLowerCase().includes(query);
  };

  useEffect(() => {
    setIsLoading(true);
    const getAllProducts = async (accessToken) => {
      try {
        const response = await getAllProduct(accessToken);
        if (response?.status === "Success") {
          setDataProducts(response.data);
          setFullData((prevData) => [...prevData, ...response.data]);
        } else {
          console.log("error in screen get product ");
        }
      } catch (error) {
        console.log("error in screen : ", error);
      }
    };
    getAllProducts(accessToken);

    const getAllMeals = async (accessToken) => {
      try {
        const response = await getAllMeal(accessToken);
        if (response?.status === "Success") {
          setDataMeals(response.data);
          setFullData((prevData) => [...prevData, ...response.data]);
          setIsLoading(false);
        } else {
          console.log("error in screen get meal ");
        }
      } catch (error) {
        console.log("error in screen : ", error);
      }
    };
    getAllMeals(accessToken);
  }, [accessToken]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const RenderItemProduct = (itemData) => {
    return (
      <View>
        <CardSearch
          data={itemData.item}
          image={itemData.item.image}
          productName={itemData.item.productName}
          expiredDate={itemData.item.expiredDate}
          id={itemData.item.id}
          price={itemData.item.price}
          type="product"
        />
      </View>
    );
  };

  const RenderItemMeal = (itemData) => {
    return (
      <View>
        {/* <CardSearch
          data={itemData.item}
          image={itemData.item.image}
          productName={itemData.item.mealName}
          expiredDate={itemData.item.expiredDate}
          id={itemData.item.id}
          price={itemData.item.price}
          type="meal"
        /> */}
        <CardSearchMeal data={itemData.item} type="meal" />
      </View>
    );
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerBtn}>
          <Ionicons
            name="chevron-back"
            size={22}
            color="black"
            onPress={navigation.goBack}
          />
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchInnerContainer}>
            <Ionicons
              name="search"
              size={18}
              color={Colors.transparentDark}
              style={styles.iconSearch}
            />
            <TextInput
              placeholder="Search "
              style={styles.searchBox}
              clearButtonMode="always"
              autoCapitalize="none"
              autoCorrect={false}
              value={searchQuery}
              onChangeText={(query) => handleSearch(query)}
            />
          </View>
        </View>
      </View>
      <SafeAreaView
        style={{
          flex: 1,
          paddingBottom: 50,
          backgroundColor: Colors.white,
        }}
      >
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.productContainer}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  paddingBottom: 10,
                  marginLeft: 10,
                }}
              >
                Meals
              </Text>
              <FlatList
                scrollEnabled={false}
                data={dataMeals}
                renderItem={RenderItemMeal}
                key={(item) => item.mealName}
              />
            </View>
            <View style={styles.productContainer}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  paddingBottom: 10,
                  marginLeft: 10,
                }}
              >
                Products
              </Text>
              <FlatList
                scrollEnabled={false}
                data={dataProducts}
                renderItem={RenderItemProduct}
                key={(item) => item.productName}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  productContainer: {
    marginBottom: 30,
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.purple800,
    paddingHorizontal: 10,
    paddingTop: 60,
    paddingBottom: 10,
    // marginBottom: 30,
  },
  headerBtn: {
    height: 35,
    width: 35,
    backgroundColor: Colors.white,
    borderRadius: 99999,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 40,

    elevation: 30,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  searchInnerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: 40,
  },
  searchBox: {
    width: "88%",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  iconSearch: {
    marginLeft: 20,
  },
});
