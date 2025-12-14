import { Text } from "@/components/ui/text";
import { useThemeContext } from "@/contexts/useThemeContext";
import { cn } from "@/lib/utils";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { View } from "react-native";
import { Button } from "./button";

type ReusableBottomSheetProps = {
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
};

export const ReusableBottomSheet: React.FC<ReusableBottomSheetProps> = ({
  title,
  children,
  onClose,
  showCloseButton = true,
}) => {
  const { colors, theme } = useThemeContext();

  return (
    <BottomSheetView className="flex bg-car">
      {(title || showCloseButton) && (
        <View className="flex flex-row items-center justify-between px-3 py-2 ">
          {title && <Text className={cn(theme)}>{title}</Text>}
          {showCloseButton && onClose && (
            <Button
              className={theme}
              size={"icon"}
              variant={"ghost"}
              onPress={onClose}
            >
              <Text>✕</Text>
            </Button>
          )}
        </View>
      )}
      <View className={cn(theme, "flex-1 px-3 pb-3")}>{children}</View>
    </BottomSheetView>
  );
};
