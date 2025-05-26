import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { LatLng } from "react-native-maps";
import { Text, useTheme } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { CustomTheme } from "../../theme/theme";
import { TABS } from "./_data/tabs";
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

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
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

  const theme: CustomTheme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <GestureDetector gesture={tapGesture}>
        <View style={styles.header}>
          {TABS.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, { backgroundColor: theme.colors.background }]}
            >
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
                  backgroundColor: theme.colors.primary,
                  transform: [{ translateX: translateHighlightX }],
                },
              ]}
            />
          </GestureDetector>
          <View style={styles.headerDivider} />
        </View>
      </GestureDetector>
      <GestureDetector gesture={panGestureX}>
        <Animated.View
          style={[
            styles.contentContainer,
            animatedStyles,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <DeclarationDetails
            showModal={showModal}
            setLocationSelected={setLocationSelected}
          />
          <DeclarationFirstCar />
          <DeclarationSecondCar />
          <DeclarationReview />
        </Animated.View>
      </GestureDetector>
    </View>
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
    width: width / TABS.length,
    height: 2,
    zIndex: 1,
  },
  dividerBar: {
    backgroundColor: "gray",
    position: "absolute",
    width: 1,
    height: 40,
    right: 0,
  },
  headerDivider: {
    backgroundColor: "gray",
    position: "absolute",
    width: width,
    height: 1,
    bottom: 0,
    zIndex: 0,
  },
});
