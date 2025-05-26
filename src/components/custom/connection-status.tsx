import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/AntDesign";
import ActivityIndicator from "./activity-indicator";

interface ConnectionStatusProps {
  status: string;
  onPressOut?: () => void;
}

export default function ConnectionStatus({
  status,
  onPressOut = () => {},
}: ConnectionStatusProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <Pressable
        onLongPress={() => {
          scale.value = withSpring(1.3);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
          onPressOut();
        }}
      >
        <Animated.View style={animatedStyle}>
          {status === "connecting" ? (
            <ActivityIndicator />
          ) : status === "connected" ? (
            <Icon size={64} name="checkcircle" color={"green"} />
          ) : (
            <Icon size={64} name="closecircle" color={"red"} />
          )}
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 80,
    right: 0,
  },
  statusIconConnected: {
    width: 64,
    height: 64,
    borderRadius: 64,
    backgroundColor: "green",
  },
  statusIconDisconnected: {
    width: 64,
    height: 64,
    borderRadius: 64,
    backgroundColor: "red",
  },
});
