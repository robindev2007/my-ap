import { ThemeProvider } from "@/contexts/useThemeContext";
import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
