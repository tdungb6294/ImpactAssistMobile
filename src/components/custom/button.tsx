import { forwardRef } from "react";
import { Button, useTheme } from "react-native-paper";
import { CustomTheme } from "../../theme/theme";

interface ImpactAssistButtonProps {
  label: string;
  onPress: () => void;
}

const ImpactAssistButton = forwardRef(function ImpactAssistButton(
  { label, onPress }: ImpactAssistButtonProps,
  ref
) {
  const theme: CustomTheme = useTheme();

  return (
    <Button
      onPress={onPress}
      mode="outlined"
      style={{
        borderColor: "transparent",
        borderRadius: 8,
      }}
      buttonColor={theme.colors.interactiveComponentsTertiary}
      textColor={theme.colors.textSecondary}
      contentStyle={{
        height: 40,
      }}
    >
      {label}
    </Button>
  );
});

export default ImpactAssistButton;
