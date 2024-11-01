"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Todo } from "@prisma/client";

import useSWR, { mutate } from "swr";
import DeleteTodo from "@/components/delete-todo";
import UpdateTodo from "./update-todo";
import toast from "react-hot-toast";
import { Checkbox } from "./ui/checkbox";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TodoList() {
  const {
    data: todos,
    error,
    isLoading,
  } = useSWR<Todo[]>("/api/todos", fetcher, {
    onError: (error) => {
      console.error("Failed to fetch todos:", error);
      toast.error("Failed to load todos.");
    },
  });

  const handleCheckboxChange = async (todo: Todo) => {
    const updatedStatus = !todo.isCompleted;

    try {
      // Create the payload as expected by your API
      const payload = {
        ...todo, // spread existing todo properties
        isCompleted: updatedStatus, // update isCompleted status
      };

      const response = await fetch(`/api/todos`, {
        method: "PUT", // Use PUT for updating
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Send the entire payload
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      // Optionally re-fetch the todos or use mutate to update the local SWR cache
      mutate("/api/todos");

      toast.success(
        `Todo marked as ${updatedStatus ? "completed" : "incomplete"}!`
      );
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Failed to update todo.");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40 bg-white">
        <div className="relative w-12 h-12">
          <div className="absolute w-12 h-12 border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
          <div className="absolute w-12 h-12 border-4 border-primary rounded-full animate-ping opacity-25"></div>
        </div>
      </div>
    );

  const todoList = todos || [];

  return (
    <div className="space-y-4">
      {todoList.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10">
            <p className="text-muted-foreground">All done for today!</p>
          </CardContent>
        </Card>
      ) : (
        todoList.map((todo) => (
          <Card className="group relative" key={todo.id}>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Checkbox
                className="mr-2 h-4 w-4"
                checked={todo.isCompleted}
                onCheckedChange={() => handleCheckboxChange(todo)} // Handle checkbox change
              />
              <UpdateTodo todo={todo} />
              <DeleteTodo id={todo.id} />
            </div>
            <CardHeader>
              <CardTitle>
                <span className={todo.isCompleted ? "line-through" : ""}>
                  {todo.title}
                </span>
              </CardTitle>
            </CardHeader>
            {todo.description && (
              <CardContent>
                <p>{todo.description}</p>
              </CardContent>
            )}
          </Card>
        ))
      )}
    </div>
  );
}
