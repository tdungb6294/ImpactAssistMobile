import _ from "lodash";
import { ClaimError } from "../model/claim-error";

// Action types
export type ClaimErrorAction =
  | { type: "SET_FIELD"; fieldUpdate: any }
  | { type: "RESET"; initialState: ClaimError };

// Reducer function
export const claimErrorReducer = (
  state: ClaimError,
  action: ClaimErrorAction
): ClaimError => {
  switch (action.type) {
    case "SET_FIELD":
      return _.merge({}, state, action.fieldUpdate);

    case "RESET":
      return action.initialState; // Reset to the initial state

    default:
      return state;
  }
};
