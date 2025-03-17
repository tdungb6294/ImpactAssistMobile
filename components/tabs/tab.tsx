import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
} from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { PanGestureHandlerEventPayload } from "react-native-screens";

const { width, height } = Dimensions.get("window");
const TABS = [
  "Vehicle Accident Details",
  "First Vehicle",
  "Second Vehicle",
  "Review",
];

export default function Tab() {
  const translateX = useSharedValue(0);
  const translateHighlightX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
      const newTranslation = translateX.value + event.translationX * 0.3; // Reduce sensitivity
      translateX.value = Math.max(
        -width * (TABS.length - 1),
        Math.min(0, newTranslation)
      );
      translateHighlightX.value = translateX.value / -TABS.length;
    })
    .onEnd(() => {
      const currentIndex = Math.round(translateX.value / -width);
      translateX.value = withSpring(-currentIndex * width, {
        damping: 40,
        stiffness: 400,
      });
      translateHighlightX.value = withSpring(
        (currentIndex * width) / TABS.length,
        {
          damping: 40,
          stiffness: 400,
        }
      );
    });

  const tapGesture = Gesture.Tap().onEnd(({ absoluteX }) => {
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
  });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={tapGesture}>
        <View style={styles.header}>
          {TABS.map((tab) => (
            <TouchableOpacity style={styles.tab}>
              <View style={styles.dividerBar} />
              <Text>{tab}</Text>
              <View style={styles.dividerBar} />
            </TouchableOpacity>
          ))}
          <GestureDetector gesture={panGesture}>
            <Animated.View
              style={[
                styles.highlight,
                { transform: [{ translateX: translateHighlightX }] },
              ]}
            />
          </GestureDetector>
        </View>
      </GestureDetector>
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[styles.contentContainer, { transform: [{ translateX }] }]}
        >
          {TABS.map((screen, index) => (
            <View
              key={index}
              style={[
                styles.screen,
                { backgroundColor: `hsl(${index * 120}, 60%, 70%)` },
              ]}
            >
              <Text style={styles.screenText}>{screen}</Text>
            </View>
          ))}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width,
    backgroundColor: "lightgray",
    height: 40,
  },
  tab: {
    backgroundColor: "white",
    width: width / TABS.length,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: { flexDirection: "row", width: width * TABS.length },
  screen: {
    width,
    height: height,
  },
  screenText: { fontSize: 24, fontWeight: "bold" },
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
