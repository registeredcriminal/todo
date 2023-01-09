import { useState } from 'react';

import './Tasks.css';
import Todo from './Todo';
import TodoForm from './TodoForm';

import initialTasks from './InitialTasks';

function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);

  function addTodo(task) {
    setTasks((tasks) => [
      {
        id: tasks.length + 1,
        title: task,
        completed: false,  
      }, ...tasks
    ]) 
  }

  function deleteTodo(taskId) {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId))
  }

  function setTodoCompleted(todo) {
    setTasks((tasks) => {
      return tasks.map((task) => {
        if (task.id === todo.id)
          return { ...task, ...{ completed: !todo.completed }};

        return task;
      })
    })
  }

  return (
    <>
    <div data-tasks className="Tasks">
      <h1>Tasks</h1>
      <table>
        <thead>
          <tr>
            <th>Todo ID</th>
            <th>Title</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
        {tasks.map((todo) => {
          return <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} setTodoCompleted={setTodoCompleted} />
        })}
        </tbody>
      </table>
    </div>

    <div>
      <TodoForm addTodo={addTodo} />
    </div>
    </>
  );
}

export default Tasks;