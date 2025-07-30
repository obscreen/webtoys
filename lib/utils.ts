import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ConfigField, WebtoyConfig } from "@/types/webtoy"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const inflateConfig = (config: any, configFields: ConfigField[], searchParams: URLSearchParams) => {
  // Process webtoy-specific fields
  configFields.forEach((field) => {
    const paramValue = searchParams.get(field.key)
    if (paramValue !== null) {
      switch (field.type) {
        case "number":
        case "range":
          config[field.key] = Number(paramValue)
          break
        case "boolean":
          config[field.key] = paramValue === "true"
          break
        case "multiselect":
          config[field.key] = paramValue.split(",").filter((v) => v.trim() !== "")
          break
        default:
          config[field.key] = paramValue
      }
    }
  })
};
