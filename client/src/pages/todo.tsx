import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function TodoPage() {
  const [todoList, setTodoList] = useState();

  const [newTodo, setNewTodo] = useState("");

  const getData = async () => {
    const { data, error } = await supabase.from("TodoList").select();

    if (!error) {
      setTodoList(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const addTodo = async () => {
    const newTodoData = {
      name: newTodo,
      isCompleted: false,
    };

    const { data, error } = await supabase
      .from("TodoList")
      .insert([newTodoData])
      .single();

    if (error) {
      console.log("Error adding todo: ", error);
    }

    console.log(data);

    setTodoList((prev) => [...prev, data]);
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    addTodo();
    setNewTodo("");
  };
  return (
    <div>
      <h1>TODO</h1>

      <Input
        type="text"
        placeholder="New Todo..."
        onChange={(e) => setNewTodo(e.target.value)}
        value={newTodo}
      />
      <Button onClick={handleSubmit}>Add Todo item</Button>

      <ul>
        {todoList?.map((item) => {
          return <div>{item?.name}</div>;
        })}
      </ul>
    </div>
  );
}
