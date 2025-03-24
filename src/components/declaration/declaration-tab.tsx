import { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { LatLng } from "react-native-maps";
import { Text } from "react-native-paper";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { DeclarationTabContext } from "./_context/declaration-tab-context";
import { TABS } from "./_temp-data/tabs";
import { useDeclarationTabGestures } from "./_utils/gesture-handlers/declaration-tab-gesture-handlers";
import DeclarationDetails from "./declaration-details";
import DeclarationFirstCar from "./declaration-first-car";
import DeclarationReview from "./declaration-review";
import DeclarationSecondCar from "./declaration-second-car";

const { width } = Dimensions.get("window");

interface DeclarationTabProps {
  showModal: () => void;
  setLocationSelected: (latLng: LatLng) => void;
}

export default function DeclarationTab({
  showModal,
  setLocationSelected,
}: DeclarationTabProps) {
  const { panGestureX, translateX, translateHighlightX } =
    useDeclarationTabGestures();
  const keyboard = useAnimatedKeyboard();
  const [isInputNearBottom, setIsInputNearBottom] = useState(false);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: isInputNearBottom ? -keyboard.height.value : 0 },
    ],
  }));

  const tapGesture = Gesture.Tap()
    .onEnd(({ absoluteX }) => {
      const targetIndex = Math.floor(absoluteX / (width / TABS.length));
      translateX.value = withSpring(-targetIndex * width, {
        damping: 40,
        stiffness: 400,
      });
      translateHighlightX.value = withSpring(
        (targetIndex * width) / TABS.length,
        {
          damping: 40,
          stiffness: 400,
        }
      );
    })
    .runOnJS(true);

  return (
    <DeclarationTabContext.Provider
      value={{ isInputNearBottom, setIsInputNearBottom }}
    >
      <View style={styles.container}>
        <GestureDetector gesture={tapGesture}>
          <View style={styles.header}>
            {TABS.map((tab, index) => (
              <TouchableOpacity key={index} style={styles.tab}>
                <View style={styles.dividerBar} />
                <Text>{tab}</Text>
                <View style={styles.dividerBar} />
              </TouchableOpacity>
            ))}
            <GestureDetector gesture={panGestureX}>
              <Animated.View
                style={[
                  {
                    transform: [{ translateX: translateHighlightX }],
                  },
                ]}
              />
            </GestureDetector>
          </View>
        </GestureDetector>
        <GestureDetector gesture={panGestureX}>
          <Animated.View style={[styles.contentContainer, animatedStyles]}>
            <DeclarationDetails
              key={0}
              showModal={showModal}
              setLocationSelected={setLocationSelected}
            />
            <DeclarationFirstCar key={1} />
            <DeclarationSecondCar key={2} />
            <DeclarationReview key={3} />
          </Animated.View>
        </GestureDetector>
      </View>
    </DeclarationTabContext.Provider>
  );
}

// FIXME: style declaration tab style

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width,
    backgroundColor: "lightgray",
    height: 40,
    position: "static",
    zIndex: 1,
  },
  tab: {
    backgroundColor: "white",
    width: width / TABS.length,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    top: 40,
    position: "absolute",
    flexDirection: "row",
    width: width * TABS.length,
    height: "100%",
  },
  childContainer: {
    width: width,
    flexGrow: 1,
  },
  highlight: {
    bottom: 0,
    position: "absolute",
    backgroundColor: "blue",
    width: width / TABS.length,
    height: 2,
  },
  dividerBar: {
    backgroundColor: "gray",
    position: "absolute",
    width: 1,
    height: 40,
    right: 0,
  },
});
