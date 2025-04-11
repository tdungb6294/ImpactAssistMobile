import { useState } from "react";
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
  onPress: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

export default function ImpactAssistTextInput({
  label,
  value,
  onChangeText,
  onPress,
}: ImpactAssistTextInputProps) {
  const theme: CustomTheme = useTheme();
  const [borderWidth, setBorderWidth] = useState(1);
  const [placeholder, setPlaceholder] = useState<string | undefined>(undefined);

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
        placeholder={placeholder}
        placeholderTextColor={theme.colors.borderSeparatorSecondary}
        style={[styles.textInput, { color: theme.colors.text }]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => {
          setBorderWidth(2);
          setPlaceholder(`Please enter: ${label}...`);
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
