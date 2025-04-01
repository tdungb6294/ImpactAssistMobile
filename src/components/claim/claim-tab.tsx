import { useState } from "react";
import {
  Dimensions,
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { LatLng } from "react-native-maps";
import { Text } from "react-native-paper";
import Animated, {
  KeyboardState,
  useAnimatedKeyboard,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { ClaimTabContext } from "./_context/claim-tab-context";
import { CLAIM_TABS } from "./_data/tabs";
import { useClaimTabGestures } from "./gesture-handlers/claim-tab-gesture-handler";

const { width, height } = Dimensions.get("window");

interface ClaimTabProps {
  showModal: () => void;
  setLocationSelected: (latLng: LatLng) => void;
}

export default function ClaimTab({
  showModal,
  setLocationSelected,
}: ClaimTabProps) {
  const { panGestureX, translateX, translateHighlightX } =
    useClaimTabGestures();
  const keyboard = useAnimatedKeyboard();
  const [isInputNearBottom, setIsInputNearBottom] = useState(false);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      {
        translateY: isInputNearBottom ? -keyboard.height.value : 0,
      },
    ],
  }));

  const tapGesture = Gesture.Tap()
    .onEnd(({ absoluteX }) => {
      const targetIndex = Math.floor(absoluteX / (width / CLAIM_TABS.length));
      translateX.value = withSpring(-targetIndex * width, {
        damping: 40,
        stiffness: 400,
      });
      translateHighlightX.value = withSpring(
        (targetIndex * width) / CLAIM_TABS.length,
        {
          damping: 40,
          stiffness: 400,
        }
      );
    })
    .runOnJS(true);

  const handleTapOnInput = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    if (keyboard.state.value !== KeyboardState.OPEN)
      setIsInputNearBottom(e.nativeEvent.pageY > height / 2);
  };

  return (
    <ClaimTabContext.Provider
      value={{ isInputNearBottom, setIsInputNearBottom, handleTapOnInput }}
    >
      <View style={styles.container}>
        <GestureDetector gesture={tapGesture}>
          <View style={styles.header}>
            {CLAIM_TABS.map((tab, index) => (
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
                    ...styles.highlight,
                    transform: [{ translateX: translateHighlightX }],
                  },
                ]}
              />
            </GestureDetector>
          </View>
        </GestureDetector>
        <GestureDetector gesture={panGestureX}>
          <Animated.View
            style={[styles.contentContainer, animatedStyles]}
          ></Animated.View>
        </GestureDetector>
      </View>
    </ClaimTabContext.Provider>
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
    width: width / CLAIM_TABS.length,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    top: 40,
    position: "absolute",
    flexDirection: "row",
    width: width * CLAIM_TABS.length,
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
    width: width / CLAIM_TABS.length,
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
