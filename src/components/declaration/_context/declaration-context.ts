import { createContext, Dispatch, SetStateAction } from "react";
import { Declaration } from "../../../model/declaration";
import { initialDeclaration } from "../_temp-data/initial-declaration";

type DeclarationContextType = {
  webSocketId: number;
  declaration: Declaration;
  socket: WebSocket;
  firstSignature: string | null;
  secondSignature: string | null;
  setFirstSign: Dispatch<SetStateAction<string | null>>;
  setSecondSign: Dispatch<SetStateAction<string | null>>;
  carCountryPlate: string;
};

export const DeclarationContext = createContext<DeclarationContextType>({
  webSocketId: 1,
  declaration: initialDeclaration,
  firstSignature: null,
  secondSignature: null,
  setFirstSign: () => {},
  setSecondSign: () => {},
  carCountryPlate: "",
  socket: new WebSocket("ws://10.0.2.2:9000"),
});
