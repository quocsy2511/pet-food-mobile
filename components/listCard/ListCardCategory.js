import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import img1 from "../../assets/care.png";
import img2 from "../../assets/clothes.png";
import img3 from "../../assets/food.png";
import img4 from "../../assets/game.png";
import img5 from "../../assets/home.png";
import img6 from "../../assets/medical.png";
import img7 from "../../assets/other.png";
import img8 from "../../assets/walk.png";
import CardCategory from "../card/CardCategory";
import { useSelector } from "react-redux";
import { getAllBird } from "../../services/bird";

const ListCardCategory = () => {

  const [bird, setBird] = useState([]);

  const accessToken = useSelector(
    (state) => state.userReducers.user.accessToken
  );

  useEffect(() => {
    getAllBirdHandle(accessToken);
  }, [accessToken]);

  const getAllBirdHandle = async (accessToken) => {
    try {
      const response = await getAllBird(accessToken);
      if (response?.status === "Success") {
        setBird(response.data);
      } else {
        console.log("error in screen get");
      }
    } catch (error) {
      console.log("error in screen : ", error);
    }
  };

  const renderCategoryList = (itemData) => {

    const handlerCategory = () => {};
    return <CardCategory data={itemData.item} onPress={handlerCategory} />;
  };

  const filteredBirds = bird.filter((item) => item.status === true);
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth / 3;
  const numColumns = Math.floor(screenWidth / itemWidth);
  return (
    <View>
      <FlatList
        data={filteredBirds}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryList}
        contentContainerStyle={styles.flatListContent}
        scrollEnabled={false}
        columnWrapperStyle={styles.columnWrapper}
        numColumns={numColumns}
      />
    </View>
  );
};

export default ListCardCategory;

const styles = StyleSheet.create({
  flatListContent: {
    padding: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 20,
    marginHorizontal: 10,
  },
});
