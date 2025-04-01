import * as Location from "expo-location";
import { useContext, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { LatLng } from "react-native-maps";
import { Checkbox, Text, useTheme } from "react-native-paper";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { CustomTheme } from "../../theme/theme";
import ImpactAssistButton from "../custom/button";
import DeclarationTextInput from "./_components/declaration-text-input";
import { DeclarationContext } from "./_context/declaration-context";
import { updateDeclarationField } from "./_utils/update-declaration-details/update-declaration-details";

interface DeclarationDetailsProps {
  showModal: () => void;
  setLocationSelected: (latLng: LatLng) => void;
}

const { width } = Dimensions.get("window");

//FIXME: fix the style

export default function DeclarationDetails({
  showModal,
  setLocationSelected,
}: DeclarationDetailsProps) {
  const { declaration, carCountryPlate, webSocketId, socket, dispatch } =
    useContext(DeclarationContext);
  const theme: CustomTheme = useTheme();
  const [show, setShow] = useState(false);
  const [showTimepicker, setShowTimepicker] = useState(false);
  const dateFormatter = new Intl.DateTimeFormat("lt-LT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("no permission");
      return;
    }

    let location = await Location.getLastKnownPositionAsync();
    if (location?.coords)
      setLocationSelected({
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      });
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.mapContainer}>
        <View>
          <DeclarationTextInput
            label="People injuries"
            declarationPath={["peopleInjuries"]}
          />
          <DeclarationTextInput
            label="Accident Country Location"
            declarationPath={["accidentCountryLocation"]}
          />
          <DeclarationTextInput
            label="Witnesses"
            declarationPath={["witnesses"]}
          />
        </View>
        <ImpactAssistButton label="Set location" onPress={showModal} />
        <ImpactAssistButton
          label="Current location"
          onPress={() => {
            getCurrentLocation();
          }}
        />
        <Text variant="titleMedium">
          Car accident location: {declaration.accidentLatLng.latitude}{" "}
          {declaration.accidentLatLng.longitude}
        </Text>
        <ImpactAssistButton
          onPress={() => setShow(true)}
          label="Pick Car Accident Date"
        />
        <DatePickerModal
          locale="lt"
          mode="single"
          visible={show}
          onDismiss={() => setShow(false)}
          date={new Date(declaration.datetime)}
          startWeekOnMonday={true}
          validRange={{
            endDate: new Date(Date.now()),
          }}
          onConfirm={(params) => {
            setShow(false);
            const newDate = params.date as Date;
            newDate.setHours(new Date(declaration.datetime).getHours());
            newDate.setMinutes(new Date(declaration.datetime).getMinutes());

            updateDeclarationField(
              ["datetime"],
              newDate,
              carCountryPlate,
              socket,
              dispatch,
              webSocketId
            );
          }}
        />
        <ImpactAssistButton
          onPress={() => setShowTimepicker(true)}
          label="Pick Car Accident Time"
        />
        <TimePickerModal
          locale="lt"
          visible={showTimepicker}
          onDismiss={() => setShowTimepicker(false)}
          onConfirm={({ hours, minutes }) => {
            setShowTimepicker(false);
            updateDeclarationField(
              ["datetime"],
              new Date(declaration.datetime).setHours(hours, minutes),
              carCountryPlate,
              socket,
              dispatch,
              webSocketId
            );
          }}
          hours={new Date(declaration.datetime).getHours()}
          minutes={new Date(declaration.datetime).getMinutes()}
        />
        <Text variant="titleMedium">
          Car accident date time:{" "}
          {dateFormatter.format(new Date(declaration.datetime))}
        </Text>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              variant="titleMedium"
              style={{ height: "100%", textAlignVertical: "center" }}
            >
              Damage to Cars:
            </Text>
            <Checkbox
              status={declaration.damageToCars ? "checked" : "unchecked"}
              onPress={() => {
                updateDeclarationField(
                  ["damageToCars"],
                  !declaration.damageToCars,
                  carCountryPlate,
                  socket,
                  dispatch,
                  webSocketId
                );
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              variant="titleMedium"
              style={{ height: "100%", textAlignVertical: "center" }}
            >
              Damage to Objects:
            </Text>
            <Checkbox
              status={declaration.damageToObjects ? "checked" : "unchecked"}
              onPress={() => {
                updateDeclarationField(
                  ["damageToObjects"],
                  !declaration.damageToObjects,
                  carCountryPlate,
                  socket,
                  dispatch,
                  webSocketId
                );
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "red",
  },
  container: {
    width,
    height: "100%",
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    padding: 8,
    gap: 8,
  },
});
