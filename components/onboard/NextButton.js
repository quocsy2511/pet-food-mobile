import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

export default function NextButton({ percentage, scrollTo, currentIndex }) {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const navigation = useNavigation();

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(
      (value) => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;
        if (progressRef?.current)
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
      },
      [percentage]
    );
    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} fill="transparent">
        <G rotation="-90" origin={center}>
          <Circle
            stroke="#cccccc"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            stroke="#F4338F"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity
        onPress={() => {
          if (currentIndex === 2) navigation.replace("Login");
          else scrollTo();
        }}
        style={styles.button}
        activeOpacity={0.7}
      >
        <AntDesign
          name={currentIndex === 2 ? "check" : "arrowright"}
          size={32}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    backgroundColor: "#F4338f",
    borderRadius: 100,
    padding: 20,
  },
});
