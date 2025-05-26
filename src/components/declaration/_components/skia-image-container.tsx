import { Canvas, Group, Path, SkPath } from "@shopify/react-native-skia";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { CustomTheme } from "../../../theme/theme";
import { signatureImageStyles as styles } from "../_styles/signature/skia-signature-image.style";

interface SkiaImageContainerProps {
  paths: SkPath[];
}

export default function SkiaImageContainer({ paths }: SkiaImageContainerProps) {
  const theme: CustomTheme = useTheme();
  return (
    <View
      style={{
        borderRadius: 6,
        borderColor: theme.colors.text,
        borderWidth: 2,
      }}
    >
      <Canvas style={styles.canvas}>
        <Group transform={[{ scale: 0.33 }]}>
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
        </Group>
      </Canvas>
    </View>
  );
}
