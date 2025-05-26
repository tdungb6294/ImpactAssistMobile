import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Text, View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { Slot } from "../../model/local-expert-availability";
import { CustomTheme } from "../../theme/theme";
import { createAppointment } from "../../utils/create-appointment";
import ImpactAssistButton from "../custom/button";
import ImpactAssistTextInput from "../custom/new-text-input";

interface AppointmentRegistrationPopupProps {
  hideModal: () => void;
  date: Date;
  slot: Slot | undefined;
}

export default function AppointmentRegistrationPopup({
  hideModal,
  date,
  slot,
}: AppointmentRegistrationPopupProps) {
  const theme: CustomTheme = useTheme();
  const formatted = dayjs(date).format("YYYY-MM-DD");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <View
      style={{
        borderRadius: 6,
        margin: 20,
        padding: 20,
        gap: 16,
        height: 400,
        backgroundColor: theme.colors.background,
        borderWidth: 2,
        borderColor: theme.colors.borderSeparatorTertiary,
        alignContent: "center",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <ImpactAssistTextInput
        label={t("Title")}
        value={title}
        onChangeText={(text) => {
          setTitle(text);
        }}
      />
      <ImpactAssistTextInput
        label={t("Description")}
        multiline={true}
        numberOfLines={4}
        value={description}
        onChangeText={(text) => {
          setDescription(text);
        }}
      />
      <View
        style={{
          borderWidth: 1,
          borderRadius: 6,
          alignItems: "center",
          borderColor: theme.colors.text,
          paddingVertical: 8,
        }}
      >
        <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
          {t("Appointment Time")}
        </Text>
        <Text style={{ color: theme.colors.text }}>
          {formatted} {slot?.startTime} - {slot?.endTime}
        </Text>
      </View>

      <ImpactAssistButton
        label={isLoading ? <ActivityIndicator /> : t("Register appointment")}
        onPress={async () => {
          if (!slot) return;
          setIsLoading(true);
          const response = await createAppointment({
            appointmentDate: dayjs(date).format("YYYY-MM-DD"),
            description: description,
            title: title,
            expertAvailabilityId: slot?.id,
          });
          if (response !== -1) Alert.alert(t("Appointment registered!"));
          setIsLoading(false);
        }}
      />
    </View>
  );
}
