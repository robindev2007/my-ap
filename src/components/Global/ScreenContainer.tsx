import { useThemeContext } from "@/contexts/useThemeContext";
import { cn } from "@/lib/utils";
import React from "react";
import { View, ViewProps } from "react-native";

interface ContainerProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
}

export default function ScreenContainer({
  children,
  className,
  ...props
}: ContainerProps) {
  const { theme } = useThemeContext();

  return (
    <View
      className={cn(
        theme,
        "bg-background text-foreground flex-1 p-3",
        className,
      )}
      {...props}
    >
      {children}
    </View>
  );
}
