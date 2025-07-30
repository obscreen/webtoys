export interface CountdownTheme {
  gradient: string
  textColor: string
  shadow: string
}

export const CountdownThemes = {
  modern: {
    gradient: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
    textColor: "white",
    shadow: "0 8px 32px rgba(116, 185, 255, 0.3)",
  },
  dark: {
    gradient: "linear-gradient(135deg, #2d3436 0%, #636e72 100%)",
    textColor: "white",
    shadow: "0 8px 32px rgba(45, 52, 54, 0.4)",
  },
  sunset: {
    gradient: "linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)",
    textColor: "white",
    shadow: "0 8px 32px rgba(253, 121, 168, 0.3)",
  },
  ocean: {
    gradient: "linear-gradient(135deg, #00b894 0%, #00cec9 100%)",
    textColor: "white",
    shadow: "0 8px 32px rgba(0, 184, 148, 0.3)",
  },
  forest: {
    gradient: "linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)",
    textColor: "white",
    shadow: "0 8px 32px rgba(108, 92, 231, 0.3)",
  },
} as const
