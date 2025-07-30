export interface ClockTheme {
  background: string
  textColor: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  clockFace: string
  shadow: string
}

export const ClockThemes = {
  modern: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    textColor: "white",
    primaryColor: "#ffffff",
    secondaryColor: "#e0e0e0",
    accentColor: "#ffffff",
    clockFace: "rgba(255, 255, 255, 0.1)",
    shadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
  },
  dark: {
    background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
    textColor: "#ecf0f1",
    primaryColor: "#ecf0f1",
    secondaryColor: "#bdc3c7",
    accentColor: "#e74c3c",
    clockFace: "rgba(236, 240, 241, 0.1)",
    shadow: "0 8px 32px rgba(44, 62, 80, 0.4)",
  },
  neon: {
    background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)",
    textColor: "#00ff88",
    primaryColor: "#00ff88",
    secondaryColor: "#00ccff",
    accentColor: "#ff0080",
    clockFace: "rgba(0, 255, 136, 0.1)",
    shadow: "0 8px 32px rgba(0, 255, 136, 0.3)",
  },
  minimal: {
    background: "#ffffff",
    textColor: "#333333",
    primaryColor: "#333333",
    secondaryColor: "#666666",
    accentColor: "#007acc",
    clockFace: "rgba(51, 51, 51, 0.05)",
    shadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
  },
  retro: {
    background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
    textColor: "#8b4513",
    primaryColor: "#8b4513",
    secondaryColor: "#a0522d",
    accentColor: "#ff6347",
    clockFace: "rgba(139, 69, 19, 0.1)",
    shadow: "0 8px 32px rgba(255, 154, 158, 0.3)",
  },
} as const
