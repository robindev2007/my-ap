import GlobalProvider from "@/components/providers/GlobalProvider";
import { useThemeContext } from "@/contexts/useThemeContext";
import { cn } from "@/lib/utils";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../styles/global.css";

LogBox.ignoreLogs(["props.pointerEvents is deprecated"]);

SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const { theme, colors } = useThemeContext();
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      className={cn(theme == "light" ? "light" : "dark", "")}
    >
      <StatusBar />
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {},
          headerTitleStyle: {
            fontWeight: "600",
          },
          statusBarStyle: theme === "light" ? "dark" : "light",
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
      <PortalHost />
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GlobalProvider>
        <RootLayoutContent />
      </GlobalProvider>
    </SafeAreaProvider>
  );
}
