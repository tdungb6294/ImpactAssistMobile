import { useContext } from "react";
import { HelperText } from "react-native-paper";
import ImpactAssistTextInput from "../../custom/text-input";
import { DeclarationContext } from "../_context/declaration-context";
import { DeclarationTabContext } from "../_context/declaration-tab-context";
import { getValueAtPath } from "../_utils/update-declaration-details/get-value-at-path";
import { updateDeclarationField } from "../_utils/update-declaration-details/update-declaration-details";
import { updateDeclarationErrorField } from "../_utils/update-declaration-details/update-declaration-details-error";

interface DeclarationTextInputProps {
  label: string;
  declarationPath: string[];
}

export default function DeclarationTextInput({
  label,
  declarationPath,
}: DeclarationTextInputProps) {
  const {
    declaration,
    carCountryPlate,
    webSocketId,
    socket,
    dispatch,
    dispatchError,
    declarationError,
  } = useContext(DeclarationContext);
  const value = getValueAtPath(declaration, declarationPath) as string;
  const error = getValueAtPath(declarationError, declarationPath) as string;
  const { handleTapOnInput } = useContext(DeclarationTabContext);

  return (
    <>
      <ImpactAssistTextInput
        label={label}
        value={value}
        onChangeText={(text) => {
          updateDeclarationField(
            declarationPath,
            text,
            carCountryPlate,
            socket,
            dispatch,
            webSocketId
          );
          if (text.length > 20)
            updateDeclarationErrorField(
              declarationPath,
              "Error: max character allowed is 20",
              dispatchError
            );
          else updateDeclarationErrorField(declarationPath, "", dispatchError);
        }}
        onPress={handleTapOnInput}
      />
      <HelperText type="error" visible={error.length > 0}>
        {error}
      </HelperText>
    </>
  );
}
