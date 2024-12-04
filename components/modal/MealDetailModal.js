import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";

export default function MealDetailModal({ item, openModal, setOpenModal }) {
  console.log(item);
  return (
    <Modal animationType="fade" transparent={true} visible={openModal}>
      <TouchableWithoutFeedback
        onPress={() => {
          setOpenModal(false);
        }}
      >
        <View style={styles.modal}>
          <View></View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
});
