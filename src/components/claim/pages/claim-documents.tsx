import * as DocumentPicker from "expo-document-picker";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
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
  const isPdf = (mime?: string) => mime === "application/pdf";

  const openPDF = async (uri: string) => {
    const supported = await Linking.canOpenURL(uri);
    if (supported) {
      await Linking.openURL(uri);
    } else {
      Alert.alert(t("Can't open this file."));
    }
  };

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
        {documents?.assets?.map((item, index) => {
          return (
            <View key={index}>
              {isPdf(item.mimeType) && (
                <TouchableOpacity onPress={() => openPDF(item.uri)}>
                  <Text
                    style={{ color: "blue", textDecorationLine: "underline" }}
                  >
                    {t("Open PDF")}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
        {images?.assets?.map((item, index) => {
          return (
            <View key={index}>
              <Image
                source={{ uri: item.uri }}
                style={{ width: 200, height: 200 }}
              />
            </View>
          );
        })}
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
});
