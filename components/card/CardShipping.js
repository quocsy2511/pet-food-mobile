import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/styles";
import image1 from "../../assets/meme1.jpg";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { cancelOrder, repaymentOrder } from "../../services/order";
import { useSelector } from "react-redux";
import * as Linking from "expo-linking";

const img = {
  created: require("../../assets/images/delivery_order.png"),
  confirmed: require("../../assets/images/delivery_order.png"),
  delivering: require("../../assets/images/delivery.png"),
  completed: require("../../assets/images/delivery_success.png"),
  canceled: require("../../assets/images/delivery_cancel.png"),
};

const CardShipping = ({
  item,
  setOpenModal,
  setIdOrder,
  setSelectedButton,
}) => {
  const accessToken = useSelector(
    (state) => state.userReducers.user.accessToken
  );
  const status = item.orderStatus;

  function handleCancelOrder() {
    Alert.alert("Are you sure?", "You are removing an order", [
      {
        text: "No",
        style: "destructive",
      },
      {
        text: "Yes",
        onPress: () => {
          async function handleCancel() {
            const response = await cancelOrder(accessToken, item.id);
            console.log(response);
            if (response.status === "Success") setSelectedButton("Canceled");
          }
          handleCancel();
        },
      },
    ]);
  }

  function handleRepayment() {
    Alert.alert(
      "Payment again?",
      "We are redicrect you to MOMO payment method",
      [
        {
          text: "No",
          style: "destructive",
        },
        {
          text: "Yes",
          onPress: () => {
            async function handleRepayment() {

              const response = await repaymentOrder(accessToken, item.id);
              console.log(response);
              if (response?.status === "Success") {
                Linking.openURL(response.data);
                setSelectedButton("Delivery");
              } else {
                Alert.alert(
                  "Something went wrong",
                  "We can not take your bill! Please try again."
                );
              }
            }
            handleRepayment();
          },
        },
      ]
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setIdOrder(item.id);
        setOpenModal(true);
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            backgroundColor: "white",
            shadowColor: "black",
            shadowOpacity: 0.3,
            shadowRadius: 3,
            shadowOffset: { width: 0 },
            marginLeft: 10,
            marginVertical: 10,
          }}
        >
          <Image
            source={img[status]}
            resizeMode="contain"
            style={{
              width: 100,
              height: 100,
            }}
          />
        </View>
        <View
          style={{ flex: 1, marginLeft: 10, justifyContent: "space-between" }}
        >
          <Text style={{ fontSize: 15, fontWeight: "600" }}>
            Order code : {item.orderCode}
          </Text>
          <View style={{ height: 5 }} />
          <Text>{item.orderDate}</Text>
          <Text>
            Qty :{" "}
            {item.orderDetails.reduce((value, item) => {
              return (value += item.amount);
            }, 0)}{" "}
            item
          </Text>
          <Text>
            Payment :{" "}
            <Text
              style={{
                fontWeight: "600",
                fontSize: 16,
                color:
                  item.transactions[0] === undefined
                    ? "black"
                    : item.transactions[0]?.paymentType === "MOMO"
                    ? "#a50064"
                    : "#0057a5",
              }}
            >
              {item.transactions[0]?.paymentType ?? "none"}
            </Text>
          </Text>
          <View style={{ height: 5 }} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "green",
                borderWidth: 1,
                borderColor: "green",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 10,
              }}
            >
              ${(item.totalPrice / 24000).toFixed(1)}
            </Text>
            {status === "created" && (
              <Pressable
                style={{ flex: 1, marginLeft: 5 }}
                onPress={handleRepayment}
              >
                <MaterialCommunityIcons name="cash" size={30} />
              </Pressable>
            )}
            {status === "created" || status === "confirmed" ? (
              <TouchableOpacity onPress={handleCancelOrder}>
                <Ionicons name="trash-outline" size={25} color={"#f36d10"} />
              </TouchableOpacity>
            ) : (
              <Feather name="search" size={25} color={Colors.transparentDark} />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardShipping;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: 120,
    paddingHorizontal: 20,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "rgba(0,0,0,0.2)",
  },
});
