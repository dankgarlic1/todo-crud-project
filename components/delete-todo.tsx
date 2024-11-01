"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { mutate } from "swr";
import toast from "react-hot-toast";

export default function DeleteTodo({ id }: { id: string }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/todos?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Show success toast
        toast.success("Todo deleted successfully!");
        mutate("/api/todos");
      } else {
        throw new Error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      // Show error toast
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(`Error: ${errorMessage}`);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      variant="ghost"
      size="icon"
      className="mr-1 text-red-500 bg-red-100 hover:text-red-700 hover:bg-red-200"
    >
      <TrashIcon className="h-4 w-4" />
    </Button>
  );
}
