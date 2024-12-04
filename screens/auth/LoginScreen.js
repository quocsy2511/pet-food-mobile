import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Touchable,
  TouchableOpacity,
  Pressable,
  Image,
  Alert,
} from "react-native";
import { Colors } from "../../constants/styles";
import Lottie from "lottie-react-native";
import { useState } from "react";
import { login, getUserProfile } from "../../services/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { initUser } from "../../redux/user/user";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  function checkValidEmail() {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (email.length === 0) {
      Alert.alert("What is your email?", "Please tell us.");
      return false;
    } else if (!regex.test(email)) {
      Alert.alert("Incorrect email format", "Please try again.");
      return false;
    } else {
      return true;
    }
  }

  function checkValidPass() {
    if (password.length === 0) {
      Alert.alert("What is your password?", "It can not empty!");
      return false;
    } else {
      return true;
    }
  }

  async function loginApp() {
    if (checkValidEmail() && checkValidPass()) {
      const response = await login(email, password);
      if (response.status === "Failed") {
        Alert.alert("Error", response.message);
      } else if (response.status === "Success") {
        const user = await getUserProfile(response.data.accessToken);
        if (user.status === "Success") {
          const storeUser = {
            fullName: user.data.fullName,
            email: user.data.email,
            dob: user.data.dob,
            phoneNumber: user.data.phoneNumber,
            avatar: user.data.avatar,
            accessToken: response.data.accessToken,
          };
          console.log(storeUser);
          console.log(JSON.stringify(storeUser));
          await AsyncStorage.setItem("user", JSON.stringify(storeUser));
          dispatch(initUser({ user: storeUser }));
          navigation.replace("Store");
        }
      }
    }
  }

  function loginGoogle() {}

  function loginFacebook() {}

  function goToRegister() {
    navigation.replace("Regist");
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Lottie
            source={require("../../assets/animations/lottie_login.json")}
            autoPlay
            loop
            style
          />
        </View>
        <View style={{ flex: 2 }}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="white"
              style={styles.input}
              value={email}
              onBlur={checkValidEmail}
              onChangeText={(value) => setEmail(value)}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="white"
              style={styles.input}
              value={password}
              onChangeText={(value) => setPassword(value)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={loginApp}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <Pressable style={{ marginTop: 12 }} onPress={goToRegister}>
            <Text style={{ fontSize: 12, color: "rgba(0,0,0,0.4)" }}>
              Don't have account?
            </Text>
          </Pressable>
          <View style={styles.separateContainer}>
            <View style={styles.separate}></View>
            <Text style={{ color: Colors.brown600 }}>or</Text>
            <View style={styles.separate}></View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
              onPress={loginGoogle}
            >
              <Image
                style={styles.image}
                source={require("../../assets/icons/icon_google.png")}
                resizeMode="contain"
              />
            </Pressable>
            <View style={{ width: 50 }}></View>
            <Pressable style={{ flex: 1 }} onPress={loginFacebook}>
              <Image
                style={styles.image}
                source={require("../../assets/icons/icon_facebook.png")}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const dWidth = Dimensions.get("window").width;
const dHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.yellow200,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: dWidth * 0.7,
    height: dHeight * 0.65,
  },
  inputContainer: {
    backgroundColor: "rgba(0,0,0,0.04)",
    marginBottom: 15,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  input: {
    color: "white",
    fontSize: 14,
  },
  button: {
    backgroundColor: Colors.brown600,
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 15,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
  separateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  separate: {
    width: "40%",
    height: 3,
    backgroundColor: Colors.brown600,
    borderRadius: 3,
  },
  image: {
    width: 30,
    height: 30,
  },
});
