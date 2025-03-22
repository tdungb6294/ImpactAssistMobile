import {
  Canvas,
  Path,
  Skia,
  SkPath,
  useCanvasRef,
} from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Button } from "react-native-paper";

interface SkiaSignatureProps {
  initialPathData: string;
  onOk: (pathData: string, imageData: string) => void;
}

export default function SkiaSignature({
  initialPathData,
  onOk,
}: SkiaSignatureProps) {
  const [paths, setPaths] = useState<SkPath[]>([]);
  const [currentPath, setCurrentPath] = useState<SkPath | null>(null);
  const canvasRef = useCanvasRef();

  useEffect(() => {
    if (initialPathData) setPaths(convertJsonDataToPath(initialPathData));
  }, []);

  const smoothPath = (path: SkPath, x: number, y: number) => {
    const prevPoint = path.getLastPt();
    if (!prevPoint) {
      path.moveTo(x, y);
    } else {
      const midX = (prevPoint.x + x) / 2;
      const midY = (prevPoint.y + y) / 2;
      path.quadTo(prevPoint.x, prevPoint.y, midX, midY);
    }
  };

  const pan = Gesture.Pan()
    .onStart(({ x, y }) => {
      const newPath = Skia.Path.Make();
      newPath.moveTo(x, y);
      setCurrentPath(newPath);
    })
    .onUpdate(({ x, y }) => {
      if (currentPath) {
        smoothPath(currentPath, x, y);
        // Update state to trigger re-render
        setCurrentPath(Skia.Path.MakeFromSVGString(currentPath.toSVGString())!);
      }
    })
    .onEnd(() => {
      if (currentPath) {
        setPaths((prevPaths) => [...prevPaths, currentPath]);
        setCurrentPath(null);
      }
    })
    .runOnJS(true);

  const saveDrawingAsImage = (): string => {
    const image = canvasRef.current?.makeImageSnapshot();
    const base64 = image?.encodeToBase64();
    return `data:image/png;base64,${base64}`;
  };

  return (
    <View>
      <GestureDetector gesture={pan}>
        <Canvas ref={canvasRef} style={styles.canvas}>
          {paths.map((path, index) => (
            <Path
              key={index}
              path={path}
              strokeWidth={4}
              color="black"
              style="stroke"
              strokeCap="round"
            />
          ))}
          {currentPath && (
            <Path
              path={currentPath}
              strokeWidth={4}
              color="black"
              style="stroke"
              strokeCap="round"
            />
          )}
        </Canvas>
      </GestureDetector>
      <Button
        onPress={() => {
          const pathData = convertPathToJsonData(paths);
          onOk(pathData, saveDrawingAsImage());
        }}
      >
        Submit
      </Button>
      <Button onPress={() => setPaths([])}>Clear</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    width: 300,
    height: 300,
    backgroundColor: "blue",
  },
});

export const convertPathToJsonData: (paths: SkPath[]) => string = (
  paths: SkPath[]
) => {
  const pathData = paths.map((path) => path.toSVGString());
  const jsonData = JSON.stringify({ pathData });
  return jsonData;
};

export const convertJsonDataToPath: (jsonString: string) => SkPath[] = (
  jsonString: string
) => {
  const data = JSON.parse(jsonString);
  if (data.paths) {
    const loadedPaths = data.paths.map(
      (svg: string) => Skia.Path.MakeFromSVGString(svg)!
    );
    return loadedPaths as SkPath[];
  }
  return [];
};
