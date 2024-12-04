import {
  Animated,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "../../constants/styles";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CardShipping from "../../components/card/CardShipping";
import { getOrderByStatus } from "../../services/order";
import OrderDetailModal from "../../components/modal/OrderDetailModal";


const ShippingScreen = ({ navigation }) => {
  const accessToken = useSelector(
    (state) => state.userReducers.user.accessToken
  );
  const animatedValue = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();

  const [selectedButton, setSelectedButton] = useState("Delivery");
  const [orderData, setOrderData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idOrder, setIdOrder] = useState();

  let orderItem;
  if (idOrder) {
    orderItem = orderData.find((item) => item.id === idOrder);
  }

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      async function getOrders() {
        if (selectedButton === "Ordered") {
          const responseCre = await getOrderByStatus(accessToken, "created");
          const responseCon = await getOrderByStatus(accessToken, "confirmed");
          if (
            responseCre.status === "Success" &&
            responseCon.status === "Success"
          ) {
            setOrderData([...responseCre.data, ...responseCon.data]);
          } else setOrderData([]);
        } else {
          let statusToAPI;
          if (selectedButton === "Delivery") statusToAPI = "delivering";
          else if (selectedButton === "Succeeded") statusToAPI = "completed";
          else if (selectedButton === "Canceled") statusToAPI = "canceled";

          const response = await getOrderByStatus(accessToken, statusToAPI);

          if (response.status === "Success") setOrderData(response.data);
          else setOrderData([]);
        }
      }
      getOrders();
      Animated.timing(animatedValue, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    });
  }, [selectedButton, isFocused]);

  const handleOrderState = (stateSelection) => {
    setSelectedButton(stateSelection);
  };

  return (
    <View style={styles.shippingContainer}>
      {openModal && (
        <OrderDetailModal
          item={orderItem}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="bird"
          size={24}
          color={Colors.white}
          style={{ paddingLeft: 10 }}
        />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 18,
            fontWeight: "bold",
            color: Colors.white,
          }}
        >
          Pet Shop
        </Text>
      </View>
      <View style={styles.buttonHeader}>
        <View style={styles.btn}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
            android_ripple={{ color: "#cccccc" }}
            onPress={handleOrderState.bind(this, "Ordered")}
          >
            <View style={styles.btnInner}>
              <Text
                style={[
                  styles.title,
                  selectedButton === "Ordered" && { color: Colors.green },
                ]}
              >
                Ordered
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.btn}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
            android_ripple={{ color: "#cccccc" }}
            onPress={handleOrderState.bind(this, "Delivery")}
          >
            <View style={styles.btnInner}>
              <Text
                style={[
                  styles.title,
                  selectedButton === "Delivery" && { color: Colors.green },
                ]}
              >
                Delivery
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.btn}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
            android_ripple={{ color: "#cccccc" }}
            onPress={handleOrderState.bind(this, "Succeeded")}
          >
            <View style={styles.btnInner}>
              <Text
                style={[
                  styles.title,
                  selectedButton === "Succeeded" && { color: Colors.green },
                ]}
              >
                Succeeded
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.btn}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
            android_ripple={{ color: "#cccccc" }}
            onPress={handleOrderState.bind(this, "Canceled")}
          >
            <View style={styles.btnInner}>
              <Text
                style={[
                  styles.title,
                  selectedButton === "Canceled" && { color: Colors.green },
                ]}
              >
                Canceled
              </Text>
            </View>
          </Pressable>
        </View>
      </View>

      <View style={styles.orderContainer}>
        <Animated.View
          style={[
            styles.listCardShipping,
            {
              height: animatedValue.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "80%"],
                extrapolate: "clamp",
              }),
            },
          ]}
        >
          {orderData.length !== 0 ? (
            <FlatList
              data={orderData}
              renderItem={({ item }) => {
                return (
                  <CardShipping
                    item={item}
                    setOpenModal={setOpenModal}
                    setIdOrder={setIdOrder}
                    setSelectedButton={setSelectedButton}
                  />
                );
              }}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 2,
                    backgroundColor: Colors.light,
                    marginVertical: 20,
                  }}
                />
              )}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>
                You don't have any{" "}
                <Text style={{ fontWeight: "600", color: Colors.green }}>
                  Order
                </Text>{" "}
                here!
              </Text>
            </View>
          )}
        </Animated.View>
      </View>

      <View style={styles.footer}></View>
    </View>
  );
};

export default ShippingScreen;

const styles = StyleSheet.create({
  shippingContainer: {
    backgroundColor: Colors.light,
  },
  header: {
    height: 120,
    backgroundColor: Colors.redPastel200,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  footer: {
    // height: 120,
    // backgroundColor: Colors.redPastel200,
  },
  buttonHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 30,
    height: 70,
    backgroundColor: Colors.white,
    borderRadius: 18,
    top: -35,
    overflow: "hidden",
  },
  btn: {
    height: "100%",
    width: 113,
  },
  btnInner: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.dark,
  },
  orderContainer: {
    marginHorizontal: 10,
  },
  orderSummary: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // marginLeft: 5,
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.dark,
  },

  listCardShipping: {
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 15,
  },
});
