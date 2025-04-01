import { createContext, Dispatch } from "react";
import { Claim } from "../../../model/claim";
import { ClaimError } from "../../../model/claim-error";
import { ClaimErrorAction } from "../../../reducer/claim-error-reducer";
import { ClaimAction } from "../../../reducer/claim-reducer";

type ClaimContextType = {
  claim: Claim;
  dispatch: Dispatch<ClaimAction>;
  claimError: ClaimError;
  dispatchError: Dispatch<ClaimErrorAction>;
};

export const ClaimContext = createContext<ClaimContextType>({
  claim: {} as Claim,
  dispatch: () => {},
  claimError: {} as ClaimError,
  dispatchError: () => {},
});
