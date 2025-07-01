import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    // Get todos from the server
    axios.get("http://localhost:4000/todos")
      .then(function(response) {
        setTodos(response.data); // The response directly contains the todos array
      })
      .catch(function(error) {
        console.error("There was an error fetching the todos!", error);
      });
  }, []);

  const addTodo = () => {
    // Post new todo to the server
    axios.post('http://localhost:3001/todos', { task: newTodo, description: 'No description provided' })
      .then(response => {
        setTodos([...todos, response.data]); // Add the new todo to the state
        setNewTodo(''); // Clear the input field
      })
      .catch(error => {
        console.error("There was an error adding the todo!", error);
      });
  };

  return (
    <>
      <input 
        type="text" 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder="Add a new todo" 
      />
      <button onClick={addTodo}>Add Todo</button>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <strong>{todo.task}</strong> - {todo.completed ? 'Completed' : 'Not Completed'}
            <p>{todo.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

function Todo({ title, description }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export default App;

