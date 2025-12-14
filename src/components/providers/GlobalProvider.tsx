import { BottomSheetProvider } from "@/contexts/BottomSheetContext";
import { TodoContextProvider } from "@/contexts/todos/TodoContext";
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
    <TodoContextProvider>
      <Provider store={store}>
        <ThemeProvider>
          <BottomSheetProvider>{children}</BottomSheetProvider>
        </ThemeProvider>
      </Provider>
    </TodoContextProvider>
  );
}
