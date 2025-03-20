import { useState } from "react";
import { View } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";
import DeclarationPopupConnection from "../../components/declaration/declaration-popup-connection";

export default function HomePage() {
  const [visible, setVisibile] = useState(false);

  const showModal = () => setVisibile(true);
  const hideModal = () => setVisibile(false);

  return (
    <View>
      <Text>Hello, world!</Text>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <DeclarationPopupConnection hideModal={hideModal} />
        </Modal>
      </Portal>
      <Button onPress={showModal}>Create new declaration</Button>
    </View>
  );
}
