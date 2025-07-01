import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos from the backend
  useEffect(() => {
    axios.get('http://localhost:3001/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  // Add a new todo
  const addTodo = () => {
    if (!newTodo.trim()) {
      alert('Task cannot be empty!');
      return;
    }

    axios.post('http://localhost:3001/todos', {
      task: newTodo,
      description: 'No description provided',
    })
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodo('');
      })
      .catch(error => console.error('Error adding todo:', error));
  };

  return (
    <div>
      <h1>Todo List</h1>

      {/* Input for adding new todos */}
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>

      {/* Display list of todos */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <strong>{todo.task}</strong> - {todo.completed ? 'Completed' : 'Not Completed'}
            <p>{todo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
