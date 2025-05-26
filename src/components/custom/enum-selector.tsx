import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Divider,
  Modal,
  Portal,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { camelToTitleCase } from "../../utils/camel-to-title-case";

interface ImpactAssistEnumSelectorProps<T extends Record<string, string>> {
  enumType: T;
  setSelectedValue: (value: string) => void;
  visible: boolean;
  onDismiss: () => void;
}

export default function ImpactAssistEnumSelector<
  T extends Record<string, string>
>({
  enumType,
  setSelectedValue,
  visible,
  onDismiss,
}: ImpactAssistEnumSelectorProps<T>) {
  const { t } = useTranslation();
  const options = Object.values(enumType).map((value) => ({
    label: value,
    value: camelToTitleCase(value),
  }));
  const theme = useTheme();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          margin: 20,
          padding: 20,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: theme.colors.primary,
          backgroundColor: theme.colors.background,
          height: 500,
        }}
      >
        <ScrollView>
          <Pressable>
            {options.map((option) => (
              <TouchableRipple
                key={option.label}
                onPress={() => {
                  setSelectedValue(option.label);
                  onDismiss();
                }}
              >
                <View>
                  <Divider style={{ marginBottom: 8 }} />
                  <Text variant="titleMedium">{t(option.value)}</Text>
                  <Divider style={{ marginTop: 8 }} />
                </View>
              </TouchableRipple>
            ))}
          </Pressable>
        </ScrollView>
      </Modal>
    </Portal>
  );
}
