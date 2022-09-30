import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

function TodoForm(props) {
  const inputRef = useRef(null);

  const [input, setinput] = useState(props.edit ? props.edit.value : "");
  const [errorMsg, setErrorMsg] = useState(false);
  const [inputError, setInputError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.length < 1) {
      setInputError(true);
    }
    try {
      await axios.post("https://taskmanger-app.herokuapp.com/api/v1/tasks", {
        "name": input,
      });
    } catch (error) {
      console.log(error);
      setErrorMsg(error?.response.data.msg);
    }
    setTimeout(() => {
      setErrorMsg(false);
      setInputError(false);
    }, 2000);
    setinput("");
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const handleChange = (e) => {
    setinput(e.target.value);
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `https://taskmanger-app.herokuapp.com/api/v1/tasks/${props.edit.id}`,
        {
          name: input,
        }
      );
    } catch (error) {
      console.log(error);
    }
    setinput("");

    props.onSubmit();
  };

  return (
    <form className="todo-form">
      {props.edit ? (
        <>
          <input
            name="name"
            type="text"
            placeholder="Update activity"
            value={input}
            className="todo-input"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="todo-button" onClick={submitUpdate}>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            name="name"
            type="text"
            placeholder="Add a todo"
            value={input}
            className="todo-input"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="todo-button" onClick={handleSubmit}>
            Add todo
          </button>
          <p className="errorMsg">{errorMsg}</p>
          {inputError && <p className="errorMsg">please input a task</p>}
        </>
      )}
    </form>
  );
}

export default TodoForm;
