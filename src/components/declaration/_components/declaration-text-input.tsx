import { get } from "lodash";
import { useContext } from "react";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import { HelperText } from "react-native-paper";
import { Declaration } from "../../../model/declaration";
import ImpactAssistTextInput from "../../custom/new-text-input";
import { DeclarationContext } from "../_context/declaration-context";
import { updateDeclarationField } from "../_utils/update-declaration-details/update-declaration-details";

interface DeclarationTextInputProps {
  label: string;
  declarationPath: string;
}

export default function DeclarationTextInput({
  label,
  declarationPath,
}: DeclarationTextInputProps) {
  const {
    control,
    carCountryPlate,
    webSocketId,
    socket,
    setValue,
    formState: { errors },
  } = useContext(DeclarationContext);

  const getError = (path: keyof Declaration) => get(errors, path)?.message;

  return (
    <>
      <Controller
        control={control}
        name={declarationPath as keyof Declaration}
        render={({ field: { value } }) => (
          <View>
            <ImpactAssistTextInput
              label={label}
              value={String(value)}
              onChangeText={(text) => {
                updateDeclarationField(
                  declarationPath as keyof Declaration,
                  text,
                  carCountryPlate,
                  socket,
                  setValue,
                  webSocketId
                );
              }}
            />
            <HelperText
              type="error"
              visible={!!getError(declarationPath as keyof Declaration)}
            >
              {getError(declarationPath as keyof Declaration)}
            </HelperText>
          </View>
        )}
        rules={{ required: "This field is required" }}
      />
    </>
  );
}
