export const EditorColors = {
  // Basic
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",

  // Primary colors
  primary: "#007acc",
  primaryHover: "#005a9e",
  primaryLight: "rgba(0, 122, 204, 0.1)",

  // Secondary colors
  secondary: "#6f42c1",
  secondaryHover: "#5a32a3",

  // Background colors
  background: "#f5f5f5",
  backgroundLight: "#fafafa",
  backgroundDark: "#f8f9fa",
  surface: "#ffffff",

  // Border colors
  border: "#e0e0e0",
  borderLight: "#ddd",
  borderFocus: "#007acc",

  // Text colors
  textPrimary: "#333333",
  textSecondary: "#666666",
  textMuted: "#999999",
  textLight: "#ffffff",

  // State colors
  success: "#059669",
  successHover: "#059669",
  successLight: "rgba(5, 150, 105, 0.1)",

  danger: "#DC3545",
  dangerHover: "#C82333",
  dangerLight: "rgba(220, 53, 69, 0.1)",

  warning: "#FFC107",
  warningHover: "#E0A800",
  warningLight: "rgba(255, 193, 7, 0.1)",

  info: "#017BFF",
  infoHover: "#016EEA",
  infoLight: "rgba(1, 123, 255, 0.1)",
  infoDark: "#007acc",

  // Interactive colors
  hover: "#f0f0f0",
  active: "#e0e0e0",
  disabled: "#6c757d",

  // Shadow colors
  shadowLight: "rgba(0, 0, 0, 0.1)",
  shadowMedium: "rgba(0, 0, 0, 0.15)",
  shadowHeavy: "rgba(0, 0, 0, 0.25)",

  // Overlay colors
  overlay: "rgba(255, 255, 255, 0.1)",
  overlayDark: "rgba(0, 0, 0, 0.5)",
} as const

export const EditorSpacing = {
  xxs: "2px",
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  xxl: "24px",
  xxxl: "32px",
} as const

export const EditorBgGradient = {
  primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  secondary: "linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)",
} as const

export const EditorBorderRadius = {
  xs: "2px",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  xxl: "16px",
  round: "50%",
} as const

export const EditorFontSizes = {
  xxs: "10px",
  xs: "12px",
  sm: "13px",
  md: "14px",
  lg: "16px",
  xl: "18px",
  xxl: "24px",
} as const

export const EditorFontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const

export const EditorTransitions = {
  fast: "0.15s ease",
  normal: "0.2s ease",
  slow: "0.3s ease",
} as const

export const EditorShadows = {
  xs: `0 1px 2px ${EditorColors.shadowLight}`,
  sm: `0 2px 4px ${EditorColors.shadowLight}`,
  md: `0 4px 8px ${EditorColors.shadowLight}`,
  lg: `0 8px 16px ${EditorColors.shadowMedium}`,
  xl: `0 12px 24px ${EditorColors.shadowMedium}`,
  focus: `0 0 0 2px ${EditorColors.primaryLight}`,
  button: `0 4px 12px ${EditorColors.shadowMedium}`,
} as const
