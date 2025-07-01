import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse incoming JSON bodies

// In-memory todos (resets when the server restarts)
let todos = [
  { id: 1, task: "Buy groceries", description: "Purchase essential food items.", completed: false },
  { id: 2, task: "Do laundry", description: "Wash clothes and fold them.", completed: false },
  { id: 3, task: "Read a book", description: "Relax with your favorite book.", completed: false },
];

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos); // Return the todos array
});

// Add a new todo
app.post('/todos', (req, res) => {
  const { task, description } = req.body;

  if (!task || !description) {
    return res.status(400).json({ error: 'Task and description are required.' });
  }

  const newTodo = {
    id: todos.length + 1,
    task,
    description,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo); // Return the created todo
});

// Update a todo's completion status
app.put('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find(t => t.id === todoId);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found.' });
  }

  todo.completed = req.body.completed;
  res.json(todo); // Return the updated todo
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== todoId);
  res.status(204).end(); // Respond with no content
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
