import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');

  // API base URL
  const API_URL = 'http://localhost:3001/todos';

  // Fetch todos from the backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      alert('Failed to load todos. Check console for details.');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add a new todo
  const addTodo = async () => {
    if (!task.trim()) {
      alert('Task cannot be empty!');
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        task: task,
        description: description || 'No description provided',
      });
      
      setTodos([...todos, response.data]);
      setTask('');
      setDescription('');
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('Failed to add todo. Check console for details.');
    }
  };

  // Toggle todo completion status
  const toggleComplete = async (id) => {
    try {
      const todo = todos.find(t => t.id === id);
      const response = await axios.put(`${API_URL}/${id}`, {
        completed: !todo.completed
      });
      
      setTodos(todos.map(t => t.id === id ? response.data : t));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
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
          <li 
            key={todo.id} 
            className={todo.completed ? 'completed' : ''}
          >
            <div className="todo-header">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              <strong className="task">{todo.task}</strong>
              <button 
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
            <p className="description">{todo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
