import { Colors } from "@/constants/theme";

// Convert hex to HSL
function hexToHSL(hex: string): string {
  // Remove # if present
  hex = hex.replace(/^#/, "");

  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  const lPercent = Math.round(l * 100);

  return `${h} ${s}% ${lPercent}%`;
}

// Generate CSS from theme colors
export function generateCSSVariables(theme: "light" | "dark"): string {
  const colors = theme === "light" ? Colors.light : Colors.dark;

  return `
    --background: ${hexToHSL(colors.background)};
    --foreground: ${hexToHSL(colors.foreground)};
    --card: ${hexToHSL(colors.card)};
    --card-foreground: ${hexToHSL(colors.cardForeground)};
    --popover: ${hexToHSL(colors.popover)};
    --popover-foreground: ${hexToHSL(colors.popoverForeground)};
    --primary: ${hexToHSL(colors.primary)};
    --primary-foreground: ${hexToHSL(colors.primaryForeground)};
    --secondary: ${hexToHSL(colors.secondary)};
    --secondary-foreground: ${hexToHSL(colors.secondaryForeground)};
    --muted: ${hexToHSL(colors.muted)};
    --muted-foreground: ${hexToHSL(colors.mutedForeground)};
    --accent: ${hexToHSL(colors.accent)};
    --accent-foreground: ${hexToHSL(colors.accentForeground)};
    --destructive: ${hexToHSL(colors.destructive)};
    --border: ${hexToHSL(colors.border)};
    --input: ${hexToHSL(colors.input)};
    --ring: ${hexToHSL(colors.ring)};
    --radius: ${colors.radius}px;
    --chart-1: ${colors.chart1};
    --chart-2: ${colors.chart2};
    --chart-3: ${colors.chart3};
    --chart-4: ${colors.chart4};
    --chart-5: ${colors.chart5};
  `.trim();
}

// Update CSS variables in the DOM (for web)
export function updateCSSVariables(theme: "light" | "dark") {
  if (typeof document !== "undefined") {
    const root = document.documentElement;
    const cssVars = generateCSSVariables(theme);

    cssVars.split("\n").forEach((line) => {
      const [key, value] = line.split(":").map((s) => s.trim());
      if (key && value) {
        root.style.setProperty(key, value.replace(";", ""));
      }
    });
  }
}
