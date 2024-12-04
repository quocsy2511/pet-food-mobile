import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CardCartItem from "../card/CardCartItem";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import { useDispatch } from "react-redux";
import { updateCart } from "../../redux/cart/cart";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ListCardCart({
  data,
  setMeals,
  selectedProducts,
  setSelectedProducts,
}) {
  const dispatch = useDispatch();

  function dataSelection() {
    if (selectedProducts.length === data.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(data);
    }
  }

  function renderItemCard({ item }) {
    return (
      <CardCartItem
        dataItem={item}
        data={data}
        setMeals={setMeals}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
    );
  }

  function clearAll() {
    Alert.alert("Are you sure?", "You are clearing your cart!", [
      {
        text: "No",
        style: "destructive",
      },
      {
        text: "Yes",
        onPress: () => {
          const newCart = [];
          setMeals(newCart);
          dispatch(updateCart({ cart: newCart }));
          AsyncStorage.setItem("cart", JSON.stringify(newCart));
          setSelectedProducts([]);
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <Pressable onPress={clearAll}>
            <Text style={{ color: "red", fontWeight: "600" }}>Clear</Text>
          </Pressable>
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.label}>Selected ({selectedProducts.length})</Text>
          <Pressable
            style={[
              styles.check,
              selectedProducts.length === 0 && {
                backgroundColor: "transparent",
              },
            ]}
            onPress={dataSelection}
          >
            <Ionicons
              name="checkmark-sharp"
              color={selectedProducts.length !== 0 ? "white" : "transparent"}
              size={20}
            />
          </Pressable>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={renderItemCard}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 150 },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  label: {
    fontSize: 14,
    marginRight: 10,
  },
  check: {
    marginRight: 13,
    borderWidth: 1.5,
    borderColor: Colors.pink800,
    borderRadius: 50,
    backgroundColor: Colors.pink800,
  },
});
