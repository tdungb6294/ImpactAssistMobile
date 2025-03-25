import { Link } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Portal, Snackbar, useTheme } from "react-native-paper";
import { CustomTheme } from "../../theme/theme";
import ImpactAssistButton from "../custom/button";
import ImpactAssistTextInput from "../custom/text-input";

interface DeclarationPopupConnectionProps {
  hideModal: () => void;
}

export default function DeclarationPopupConnection({
  hideModal,
}: DeclarationPopupConnectionProps) {
  const [carCountryPlate, setCarCountryPlate] = useState<string>("");
  const theme: CustomTheme = useTheme();
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  return (
    <View
      style={{
        borderRadius: 6,
        margin: 20,
        padding: 20,
        gap: 6,
        height: 160,
        backgroundColor: theme.colors.background,
        borderWidth: 2,
        borderColor: theme.colors.borderSeparatorTertiary,
        alignContent: "center",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <ImpactAssistTextInput
        label="Car country plate"
        value={carCountryPlate}
        onChangeText={(text) => setCarCountryPlate(text.toUpperCase())}
        onPress={() => {}}
      />
      {!carCountryPlate ? (
        <ImpactAssistButton
          label="Join room"
          onPress={() => {
            onToggleSnackBar();
          }}
        />
      ) : (
        <Link href={`/declaration/${carCountryPlate}`} asChild>
          <ImpactAssistButton
            label="Join room"
            onPress={() => {
              hideModal();
            }}
          />
        </Link>
      )}
      <Portal>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={{
            backgroundColor: theme.colors.background,
            borderRadius: 6,
          }}
          action={{
            labelStyle: { color: theme.colors.textSecondary },
            label: "Close",
            onPress: () => {},
          }}
          duration={3000}
        >
          The car country plate is required!
        </Snackbar>
      </Portal>
    </View>
  );
}
