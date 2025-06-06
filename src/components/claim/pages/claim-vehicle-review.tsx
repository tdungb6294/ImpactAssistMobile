import * as FileSystem from "expo-file-system";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Dimensions, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { btoa } from "react-native-quick-base64";
import { CarClaimFieldErrors } from "../../../model/car-claim-field-errors";
import { ErrorResponse } from "../../../model/error-response";
import { CustomTheme } from "../../../theme/theme";
import { createCarClaim } from "../../../utils/create-car-claim";
import ImpactAssistButton from "../../custom/button";
import { ClaimContext } from "../_context/claim-context";

interface ClaimReviewProps {}

const { width } = Dimensions.get("window");

export default function CarClaimReview({}: ClaimReviewProps) {
  const { watch, images, documents, setError } = useContext(ClaimContext);
  const [isCreating, setIsCreating] = useState(false);
  const theme: CustomTheme = useTheme();
  const { t } = useTranslation();

  const handleCreateNewClaim = async () => {
    setIsCreating(true);
    const formData = new FormData();
    const claimData = watch();
    formData.append("data", {
      uri: `data:application/json;base64,${btoa(JSON.stringify(claimData))}`,
      name: "metadata.json",
      type: "application/json",
    } as unknown as Blob);
    if (images?.assets && images?.assets?.length > 0) {
      for (let i = 0; i < images.assets.length; i++) {
        const image = images.assets[i];
        const base64 = await FileSystem.readAsStringAsync(image.uri, {
          encoding: "base64",
        });
        console.log(image.mimeType);
        formData.append("images", {
          uri: "data:" + image.mimeType + ";base64," + base64,
          name: image.name,
          type: image.mimeType,
        } as unknown as Blob);
      }
    }
    if (documents?.assets && documents?.assets?.length > 0) {
      for (let i = 0; i < documents.assets.length; i++) {
        const document = documents.assets[i];
        const base64 = await FileSystem.readAsStringAsync(document.uri, {
          encoding: "base64",
        });
        console.log(document.mimeType);
        formData.append("documents", {
          uri: "data:" + document.mimeType + ";base64," + base64,
          name: document.name,
          type: document.mimeType,
        } as unknown as Blob);
      }
    }
    const response = await createCarClaim(formData);
    if (typeof response === "number") {
      console.log("New claim created with ID:", response);
      Alert.alert(
        t("Success"),
        `${t("Claim created successfully")}: ${response}`,
        [{ text: t("OK") }]
      );
    } else {
      const errorFields = response as ErrorResponse<CarClaimFieldErrors>;
      const errorText = Object.entries(errorFields?.errors || {})
        .map(([field, message]) => `${message}`)
        .join("\n");
      Object.keys(errorFields?.errors || {}).forEach((key) => {
        const typedKey = key as keyof CarClaimFieldErrors;
        setError(typedKey as any, {
          type: "manual",
          message: errorFields?.errors?.[typedKey],
        });
      });
      Alert.alert("Error", errorText, [{ text: "OK" }]);
    }
    setIsCreating(false);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ImpactAssistButton
        label={
          isCreating ? <ActivityIndicator /> : t("Create New Vehicle Claim")
        }
        onPress={handleCreateNewClaim}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width,
    height: "100%",
    left: width * 3,
    padding: 8,
    flexDirection: "column",
    gap: 8,
  },
});
