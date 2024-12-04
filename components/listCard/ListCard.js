import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import { Colors } from "../../constants/styles";
import { getAllProduct } from "../../services/product";
import { useSelector } from "react-redux";
import LoadingScreen from "../loading/LoadingScreen";

const ListCard = ({ title }) => {
  const accessToken = useSelector(
    (state) => state.userReducers.user.accessToken
  );

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState();

  const getAllListProduct = async (accessToken) => {
    try {
      const response = await getAllProduct(accessToken);
      if (response?.status === "Success") {
        setProducts(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error in screen : ", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getAllListProduct(accessToken);
  }, [accessToken]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const renderItem = (itemData) => {

    function pressHandler() {
      console.log("click");
    }
    return (
      <Card
        id={itemData.item.id}
        expiredDate={itemData.item.expiredDate}
        image={itemData.item.image}
        price={itemData.item.price}
        productName={itemData.item.productName}
        remainQuantity={itemData.item.remainQuantity}
        onPress={pressHandler}
        data={itemData.item}
        type="product"
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
        {/* <Text style={styles.moreText}>See all </Text> */}
      </View>
      <View style={styles.list}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        />
      </View>
    </View>
  );
};

export default ListCard;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    // backgroundColor: 'red'
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginHorizontal: 20,
    marginRight: 25,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.dark,
  },
  moreText: {
    color: "green",
  },
  list: {
    paddingLeft: 1,
    marginHorizontal: 5,
  },
});
