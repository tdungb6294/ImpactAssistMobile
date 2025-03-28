export function camelToTitleCase(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1") // Insert space before uppercase letters
    .replace(/^./, (match) => match.toUpperCase()) // Capitalize the first letter
    .trim(); // Remove any leading spaces
}
