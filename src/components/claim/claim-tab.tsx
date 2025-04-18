import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { CustomTheme } from "../../theme/theme";
import { ClaimTabContext } from "./_context/claim-tab-context";
import { useClaimTabGestures } from "./gesture-handlers/claim-tab-gesture-handler";
import ClaimDocuments from "./pages/claim-documents";
import ClaimInsuranceAccidentDetails from "./pages/claim-insurance-accident-details";
import ClaimObjectDetails from "./pages/claim-object-details";
import ObjectClaimReview from "./pages/claim-object-review";
import ClaimVehicleDetails from "./pages/claim-vehicle-details";
import CarClaimReview from "./pages/claim-vehicle-review";

const { width, height } = Dimensions.get("window");

interface ClaimTabProps {
  showModal: () => void;
  type: "car" | "object";
}

export default function ClaimTab({ showModal, type }: ClaimTabProps) {
  const { panGestureX, translateX, translateHighlightX } =
    useClaimTabGestures();
  const [isInputNearBottom, setIsInputNearBottom] = useState(false);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
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
    if (0) setIsInputNearBottom(e.nativeEvent.pageY > height / 2);
  };

  const theme: CustomTheme = useTheme();
  const { t } = useTranslation();

  const CLAIM_TABS = [
    t("Vehicle Details"),
    t("Insurance & Accident"),
    t("Documents"),
    t("Review"),
  ];

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
            style={[
              styles.contentContainer,
              animatedStyles,
              { backgroundColor: theme.colors.background },
            ]}
          >
            {type === "car" ? (
              <ClaimVehicleDetails key={0} />
            ) : (
              <ClaimObjectDetails key={0} />
            )}
            <ClaimInsuranceAccidentDetails key={1} showModal={showModal} />
            <ClaimDocuments key={2} />
            {type === "car" ? (
              <CarClaimReview key={3} />
            ) : (
              <ObjectClaimReview key={3} />
            )}
          </Animated.View>
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
    width: width / 4,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    top: 40,
    position: "absolute",
    flexDirection: "row",
    width: width * 4,
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
    width: width / 4,
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
