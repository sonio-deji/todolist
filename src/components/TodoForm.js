import React, { useState, useEffect, useRef } from 'react'

function TodoForm(props) {
const inputRef = useRef(null)

const [input, setinput] = useState(props.edit ? props.edit.value : '');
useEffect(() => {
    inputRef.current.focus()
})
const handleChange = e => {
    setinput(e.target.value);
};
const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit({
        id: Math.floor(Math.random() * 10000),
        text: input
    })
    setinput('')
};
  return (
<form className='todo-form' onSubmit={handleSubmit}>
      {
      props.edit ? ( 
      <>
      <input 
      type='text'
      placeholder='Update activity'
      value={input}
      className='todo-input'
      onChange={handleChange}
      ref={inputRef}
       />
<button className='todo-button'>Update</button>
      </>
    ) : (
      <>
      <input 
        type='text'
        placeholder='Add a todo'
        value={input}
        className='todo-input'
        onChange={handleChange}
        ref={inputRef}
        />
        <button className='todo-button'>Add todo</button>
        </>
)
}
</form>
  )
}

export default TodoForm