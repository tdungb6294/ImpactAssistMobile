import { Dispatch } from "react";
import { DeclarationErrorAction } from "../../../../reducer/declaration-error-reducer";

export function updateDeclarationErrorField<T>(
  path: string[],
  value: T,
  dispatchError: Dispatch<DeclarationErrorAction>
) {
  // Build the nested object dynamically
  const fieldUpdate = path.reduceRight<{ [key: string]: any }>(
    (acc, key) => ({ [key]: acc }),
    value as { [key: string]: any }
  );

  // Dispatch the update
  dispatchError({
    type: "SET_FIELD",
    fieldUpdate,
  });
}
