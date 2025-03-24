export function objectToPaths(
  obj: Record<string, any>,
  parentPath: string[] = []
): string[][] {
  const paths: string[][] = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const currentPath = [...parentPath, key];

      if (typeof obj[key] === "object" && obj[key] !== null) {
        // Recursively process nested objects
        paths.push(...objectToPaths(obj[key], currentPath));
      } else {
        // Add the current path for non-object values
        paths.push(currentPath);
      }
    }
  }

  return paths;
}
