import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/styles";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import CardArchive from "../../components/card/CardArchive";
import { useSelector } from "react-redux";
import { getAllMealCustomerFunction } from "../../services/meal";

const dWith = Dimensions.get("window").width;
const dHeight = Dimensions.get("window").height;

const ArchiveCustomerScreen = ({ navigation }) => {
  const [mealCustomer, setMealCustomer] = useState([]);
  const accessToken = useSelector(
    (state) => state.userReducers.user.accessToken
  );
  const isFocused = useIsFocused();

  useEffect(() => {
    getAllMealCustomer(accessToken);
  }, [accessToken, isFocused]);

  const getAllMealCustomer = async (accessToken) => {
    try {
      const response = await getAllMealCustomerFunction(accessToken);
      if (response?.status === "Success") {
        setMealCustomer(response.data);
      } else {
        console.log("error in screen : ");
      }
    } catch (error) {
      console.log("error in screen : ", error);
    }
  };

  const renderItem = (itemData) => {
    return (
      <View>
        <CardArchive
          data={itemData.item}
          isDelete={true}
          mealCustomer={mealCustomer}
          setMealCustomer={setMealCustomer}
          isArchieve={true}
        />
      </View>
    );
  };

  if (mealCustomer === [] || mealCustomer.length === 0) {
    return (
      <>
        <View style={styles.header}>
          <View style={styles.innerHeader}>
            <Text style={styles.title}>Archive</Text>
          </View>
        </View>
        <View style={styles.emptyContainer}>
          <AntDesign name="dropbox" size={150} color={Colors.purple400} />
          <View>
            <Text textEmpty>Your Archive Is Empty </Text>
          </View>
        </View>
      </>
    );
  }
  return (
    <>
      <View style={styles.header}>
        <View style={styles.innerHeader}>
          <View>
            <Text style={styles.title}>Archive</Text>
          </View>
        </View>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: Colors.pink100 }}>
        <View
          style={{
            flex: 1,
            paddingBottom: 150,
            backgroundColor: Colors.pink100,
          }}
        >
          <View style={styles.container}>
            <View style={styles.productContainer}>
              <FlatList
                data={mealCustomer}
                renderItem={renderItem}
                key={(item) => item.id}
                scrollEnabled={false}
                ItemSeparatorComponent={
                  <View style={{ height: 3, backgroundColor: "transparent" }} />
                }
                contentContainerStyle={{
                  marginHorizontal: 15,
                  borderRadius: 30,
                  overflow: "hidden",
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ArchiveCustomerScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.pink100,
    paddingTop: dHeight * 0.065,
    paddingBottom: 10,
  },
  headerBtn: {
    height: 30,
    width: 30,
    borderRadius: 99999,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 13,
  },
  title: {
    textAlign: "center",
    fontSize: 45,
    fontFamily: "SeaweedScript",
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  productContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.pink100,
  },
  textEmpty: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
});
