/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";
export const Colors = {
  light: {
    background: "#fafafa",
    foreground: "#0f172a",

    card: "#ffffff",
    cardForeground: "#0f172a",

    popover: "#ffffff",
    popoverForeground: "#0f172a",

    primary: "#6366f1",
    primaryForeground: "#ffffff",

    secondary: "#f1f5f9",
    secondaryForeground: "#334155",

    muted: "#f8fafc",
    mutedForeground: "#64748b",

    accent: "#818cf8",
    accentForeground: "#ffffff",

    destructive: "#ef4444",

    border: "#e2e8f0",
    input: "#e2e8f0",
    ring: "#6366f1",

    radius: 12,

    chart1: "hsl(262 83% 58%)",
    chart2: "hsl(197 71% 52%)",
    chart3: "hsl(142 76% 36%)",
    chart4: "hsl(48 96% 53%)",
    chart5: "hsl(346 87% 59%)",
  },

  dark: {
    background: "#0f172a",
    foreground: "#f1f5f9",

    card: "#1e293b",
    cardForeground: "#f1f5f9",

    popover: "#1e293b",
    popoverForeground: "#f1f5f9",

    primary: "#818cf8",
    primaryForeground: "#0f172a",

    secondary: "#334155",
    secondaryForeground: "#e2e8f0",

    muted: "#1e293b",
    mutedForeground: "#94a3b8",

    accent: "#6366f1",
    accentForeground: "#ffffff",

    destructive: "#f87171",

    border: "#334155",
    input: "#334155",
    ring: "#818cf8",

    radius: 12,

    chart1: "hsl(262 83% 68%)",
    chart2: "hsl(197 71% 62%)",
    chart3: "hsl(142 76% 46%)",
    chart4: "hsl(48 96% 63%)",
    chart5: "hsl(346 87% 69%)",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
