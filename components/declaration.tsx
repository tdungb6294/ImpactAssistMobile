import { useEffect, useState } from "react";
import { Declaration as DeclarationModel } from "../model/declaration";
import { initialDeclaration } from "./initial-declaration";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import __ from "lodash";

interface DeclarationProps {
  carCountryPlate: string;
}

export default function Declaration({ carCountryPlate }: DeclarationProps) {
  const [declaration, setDeclaration] =
    useState<DeclarationModel>(initialDeclaration);
  const [error, setError] = useState<string | undefined>(undefined);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const socket = new WebSocket("ws://10.0.2.2:9000");

  const updateFirstCarCarDetails = (
    key: keyof typeof declaration.firstCar.car,
    value: string
  ) => {
    setDeclaration((prevState) => ({
      ...prevState,
      firstCar: {
        ...prevState.firstCar,
        car: {
          ...prevState.firstCar.car,
          [key]: value,
        },
      },
    }));
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(
      setTimeout(() => {
        socket.send(
          JSON.stringify({
            messageType: "exchangeData",
            data: {
              firstCar: {
                car: {
                  [key]: value,
                },
              },
            },
            roomName: carCountryPlate,
          })
        );
      }, 3000)
    );
  };

  useEffect(() => {
    const newDeclaration = declaration;
    newDeclaration.firstCar.car.carCountryPlate = carCountryPlate;
    setDeclaration(declaration);
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          messageType: "joinRoom",
          data: {
            firstCar: {
              car: {
                carCountryPlate: carCountryPlate,
              },
            },
          },
        })
      );
    };

    socket.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.messageType === "exchangeData") {
        const updatedDeclaration = __.merge({}, declaration, data.data);
        setDeclaration(updatedDeclaration);
      }
    };

    socket.onerror = (error) => {
      setError(JSON.stringify(error));
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <View>
      {error && <Text>{error}</Text>}
      <Text>{JSON.stringify(declaration.firstCar.car.carCountryPlate)}</Text>
      <TextInput
        label="Car country plate"
        value={declaration.firstCar.car.carCountryPlate}
        onChangeText={(text) =>
          updateFirstCarCarDetails("carCountryPlate", text)
        }
      />
    </View>
  );
}
