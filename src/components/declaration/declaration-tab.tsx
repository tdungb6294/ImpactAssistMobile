import { SetStateAction } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
} from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { PanGestureHandlerEventPayload } from "react-native-screens";
import { Declaration } from "../../model/declaration";
import DeclarationDetails from "./declaration-details";
import DeclarationFirstCar from "./declaration-first-car";
import DeclarationReview from "./declaration-review";
import DeclarationSecondCar from "./declaration-second-car";

const { width } = Dimensions.get("window");
const TABS = [
  "Vehicle Accident Details",
  "First Vehicle",
  "Second Vehicle",
  "Review",
];

interface DeclarationTabProps {
  declaration: Declaration;
  showModal: () => void;
  setDeclaration: (value: SetStateAction<Declaration>) => void;
  carCountryPlate: string;
  socket: WebSocket;
}

export default function DeclarationTab({
  declaration,
  setDeclaration,
  showModal,
  carCountryPlate,
  socket,
}: DeclarationTabProps) {
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
          {TABS.map((tab, index) => (
            <TouchableOpacity key={index} style={styles.tab}>
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
          <DeclarationDetails
            key={0}
            declaration={declaration}
            showModal={showModal}
          />
          <DeclarationFirstCar
            key={1}
            declaration={declaration}
            setDeclaration={setDeclaration}
            carCountryPlate={carCountryPlate}
            socket={socket}
          />
          <DeclarationSecondCar key={2} declaration={declaration} />
          <DeclarationReview key={3} declaration={declaration} />
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
