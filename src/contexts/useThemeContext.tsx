import { Colors } from "@/constants/theme";
import { updateCSSVariables } from "@/lib/syncThemeColors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: typeof Colors.light | typeof Colors.dark;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    AsyncStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    updateCSSVariables(newTheme);
  };

  const colors = theme === "light" ? Colors.light : Colors.dark;

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = (await AsyncStorage.getItem("theme")) as Theme;
      if (storedTheme) {
        setTheme(storedTheme);
        updateCSSVariables(storedTheme);
      } else {
        updateCSSVariables(theme);
      }
    };

    loadTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
};
