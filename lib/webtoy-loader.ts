import type { WebtoyDefinition, WebtoyConfig, ConfigField } from "@/types/webtoy"

interface WebtoyManifest {
  id: string
  name: string
  version: string
  author: string
  description: string
  icon: string
  githubUrl: string
  properties: Record<
    string,
    {
      type: string
      label: string
      defaultValue: any
      options?: Array<{ value: string; label: string }>
      min?: number
      max?: number
      step?: number
      unit?: string
      category?: string
      maxItems?: number
      customRenderer?: boolean
    }
  >
}

const LOADABLE_WEBTOYS = [
  "ClockWebtoy",
  "CountdownWebtoy",
  "SimpleTextWebtoy",
  "WeatherScreenWebtoy",
  "RSSFeedWebtoy",
]

export const loadAllWebtoys = async (): Promise<Record<string, WebtoyDefinition>> => {
  const webtoys: Record<string, WebtoyDefinition> = {}
  for (const webtoy of LOADABLE_WEBTOYS) {
    // If webtoy is a string id, load definition, else use as is
    let definition: WebtoyDefinition | null = null
    if (typeof webtoy === "string") {
      definition = await loadWebtoyDefinition(webtoy)
    } else {
      definition = webtoy
    }
    if (definition) {
      webtoys[definition.id] = definition
    }
  }
  return webtoys
}

export const loadDefaultValues = (defaultConfig: WebtoyConfig): WebtoyConfig => {
  // This function processes a defaultConfig object and replaces any "now" or "now+N" values
  // for date and time fields with the current date/time (optionally offset).
  const processedConfig: WebtoyConfig = { ...defaultConfig }

  for (const key in processedConfig) {
    const value = processedConfig[key]
    // Handle date fields
    if (typeof value === "string" && value.startsWith("now")) {
      // Check for date (YYYY-MM-DD) or time (HH:MM:SS) by value format
      // If value is "now" or "now+N" or "now-N"
      if (/^now([+-]\d+)?$/.test(value)) {
        // Try to detect if it's a date or time by key name
        if (key.toLowerCase().includes("date")) {
          // Date field
          if (value === "now") {
            processedConfig[key] = new Date().toISOString().split("T")[0]
          } else {
            // Offset in days
            const match = value.match(/^now([+-]\d+)$/)
            if (match) {
              const offset = parseInt(match[1], 10)
              const now = new Date()
              now.setDate(now.getDate() + offset)
              processedConfig[key] = now.toISOString().split("T")[0]
            }
          }
        } else if (key.toLowerCase().includes("time")) {
          // Time field
          if (value === "now") {
            processedConfig[key] = new Date().toTimeString().split(" ")[0]
          } else {
            // Offset in seconds
            const match = value.match(/^now([+-]\d+)$/)
            if (match) {
              const offset = parseInt(match[1], 10)
              const now = new Date()
              now.setSeconds(now.getSeconds() + offset)
              processedConfig[key] = now.toTimeString().split(" ")[0]
            }
          }
        }
      }
    }
  }
  
  return processedConfig
}

export async function loadWebtoyDefinition(webtoyId: string): Promise<WebtoyDefinition | null> {
  try {
    // In a real implementation, this would fetch from the webtoy.json file
    const manifestResponse = await import(`@/components/webtoys/${webtoyId}/webtoy.json`)
    const manifest: WebtoyManifest = manifestResponse.default

    // Convert manifest properties to config fields
    const configFields: ConfigField[] = Object.entries(manifest.properties).map(([key, prop]) => ({
      key,
      label: prop.label,
      type: prop.type as any,
      defaultValue: prop.defaultValue,
      options: prop.options,
      min: prop.min,
      max: prop.max,
      step: prop.step,
      unit: prop.unit,
      category: prop.category || "general",
      customRenderer: prop.customRenderer,
    }))

    // Generate default config from properties
    const defaultConfig = Object.entries(manifest.properties).reduce(
      (config, [key, prop]) => {
        config[key] = prop.defaultValue
        return config
      },
      {} as Record<string, any>,
    )

    return {
      id: manifest.id,
      className: webtoyId,
      title: manifest.name,
      author: manifest.author,
      description: manifest.description,
      icon: manifest.icon,
      githubUrl: manifest.githubUrl,
      defaultConfig,
      configFields,
      imports: null,
    }
  } catch (error) {
    console.error(`Failed to load webtoy definition for ${webtoyId}:`, error)
    return null
  }
}
