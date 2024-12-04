import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/styles";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DetailProductInMeal = ({ route }) => {
  const data = route.params.dataItem;
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        paddingBottom: 10,
        backgroundColor: Colors.pink100,
        flex: 1,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 2 }}
      >
        <View style={styles.ImgBgContainer}>
          <ImageBackground
            source={{ uri: `${data.image}` }}
            style={styles.image}
          >
            <View style={styles.header}>
              <View style={styles.headerBtn}>
                <Ionicons
                  name="chevron-back"
                  size={22}
                  color="black"
                  onPress={navigation.goBack}
                />
              </View>
            </View>
          </ImageBackground>
          <View style={styles.desTag}>
            <Text
              style={styles.desTitle}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {data.productName}
            </Text>
          </View>
        </View>
        <View style={styles.desContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.desText}>{data.expiredDate}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>{data.price}</Text>
              <Text style={styles.currencyUnit}>$</Text>
            </View>
          </View>
          <View style={styles.quantity}>
            <Feather name="box" size={20} color="black" />
            <Text style={styles.desText2}>{data.remainQuantity}</Text>
          </View>
          <View style={styles.box}>
            <View style={styles.innerBox}>
              <Text style={styles.titleBox}>Weight</Text>
              <Text style={styles.textBox}>200g</Text>
            </View>
            <View>
              <Text style={styles.titleBox}>Branch</Text>
              <Text style={styles.textBox}>Supereme</Text>
            </View>
            <View>
              <Text style={styles.titleBox}>Origin</Text>
              <Text style={styles.textBox}>US/UK</Text>
            </View>
          </View>
          <View style={styles.instructContainer}>
            <Text style={styles.instructTitle}>Storage Instructions :</Text>
            <Text style={styles.instructText}>
              - Use about 30 days after opening
            </Text>
            <Text style={styles.instructText}>
              - Store the product at a cool temperature
            </Text>
            <Text style={styles.instructText}>
              -<Text style={{ fontSize: 15, fontWeight: "800" }}> Note </Text>
              Do not use products that show signs of damage
            </Text>
          </View>
          <View style={styles.instructContainer}>
            <Text style={styles.instructTitle}>Refund Instructions :</Text>
            <Text style={styles.instructText}>
              In case the customer receives a damaged product due to the
              transfer process, please take a photo of the product and contact
              it through the Pet Shop app via the following 2 ways for
              instructions on how to return it via the following 2 ways.
            </Text>
            <Text style={styles.instructText}>
              - <Text style={{ fontSize: 15, fontWeight: "800" }}> 1 </Text> Go
              to the app to choose a product, please leave a picture in the
              comment below
            </Text>
            <Text style={styles.instructText}>
              -<Text style={{ fontSize: 15, fontWeight: "800" }}> 2 </Text>
              At the Pet shop page, please contact us to leave a picture of the
              product name you want to support
            </Text>
          </View>
          <View style={styles.desDetailContainer}>
            <Text style={styles.instructTitle}>Description :</Text>
            <Text style={styles.desDetailText}>{data.description}</Text>
          </View>
          <View style={styles.reviewContainer}>
            <Text style={styles.reviewTitle}>Review (12)</Text>
            <View style={styles.iconStarReview}>
              <AntDesign name="star" size={24} color={Colors.yellow200} />
              <AntDesign name="star" size={24} color={Colors.yellow200} />
              <AntDesign name="star" size={24} color={Colors.yellow200} />
              <AntDesign name="star" size={24} color={Colors.yellow200} />
              <AntDesign name="staro" size={24} color={Colors.yellow200} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailProductInMeal;

const styles = StyleSheet.create({
  ImgBgContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    elevation: 20,
    height: 350,
  },
  image: {
    resizeMode: "cover",
    borderRadius: 20,
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerBtn: {
    height: 35,
    width: 35,
    backgroundColor: Colors.white,
    borderRadius: 99999,
    justifyContent: "center",
    alignItems: "center",
  },
  desTag: {
    width: 200,
    backgroundColor: Colors.purple800,
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    top: -20,
    elevation: 18,

    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    // overflow: "hidden",
  },
  desTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.pink100,
  },
  desContainer: {
    flex: 1,
    marginTop: 50,
    justifyContent: "center",
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: "hidden",

    elevation: 8,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    marginBottom: 10,
  },
  desText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: "600",
    color: Colors.redPastel200,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: Colors.green,
    borderBottomLeftRadius: 20,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.yellow100,
    marginRight: 5,
  },
  currencyUnit: {
    fontSize: 12,
    fontWeight: "400",
  },
  quantity: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  desText2: {
    color: "gray",
    fontSize: 14,
    marginLeft: 5,
  },
  box: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    marginTop: 20,
  },
  innerBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleBox: {
    fontSize: 16,
    fontWeight: "400",
    color: "gray",
    marginBottom: 5,
  },
  textBox: {
    fontWeight: "600",
    color: Colors.dark,
  },
  desDetailContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  desDetailText: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 20,
  },
  instructContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  instructTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.dark,
    marginBottom: 10,
  },
  instructText: {
    marginBottom: 2,
  },
  reviewContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  reviewTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.dark,
    marginBottom: 10,
  },
  iconStarReview: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
});
