import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Modal, Portal, useTheme } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import AppointmentRegistrationPopup from "../../../../components/appointment/appointment-registration-popup";
import ImpactAssistButton from "../../../../components/custom/button";
import { dayOfWeekMap } from "../../../../model/day-of-week-map";
import { Slot } from "../../../../model/local-expert-availability";
import { CustomTheme } from "../../../../theme/theme";
import { fetchLocalExpertAvailability } from "../../../../utils/fetch-local-expert-availability";
import { fetchLocalExpertById } from "../../../../utils/fetch-local-expert-by-id";

export default function LocalExpertPage() {
  const [visibleRegistrationForm, setVisibleRegistrationForm] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | undefined>(undefined);
  const { id } = useLocalSearchParams();
  const [date, setDate] = useState<Date>(dayjs().toDate());
  const [show, setShow] = useState(false);
  const queryLocalAvailability = useQuery({
    queryKey: ["local_expert_availabilities"],
    queryFn: async () => fetchLocalExpertAvailability(parseInt(id as string)),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });
  const queryLocalExpert = useQuery({
    queryKey: ["local_experts", id],
    queryFn: async () => fetchLocalExpertById(parseInt(id as string)),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });
  const theme: CustomTheme = useTheme();
  const formatted = dayjs(date).format("YYYY-MM-DD");

  const checkSlotAvailability = (
    slotId: number,
    dayOfWeek: string
  ): boolean => {
    const unavailableSlot = queryLocalAvailability.data?.unavailableSlots.find(
      (item) => item.availabilityId === slotId
    );
    const dayOfWeekFromDate = dayOfWeekMap.get(dayjs(date).day());
    if (dayOfWeek !== dayOfWeekFromDate) {
      return false;
    }
    if (unavailableSlot === undefined) {
      return true;
    }
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const formattedUnavailableDate = dayjs(unavailableSlot.date).format(
      "YYYY-MM-DD"
    );

    if (formattedDate !== formattedUnavailableDate) {
      return true;
    }
    return false;
  };

  return (
    <View
      style={[
        styles.container,
        {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
        refreshControl={
          <RefreshControl
            refreshing={queryLocalExpert?.isFetching}
            onRefresh={() => {
              queryLocalExpert?.refetch();
              queryLocalAvailability?.refetch();
            }}
          />
        }
      >
        <View
          style={{
            padding: 8,
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
            Local Expert Details
          </Text>
        </View>
        <View
          style={[
            styles.secondaryContainer,
            { borderColor: theme.colors.text },
          ]}
        >
          <View>
            <Text
              numberOfLines={1}
              style={{ fontWeight: "bold", color: theme.colors.text }}
            >
              Local Expert Name
            </Text>
            <Text style={{ color: theme.colors.text }}>
              {queryLocalExpert.data?.fullName}
            </Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
              Email
            </Text>
            <Text style={{ color: theme.colors.text }}>
              {queryLocalExpert.data?.email}
            </Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
              Phone
            </Text>
            <Text style={{ color: theme.colors.text }}>
              {queryLocalExpert.data?.phone}
            </Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
              Description
            </Text>
            <Text style={{ color: theme.colors.text }}>
              {queryLocalExpert.data?.description}
            </Text>
          </View>
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
            Map
          </Text>
        </View>
        <View style={{ borderWidth: 1, borderRadius: 6, padding: 8, gap: 8 }}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: queryLocalExpert.data?.latitude || 0,
              longitude: queryLocalExpert.data?.longitude || 0,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04,
            }}
            pitchEnabled={false}
            scrollEnabled={false}
            zoomEnabled={false}
            rotateEnabled={false}
          >
            <Marker
              coordinate={{
                latitude: queryLocalExpert.data?.latitude || 0,
                longitude: queryLocalExpert.data?.longitude || 0,
              }}
              title={queryLocalExpert.data?.fullName}
              description={"Repair shop is right here!"}
            />
          </MapView>
        </View>
        <View
          style={{
            padding: 8,
            marginBottom: 8,
            borderRadius: 6,
            backgroundColor: theme.colors.background,
            gap: 8,
          }}
        >
          <DatePickerModal
            locale="lt"
            mode="single"
            visible={show}
            onDismiss={() => setShow(false)}
            validRange={{
              startDate: dayjs().toDate(),
            }}
            startWeekOnMonday={true}
            onConfirm={(params) => {
              setShow(false);
              setDate(params.date as Date);
            }}
          />
          <ImpactAssistButton
            label="Pick A Date"
            onPress={() => {
              setShow(true);
            }}
          />
          <View
            style={{
              borderWidth: 1,
              borderRadius: 6,
              alignItems: "center",
              borderColor: theme.colors.text,
              padding: 8,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: theme.colors.text,
              }}
            >
              Selected date {formatted}
            </Text>
          </View>
          <View
            style={{
              padding: 8,
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
              Available Slots
            </Text>
          </View>
          {queryLocalAvailability.data?.slots.map((slot) => (
            <>
              {checkSlotAvailability(slot.id, slot.dayOfWeek) && (
                <ImpactAssistButton
                  label={`${slot.dayOfWeek}: ${slot.startTime} - ${slot.endTime}`}
                  onPress={() => {
                    setSelectedSlot(slot);
                    setVisibleRegistrationForm(true);
                  }}
                />
              )}
            </>
          ))}
        </View>
        <Portal>
          <Modal
            visible={visibleRegistrationForm}
            onDismiss={() => setVisibleRegistrationForm(false)}
          >
            <AppointmentRegistrationPopup
              hideModal={() => setVisibleRegistrationForm(false)}
              date={date}
              slot={selectedSlot}
            />
          </Modal>
        </Portal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  secondaryContainer: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    gap: 8,
  },
  map: {
    width: "100%",
    height: 300,
  },
});
