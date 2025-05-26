import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Dimensions, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { fromByteArray } from "react-native-quick-base64";
import storage from "../../lib/storage";
import { CustomTheme } from "../../theme/theme";
import { createDeclaration } from "../../utils/create-declaration-pdf";
import { skiaPathToImage } from "../../utils/skia-path-to-image";
import ImpactAssistButton from "../custom/button";
import DeclarationTextInput from "./_components/declaration-text-input";
import SignatureContainer from "./_components/signature-container";
import SkiaImageContainer from "./_components/skia-image-container";
import { DeclarationContext } from "./_context/declaration-context";

interface DeclarationReviewProps {}

const { width } = Dimensions.get("window");

// TODO: Add text inputs here and validations

export default function DeclarationReview({}: DeclarationReviewProps) {
  const { firstSignature, secondSignature, handleSubmit } =
    useContext(DeclarationContext);
  const theme: CustomTheme = useTheme();
  const [isCreating, setIsCreating] = useState(false);
  const { t } = useTranslation();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          paddingTop: 10,
          paddingHorizontal: 20,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <DeclarationTextInput
          label={t("Culprit")}
          declarationPath={"culprit.fullName"}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text variant="titleMedium">{t("First Signature")}</Text>
            <SkiaImageContainer paths={firstSignature} />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text variant="titleMedium">{t("Second Signature")}</Text>
            <SkiaImageContainer paths={secondSignature} />
          </View>
        </View>
        <SignatureContainer />
      </View>
      <View
        style={{
          flex: 1,
          position: "absolute",
          bottom: 0,
          marginBottom: 80,
          paddingHorizontal: 20,
          gap: 8,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <ImpactAssistButton
          style={{ width: "100%" }}
          label={t("Clear Cache")}
          onPress={async () => {
            await storage.remove({ key: "declaration" });
          }}
        />
        <ImpactAssistButton
          style={{ width: "100%" }}
          label={
            isCreating ? (
              <ActivityIndicator />
            ) : (
              t("Submit Accident Declaration")
            )
          }
          onPress={handleSubmit(async (data) => {
            setIsCreating(true);
            await storage.save({ key: "declaration", data });
            const permissions =
              await StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (!permissions.granted) {
              return;
            }
            const firstBase64String = await skiaPathToImage(firstSignature);
            const secondBase64String = await skiaPathToImage(secondSignature);
            const firstDataURL = `data:image/png;base64,${firstBase64String}`;
            const secondDataURL = `data:image/png;base64,${secondBase64String}`;
            const image = {
              firstImage: firstDataURL,
              secondImage: secondDataURL,
            };
            const formData = new FormData();
            formData.append("image", {
              uri: `data:application/json;base64,${btoa(
                JSON.stringify(image)
              )}`,
              name: "metadata.json",
              type: "application/json",
            } as unknown as Blob);
            formData.append("declaration", {
              uri: `data:application/json;base64,${btoa(JSON.stringify(data))}`,
              name: "metadata.json",
              type: "application/json",
            } as unknown as Blob);
            try {
              const response = await createDeclaration(formData);
              const uri = await StorageAccessFramework.createFileAsync(
                permissions.directoryUri,
                "declaration.pdf",
                "application/pdf"
              );
              await FileSystem.writeAsStringAsync(
                uri,
                fromByteArray(response),
                {
                  encoding: FileSystem.EncodingType.Base64,
                }
              );
            } catch (e) {
              Alert.alert("Error", "Failed to create file", [{ text: "OK" }]);
              setIsCreating(false);
              return;
            }
            Alert.alert("Success", "Declaration created successfully", [
              { text: "OK" },
            ]);
            setIsCreating(false);
          })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    left: width * 3,
    height: "100%",
    position: "absolute",
    backgroundColor: "rgb(175, 133, 204)",
  },
  preview: {
    width: 100,
    height: 100,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
});
