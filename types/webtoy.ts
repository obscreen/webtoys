import React from "react"

export interface WebtoyConfig {
  [key: string]: string | number | boolean | string[]
}

export interface WebtoyInstance {
  id: string
  definitionId: string
  title: string
  config: WebtoyConfig
}

export interface ConfigField {
  key: string
  label: string
  type: "text" | "number" | "color" | "select" | "multiselect" | "range" | "boolean" | "date" | "time"
  defaultValue: any
  min?: number
  max?: number
  step?: number
  unit?: string
  options?: { value: string; label: string }[]
  maxItems?: number
  category?: string
  customRenderer?: boolean
}

export interface WebtoyDefinition {
  id: string
  className: string
  title: string
  author: string
  description: string
  icon: string
  githubUrl: string
  defaultConfig: WebtoyConfig
  configFields: ConfigField[]
  imports?: any
}

export interface WebtoyTheme {
  [key: string]: string | number
}
