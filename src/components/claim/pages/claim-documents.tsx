import * as DocumentPicker from "expo-document-picker";
import { Image } from "expo-image";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";
import { CustomTheme } from "../../../theme/theme";
import ImpactAssistButton from "../../custom/button";
import { ClaimContext } from "../_context/claim-context";

interface ClaimDocumentsProps {}

const { width } = Dimensions.get("window");

export default function ClaimDocuments({}: ClaimDocumentsProps) {
  const { setValue, setDocuments, setImages, images, documents } =
    useContext(ClaimContext);
  const theme: CustomTheme = useTheme();
  const { t } = useTranslation();

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ImpactAssistButton
        onPress={async () => {
          try {
            const data: DocumentPicker.DocumentPickerResult =
              await DocumentPicker.getDocumentAsync({
                type: ["application/pdf", "image/*"],
                multiple: true,
                copyToCacheDirectory: true,
              });
            setDocuments(data);
            setValue(
              "documentTypes",
              data?.assets?.map(() => "document") || ["document"]
            );
          } catch (e) {
            console.log(e);
          }
        }}
        label={t("Pick Documents")}
      />
      <View style={{ marginVertical: 8 }} />
      <ImpactAssistButton
        onPress={async () => {
          try {
            const data: DocumentPicker.DocumentPickerResult =
              await DocumentPicker.getDocumentAsync({
                type: "image/*",
                multiple: true,
                copyToCacheDirectory: true,
              });
            setImages(data);
          } catch (e) {
            console.log(e);
          }
        }}
        label={t("Pick Images")}
      />

      <View>
        <View
          style={{
            padding: 8,
            marginTop: 8,
            marginBottom: 8,
            borderRadius: 6,
            backgroundColor: theme.colors.text,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: theme.colors.background,
              fontWeight: "bold",
            }}
          >
            {t("Images")}
          </Text>
        </View>
        <View
          style={[
            styles.secondaryContainer,
            { borderColor: theme.colors.text },
          ]}
        >
          {images?.assets?.map((image, index) => (
            <View key={index}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: theme.colors.text,
                    fontWeight: "bold",
                    marginBottom: 4,
                  }}
                >
                  {index + 1} {t("Image")}
                </Text>
              </View>
              <View
                style={{
                  overflow: "hidden",
                }}
              >
                <View
                  style={[
                    {
                      height: 200,
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    },
                  ]}
                >
                  <Image
                    style={styles.image}
                    source={image.uri}
                    contentFit="contain"
                    transition={1000}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
        <View
          style={{
            padding: 8,
            marginTop: 8,
            marginBottom: 8,
            borderRadius: 6,
            backgroundColor: theme.colors.text,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: theme.colors.background,
              fontWeight: "bold",
            }}
          >
            {t("Documents")}
          </Text>
        </View>
        <View
          style={[
            styles.secondaryContainer,
            { borderColor: theme.colors.text },
          ]}
        >
          {documents?.assets?.map((document, index) => (
            <View
              style={{
                flex: 1,
              }}
              key={index}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: theme.colors.text,
                    fontWeight: "bold",
                    marginBottom: 4,
                  }}
                >
                  {index + 1} {t("Document")} {document.name}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width,
    height: "100%",
    left: width * 2,
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
  image: {
    flex: 1,
    height: 200,
    width: "100%",
  },
});
