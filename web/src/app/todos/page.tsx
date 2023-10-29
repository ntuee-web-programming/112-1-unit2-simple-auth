"use client";

import React, { useEffect, useState } from "react";

import { type Todo } from "@package/types/db";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

function Todos() {
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState<Omit<Todo, "userId">[]>([]);
  const { toast } = useToast();
  useEffect(() => {
    const fetchTodos = async () => {
      // Step 9: Fetch todos
      // To fetch todos, which is a protected resource,
      // we need to send the token in the header.
      const token = localStorage.getItem("jwt-token");
      const response = await fetch(`/api/todos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Note the Bearer prefix
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        toast({
          title: "Error",
          description: "Failed to fetch todos",
          variant: "destructive",
        });
        return;
      }
      setTodos(data);
    };
    fetchTodos();
  }, []);
  return (
    <main className="flex w-full flex-col items-center py-24">
      <div className="flex w-1/2 flex-col items-center gap-4">
        <h1>TODO</h1>
        <div className="flex w-full gap-4">
          <Input
            placeholder="Add a todo"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <Button
            onClick={async () => {
              // Step 9: Create todos
              // To create todos, which is a protected resource,
              // we need to send the token in the header.

              const token = localStorage.getItem("jwt-token");
              console.log(content);
              const response = await fetch("/api/todos", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  content: content,
                }),
              });
              const data = await response.json();
              console.log(data);
              if (!response.ok) {
                toast({
                  title: "Error",
                  description: "Failed to create todo",
                  variant: "destructive",
                });
                return;
              }
              setTodos((prev) => [...prev, data]);
              setContent("");
            }}
          >
            Add
          </Button>
        </div>
        <div className="flex w-full flex-col gap-2">
          {todos.map((todo) => {
            return (
              <Card
                key={todo.id}
                className="flex w-full items-center justify-between gap-4 p-3"
              >
                <span>{todo.content}</span>
                <Button
                  onClick={async () => {
                    // Step 9: Delete todos
                    // To delete todos, which is a protected resource,
                    // we need to send the token in the header.
                    const token = localStorage.getItem("jwt-token");
                    const response = await fetch(`/api/todos/${todo.id}`, {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                    });
                    if (response.ok) {
                      setTodos((prev) => prev.filter((t) => t.id !== todo.id));
                    } else {
                      toast({
                        title: "Error",
                        description: "Failed to delete todo",
                        variant: "destructive",
                      });
                    }
                  }}
                  variant={"ghost"}
                >
                  <span>Complete</span>
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Todos;
