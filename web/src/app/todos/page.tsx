"use client";

import React, { useEffect, useState } from "react";

import { type Todo } from "@package/types/db";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Todos() {
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState<Omit<Todo, "userId">[]>([]);
  useEffect(() => {
    const fetchTodos = async () => {
      const userId = localStorage.getItem("userId");
      const response = await fetch(`/api/todos?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
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
              const userId = localStorage.getItem("userId");
              console.log(content);
              const response = await fetch("/api/todos", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  content: content,
                  userId: userId,
                }),
              });
              const data = await response.json();
              console.log(data);
              setTodos((prev) => [...prev, data]);
              setContent("");
            }}
          >
            Add
          </Button>
        </div>
        <div className="w-full">
          {todos.map((todo) => {
            return (
              <div key={todo.id} className="flex w-full items-center gap-4">
                <span>{todo.content}</span>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Todos;
