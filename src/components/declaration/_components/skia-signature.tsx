import {
  Canvas,
  Path,
  Skia,
  SkPath,
  useCanvasRef,
} from "@shopify/react-native-skia";
import { Dispatch, SetStateAction, useState } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import ImpactAssistButton from "../../custom/button";

interface SkiaSignatureProps {
  paths: SkPath[];
  setPaths: Dispatch<SetStateAction<SkPath[]>>;
  onOk: (pathData: SkPath[], imageData: string) => void;
}

export default function SkiaSignature({
  paths,
  setPaths,
  onOk,
}: SkiaSignatureProps) {
  const [currentPath, setCurrentPath] = useState<SkPath | null>(null);
  const canvasRef = useCanvasRef();

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
    <View style={{ gap: 8, flex: 1 }}>
      <GestureDetector gesture={pan}>
        <Canvas
          ref={canvasRef}
          style={{
            width: 300,
            height: 300,
            backgroundColor: "gray",
          }}
        >
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
      <ImpactAssistButton
        onPress={() => {
          onOk(paths, saveDrawingAsImage());
        }}
        label="Submit Signature"
      />
      <ImpactAssistButton
        label="Clear Signature"
        onPress={() => setPaths([])}
      />
    </View>
  );
}

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
  if (data.pathData) {
    const loadedPaths = data.pathData.map(
      (svg: string) => Skia.Path.MakeFromSVGString(svg)!
    );
    return loadedPaths as SkPath[];
  }
  return [];
};
