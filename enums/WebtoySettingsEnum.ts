import type { ConfigField } from "@/types/webtoy"

export enum WebtoySettingsEnum {
  BackgroundColor = "backgroundColor",
  BackgroundImage = "backgroundImage",
  ShowBackgroundImage = "showBackgroundImage",
  BackgroundOpacity = "backgroundOpacity",
  BackgroundBlur = "backgroundBlur",
  Margin = "margin",
}

export const getGlobalSettings = (): Record<string, ConfigField> => {
  return {
    [WebtoySettingsEnum.BackgroundColor]: {
      key: WebtoySettingsEnum.BackgroundColor,
      type: "color",
      label: "Background Color",
      defaultValue: "#f5f5f5",
      category: "appearance",
    },
    [WebtoySettingsEnum.BackgroundImage]: {
      key: WebtoySettingsEnum.BackgroundImage,
      type: "text",
      label: "Background Image URL",
      defaultValue: "",
      category: "appearance",
    },
    [WebtoySettingsEnum.ShowBackgroundImage]: {
      key: WebtoySettingsEnum.ShowBackgroundImage,
      type: "boolean",
      label: "Show Background Image",
      defaultValue: true,
      category: "appearance",
    },
    [WebtoySettingsEnum.BackgroundOpacity]: {
      key: WebtoySettingsEnum.BackgroundOpacity,
      type: "number",
      label: "Background Opacity",
      defaultValue: 100,
      category: "appearance",
    },
    [WebtoySettingsEnum.BackgroundBlur]: {
      key: WebtoySettingsEnum.BackgroundBlur,
      type: "number",
      label: "Background Blur",
      defaultValue: 0,
      category: "appearance",
    },
    [WebtoySettingsEnum.Margin]: {
      key: WebtoySettingsEnum.Margin,
      type: "number",
      label: "Margin",
      defaultValue: 0,
      category: "appearance",
    },
  }
}