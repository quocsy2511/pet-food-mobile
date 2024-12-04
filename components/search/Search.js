import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/core";

const Search = () => {
  const navigation = useNavigation();

  function goToSearchScreen() {
    navigation.navigate("Search");
  }

  return (
    <View style={styles.searchContainer}>
      <TouchableOpacity
        onPress={goToSearchScreen}
        style={styles.searchInnerContainer}
      >
        <Ionicons
          name="search"
          size={18}
          color={Colors.transparentDark}
          style={styles.iconSearch}
        />
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    marginRight: 20,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
  },
  searchInnerContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.light,
    alignItems: "center",
  },
  iconSearch: {
    marginLeft: 20,
  },
  searchText: {
    paddingLeft: 10,
    fontSize: 15,
    color: Colors.transparentDark,
    flex: 1,
    fontWeight: "500",
  },
});
