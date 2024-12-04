import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function MealModal({
  isVisible,
  setIsVisible,
  title,
  description,
  birdId,
  products,
}) {
  return (
    <Modal animationType="slide" visible={isVisible}>
      <TouchableWithoutFeedback>
        
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({});
