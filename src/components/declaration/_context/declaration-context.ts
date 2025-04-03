import { SkPath } from "@shopify/react-native-skia";
import { createContext, Dispatch, SetStateAction } from "react";
import {
  Control,
  FormState,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Declaration } from "../../../model/declaration";

type DeclarationContextType = {
  webSocketId: number;
  socket: WebSocket;
  firstSignature: SkPath[];
  secondSignature: SkPath[];
  setFirstSign: Dispatch<SetStateAction<SkPath[]>>;
  setSecondSign: Dispatch<SetStateAction<SkPath[]>>;
  carCountryPlate: string;
  setValue: UseFormSetValue<Declaration>;
  handleSubmit: UseFormHandleSubmit<Declaration, Declaration>;
  control: Control<Declaration, any, Declaration>;
  formState: FormState<Declaration>;
  watch: UseFormWatch<Declaration>;
};

export const DeclarationContext = createContext<DeclarationContextType>({
  webSocketId: 1,
  firstSignature: [],
  secondSignature: [],
  setFirstSign: () => {},
  setSecondSign: () => {},
  carCountryPlate: "",
  socket: new WebSocket("ws://10.0.2.2:9000"),
  setValue: () => {},
  handleSubmit: () => async () => Promise.resolve(),
  control: {} as Control<Declaration, any, Declaration>,
  formState: {} as FormState<Declaration>,
  watch: (() => ({} as Declaration)) as UseFormWatch<Declaration>,
});
