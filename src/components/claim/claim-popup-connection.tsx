import { useRouter } from "expo-router";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { CustomTheme } from "../../theme/theme";
import ImpactAssistButton from "../custom/button";

interface ClaimPopupConnectionProps {
  hideModal: () => void;
}

export default function ClaimPopupConnection({
  hideModal,
}: ClaimPopupConnectionProps) {
  const theme: CustomTheme = useTheme();
  const router = useRouter();

  return (
    <View
      style={{
        borderRadius: 6,
        margin: 20,
        padding: 20,
        gap: 16,
        height: 160,
        backgroundColor: theme.colors.background,
        borderWidth: 2,
        borderColor: theme.colors.borderSeparatorTertiary,
        alignContent: "center",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <ImpactAssistButton
        label="Vehicle"
        onPress={() => {
          hideModal();
          router.navigate("/claim/car/create");
        }}
        style={{
          flex: 1,
          height: "100%",
        }}
      />
      <ImpactAssistButton
        label="Object"
        onPress={() => {
          hideModal();
          router.navigate("/claim/object/create");
        }}
        style={{
          flex: 1,
          height: "100%",
        }}
      />
    </View>
  );
}
