import GlobalProvider from "@/components/providers/GlobalProvider";
import { useThemeContext } from "@/contexts/useThemeContext";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "../styles/global.css";

function RootLayoutContent() {
  const { theme, colors } = useThemeContext();

  return (
    <>
      <StatusBar style={theme === "light" ? "dark" : "light"} />

      <Stack
        screenOptions={{
          headerShown: false,
          headerTitleStyle: {
            fontWeight: "600",
            color: colors.foreground,
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      />

      <PortalHost />
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <GlobalProvider>
          <RootLayoutContent />
        </GlobalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
