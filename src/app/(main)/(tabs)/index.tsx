import ScreenContainer from "@/components/Global/ScreenContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useBottomSheet } from "@/contexts/BottomSheetContext";
import { useTodoContext } from "@/contexts/todos/TodoContext";
import AddNoteDrawer from "@/features/notes/AddNoteDrawer";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import { View } from "react-native";
export default function Main() {
  const { todos } = useTodoContext();
  const { openSheet } = useBottomSheet();

  const handleAddNote = () => {
    openSheet({
      content: <AddNoteDrawer />,
      enablePanDownToClose: true,
    });
  };

  console.log({ todos });

  return (
    <ScreenContainer>
      <TodoList />
      <Button
        onPress={handleAddNote}
        size={"icon"}
        variant={"default"}
        className="fixed bottom-5 right-5 rounded-full"
      >
        <Text>
          <Entypo name="plus" size={24} color="black" />
        </Text>
      </Button>
    </ScreenContainer>
  );
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TodoList = () => {
  const { todos } = useTodoContext();
  return (
    <View>
      <View className="grid grid-cols-2 gap-3">
        {todos.map((todo) => (
          <Card key={todo.id} className="mb-2 p-4">
            <Text>{todo.text}</Text>
          </Card>
        ))}
      </View>
      <Dialog>
        <DialogTrigger>
          <Text>Open</Text>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </View>
  );
};
