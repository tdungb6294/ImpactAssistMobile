import { useContext, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { ObjectOwnership } from "../../../model/enum/object-ownership";
import { CustomTheme } from "../../../theme/theme";
import ImpactAssistButton from "../../custom/button";
import ImpactAssistEnumSelector from "../../custom/enum-selector";
import ImpactAssistTextInput from "../../custom/new-text-input";
import { ClaimContext } from "../_context/claim-context";

interface ClaimObjectDetailsProps {}

const { width } = Dimensions.get("window");

export default function ClaimObjectDetails({}: ClaimObjectDetailsProps) {
  const { setValue, watch } = useContext(ClaimContext);
  const theme: CustomTheme = useTheme();
  const [showEnumSelector, setShowEnumSelector] = useState(false);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ImpactAssistTextInput
        label={"Object Type"}
        value={watch("objectType")}
        onChangeText={(text) => {
          setValue("objectType", text);
        }}
      />
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistTextInput
        label={"Object Material"}
        value={watch("objectMaterial")}
        onChangeText={(text) => {
          setValue("objectMaterial", text);
        }}
      />
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistButton
        label="Select Object Ownership"
        onPress={() => {
          setShowEnumSelector(true);
        }}
      />
      <View style={{ marginVertical: 8 }} />
      {showEnumSelector && (
        <ImpactAssistEnumSelector
          enumType={ObjectOwnership}
          visible={showEnumSelector}
          onDismiss={() => setShowEnumSelector(false)}
          setSelectedValue={(value) => {
            setValue("objectOwnership", value);
            setShowEnumSelector(false);
          }}
        />
      )}
      <View
        style={[styles.secondaryContainer, { borderColor: theme.colors.text }]}
      >
        <Text style={{ color: theme.colors.text }}>
          Object Ownership: {watch("objectOwnership")}
        </Text>
      </View>
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistTextInput
        multiline={true}
        numberOfLines={4}
        label={"Damage To Object Description"}
        value={watch("damageToObjectDescription")}
        onChangeText={(text) => {
          setValue("damageToObjectDescription", text);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width,
    height: "100%",
    left: 0,
    padding: 8,
    flexDirection: "column",
    gap: 8,
  },
  secondaryContainer: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    gap: 8,
  },
});
