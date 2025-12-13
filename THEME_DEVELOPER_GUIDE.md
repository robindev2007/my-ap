# Theme System - Developer Guide

## 🎨 Quick Start

### Basic Setup

```tsx
import { ThemeProvider } from '@/contexts';
import { ThemedText, ThemedCard } from '@/components/ui';

// Wrap your app
<ThemeProvider>
  <App />
</ThemeProvider>

// Use themed components
<ThemedText variant="primary" size="lg" weight="bold">
  Hello World
</ThemedText>
```

## 📦 Import Patterns

### Import from Index Files (Recommended)

```tsx
// Theme hooks and context
import { useTheme, useIsDark, THEME_COLORS } from "@/contexts";

// UI Components
import { ThemedText, ThemedCard, ThemedView } from "@/components/ui";
```

### Direct Imports (Alternative)

```tsx
import { useTheme } from "@/contexts/ThemeContext";
import { ThemedText } from "@/components/ui/themed-text";
```

## 🎯 Core Hooks

### useTheme()

Main hook for theme management.

```tsx
const {
  theme, // 'light' | 'dark' | 'system'
  colorScheme, // 'light' | 'dark' (resolved)
  setTheme, // Change theme
  toggleTheme, // Cycle themes
  isDark, // boolean
  isLight, // boolean
  isLoading, // boolean
} = useTheme();

// Examples
setTheme("dark");
toggleTheme(); // light → dark → system → light
```

### useIsDark()

Quick dark mode check.

```tsx
const isDark = useIsDark();
return <Icon name={isDark ? "moon" : "sun"} />;
```

### useThemeColors()

Access all theme colors.

```tsx
const colors = useThemeColors();
<View style={{ backgroundColor: colors.background }} />;
```

### useThemeColor()

Get specific theme color.

```tsx
const bgColor = useThemeColor("background");
const textColor = useThemeColor("foreground");
```

### useThemedValue()

Conditional values based on theme.

```tsx
const { getThemedColor, getThemedValue } = useThemedValue();

const bg = getThemedColor("#fff", "#000");
const spacing = getThemedValue(16, 20);
```

## 🧩 Components

### ThemedText

```tsx
// Basic usage
<ThemedText>Default text</ThemedText>

// With variants
<ThemedText variant="muted">Secondary text</ThemedText>
<ThemedText variant="primary">Brand color</ThemedText>
<ThemedText variant="destructive">Error text</ThemedText>

// With sizes
<ThemedText size="xs">Extra small</ThemedText>
<ThemedText size="2xl">Very large</ThemedText>

// With weights
<ThemedText weight="bold">Bold text</ThemedText>
<ThemedText weight="semibold">Semi-bold</ThemedText>

// Combined
<ThemedText
  variant="primary"
  size="xl"
  weight="bold"
  center
>
  Heading
</ThemedText>

// Pre-styled components
<Heading>Page Title</Heading>
<Title>Section Title</Title>
<Subtitle>Section subtitle</Subtitle>
<Caption>Small caption text</Caption>
```

### ThemedCard

```tsx
// Basic card
<ThemedCard>
  <ThemedText>Card content</ThemedText>
</ThemedCard>

// Variants
<ThemedCard variant="outlined">Outlined card</ThemedCard>
<ThemedCard variant="elevated">Elevated card</ThemedCard>

// Pressable card
<ThemedCard pressable onPress={() => console.log('pressed')}>
  <ThemedText>Tap me</ThemedText>
</ThemedCard>

// With sections
<ThemedCard>
  <CardHeader>
    <Title>Card Title</Title>
  </CardHeader>
  <CardContent>
    <ThemedText>Main content</ThemedText>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</ThemedCard>
```

### ThemedView

```tsx
// Basic themed view
<ThemedView themed>
  <ThemedText>Content</ThemedText>
</ThemedView>

// Card background
<ThemedView card>
  <ThemedText>Card style view</ThemedText>
</ThemedView>

// Centered content
<ThemedView center>
  <ThemedText>Centered</ThemedText>
</ThemedView>

// Container (with padding)
<ThemedContainer>
  <ThemedText>Padded content</ThemedText>
</ThemedContainer>

// Section (with bottom margin)
<ThemedSection>
  <ThemedText>Spaced section</ThemedText>
</ThemedSection>
```

## 🎨 Available Variants

### Text Variants

