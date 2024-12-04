import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function OrderDetailModal({ item, openModal, setOpenModal }) {
  console.log(item);
  console.log(item.orderDetails);
  return (
    <Modal animationType="fade" transparent={true} visible={openModal}>
      <TouchableWithoutFeedback
        onPress={() => {
          setOpenModal(false);
        }}
      >
        <View style={styles.modal}>
          <View
            style={{
              width: dWidth * 0.7,
              minHeight: dHeight * 0.45,
              // maxHeight: dHeight * 0.6,
              backgroundColor: "white",
              borderRadius: 30,
              marginTop: 30,
            }}
          >
            <View style={{ marginTop: 50, marginHorizontal: 20 }}>
              <Text style={styles.text}>
                <Text style={styles.label}>Code :</Text> {item.orderCode}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Date :</Text> {item.orderDate}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Phone :</Text> {item.phone}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>To :</Text> {item.shippingAddress}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Payment : </Text>
                {item.transactions[0]?.paymentType ?? "unchecking"}
              </Text>
              <Text style={[styles.label, { marginBottom: 10 }]}>Meal</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.3)",
                  borderRadius: 10,
                  padding: 10,
                  maxHeight: 170,
                }}
              >
                <FlatList
                  data={item.orderDetails}
                  renderItem={({ item }) => {
                    return (
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          source={{ uri: `${item.meal.image}` }}
                          style={{ width: 60, height: 60, borderRadius: 10 }}
                        />
                        <View style={{ width: 10 }} />
                        <View
                          style={{
                            justifyContent: "space-between",
                            marginVertical: 8,
                          }}
                        >
                          <Text style={{ fontWeight: "600" }}>
                            {item.meal.title}
                          </Text>
                          <Text>x{item.amount}</Text>
                        </View>
                      </View>
                    );
                  }}
                  ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                  marginTop: 20,
                  marginBottom: 30,
                }}
              >
                <Text style={{ fontWeight: "600", fontSize: 20 }}>Total</Text>
                <Text
                  style={{ fontWeight: "600", fontSize: 20, color: "green" }}
                >
                  ${(item.totalPrice / 24000).toFixed(1)}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "white",
                padding: 25,
                borderRadius: 50,
                position: "absolute",
                top: -50,
                right: (dWidth * 0.7) / 2 - 50,
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../assets/icons/icon_shipping.png")}
              />
            </View>
          </View>
          <Pressable
            style={{
              padding: 10,
              backgroundColor: "#fe6464",
              borderRadius: 30,
              marginTop: 10,
            }}
            onPress={() => {
              setOpenModal(false);
            }}
          >
            <Feather name="x" size={30} color={"white"} />
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const dWidth = Dimensions.get("window").width;
const dHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  text: {
    fontSize: 15,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
});
