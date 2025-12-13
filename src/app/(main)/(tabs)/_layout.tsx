import { useThemeContext } from "@/contexts/useThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const { colors, theme, toggleTheme } = useThemeContext();
  return (
    <Tabs
      screenOptions={{
        animation: "shift",
        headerShown: true,

        headerTitleStyle: {
          color: colors.text,
        },
        headerStyle: {
          backgroundColor: "transparent",
          borderBottomColor: "transparent",
        },

        tabBarStyle: {
          backgroundColor: colors.background,
          borderColor: colors.background,
        },

        sceneStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="notes/index"
        options={{
          title: "Notes",
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-text" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="checkmark-circle" size={24} color={color} />
          ),
          headerRight: () => <MaterialIcons style={{ marginRight: 15 }} />,
        }}
      />
    </Tabs>
  );
}
