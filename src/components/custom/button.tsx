import { forwardRef, ReactNode } from "react";
import { Text } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
import { CustomTheme } from "../../theme/theme";

interface ImpactAssistButtonProps {
  label: string | ReactNode;
  onPress: () => void;
  style?: object;
}

const ImpactAssistButton = forwardRef(function ImpactAssistButton(
  { label, onPress, style }: ImpactAssistButtonProps,
  ref
) {
  const theme: CustomTheme = useTheme();

  return (
    <TouchableRipple
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: theme.colors.interactiveComponentsTertiary,
          borderColor: theme.colors.text,
          height: 40,
          borderWidth: 1,
          borderRadius: 6,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
    >
      {typeof label === "string" ? (
        <Text
          style={{ fontSize: 16, fontWeight: "bold", color: theme.colors.text }}
        >
          {label}
        </Text>
      ) : (
        label
      )}
    </TouchableRipple>
  );
});

const styles = {
  button: {},
};

export default ImpactAssistButton;
