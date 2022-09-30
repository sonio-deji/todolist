import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import axios from "axios";

function TodoList() {
  const [todos, settodos] = useState([]);

  useEffect(() => {
    axios
      .get("https://taskmanger-app.herokuapp.com/api/v1/tasks")
      .then((response) => {
        settodos(response.data.tasks);
      });
  }, [todos]);
  const updateTodo = (newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
  };
  const addTodo = () => {
    return <Todo />;
  };
  const removeTodo = async (id) => {
    try {
      await axios.delete(
        `https://taskmanger-app.herokuapp.com/api/v1/tasks/${id}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>What's the plan for today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo todos={todos} removeTodo={removeTodo} updateTodo={updateTodo} />
    </div>
  );
}

export default TodoList;
