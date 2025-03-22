import {
  Gesture,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { runOnJS, useSharedValue } from "react-native-reanimated";
import { TABS } from "../../_temp-data/tabs";

export const useDeclarationTabGestures = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const translateHighlightX = useSharedValue(0);
  const sensitivity = 0.3;
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
    const newTranslationY = translateY.value + event.translationY * sensitivity;
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

  return {
    panGestureX,
    panGestureY,
    translateX,
    translateY,
    translateHighlightX,
  };
};
