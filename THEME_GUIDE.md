# Theme System Guide

## Overview

This app uses a comprehensive theme system with automatic color switching between light and dark modes. The theme is persisted across app restarts and supports:

- **Light Mode** - Bright backgrounds with dark text
- **Dark Mode** - Dark backgrounds with light text
- **System Mode** - Automatically follows device theme

## Key Features

✅ Automatic theme persistence with AsyncStorage
✅ Dynamic text colors based on current theme
✅ Tailwind CSS integration with dark mode support
✅ React Context for global theme state
✅ Type-safe theme hooks

## Usage

### 1. Access Theme State

Use the `useTheme` hook anywhere in your app:

```tsx
import { useTheme } from "@/contexts/ThemeContext";

function MyComponent() {
  const { theme, colorScheme, setTheme, toggleTheme } = useTheme();

  return (
    <View>
      <Text>Current theme: {theme}</Text>
      <Text>Active color scheme: {colorScheme}</Text>
    </View>
  );
}
```

### 2. Dynamic Text Colors

Use Tailwind classes that automatically adapt:

```tsx
// Basic text colors
<Text className="text-foreground">Primary text</Text>
<Text className="text-muted-foreground">Secondary text</Text>
<Text className="text-primary">Brand color text</Text>
<Text className="text-destructive">Error text</Text>

// With dark mode variants
<Text className="text-gray-900 dark:text-gray-100">Custom colors</Text>
```

### 3. Using ThemedText Component

For convenience, use the pre-built `ThemedText` component:

```tsx
import { ThemedText } from '@/components/ui/themed-text';

<ThemedText>Default text</ThemedText>
<ThemedText variant="muted">Muted text</ThemedText>
<ThemedText variant="primary">Primary text</ThemedText>
<ThemedText variant="destructive">Error text</ThemedText>
```

### 4. Theme Switching

```tsx
// Toggle through themes (light → dark → system → light)
toggleTheme();

// Set specific theme
setTheme("light");
setTheme("dark");
setTheme("system");
```

### 5. Dynamic Backgrounds and Components

```tsx
// Cards and containers
<View className="bg-card border border-border">
  <Text className="text-card-foreground">Card content</Text>
</View>

// Buttons
<Pressable className="bg-primary">
  <Text className="text-primary-foreground">Button</Text>
</Pressable>

// Input fields
<TextInput className="bg-input border-border text-foreground" />
```

## Available Theme Colors

### Text Colors

- `text-foreground` - Primary text
- `text-muted-foreground` - Secondary/muted text
- `text-primary` - Brand primary color
- `text-secondary-foreground` - Secondary emphasis
- `text-destructive` - Errors/warnings
- `text-accent-foreground` - Accent text
- `text-card-foreground` - Text on cards

### Background Colors

- `bg-background` - Main background
- `bg-card` - Card backgrounds
- `bg-primary` - Primary actions
- `bg-secondary` - Secondary actions
- `bg-muted` - Muted backgrounds
- `bg-accent` - Accent backgrounds
- `bg-popover` - Popover/modal backgrounds

### Border Colors

- `border-border` - Default borders
- `border-input` - Input borders

## Theme Hook API

```typescript
interface ThemeContextType {
  theme: "light" | "dark" | "system"; // Current theme setting
  colorScheme: "light" | "dark"; // Resolved color scheme
  setTheme: (theme: Theme) => void; // Set specific theme
  toggleTheme: () => void; // Cycle through themes
}
```

## Customizing Theme Colors

Edit [src/lib/theme.ts](src/lib/theme.ts) to customize color values:

```typescript
export const THEME = {
  light: {
    background: "hsl(0 0% 100%)",
    foreground: "hsl(0 0% 3.9%)",
    primary: "hsl(0 0% 9%)",
    // ... more colors
  },
  dark: {
    background: "hsl(0 0% 3.9%)",
    foreground: "hsl(0 0% 98%)",
    primary: "hsl(0 0% 98%)",
    // ... more colors
  },
};
```

## Best Practices

1. **Always use theme colors** instead of hardcoded colors:

   ```tsx
   ❌ <Text className="text-black">Text</Text>
   ✅ <Text className="text-foreground">Text</Text>
   ```

2. **Use dark mode variants** for custom colors:

   ```tsx
   <View className="bg-blue-500 dark:bg-blue-700" />
   ```

3. **Test both themes** to ensure good contrast and readability

4. **Use semantic color names** for better maintainability:
   - `primary` for main actions
   - `destructive` for errors
   - `muted` for less important content

## Examples

### Theme Toggle Button

```tsx
import { useTheme } from "@/contexts/ThemeContext";
import { Pressable } from "react-native";

function ThemeToggle() {
  const { toggleTheme, theme } = useTheme();

  return (
    <Pressable onPress={toggleTheme} className="bg-primary rounded-lg p-4">
      <Text className="text-primary-foreground">Theme: {theme}</Text>
    </Pressable>
  );
}
```

### Themed Card Component

```tsx
function Card({ children }: { children: React.ReactNode }) {
  return (
    <View className="bg-card border-border rounded-lg border p-4 shadow-sm">
      {children}
    </View>
  );
}
```

## Architecture

- **ThemeContext** ([src/contexts/ThemeContext.tsx](src/contexts/ThemeContext.tsx)) - Theme state management
- **GlobalProvider** ([src/components/providers/GlobalProvider.tsx](src/components/providers/GlobalProvider.tsx)) - App-wide providers
- **Root Layout** ([src/app/\_layout.tsx](src/app/_layout.tsx)) - Theme application to app root
- **Theme Config** ([src/lib/theme.ts](src/lib/theme.ts)) - Color definitions
- **Tailwind Config** ([tailwind.config.js](tailwind.config.js)) - CSS variable mapping

## Troubleshooting

**Theme not switching?**

- Ensure `className={colorScheme}` is on the root SafeAreaView in `_layout.tsx`
- Check that dark mode is enabled in tailwind.config.js: `darkMode: 'class'`

**Colors not changing?**

- Verify you're using theme color classes (e.g., `text-foreground`)
- Make sure global.css is imported in \_layout.tsx

**Theme not persisting?**

- AsyncStorage must be properly installed
- Check for errors in ThemeContext loading
