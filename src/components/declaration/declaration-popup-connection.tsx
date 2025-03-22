import { Link } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";

interface DeclarationPopupConnectionProps {
  hideModal: () => void;
}

export default function DeclarationPopupConnection({
  hideModal,
}: DeclarationPopupConnectionProps) {
  const [carCountryPlate, setCarCountryPlate] = useState<string>("");

  return (
    <View>
      <TextInput
        label="Car country plate"
        value={carCountryPlate}
        onChangeText={(text) => setCarCountryPlate(text.toUpperCase())}
      />
      {carCountryPlate && (
        <Link href={`/declaration/${carCountryPlate}`} asChild>
          <Button
            onPress={() => {
              hideModal();
            }}
          >
            Join room
          </Button>
        </Link>
      )}
    </View>
  );
}
