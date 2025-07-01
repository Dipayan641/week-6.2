// src/App.jsx (Frontend)
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Get API URL from environment variables (Railway will provide this)
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // Fetch todos from the backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${API_URL}/todos`);
        setTodos(response.data);
        setError('');
      } catch (err) {
        console.error("Error fetching todos:", err);
        setError('Failed to load todos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [API_URL]);

  // Add a new todo
  const addTodo = async () => {
    if (!task.trim()) {
      setError('Task cannot be empty!');
      return;
    }

    setError('');
    try {
      const response = await axios.post(`${API_URL}/todos`, {
        task: task,
        description: description || 'No description provided',
      });
      
      setTodos([...todos, response.data]);
      setTask('');
      setDescription('');
    } catch (err) {
      console.error("Error adding todo:", err);
      setError('Failed to add todo. Please check your connection and try again.');
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      
      {error && <div className="error">{error}</div>}
      
      <div className="add-todo-form">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Task *"
          aria-label="Task"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          aria-label="Description"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      {loading ? (
        <div className="loading">Loading todos...</div>
      ) : todos.length === 0 ? (
        <div className="empty">No todos found. Add your first todo!</div>
      ) : (
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <div className="todo-header">
                <strong>{todo.task}</strong>
                <span>{todo.completed ? 'Completed' : 'Not Completed'}</span>
              </div>
              <p>{todo.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
