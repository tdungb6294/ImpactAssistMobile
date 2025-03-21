import { Dispatch } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
} from "react-native-gesture-handler";
import { LatLng } from "react-native-maps";
import { Text } from "react-native-paper";
import Animated, {
  runOnJS,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandlerEventPayload } from "react-native-screens";
import { Declaration } from "../../model/declaration";
import { DeclarationAction } from "../../reducer/declaration-reducer";
import DeclarationDetails from "./declaration-details";
import DeclarationFirstCar from "./declaration-first-car";
import DeclarationReview from "./declaration-review";
import DeclarationSecondCar from "./declaration-second-car";

const { width, height } = Dimensions.get("window");
const TABS = [
  "Vehicle Accident Details",
  "First Vehicle",
  "Second Vehicle",
  "Review",
];

interface DeclarationTabProps {
  declaration: Declaration;
  showModal: () => void;
  carCountryPlate: string;
  socket: WebSocket;
  dispatch: Dispatch<DeclarationAction>;
  webSocketId: number;
  setLocationSelected: (latLng: LatLng) => void;
}

export default function DeclarationTab({
  declaration,
  showModal,
  carCountryPlate,
  socket,
  dispatch,
  webSocketId,
  setLocationSelected,
}: DeclarationTabProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const translateHighlightX = useSharedValue(0);
  const panGestureX = Gesture.Pan();
  const panGestureY = Gesture.Pan();

  const handleXMove = (
    _event: GestureUpdateEvent<PanGestureHandlerEventPayload>
  ) => {
    translateHighlightX.value = translateX.value / -TABS.length;
  };

  const handleYMove = (
    event: GestureUpdateEvent<PanGestureHandlerEventPayload>
  ) => {
    const newTranslationY = translateY.value + event.translationY * 0.3;
    translateY.value = Math.max(-400, Math.min(0, newTranslationY));
  };

  panGestureX
    .onUpdate((event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
      runOnJS(handleXMove)(event);
    })
    .requireExternalGestureToFail(panGestureY)
    .runOnJS(true);

  panGestureY
    .onUpdate((event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
      runOnJS(handleYMove)(event);
    })
    .simultaneousWithExternalGesture(panGestureX)
    .runOnJS(true);

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
                styles.highlight,
                { transform: [{ translateX: translateHighlightX }] },
              ]}
            />
          </GestureDetector>
        </View>
      </GestureDetector>
      <GestureDetector gesture={Gesture.Simultaneous(panGestureX, panGestureY)}>
        <Animated.View
          style={[
            styles.contentContainer,
            { transform: [{ translateX }, { translateY }] },
          ]}
        >
          <DeclarationDetails
            key={0}
            declaration={declaration}
            showModal={showModal}
            setLocationSelected={setLocationSelected}
          />
          <DeclarationFirstCar
            key={1}
            declaration={declaration}
            carCountryPlate={carCountryPlate}
            socket={socket}
            dispatch={dispatch}
            webSocketId={webSocketId}
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
  contentContainer: {
    flexDirection: "row",
    width: width * TABS.length,
    zIndex: -1,
    height,
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
