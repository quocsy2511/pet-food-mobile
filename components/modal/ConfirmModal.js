import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Modal, Portal } from "react-native-paper";
import Lottie from "lottie-react-native";

const animationSources = {
  lottie_add_to_cart: require("../../assets/animations/lottie_add_to_cart.json"),
  lottie_order_success: require("../../assets/animations/lottie_order_success.json"),
  lottie_unshipping: require("../../assets/animations/lottie_unshipping.json"),
  lottie_loading_clock: require("../../assets/animations/lottie_loading_clock.json"),
  lottie_regist_success: require("../../assets/animations/lottie_regist_success.json"),
  lottie_confirm: require("../../assets/animations/lottie_confirm.json"),
  lottie_update: require("../../assets/animations/lottie_update.json"),
  // Add more animation sources as needed
};

export default function ConfirmModal({
  visible,
  setVisible,
  requireUrl,
  text,
}) {
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const animationSource = animationSources[requireUrl];

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.container}
      >
        <View style={styles.container}>
          <Lottie
            source={animationSource}
            autoPlay
            loop
            style={{ width: dWidth * 0.7, height: dWidth * 0.7 }}
          />
          <Text
            style={{
              fontSize: 30,
              fontWeight: "600",
              fontFamily: "SeaweedScript",
            }}
          >
            {text}
          </Text>
        </View>
      </Modal>
    </Portal>
  );
}

const dWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
