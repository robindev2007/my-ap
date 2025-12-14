import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { StyleSheet } from "react-native";
import { useThemeContext } from "./useThemeContext";

type BottomSheetConfig = {
  content: React.ReactNode;
  enablePanDownToClose?: boolean;
  backgroundStyle?: object;
  handleIndicatorStyle?: object;
  onClose?: () => void;
};

type BottomSheetContextType = {
  openSheet: (config: BottomSheetConfig) => void;
  closeSheet: () => void;
  isOpen: boolean;
};

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined,
);

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error("useBottomSheet must be used within BottomSheetProvider");
  }
  return context;
};

export const BottomSheetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { colors, theme } = useThemeContext();
  const sheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<BottomSheetConfig | null>(null);

  const openSheet = (newConfig: BottomSheetConfig) => {
    setConfig(newConfig);
    setIsOpen(true);
    setTimeout(() => {
      sheetRef.current?.snapToIndex(0);
    }, 100);
  };

  const closeSheet = () => {
    sheetRef.current?.close();
    setTimeout(() => {
      setIsOpen(false);
      config?.onClose?.();
      setConfig(null);
    }, 300);
  };

  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      setIsOpen(false);
      config?.onClose?.();
      setConfig(null);
    }
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      >
        <BlurView
          intensity={20}
          tint={theme === "dark" ? "dark" : "light"}
          style={StyleSheet.absoluteFill}
        />
      </BottomSheetBackdrop>
    ),
    [theme],
  );

  return (
    <BottomSheetContext.Provider value={{ openSheet, closeSheet, isOpen }}>
      {children}
      {isOpen && config && (
        <BottomSheet
          ref={sheetRef}
          index={-1}
          enableDynamicSizing
          enablePanDownToClose={config.enablePanDownToClose ?? true}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          android_keyboardInputMode="adjustResize"
          backgroundStyle={
            config.backgroundStyle || {
              backgroundColor: colors.card,
              flex: 1,
              display: "flex",
            }
          }
          handleIndicatorStyle={
            config.handleIndicatorStyle || { backgroundColor: colors.border }
          }
        >
          {config.content}
        </BottomSheet>
      )}
    </BottomSheetContext.Provider>
  );
};
