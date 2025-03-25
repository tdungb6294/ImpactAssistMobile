import { useState } from "react";
import { View } from "react-native";
import { Modal, Portal, useTheme } from "react-native-paper";
import ImpactAssistButton from "../../components/custom/button";
import DeclarationPopupConnection from "../../components/declaration/declaration-popup-connection";

export default function HomePage() {
  const [visible, setVisibile] = useState(false);
  const [value, setValue] = useState("");
  const { colors } = useTheme();

  const showModal = () => setVisibile(true);
  const hideModal = () => setVisibile(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
        gap: 6,
      }}
    >
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <DeclarationPopupConnection hideModal={hideModal} />
        </Modal>
      </Portal>
      <ImpactAssistButton onPress={showModal} label="Create New Declaration" />
    </View>
  );
}
