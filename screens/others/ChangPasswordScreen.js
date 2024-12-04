import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Caption, Title, TouchableRipple } from "react-native-paper";
import { MaterialCommunityIcons, Octicons, Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import { changePassWordHandler } from "../../services/user";
import { useNavigation } from "@react-navigation/native";
import ConfirmModal from "../../components/modal/ConfirmModal";

const ChangPasswordScreen = ({ route }) => {
  const user = route.params.user;
  const [oldPass, setOldPass] = useState({ value: "", error: "" });
  const [newPass, setNewPass] = useState({ value: "", error: "" });
  const [confirmPass, setConfirmPass] = useState({ value: "", error: "" });
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  function setStateHandler(state, error) {
    state((current) => {
      return { ...current, error: error };
    });
  }

  function validate() {
    if (oldPass.value.length === 0) {
      setStateHandler(setOldPass, "Password is at least 6 characters");
      return false;
    } else {
      setStateHandler(setOldPass, "");
    }

    if (newPass.value.length < 6) {
      setStateHandler(setNewPass, "Password is at least 6 characters");
      return false;
    } else {
      setStateHandler(setNewPass, "");
    }

    if (confirmPass.value.length === 0) {
      setStateHandler(setConfirmPass, "Input your password to confirm!");
      return false;
    } else {
      setStateHandler(setConfirmPass, "");
    }
    return true;
  }

  const AlertOption = (messageError) => {
    Alert.alert("Warning", `${messageError}`, [
      {
        text: "Try Again",
        onPress: () => console.log("again"),
        style: "cancel",
      },
    ]);
  };

  const changePassword = async () => {
    if (validate) {
      const data = {
        oldPassword: oldPass.value,
        newPassword: newPass.value,
        confirmNewPassword: confirmPass.value,
      };
      const response = await changePassWordHandler(data, user.accessToken);
      if (response.status === "Success") {
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
          navigation.replace("Login");
        }, 3000);
      } else if (response.status === "Fail") {
        const messageError = response.message;
        AlertOption(messageError);
      } else if (response.statusCode === 400) {
        const messageError = response.message[0];
        AlertOption(messageError);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ConfirmModal
        visible={visible}
        setVisible={setVisible}
        requireUrl={"lottie_regist_success"}
        text="Change Password Successfully"
      />
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: `${user.avatar}`,
            }}
            size={80}
          />
          <View style={{ marginLeft: 20, marginTop: 5 }}>
            <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>
              {user.fullName}
            </Title>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Octicons name="dot-fill" size={20} color="green" />
              <Caption style={styles.caption}>@user</Caption>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.action}>
        <MaterialCommunityIcons
          name="shield-key-outline"
          size={24}
          color={Colors.green}
        />
        <TextInput
          placeholder="Old Password"
          placeholderTextColor="#666666"
          autoCorrect={false}
          autoFocus={true}
          style={styles.textInput}
          value={oldPass.value}
          onChangeText={(input) =>
            setOldPass((current) => {
              return { ...current, value: input };
            })
          }
          onBlur={() => {
            if (oldPass.value.length === 0 || oldPass.value.length < 6) {
              setStateHandler(setOldPass, "Password is at least 6 characters!");
            } else {
              setStateHandler(setOldPass, "");
            }
          }}
        />
      </View>
      <Text style={styles.error}>{oldPass.error}</Text>

      <View style={styles.action}>
        <Ionicons name="key-outline" size={24} color={Colors.green} />
        <TextInput
          placeholder="New Password"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={styles.textInput}
          value={newPass.value}
          onChangeText={(input) =>
            setNewPass((current) => {
              return { ...current, value: input };
            })
          }
          onBlur={() => {
            if (newPass.value.length === 0 || newPass.value.length < 6) {
              setStateHandler(setNewPass, "Password is at least 6 characters!");
            } else {
              setStateHandler(setNewPass, "");
            }
          }}
        />
      </View>
      <Text style={styles.error}>{newPass.error}</Text>

      <View style={styles.action}>
        <Ionicons name="key-outline" size={24} color={Colors.green} />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={styles.textInput}
          value={confirmPass.value}
          onChangeText={(input) =>
            setConfirmPass((current) => {
              return { ...current, value: input };
            })
          }
          onBlur={() => {
            if (
              newPass.value.length !== 0 &&
              confirmPass.value !== newPass.value
            ) {
              setStateHandler(setConfirmPass, "Unmatch Password!");
            } else if (confirmPass.value.length === 0) {
              setStateHandler(
                setConfirmPass,
                "Input your password to confirm!"
              );
            } else {
              setStateHandler(setConfirmPass, "");
            }
          }}
        />
      </View>
      <Text style={styles.error}>{confirmPass.error}</Text>

      <TouchableRipple style={styles.commandButton} onPress={changePassword}>
        <Text style={{ color: Colors.green }}>Submit</Text>
      </TouchableRipple>
    </SafeAreaView>
  );
};

export default ChangPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pink100,
  },
  userInfoSection: {
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
    marginLeft: 5,
  },
  action: {
    flexDirection: "row",
    marginVertical: 10,
    borderBottomColor: "#666666",
    borderBottomWidth: 1,
    paddingBottom: 5,
    alignItems: "center",
    marginHorizontal: 20,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
    marginHorizontal: 3,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.pink200,
    alignItems: "center",
    marginTop: 50,
    marginHorizontal: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginLeft: 25,
  },
});
