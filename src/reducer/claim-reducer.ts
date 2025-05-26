import _ from "lodash";
import { Claim } from "../model/claim";

// Action types
export type ClaimAction =
  | { type: "SET_FIELD"; fieldUpdate: any }
  | { type: "RESET"; initialState: Claim };

// Reducer function
export const claimReducer = (state: Claim, action: ClaimAction): Claim => {
  switch (action.type) {
    case "SET_FIELD":
      return _.merge({}, state, action.fieldUpdate);

    case "RESET":
      return action.initialState; // Reset to the initial state

    default:
      return state;
  }
};
