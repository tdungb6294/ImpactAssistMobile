import _ from "lodash";
import { DeclarationError } from "../model/declaration-error";

// Action types
export type DeclarationErrorAction =
  | { type: "SET_FIELD"; fieldUpdate: any }
  | { type: "RESET"; initialState: DeclarationError };

// Reducer function
export const declarationErrorReducer = (
  state: DeclarationError,
  action: DeclarationErrorAction
): DeclarationError => {
  switch (action.type) {
    case "SET_FIELD":
      return _.merge({}, state, action.fieldUpdate);

    case "RESET":
      return action.initialState; // Reset to the initial state

    default:
      return state;
  }
};