- `default` - Primary text color
- `muted` - Secondary/muted text
- `primary` - Brand primary color
- `secondary` - Secondary brand color
- `destructive` - Error/danger
- `accent` - Accent color
- `success` - Success messages
- `warning` - Warning messages
- `info` - Informational

### Sizes

- `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`

### Weights

- `normal`, `medium`, `semibold`, `bold`

## 🎯 Navigation Integration

### Themed Navigation Options

```tsx
import { useThemedNavigationOptions } from "@/components/ui";

function MyScreen() {
  const navOptions = useThemedNavigationOptions();

  return <Stack.Screen name="details" options={navOptions} />;
}
```

### Themed Tab Options

```tsx
import { useThemedTabOptions } from "@/components/ui";

function TabNavigator() {
  const tabOptions = useThemedTabOptions();

  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen name="home" component={Home} />
    </Tab.Navigator>
  );
}
```

### Custom Header

```tsx
import { ThemedHeader, ThemeToggleButton } from "@/components/ui";

<ThemedHeader
  title="Settings"
  showBackButton
  rightComponent={<ThemeToggleButton />}
/>;
```

## 📐 Design Tokens

### Spacing

```tsx
import { SPACING } from "@/contexts";

const styles = {
  padding: SPACING.md, // 16
  margin: SPACING.lg, // 24
};
```

Available: `xs`, `sm`, `md`, `lg`, `xl`, `xxl`

### Border Radius

```tsx
import { RADIUS } from "@/contexts";

const styles = {
  borderRadius: RADIUS.lg, // 12
};
```

Available: `sm`, `md`, `lg`, `xl`, `full`

### Typography

```tsx
import { FONT_SIZE, FONT_WEIGHT } from "@/contexts";

const styles = {
  fontSize: FONT_SIZE.lg, // 18
  fontWeight: FONT_WEIGHT.bold, // '700'
};
```

## 🏗️ Best Practices

### 1. Use Index Imports

```tsx
✅ import { useTheme, ThemedText } from '@/contexts';
❌ import { useTheme } from '@/contexts/ThemeContext';
```

### 2. Prefer Themed Components

```tsx
✅ <ThemedText>Hello</ThemedText>
❌ <Text className="text-foreground">Hello</Text>
```

### 3. Use Design Tokens

```tsx
✅ paddingHorizontal: SPACING.md
❌ paddingHorizontal: 16
```

### 4. Destructure Only What You Need

```tsx
✅ const { isDark } = useTheme();
❌ const theme = useTheme();
```

### 5. Use Type-Safe Props

```tsx
✅ <ThemedText variant="primary" size="lg" />
❌ <ThemedText className="text-primary text-lg" />
```

## 🧪 Testing Themes

```tsx
// Toggle theme in dev
<Button onPress={toggleTheme}>
  Cycle Theme
</Button>

// Set specific theme
<Button onPress={() => setTheme('dark')}>
  Dark Mode
</Button>

// Conditional rendering
{isDark ? <MoonIcon /> : <SunIcon />}
```

## 📱 Example Screen

```tsx
import { useTheme, SPACING } from "@/contexts";
import {
  ThemedContainer,
  ThemedCard,
  ThemedText,
  Title,
  Subtitle,
} from "@/components/ui";

export default function ProfileScreen() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <ThemedContainer>
      <ThemedCard pressable onPress={toggleTheme}>
        <Title>Theme Settings</Title>
        <Subtitle>Current: {isDark ? "Dark" : "Light"}</Subtitle>
      </ThemedCard>

      <ThemedCard variant="outlined" style={{ marginTop: SPACING.md }}>
        <ThemedText variant="muted" size="sm">
          Tap card above to toggle theme
        </ThemedText>
      </ThemedCard>
    </ThemedContainer>
  );
}
```

## 🎨 Customizing Colors

Edit `src/lib/colors.ts`:

```tsx
export const THEME_COLORS = {
  light: {
    primary: "hsl(220, 90%, 56%)", // Your brand color
    // ... other colors
  },
  dark: {
    primary: "hsl(220, 80%, 60%)",
    // ... other colors
  },
};
```

## 🔄 Migration Guide

### From Old System

```tsx
// Before
const { colorScheme } = useTheme();
<Text className="text-foreground">Hello</Text>;

// After
const { isDark } = useTheme();
<ThemedText>Hello</ThemedText>;
```

### From useColorScheme

```tsx
// Before
const colorScheme = useColorScheme();
const isDark = colorScheme === "dark";

// After
const { isDark } = useTheme();
// or
const isDark = useIsDark();
```
