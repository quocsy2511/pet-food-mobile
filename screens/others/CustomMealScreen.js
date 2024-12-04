import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../services/product";
import { Ionicons, Octicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateCart } from "../../redux/cart/cart";
import { createCustomerMeal, saveCustomerMeal } from "../../services/meal";
import ConfirmModal from "../../components/modal/ConfirmModal";

export default function CustomMealScreen({ navigation, route }) {
  const cartInRedux = useSelector((state) => state.cartReducers.cart);
  const accessToken = useSelector(
    (state) => state.userReducers.user.accessToken
  );
  const dispatch = useDispatch();

  const meal = route.params.meal;
  const isUpdate = route.params.isUpdate;
  const [openModal, setOpenModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [scaleValue1] = useState(new Animated.Value(1));
  const [scaleValue2] = useState(new Animated.Value(1));

  const [products, setProducts] = useState([]);
  const [session, setSession] = useState("Morning");
  const [morningProducts, setMorningProducts] = useState([]);
  const [afternoonProducts, setAfternoonProducts] = useState([]);
  const [eveningProducts, setEveningProducts] = useState([]);
  const [title, setTitle] = useState(meal.title);

  useEffect(() => {
    async function getAllProducts() {
      const response = await getAllProduct(accessToken);
      if (response.status === "Success") {
        const fixedData = response.data.map((item) => {
          const { description, remainQuantity, ...newItem } = item;
          return newItem;
        });
        if (response.data.length % 3 === 1) {
          setProducts([...fixedData, null]);
        } else if (response.data.length % 3 === 2) {
          setProducts([...fixedData, null, null]);
        } else setProducts(fixedData);
      }
    }
    getAllProducts();

    setMorningProducts(meal.productMeals.Morning ?? []);
    setAfternoonProducts(meal.productMeals.Afternoon ?? []);
    setEveningProducts(meal.productMeals.Evening ?? []);
  }, []);

  function renderSessionItem({ item }) {
    return (
      <Pressable
        style={[
          {
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
          },
          session === item && { backgroundColor: Colors.purple400 },
        ]}
        onPress={() => {
          setSession(item);
        }}
      >
        <Text
          style={[
            { fontWeight: "bold", color: Colors.transparentDark },
            session === item && { color: "white" },
          ]}
        >
          {item}
        </Text>
      </Pressable>
    );
  }

  function renderProductItem({ item }) {
    var list;
    if (session === "Morning") list = morningProducts;
    else if (session === "Afternoon") list = afternoonProducts;
    else list = eveningProducts;

    function handlePress() {
      var newList;
      if (list.some((p) => p.product.id === item.id)) {
        newList = list.filter((p) => p.product.id != item.id);
      } else {
        newList = [...list, { amount: 1, product: item }];
      }
      if (session === "Morning") setMorningProducts(newList);
      else if (session === "Afternoon") setAfternoonProducts(newList);
      else setEveningProducts(newList);
    }

    if (item === null) {
      return <View style={{ width: dWidth * 0.25 }} />;
    } else {
      const isSelected = list.some((p) => p.product.id === item.id);
      return (
        <Pressable
          style={[
            {
              width: dWidth * 0.25,
              backgroundColor: "transparent",
              borderRadius: 5,
              padding: 3,
            },
            isSelected && { backgroundColor: Colors.purple400 },
          ]}
          onPress={handlePress}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              borderRadius: 5,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: dWidth * 0.25 - 6,
                height: dWidth * 0.25 - 6,
                borderRadius: 5,
              }}
            />

            <Text
              style={{
                flex: 1,
                color: "black",
                fontWeight: "500",
                fontSize: 12,
                textAlign: "center",
                marginVertical: 8,
              }}
            >
              {item.productName}
            </Text>
          </View>
        </Pressable>
      );
    }
  }

  function SelectorModal() {
    const mealToAPI = {
      ...meal,
      title: title,
      productMeals: [
        {
          Morning: morningProducts.map((item) => {
            return { id: item.product.id, amount: item.amount };
          }),
        },
        {
          Afternoon: afternoonProducts.map((item) => {
            return { id: item.product.id, amount: item.amount };
          }),
        },
        {
          Evening: eveningProducts.map((item) => {
            return { id: item.product.id, amount: item.amount };
          }),
        },
      ],
    };

    async function addToCart() {
      if (
        morningProducts.length === 0 &&
        afternoonProducts.length === 0 &&
        eveningProducts.length === 0
      ) {
        Alert.alert(
          "Missing information!",
          "You can not clone a meal with empty product"
        );
        return;
      }
      Animated.timing(scaleValue1, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(scaleValue1, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });

      const response = await createCustomerMeal(mealToAPI, accessToken);
      if (response.status === "Success") {
        const { createdBy, status, ...resMeal } = response.data;
        const updatedData = [...cartInRedux, { ...resMeal, quantity: 1 }];
        setOpenModal(false);
        dispatch(updateCart({ cart: updatedData }));
        await AsyncStorage.setItem("cart", JSON.stringify(updatedData));

        navigation.navigate("Cart");
      } else {
        Alert.alert("Something went wrong", "Please try again later");
      }
    }

    async function storeMeal() {
      if (
        morningProducts.length === 0 &&
        afternoonProducts.length === 0 &&
        eveningProducts.length === 0
      ) {
        Alert.alert(
          "Missing information!",
          "You can not clone a meal with empty product"
        );
        return;
      }
      Animated.timing(scaleValue2, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(scaleValue2, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });

      const response = await createCustomerMeal(mealToAPI, accessToken);
      if (response.status === "Success") {
        setOpenModal(false);
        navigation.navigate("ArchiveCustomer");
      } else {
        Alert.alert("Something went wrong", "Please try again later");
      }
    }

    return (
      <Modal animationType="fade" transparent={true} visible={openModal}>
        <TouchableWithoutFeedback
          onPress={() => {
            setOpenModal(false);
          }}
        >
          <View style={styles.modal}>
            <Text style={{ fontSize: 25, fontWeight: "600", color: "white" }}>
              This meal will
            </Text>
            <View style={{ height: 40 }} />
            <TouchableWithoutFeedback onPress={addToCart}>
              <Animated.View
                style={[
                  styles.modalItem,
                  { transform: [{ scale: scaleValue1 }] },
                ]}
              >
                <Text style={styles.modalText}>Add to Cart</Text>
                <View style={styles.modalButton}>
                  <Octicons name="plus" color={"white"} size={30} />
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
            <View style={{ height: 20 }} />
            <TouchableWithoutFeedback onPress={storeMeal}>
              <Animated.View
                style={[
                  styles.modalItem,
                  { transform: [{ scale: scaleValue2 }] },
                ]}
              >
                <Text style={styles.modalText}>Store it</Text>
                <View style={styles.modalButton}>
                  <Octicons name="plus" color={"white"} size={30} />
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  async function saveMeal() {
    if (
      morningProducts.length === 0 &&
      afternoonProducts.length === 0 &&
      eveningProducts.length === 0
    ) {
      Alert.alert(
        "Missing information!",
        "You can not clone a meal with empty product"
      );
      return;
    }
    const mealToAPI = {
      ...meal,
      title: title,
      productMeals: [
        {
          Morning: morningProducts.map((item) => {
            return { id: item.product.id, amount: item.amount };
          }),
        },
        {
          Afternoon: afternoonProducts.map((item) => {
            return { id: item.product.id, amount: item.amount };
          }),
        },
        {
          Evening: eveningProducts.map((item) => {
            return { id: item.product.id, amount: item.amount };
          }),
        },
      ],
    };

    const response = await saveCustomerMeal(mealToAPI, accessToken);
    if (response.status === "Success") {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        navigation.goBack();
      }, 2000);
    } else {
      Alert.alert("Something went wrong", "Please try again later");
    }
  }

  return (
    <View style={styles.rootContainer}>
      <SelectorModal />
      <ConfirmModal
        visible={visible}
        setVisible={setVisible}
        requireUrl="lottie_update"
      />

      <Pressable
        style={{
          position: "absolute",
          top: dHeight * 0.05,
          left: 25,
          // backgroundColor: Colors.purple400,
          paddingTop: 5,
          borderRadius: 50,
        }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="chevron-back" color={"black"} size={25} />
      </Pressable>

      <View
        style={{
          marginHorizontal: 25,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginTop: 15,
        }}
      >
        <View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "rgba(0,0,0,0.4)",
              }}
            >
              Customize your own
            </Text>
            <Text style={{ fontSize: 30, fontWeight: "600" }}>MEAL.</Text>
          </View>
          <TextInput
            value={title}
            onChangeText={(value) => setTitle(value)}
            style={{
              borderBottomColor: "rgba(0,0,0,0.1)",
              borderBottomWidth: 1.5,
            }}
            placeholder="Description"
          />
        </View>
        <View
          style={{
            borderRadius: 10,
            backgroundColor: "white",
            shadowColor: "black",
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowOffset: { height: 4 },
          }}
        >
          <Image
            source={{ uri: meal.image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
            }}
            resizeMode="cover"
            defaultSource={require("../../assets/images/loading_image_horizontally.png")}
          />
        </View>
      </View>

      <View
        style={{
          width: dWidth * 0.55,
          height: 5,
          backgroundColor: Colors.purple400,
          borderRadius: 10,
          marginVertical: 25,
          marginLeft: 25,
        }}
      />

      <View>
        <FlatList
          data={["Morning", "Afternoon", "Evening"]}
          renderItem={renderSessionItem}
          numColumns={3}
          contentContainerStyle={{ marginHorizontal: 25, marginBottom: 20 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </View>

      <View style={{ paddingBottom: 100 }}>
        <FlatList
          data={products}
          renderItem={renderProductItem}
          // keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={{ marginHorizontal: 25, paddingBottom: 200 }}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        />
      </View>
      <Pressable
        style={{
          position: "absolute",
          bottom: dHeight * 0.05,
          right: 30,
          backgroundColor: Colors.purple400,
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderRadius: 50,
          shadowColor: "black",
          shadowOpacity: 0.5,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 3 },
        }}
        onPress={() => {
          if (isUpdate) {
            saveMeal();
          } else setOpenModal(true);
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
          {isUpdate ? "Save" : "Finish"}
        </Text>
      </Pressable>
    </View>
  );
}

const dWidth = Dimensions.get("window").width;
const dHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: dHeight * 0.08,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalItem: {
    width: dWidth * 0.6,
    height: 60,
    backgroundColor: "white",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.purple800,
    marginRight: 30,
  },
  modalButton: {
    position: "absolute",
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: Colors.purple800,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
