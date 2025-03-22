import { Dispatch, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { LatLng } from "react-native-maps";
import { Text } from "react-native-paper";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Declaration } from "../../model/declaration";
import { DeclarationAction } from "../../reducer/declaration-reducer";
import { TABS } from "./_temp-data/tabs";
import { useDeclarationTabGestures } from "./_utils/gesture-handlers/declaration-tab-gesture-handlers";
import DeclarationDetails from "./declaration-details";
import DeclarationFirstCar from "./declaration-first-car";
import DeclarationReview from "./declaration-review";
import DeclarationSecondCar from "./declaration-second-car";

const { width, height } = Dimensions.get("window");

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
  const {
    panGestureX,
    panGestureY,
    translateX,
    translateY,
    translateHighlightX,
  } = useDeclarationTabGestures();
  const keyboard = useAnimatedKeyboard();
  const tapGestureY = Gesture.Tap();
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

  tapGestureY
    .onEnd((event) => {
      if (event.absoluteY > height / 2) {
        setIsInputNearBottom(true);
      } else {
        setIsInputNearBottom(false);
      }
    })
    .requireExternalGestureToFail(panGestureX, panGestureY)
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
                {
                  transform: [{ translateX: translateHighlightX }],
                },
              ]}
            />
          </GestureDetector>
        </View>
      </GestureDetector>
      <GestureDetector
        gesture={Gesture.Simultaneous(panGestureX, panGestureY, tapGestureY)}
      >
        <Animated.View
          style={[
            styles.contentContainer,
            {
              transform: [{ translateX }, { translateY }],
            },
            animatedStyles,
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

// FIXME: style declaration tab style

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
