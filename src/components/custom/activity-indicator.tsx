import { Canvas, Circle, Path, Skia } from "@shopify/react-native-skia";
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

interface ActivityIndicatorProps {
  size?: number;
  strokeWidth?: number;
  backgroundColor?: string;
  arcColor?: string;
  startAngle?: number;
  sweepAngle?: number;
}

export default function ActivityIndicator({
  size = 64,
  strokeWidth = 8,
  backgroundColor = "#ecf0f1",
  arcColor = "#3498db",
  startAngle = 0,
  sweepAngle = 70,
}: ActivityIndicatorProps) {
  const radius = (size - strokeWidth) / 2;
  const center = { x: size / 2, y: size / 2 };
  const path = Skia.Path.Make();
  path.addArc(
    {
      x: center.x - radius,
      y: center.y - radius,
      width: radius * 2,
      height: radius * 2,
    },
    startAngle,
    sweepAngle
  );

  path.addArc(
    {
      x: center.x - radius,
      y: center.y - radius,
      width: radius * 2,
      height: radius * 2,
    },
    startAngle + sweepAngle + 20,
    sweepAngle
  );

  path.addArc(
    {
      x: center.x - radius,
      y: center.y - radius,
      width: radius * 2,
      height: radius * 2,
    },
    startAngle + sweepAngle * 2 + 40,
    sweepAngle
  );

  path.addArc(
    {
      x: center.x - radius,
      y: center.y - radius,
      width: radius * 2,
      height: radius * 2,
    },
    startAngle + sweepAngle * 3 + 60,
    sweepAngle
  );

  // Animated value for rotation
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the rotation animation
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true, // Use native driver for better performance
      })
    ).start();
  }, [rotation]);

  // Interpolate the rotation value to degrees
  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "720deg"],
  });

  return (
    <Animated.View
      style={{
        transform: [{ rotate: rotateInterpolate }],
      }}
    >
      <Canvas
        style={{
          width: size,
          height: size,
        }}
      >
        <Circle
          cx={center.x}
          cy={center.y}
          r={radius + strokeWidth / 2}
          color={backgroundColor}
        />
        <Path
          path={path}
          style="stroke"
          strokeWidth={strokeWidth}
          color={arcColor}
          strokeCap="butt"
        />
      </Canvas>
    </Animated.View>
  );
}
