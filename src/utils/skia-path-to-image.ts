import { PaintStyle, Skia, SkPath } from "@shopify/react-native-skia";
import { Alert } from "react-native";

export const skiaPathToImage = async (signature: SkPath[]) => {
  const surface = Skia.Surface.Make(300, 300);
  if (surface) {
    const canvas = surface.getCanvas();
    canvas.clear(Skia.Color("white"));
    const paint = Skia.Paint();
    paint.setColor(Skia.Color("black"));
    paint.setStyle(PaintStyle.Stroke);
    paint.setStrokeWidth(2);
    for (const path of signature) {
      canvas.drawPath(path, paint);
    }

    const image = surface.makeImageSnapshot();
    if (!image) {
      Alert.alert("Error", "Failed to create image snapshot");
      return;
    }

    const base64 = await image.encodeToBase64();
    return base64;
  }
  return "";
};
