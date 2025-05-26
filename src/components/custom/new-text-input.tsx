import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";
import { CustomTheme } from "../../theme/theme";

interface ImpactAssistTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onPress?: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;
  multiline?: boolean;
  numberOfLines?: number;
  defaultValue?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

export default function ImpactAssistTextInput({
  label,
  value,
  onChangeText,
  onPress,
  multiline = false,
  numberOfLines = 1,
  defaultValue,
  keyboardType = "default",
}: ImpactAssistTextInputProps) {
  const theme: CustomTheme = useTheme();
  const [borderWidth, setBorderWidth] = useState(1);
  const [placeholder, setPlaceholder] = useState<string | undefined>(undefined);
  const { t } = useTranslation();

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: theme.colors.text,
          backgroundColor: theme.colors.background,
          borderWidth: borderWidth,
        },
      ]}
    >
      <Animated.Text
        style={[
          styles.label,
          {
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
          },
        ]}
      >
        {label}
      </Animated.Text>
      <TextInput
        defaultValue={defaultValue}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor={theme.colors.borderSeparatorSecondary}
        style={[styles.textInput, { color: theme.colors.text }]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => {
          setBorderWidth(2);
          setPlaceholder(`${t(label)}...`);
        }}
        onEndEditing={() => {
          setBorderWidth(1);
          setPlaceholder(undefined);
        }}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 10,
    borderRadius: 6,
    paddingHorizontal: 16,
  },
  textInput: {
    fontSize: 16,
  },
  label: {
    position: "absolute",
    top: -8,
    left: 12,
    paddingHorizontal: 4,
    fontSize: 12,
  },
});
