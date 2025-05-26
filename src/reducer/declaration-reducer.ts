import _ from "lodash";
import { Declaration } from "../model/declaration";

// Action types
export type DeclarationAction =
  | { type: "SET_FIELD"; fieldUpdate: any }
  | { type: "RESET"; initialState: Declaration };

// Reducer function
export const declarationReducer = (
  state: Declaration,
  action: DeclarationAction
): Declaration => {
  switch (action.type) {
    case "SET_FIELD":
      return _.merge({}, state, action.fieldUpdate);

    case "RESET":
      return action.initialState; // Reset to the initial state

    default:
      return state;
  }
};
