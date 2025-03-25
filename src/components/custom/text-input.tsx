import { NativeSyntheticEvent, NativeTouchEvent } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";
import { CustomTheme } from "../../theme/theme";

interface ImpactAssistTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onPress: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

export default function ImpactAssistTextInput({
  label,
  value,
  onChangeText,
  onPress,
}: ImpactAssistTextInputProps) {
  const theme: CustomTheme = useTheme();

  return (
    <TextInput
      style={{ backgroundColor: theme.colors.background }}
      mode="outlined"
      outlineStyle={{
        borderColor: theme.colors.text,
        borderRadius: 6,
      }}
      activeOutlineColor={theme.colors.borderSeparatorTertiary}
      outlineColor={theme.colors.text}
      textColor={theme.colors.text}
      label={
        <Text
          style={{
            color: theme.colors.text,
          }}
        >
          {label}
        </Text>
      }
      value={value}
      onChangeText={onChangeText}
      theme={{
        colors: {
          primary: theme.colors.text,
        },
      }}
      onPress={onPress}
    />
  );
}
