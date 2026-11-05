export type FieldType = "text" | "textarea" | "checkbox" | "tags" | "select" | "number";

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

/** Converts a comma-separated string into a trimmed string array, dropping empties. */
export function parseTags(value: string): string[] {
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}
