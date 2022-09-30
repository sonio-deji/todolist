import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import axios from "axios";

function Todo({ todos, removeTodo, updateTodo }) {
  const [edit, setedit] = useState({
    id: null,
    value: "",
  });
   const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setedit({
      id: null,
      value: "",
    });
  };
  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} /> ;
  } 
  const completeTodo = async(id, value) => {
    try {
      await axios.patch(`https://taskmanger-app.herokuapp.com/api/v1/tasks/${id}`, {
        'completed': value === false ? true : false
      })
    } catch (error) {
      
    }
  }
  
  return todos.map((todo, index) => (
    <div
      className={todo.completed ? "todo-row complete" : "todo-row"}
      key={index}
      
    >
      <div key={todo._id} onClick={() => completeTodo(todo._id, todo.completed)}>
        {todo.name}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo._id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setedit({ id: todo._id, value: todo.name })}
          className="edit-icon"
        />
      </div>
    </div>
  ));
}
export default Todo;
