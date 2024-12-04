import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/auth/LoginScreen";
import RegistScreen from "./screens/auth/RegistScreen";
import HomeScreen from "./screens/store/HomeScreen";
import ProfileScreen from "./screens/store/ProfileScreen";
import CartScreen from "./screens/store/CartScreen";
import SplashScreen from "./screens/splash/SplashScreen";
import OnboardScreen from "./screens/onboard/OnboardScreen";
import SearchScreen from "./screens/others/SearchScreen";
import ShippingScreen from "./screens/store/ShippingScreen";
import DetailScreen from "./screens/others/DetailScreen";
import AddButtonTab from "./components/button/AddButtonTab";
import CheckoutScreen from "./screens/others/CheckoutScreen";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/redux";
import { initUser } from "./redux/user/user";
import { updateCart } from "./redux/cart/cart";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, FontAwesome5, Ionicons, Feather } from "@expo/vector-icons";
import { Colors } from "./constants/styles";
import { useFonts } from "expo-font";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import ChangPasswordScreen from "./screens/others/ChangPasswordScreen";
import CustomMealScreen from "./screens/others/CustomMealScreen";
import ArchiveCustomerScreen from "./screens/store/ArchiveCustomerScreen";
import FilterMealsScreen from "./screens/others/FilterMealsScreen";
import DetailNewScreen from "./screens/others/DetailNewScreen";
import DetailProductInMeal from "./screens/others/DetailProductInMeal";
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
const HAS_LAUNCH = "HAS_LAUNCH";

function BottomTabsScreen() {
  const cartInRedux = useSelector((state) => state.cartReducers.cart);

  function EmptyScreen() {
    return <></>;
  }
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.yellow100,
        tabBarStyle: styles.tabBar,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarInactiveTintColor: Colors.purple100,
      }}
    >
      <Tabs.Screen
        name="ArchiveCustomer"
        component={ArchiveCustomerScreen}
        options={{
          tabBarLabel: "archive",
          tabBarIcon: ({ focused, size, color }) => (
            <View style={[styles.iconContainer]}>
              {/* <AntDesign name="home" size={size} color={color} /> */}
              <Feather name="archive" size={size} color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ focused, size, color }) => (
            <View style={[styles.iconContainer]}>
              <AntDesign name="shoppingcart" size={size} color={color} />
              {cartInRedux.reduce(
                (value, item) => (value += item.quantity),
                0
              ) !== 0 && (
                <View
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -6,
                    backgroundColor: "red",
                    width: 18,
                    height: 18,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 12, fontWeight: "500" }}
                  >
                    {cartInRedux.reduce(
                      (value, item) => (value += item.quantity),
                      0
                    )}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Add Meal",
          tabBarButton: () => (
            <TouchableOpacity disabled>
              <AddButtonTab />
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, size, color }) => (
            <View style={[styles.iconContainer]}>
              <AntDesign name="user" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Shipping"
        component={ShippingScreen}
        options={{
          tabBarLabel: "Shipping",
          tabBarIcon: ({ focused, size, color }) => (
            <View style={[styles.iconContainer]}>
              <FontAwesome5 name="shipping-fast" size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

function StackScreen({ hasLaunched }) {
  const navigation = useNavigation();
  const goBackFunction = () => {
    navigation.goBack();
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"Splash"}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        initialParams={{ hasLaunched }}
        options={{}}
      />
      <Stack.Screen name="Onboard" component={OnboardScreen} options={{}} />
      <Stack.Screen name="Store" component={BottomTabsScreen} options={{}} />
      <Stack.Screen name="Login" component={LoginScreen} options={{}} />
      <Stack.Screen name="Regist" component={RegistScreen} options={{}} />
      <Stack.Screen name="Search" component={SearchScreen} options={{}} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{}} />
      <Stack.Screen name="FilterMeals" component={FilterMealsScreen} />
      <Stack.Screen name="DetailNewScreen" component={DetailNewScreen} />
      <Stack.Screen name="Home" component={HomeScreen} options={{}} />
      <Stack.Screen
        name="DetailProductsMeal"
        component={DetailProductInMeal}
        options={{}}
      />
      <Stack.Screen
        name="CustomMeal"
        component={CustomMealScreen}
        options={{}}
      />
      <Stack.Screen name="Detail" component={DetailScreen} options={{}} />
      <Stack.Screen
        name="ChangePassword"
        component={ChangPasswordScreen}
        options={{
          title: "Change Password",
          headerShown: true,
          headerLeft: () => (
            <Pressable onPress={goBackFunction}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
          ),
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: "500",
          },
        }}
      />
    </Stack.Navigator>
  );
}

function Main({ hasLaunched, setHasLaunched }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [fontLoaded] = useFonts({
    SeaweedScript: require("./assets/fonts/SeaweedScript-Regular.ttf"),
  });

  useEffect(() => {
    async function getUser() {
      const userFromStorage = await AsyncStorage.getItem("user");
      if (userFromStorage !== null) {
        dispatch(initUser({ user: JSON.parse(userFromStorage) }));
      }
    }
    getUser().catch((err) => console.log(err));

    async function getCart() {
      const cartFromStorage = await AsyncStorage.getItem("cart");
      if (cartFromStorage !== null) {
        dispatch(updateCart({ cart: JSON.parse(cartFromStorage) }));
      }
    }
    getCart().catch((err) => console.log(err));

    async function getIsFirstLaunch() {
      const isLaunched = await AsyncStorage.getItem(HAS_LAUNCH);
      if (isLaunched) {
        console.log("not null => set state");
        setHasLaunched(true);
      } else {
        console.log("NULL => set storage");
        await AsyncStorage.setItem(HAS_LAUNCH, "true");
      }
      setLoading(false);
    }
    getIsFirstLaunch().catch((err) => console.log(err));
  }, []);

  if (loading || !fontLoaded) {
    return null; // Render a loading state or a placeholder component here
  }

  const theme = {
    ...DefaultTheme,
    fonts: {
      regular: {
        fontFamily: "SeaweedScript",
        fontWeight: "normal",
      },
      // bold: {
      //   fontFamily: 'SeaweedScript-Bold',
      //   fontWeight: 'bold',
      // },
      // italic: {
      //   fontFamily: 'SeaweedScript-Italic',
      //   fontWeight: 'normal',
      //   fontStyle: 'italic',
      // },
      // anotherFamilyRegular: {
      //   fontFamily: 'AnotherFamily-Regular',
      //   fontWeight: 'normal',
      // },
    },
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StackScreen hasLaunched={hasLaunched} />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default function App() {
  const [hasLaunched, setHasLaunched] = useState(false);
  // AsyncStorage.clear();
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={Colors.transparent}
        style="light"
      />
      <Provider store={store}>
        <Main hasLaunched={hasLaunched} setHasLaunched={setHasLaunched} />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    height: 55,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: "transparent",
    backgroundColor: Colors.purple400,
    shadowColor: Colors.dark,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 6,
  },
  iconContainer: {
    position: "absolute",
    top: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    margin: 0,
  },
});
