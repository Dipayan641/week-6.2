import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  
  const API_URL = 'http://localhost:3000/todos';

  // Fetch todos from the backend
  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the todos!", error);
      });
  }, []);

  // Add a new todo
  const addTodo = () => {
    if (!task.trim()) {
      alert('Task cannot be empty!');
      return;
    }

    axios.post(API_URL, {
      task: task,
      description: description
    })
      .then(response => {
        setTodos([...todos, response.data]);
        setTask('');
        setDescription('');
      })
      .catch(error => {
        console.error("There was an error adding the todo!", error);
      });
  };

  return (
    <div className="App">
      <h1>Todo List</h1>

      {/* Input for adding new todos */}
      <div className="add-todo-form">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Task"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      {/* Display list of todos */}
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <div className="todo-header">
              <strong className="task">{todo.task}</strong>
              <span className="status">
                {todo.completed ? 'Completed' : 'Not Completed'}
              </span>
            </div>
            <p className="description">{todo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
