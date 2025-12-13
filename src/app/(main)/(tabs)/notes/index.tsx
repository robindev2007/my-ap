import ScreenContainer from "@/components/Global/ScreenContainer";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useThemeContext } from "@/contexts/useThemeContext";
import { Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";

export default function Main() {
  const { toggleTheme, colors } = useThemeContext();
  return (
    <>
      <Drawer>
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "overview",
          }}
        />
        <Drawer.Screen
          name="user/[id]" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "User",
            title: "overview",
          }}
        />
      </Drawer>
      <Stack.Screen
        options={{ contentStyle: { backgroundColor: colors.background } }}
      />
      <ScreenContainer>
        <Button onPress={toggleTheme}>
          <Text>Eobin</Text>
        </Button>
      </ScreenContainer>
    </>
  );
}
