import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/styles";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "react-native-paper";
import {
  getProvinces,
  getDistricts,
  getWards,
  calcDeliveryFee,
} from "../../services/delivery";
import { sendMealOrder } from "../../services/meal";
import { SelectList } from "react-native-dropdown-select-list";
import ConfirmModal from "../../components/modal/ConfirmModal";
import { updateCart } from "../../redux/cart/cart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";

export default function CheckoutScreen({ navigation, route }) {
  const user = useSelector((state) => state.userReducers.user);
  const selectedProducts = route.params.selectedProducts;
  const cartInRedux = useSelector((state) => state.cartReducers.cart);
  const dispatch = useDispatch();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [fullname, setFullname] = useState(user.fullName);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);
  const [address, setAddress] = useState("");
  const [shippingFee, setShippingFee] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [loadingVisible, setLoadingVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const paymentMethodData = [
    { key: "1", value: "COD" },
    { key: "2", value: "MOMO" },
  ];

  useEffect(() => {
    async function getAllProvince() {
      const provinces = await getProvinces();
      const parse = provinces.map(({ ProvinceID, ProvinceName }) => ({
        key: ProvinceID,
        value: ProvinceName,
      }));
      setProvinces(parse);
    }
    getAllProvince();
  }, []);

  useEffect(() => {
    async function getAllDistrict() {
      if (province) {
        const districts = await getDistricts(province);
        const parse = districts.map(({ DistrictID, DistrictName }) => ({
          key: DistrictID,
          value: DistrictName,
        }));
        setDistricts(parse);
      }
    }
    getAllDistrict();
  }, [province]);

  useEffect(() => {
    async function getAllWard() {
      if (district) {
        const wards = await getWards(district);
        const parse = wards.map(({ WardCode, WardName }) => ({
          key: WardCode,
          value: WardName,
        }));
        setWards(parse);
      }
    }
    getAllWard();
  }, [district]);

  useEffect(() => {
    async function countShippingFee() {
      if (ward) {
        const response = await calcDeliveryFee(district, ward);
        setShippingFee(response);
      }
    }
    countShippingFee();
  }, [ward]);

  function renderMealItem({ item }) {
    return (
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <View style={{}}>
          <Image
            source={{ uri: `${item.image}` }}
            defaultSource={require("../../assets/images/loading_image_horizontally.png")}
            style={{ width: 100, height: 100 }}
          />
        </View>
        <View style={{ flex: 5, paddingLeft: 10 }}>
          <Text style={{ fontSize: 18 }} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={{ fontSize: 13, color: "rgba(0,0,0,0.3)" }}>
            {item.description}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "blue",
              borderWidth: 1,
              borderColor: "blue",
              borderRadius: 5,
              paddingHorizontal: 8,
              paddingVertical: 4,
            }}
          >
            {item.quantity}
          </Text>
        </View>
        <View style={{ flex: 1.5, alignItems: "flex-end", paddingTop: 5 }}>
          <Text numberOfLines={6}>
            {item.quantity *
              (item.productMeals.Morning.reduce((value, item) => {
                return (value += item.amount * item.product.price);
              }, 0) +
                item.productMeals.Afternoon.reduce((value, item) => {
                  return (value += item.amount * item.product.price);
                }, 0) +
                item.productMeals.Evening.reduce((value, item) => {
                  return (value += item.amount * item.product.price);
                }, 0))}
            $
          </Text>
        </View>
      </View>
    );
  }

  async function onSubmit() {
    if (
      province === null ||
      district === null ||
      ward === null ||
      address.length === 0
    ) {
      Alert.alert(
        "Missing shipping information",
        "Please give us your address"
      );
      return;
    } else if (paymentMethod.length === 0) {
      Alert.alert("Choose 1 payment method");
      return;
    }
    const orderInfo = {
      fullname: fullname,
      phoneNumber: phoneNumber,
      address: address,
      province: province,
      district: district,
      ward: ward,
      shippingFee: shippingFee,
      paymentMethod: paymentMethod,
    };

    const orderMeals = selectedProducts.map((item) => {
      return { id: item.id, amount: item.quantity };
    });

    setLoadingVisible(true);
    const response = await sendMealOrder(
      orderInfo,
      orderMeals,
      user.accessToken
    );
    setLoadingVisible(false);
    if (response?.status === "Success") {
      setVisible(true);
      if (response.data.paymentUrl) {
        Linking.openURL(response.data.paymentUrl);
      }
      setTimeout(() => {
        const orderMealsId = orderMeals.map((item) => {
          return item.id;
        });
        const updatedCart = cartInRedux.filter(
          (item) => !orderMealsId.includes(item.id)
        );
        dispatch(updateCart({ cart: updatedCart }));
        AsyncStorage.setItem("cart", JSON.stringify(updatedCart));

        setVisible(false);
        navigation.goBack();
      }, 3000);
    } else if (response?.status === "Fail") {
      // if(response.message === "Product is not enough")
      Alert.alert("Take order fail", response.data[0]);
    } else {
      Alert.alert(
        "Take order fail",
        "Please check your address and try again!"
      );
    }
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ConfirmModal
        visible={visible}
        setVisible={setVisible}
        requireUrl="lottie_order_success"
        text="Order successfully"
      />
      <ConfirmModal
        visible={loadingVisible}
        setVisible={setLoadingVisible}
        requireUrl="lottie_loading_clock"
        text="Processing....."
      />
      <Pressable
        style={styles.headerContainer}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="chevron-back-outline" size={25} color="white" />
        <Text style={styles.headerText}>Payment</Text>
      </Pressable>
      <ScrollView style={styles.bodyContainer}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ marginVertical: 15, fontSize: 16 }}>
            Please inform us for shipping
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Fullname</Text>
            <TextInput
              style={styles.input}
              value={fullname}
              onChangeText={setFullname}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone number</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { marginBottom: 10 }]}>Province</Text>
            <SelectList
              setSelected={setProvince}
              data={provinces}
              placeholder="Select Province"
              search={false}
              // defaultOption={}
              arrowicon={
                <FontAwesome
                  name="chevron-down"
                  size={13}
                  color={Colors.transparentDark}
                />
              }
              save="key"
              maxHeight={200}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={[styles.label, { marginBottom: 10 }]}>District</Text>
              <View>
                <SelectList
                  setSelected={setDistrict}
                  data={districts}
                  placeholder="Select District"
                  search={false}
                  boxStyles={{}}
                  arrowicon={
                    <FontAwesome
                      name="chevron-down"
                      size={13}
                      color={Colors.transparentDark}
                    />
                  }
                  save="key"
                  maxHeight={200}
                />
                {!province && <View style={styles.selectionLayer} />}
              </View>
            </View>
            <View style={{ width: 20 }} />
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={[styles.label, { marginBottom: 10 }]}>Ward</Text>
              <View>
                <SelectList
                  setSelected={setWard}
                  data={wards}
                  placeholder="Select Ward"
                  search={false}
                  arrowicon={
                    <FontAwesome
                      name="chevron-down"
                      size={13}
                      color={Colors.transparentDark}
                    />
                  }
                  save="key"
                  maxHeight={200}
                />
                {!district && <View style={styles.selectionLayer} />}
              </View>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Provide specific address"
              placeholderTextColor={Colors.transparentDark}
            />
          </View>
        </View>
        <View style={styles.separator} />
        <View style={{ paddingTop: 10, paddingHorizontal: 20 }}>
          <FlatList
            data={selectedProducts}
            renderItem={renderMealItem}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={[styles.separator, { height: 3, marginTop: 0 }]} />
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.payment}>
            <Text>Total: {selectedProducts.length} meal(s)</Text>
            <Text>
              {selectedProducts.reduce((value, item) => {
                return (value +=
                  item.quantity *
                  (item.productMeals.Morning.reduce((value, item) => {
                    return (value += item.amount * item.product.price);
                  }, 0) +
                    item.productMeals.Afternoon.reduce((value, item) => {
                      return (value += item.amount * item.product.price);
                    }, 0) +
                    item.productMeals.Evening.reduce((value, item) => {
                      return (value += item.amount * item.product.price);
                    }, 0)));
              }, 0)}
              $
            </Text>
          </View>
          <View
            style={[
              styles.payment,
              {
                marginBottom: 15,
              },
            ]}
          >
            <Text style={{ color: "rgba(0,0,0,0.4)" }}>Shipping fee</Text>
            <Text style={{ color: "rgba(0,0,0,0.4)" }}>
              {(shippingFee / 24000).toFixed(1)}$
            </Text>
          </View>
          <View style={[styles.payment, { marginBottom: 0 }]}>
            <Text style={styles.paymenText}>Total</Text>
            <Text style={styles.paymenText}>
              {(
                shippingFee / 24000 +
                selectedProducts.reduce((value, item) => {
                  return (value +=
                    item.quantity *
                    (item.productMeals.Morning.reduce((value, item) => {
                      return (value += item.amount * item.product.price);
                    }, 0) +
                      item.productMeals.Afternoon.reduce((value, item) => {
                        return (value += item.amount * item.product.price);
                      }, 0) +
                      item.productMeals.Evening.reduce((value, item) => {
                        return (value += item.amount * item.product.price);
                      }, 0)));
                }, 0)
              ).toFixed(1)}
              $
            </Text>
          </View>
        </View>
        <View style={[styles.separator, { height: 3 }]} />
        <View style={{ paddingHorizontal: 20, marginBottom: 100 }}>
          <Text style={[styles.label, { marginBottom: 10 }]}>
            Payment methods:
          </Text>
          <SelectList
            setSelected={setPaymentMethod}
            data={paymentMethodData}
            placeholder="Choose 1 method"
            search={false}
            arrowicon={
              <FontAwesome
                name="chevron-down"
                size={13}
                color={Colors.transparentDark}
              />
            }
            save="value"
          />
        </View>
      </ScrollView>
      <Pressable style={styles.footerContainer} onPress={onSubmit}>
        <Text style={styles.footerText}>Purchase</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const dWidth = Dimensions.get("window").width;
const dHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.purple400,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: dWidth * 0.5,
  },
  headerText: {
    fontSize: 17,
    fontWeight: "500",
    color: "white",
    paddingHorizontal: 15,
  },
  bodyContainer: {
    backgroundColor: "white",
    height: dHeight * 0.75,
  },
  footerContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 25,
    fontWeight: "500",
    color: "white",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
  },
  input: {
    color: Colors.transparentDark,
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.transparentDark,
  },
  selectionLayer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 10,
  },
  separator: {
    width: "100%",
    height: 10,
    backgroundColor: "rgba(0,0,0,0.07)",
    marginVertical: 10,
  },
  payment: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  paymenText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
