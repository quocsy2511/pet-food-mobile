import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getNewsFunction } from "../../services/new";
import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

const BannerNews = ({ title }) => {
  const [news, setNews] = useState([]);
  const accessToken = useSelector(
    (state) => state.userReducers.user.accessToken
  );
  const navigation = useNavigation();

  useEffect(() => {
    getNews(accessToken);
  }, [accessToken]);

  const getNews = async (accessToken) => {
    try {
      const response = await getNewsFunction(accessToken);
      if (response?.status === "Success") {
        setNews(response.data);
      } else {
        console.log("Error in screeen set ");
      }
    } catch (error) {
      console.log("Error in screeen  : ", error);
    }
  };

  const renderCarouselItem = (itemData) => {
    const data = itemData.item;
    const handlerPress = () => {
      navigation.navigate("DetailNewScreen", {
        DataNew: data,
      });
    };

    return (
      <Pressable
        android_ripple={{ color: "#ccccc" }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        onPress={handlerPress}
      >
        <View style={styles.containerCarousel}>
          <Image
            source={{ uri: `${itemData.item.image}` }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.carouselTextContainer}>
            <Text style={styles.carouselTextTitle}>News </Text>
            <Text style={styles.carouselTextTitle2}>{itemData.item.title}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
        {/* <Text style={styles.moreText}>See all </Text> */}
      </View>
      <FlatList
        data={news}
        renderItem={renderCarouselItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default BannerNews;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 10,
  },
  containerCarousel: {
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    width: 300,
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: Colors.grey,
  },
  bannerImage: {
    borderRadius: 20,
    width: "100%",
    height: "100%",
  },
  carouselTextContainer: {
    position: "absolute",
    backgroundColor: Colors.white,
    width: "100%",
    paddingHorizontal: 5,
    overflow: "hidden",
    bottom: 0,
    left: 0,
    paddingVertical: 10,
  },
  carouselTextTitle: {
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.purple800,
    lineHeight: 25,
    paddingLeft: 8,
  },
  carouselTextTitle2: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.dark,
    lineHeight: 20,
    marginLeft: 40,
    paddingBottom: 7,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.dark,
  },
  moreText: {
    color: "green",
  },
  buttonPressed: {
    opacity: 0.75,
  },
});
