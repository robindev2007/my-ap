import { Button } from "@/components/ui/button";
import { ReusableBottomSheet } from "@/components/ui/ReusableBottomSheet";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import { useBottomSheet } from "@/contexts/BottomSheetContext";
import { TodoContext } from "@/contexts/todos/TodoContext";
import { useThemeContext } from "@/contexts/useThemeContext";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import z from "zod";

// Define Zod schema for form validation
const schema = z.object({
  text: z.string().min(1, "Name is required"),
});

const AddNoteDrawer = () => {
  const { closeSheet } = useBottomSheet();
  const { theme } = useThemeContext();

  const safeNote = () => {
    // Logic to save the note goes here
    closeSheet();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { createTodo, deleteTodo, todos } = useContext(TodoContext);

  // Function to handle form submission
  const onSubmit = (data: z.infer<typeof schema>) => {
    createTodo(data.text);

    closeSheet();
  };

  return (
    <ReusableBottomSheet
      title="Add New Note"
      onClose={closeSheet}
      showCloseButton
    >
      <BottomSheetScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="space-y-2">
          <View className="space-y-1.5">
            <Text>Name</Text>
            <Controller
              control={control}
              name="text"
              render={({ field: { onChange, onBlur, value } }) => (
                <Textarea
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your name"
                  className="min-h-40"
                />
              )}
            />
            {errors.text && (
              <Text className="text-destructive text-sm">
                {errors.text.message}
              </Text>
            )}
          </View>

          <Button onPress={handleSubmit(onSubmit)} className="!mt-6">
            <Text>Submit</Text>
          </Button>
        </View>
      </BottomSheetScrollView>
    </ReusableBottomSheet>
  );
};

export default AddNoteDrawer;
