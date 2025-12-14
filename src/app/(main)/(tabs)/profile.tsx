import ScreenContainer from "@/components/Global/ScreenContainer";
import { Button } from "@/components/ui/button";
import { useThemeContext } from "@/contexts/useThemeContext";
import React from "react";
import { Text } from "react-native";

export default function Profile() {
  const { toggleTheme } = useThemeContext();
  return (
    <ScreenContainer>
      <Button onPress={toggleTheme} variant="default">
        <Text>Toggle Theme</Text>
      </Button>
    </ScreenContainer>
  );
}
