import { Animated, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import OnboardItem from "../../components/onboard/OnboardItem";
import Paginator from "../../components/onboard/Paginator";
import NextButton from "../../components/onboard/NextButton";

const data = [
  {
    id: 1,
    title: "Feathered Favorites",
    description: "Discover the Finest Bird Food Selection at Our Store",
    image: require('../../assets/images/onboard1.png'),
  },
  {
    id: 2,
    title: "Wings & Seeds",
    description:
      "Satisfy Your Avian Friends' Appetites with Our Premium Bird Food",
      image: require('../../assets/images/onboard2.png'),
  },
  {
    id: 3,
    title: "Flock Feast",
    description:
      "Step into our Store and Treat Your Feathers to the Best Bird Food in Town",
      image: require('../../assets/images/onboard1.png'),
  },
];

export default function OnboardScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 10 }).current;

  const scrollTo = () => {
    if (currentIndex < data.length - 1)
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => <OnboardItem item={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      <Paginator data={data} scrollX={scrollX} />
      <NextButton
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / data.length)}
        currentIndex={currentIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
