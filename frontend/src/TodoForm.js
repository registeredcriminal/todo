import { useRef } from "react";
import './Todo.css';

function TodoForm(props) {
  const { addTodo } = props;
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    addTodo(inputRef.current.value);
    inputRef.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add a new task</h1>

      <input
        type="text"
        class="textbox button1"
        ref={inputRef}
        placeholder="Add something new?"
      />

      <button class="button button1" type="submit"><span>Add</span></button>
    </form>
  );
}

export default TodoForm;
