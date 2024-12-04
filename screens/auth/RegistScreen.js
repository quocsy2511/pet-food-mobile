import {
  Alert,
  Button,
  Dimensions,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Colors } from "../../constants/styles";
import { useState } from "react";
import { signup } from "../../services/user";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { Ionicons } from "@expo/vector-icons";
import Lottie from "lottie-react-native";
import ConfirmModal from "../../components/modal/ConfirmModal";

export default function RegistScreen({ navigation }) {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPass, setConfirmPass] = useState({ value: "", error: "" });
  const [phone, setPhone] = useState({ value: "", error: "" });
  const [dob, setDob] = useState({ value: "", error: "" });
  const [apiRes, setApiRes] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const startDate = getFormatedDate(new Date("2000-01-01"), "YYYY/MM/DD");
  const endDate = getFormatedDate(new Date(), "YYYY/MM/DD");

  function goToLogin() {
    navigation.replace("Login");
  }

  function setStateHandler(state, error) {
    state((current) => {
      return { ...current, error: error };
    });
  }

  function validate() {
    if (name.value.length === 0) {
      setStateHandler(setName, "Input your name!");
      return false;
    } else {
      setStateHandler(setName, "");
    }

    if (email.value.length === 0 || !email.value.includes("@")) {
      setStateHandler(setEmail, "Invalid email address!");
      return false;
    } else {
      setStateHandler(setEmail, "");
    }

    if (password.value.length < 6) {
      setStateHandler(setPassword, "Password is at least 6 characters");
      return false;
    } else {
      setStateHandler(setPassword, "");
    }

    if (confirmPass.value.length === 0) {
      setStateHandler(setConfirmPass, "Input your password to confirm!");
      return false;
    } else {
      setStateHandler(setConfirmPass, "");
    }

    if (phone.value.length < 10) {
      setStateHandler(setPhone, "Invalid!");
      return false;
    } else {
      setStateHandler(setPhone, "");
    }

    if (dob.value.length === 0) {
      setStateHandler(setDob, "Empty Date!");
      return false;
    } else {
      setStateHandler(setDob, "");
    }

    return true;
  }

  async function regist() {
    if (validate()) {
      const parts = dob.value.split("/");
      const user = {
        fullName: name.value,
        dob: `${parts[0]}-${parts[1]}-${parts[2]}`,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPass.value,
        phoneNumber: phone.value,
      };
      console.log(user);
      const res = await signup(user);
      console.log(res);
      if (res.statusCode === 400) {
        setApiRes(res);
      } else if (res.status === "Success") {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigation.navigate("Login");
        }, 3000);
      } else {
        setApiRes(null);
        Alert.alert("An error has occur", "Please ty again");
      }
    }
  }

  function handleModel() {
    if (dob.length === 0) {
      setStateHandler(setDob, "Empty Date!");
    } else {
      setStateHandler(setDob, "");
    }
    setOpenModal(!openModal);
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.rootContainer}>
        <ConfirmModal
          visible={isSuccess}
          setVisible={setIsSuccess}
          requireUrl="lottie_confirm"
          text="Verify your account in email"
        />
        <Modal animationType="fade" transparent={true} visible={openModal}>
          <TouchableWithoutFeedback onPress={handleModel}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.4)",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 20,
                  width: "80%",
                  padding: 30,
                }}
              >
                <DatePicker
                  mode="calendar"
                  minimumDate={startDate}
                  maximumDate={endDate}
                  onDateChange={(date) => {
                    setDob((current) => {
                      return { ...current, value: date };
                    });
                  }}
                  options={{
                    textHeaderColor: "#FFA25B",
                    // textDefaultColor: '#F6E7C1',
                    selectedTextColor: "white",
                    mainColor: "#FFA25B",
                    // textSecondaryColor: '#D6C7A1',
                  }}
                />
                <Button title="Accept" onPress={handleModel} color="#FFA25B" />
              </View>
              <TouchableOpacity
                onPress={handleModel}
                style={{
                  backgroundColor: "white",
                  padding: 10,
                  marginTop: 20,
                  borderRadius: 50,
                }}
              >
                <Ionicons name="md-close-sharp" size={25} color="red" />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <View style={styles.container}>
          <View style={styles.field}>
            <Text style={styles.label}>Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Nguyễn Văn A"
                placeholderTextColor="rgba(255,255,255,0.6)"
                style={styles.input}
                value={name.value}
                onChangeText={(input) => {
                  setName((current) => {
                    return { ...current, value: input };
                  });
                }}
                onBlur={() => {
                  if (name.value.length < 0)
                    setStateHandler(setName, "Input your name!");
                  else setStateHandler(setName, "");
                }}
              />
            </View>
            <Text style={styles.error}>{name.error}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="abc@gmail.com"
                placeholderTextColor="rgba(255,255,255,0.6)"
                style={styles.input}
                value={email.value}
                onChangeText={(input) =>
                  setEmail((current) => {
                    return { ...current, value: input };
                  })
                }
                onBlur={() => {
                  if (email.value.length === 0 || !email.value.includes("@"))
                    setStateHandler(setEmail, "Invalid email address!");
                  else setStateHandler(setEmail, "");
                }}
              />
            </View>
            <Text style={styles.error}>{email.error}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                secureTextEntry={true}
                placeholder="•••"
                placeholderTextColor="rgba(255,255,255,0.6)"
                style={styles.input}
                value={password.value}
                onChangeText={(input) =>
                  setPassword((current) => {
                    return { ...current, value: input };
                  })
                }
                onBlur={() => {
                  if (password.value.length === 0 || password.value.length < 6)
                    setStateHandler(
                      setPassword,
                      "Password is at least 6 characters!"
                    );
                  else setStateHandler(setPassword, "");
                }}
              />
            </View>
            <Text style={styles.error}>
              {password.error}
              {apiRes && password.error === "" && apiRes.message[0]}
            </Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                secureTextEntry={true}
                placeholder="•••"
                placeholderTextColor="rgba(255,255,255,0.6)"
                style={styles.input}
                value={confirmPass.value}
                onChangeText={(input) =>
                  setConfirmPass((current) => {
                    return { ...current, value: input };
                  })
                }
                onBlur={() => {
                  if (
                    password.value.length !== 0 &&
                    confirmPass.value !== password.value
                  )
                    setStateHandler(setConfirmPass, "Unmatch Password!");
                  else if (confirmPass.value.length === 0)
                    setStateHandler(
                      setConfirmPass,
                      "Input your password to confirm!"
                    );
                  else setStateHandler(setConfirmPass, "");
                }}
              />
            </View>
            <Text style={styles.error}>
              {confirmPass.error}
              {apiRes && confirmPass.error === "" && apiRes.message[0]}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.label}>Phone</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="090*******"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  style={styles.input}
                  value={phone.value}
                  onChangeText={(input) =>
                    setPhone((current) => {
                      return { ...current, value: input };
                    })
                  }
                  onBlur={() => {
                    if (phone.value.length < 10)
                      setStateHandler(setPhone, "Invalid!");
                    else setStateHandler(setPhone, "");
                  }}
                  keyboardType="decimal-pad"
                  maxLength={10}
                />
              </View>
              <Text style={styles.error}>{phone.error}</Text>
            </View>
            <View style={{ width: 10 }}></View>
            <Pressable
              onPress={handleModel}
              style={[styles.field, { flex: 1 }]}
            >
              <Text style={styles.label}>Birthday</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.input}>{dob.value}</Text>
              </View>
              <Text style={styles.error}>{dob.error}</Text>
            </Pressable>
          </View>

          <TouchableOpacity style={styles.button} onPress={regist}>
            <Text style={styles.buttonText}>REGIST</Text>
          </TouchableOpacity>
          <Pressable style={{ marginTop: 15 }} onPress={goToLogin}>
            <Text
              style={{
                fontSize: 12,
                color: "rgba(0,0,0,0.4)",
                textAlign: "center",
              }}
            >
              Go to login!
            </Text>
          </Pressable>
        </View>
        {/* {isSuccess && (
          <View style={styles.success}>
            <View style={{ flex: 1, marginHorizontal: 40 }}>
              <Lottie
                source={require("../../assets/animations/lottie_regist_success.json")}
                autoPlay
                loop
                style
              />
            </View>
          </View>
        )} */}
      </View>
    </TouchableWithoutFeedback>
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
    justifyContent: "center",
  },
  field: {
    marginBottom: 10,
  },
  label: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 25,
    marginBottom: 5,
  },
  inputContainer: {
    backgroundColor: "rgba(0,0,0,0.04)",
    // marginBottom: 20,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  input: {
    color: "white",
    fontSize: 14,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginLeft: 25,
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
  success: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.4)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
