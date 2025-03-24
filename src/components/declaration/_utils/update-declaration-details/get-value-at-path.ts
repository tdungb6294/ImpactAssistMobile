export function getValueAtPath(obj: any, path: string[]): any {
  return path.reduce(
    (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
    obj
  );
}
