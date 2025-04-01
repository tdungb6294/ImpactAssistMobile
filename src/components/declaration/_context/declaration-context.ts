import { SkPath } from "@shopify/react-native-skia";
import { createContext, Dispatch, SetStateAction } from "react";
import { Declaration } from "../../../model/declaration";
import { DeclarationError } from "../../../model/declaration-error";
import { DeclarationErrorAction } from "../../../reducer/declaration-error-reducer";
import { DeclarationAction } from "../../../reducer/declaration-reducer";
import { initialDeclaration } from "../_data/initial-declaration";
import { initialDeclarationError } from "../_data/initial-declaration-error";

type DeclarationContextType = {
  webSocketId: number;
  declaration: Declaration;
  socket: WebSocket;
  firstSignature: SkPath[];
  secondSignature: SkPath[];
  setFirstSign: Dispatch<SetStateAction<SkPath[]>>;
  setSecondSign: Dispatch<SetStateAction<SkPath[]>>;
  carCountryPlate: string;
  dispatch: Dispatch<DeclarationAction>;
  declarationError: DeclarationError;
  dispatchError: Dispatch<DeclarationErrorAction>;
};

export const DeclarationContext = createContext<DeclarationContextType>({
  webSocketId: 1,
  declaration: initialDeclaration,
  firstSignature: [],
  secondSignature: [],
  setFirstSign: () => {},
  setSecondSign: () => {},
  carCountryPlate: "",
  socket: new WebSocket("ws://10.0.2.2:9000"),
  dispatch: () => {},
  declarationError: initialDeclarationError,
  dispatchError: () => {},
});
