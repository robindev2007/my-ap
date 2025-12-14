import { createContext, useContext, useState } from "react";

export type Todo = {
  id: string;
  text: string;
};

export const TodoContext = createContext({
  todos: [] as Todo[],
  createTodo: (todo: string) => {},
  deleteTodo: (id: string) => {},
});

export const TodoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      text: "Sample Todo",
    },
    {
      id: "2",
      text: "Another Todo",
    },
  ]);

  const createTodo = (todo: string) => {
    setTodos((prev) => [...prev, { id: Date.now().toString(), text: todo }]);
  };
  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        createTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within TodoContextProvider");
  }
  return context;
};
