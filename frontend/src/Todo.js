import './Todo.css';

function translateCompleted(complete) {
  if (complete)
    return "Yes";

  return "No";
}

function Todo(props) {
  const { todo } = props;
  const { deleteTodo, setTodoCompleted } = props;

  return (
    <tr>
      <td>{todo.id}</td>
      <td>{todo.title}</td>
      <td><a href="#todo" onClick={(e) => { setTodoCompleted(todo) }}>{translateCompleted(todo.completed)}</a></td>
      <td><button class="button button1" onClick={() => deleteTodo(todo.id)}><span>Delete</span></button></td>
    </tr>
  );
}

export default Todo;