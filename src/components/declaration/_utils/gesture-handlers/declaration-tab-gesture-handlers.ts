import {
  Gesture,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { runOnJS, useSharedValue } from "react-native-reanimated";

export const useDeclarationTabGestures = () => {
  const translateX = useSharedValue(0);
  const translateHighlightX = useSharedValue(0);
  const panGestureX = Gesture.Pan();

  const handleXMove = (
    _event: GestureUpdateEvent<PanGestureHandlerEventPayload>
  ) => {
    translateHighlightX.value = translateX.value / -4;
  };

  panGestureX
    .onUpdate((event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
      runOnJS(handleXMove)(event);
    })
    .runOnJS(true);

  return {
    panGestureX,
    translateX,
    translateHighlightX,
  };
};
