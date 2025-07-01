// server.js (Backend)
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Enhanced CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Handle preflight requests
app.options('*', cors(corsOptions));

// In-memory store for todos
let todos = [
  { id: 1, task: "Buy groceries", description: "Purchase essential food items, including vegetables, fruits, dairy products, and snacks.", completed: false },
  { id: 2, task: "Do laundry", description: "Wash clothes and other household laundry. Don't forget to fold and organize after drying.", completed: false },
  { id: 3, task: "Read a book", description: "Set aside time to read your favorite book or a new one to expand your knowledge and relax.", completed: false },
  { id: 4, task: "Go for a walk", description: "Take a walk around the neighborhood or at a local park to get some fresh air and clear your mind.", completed: false },
  { id: 5, task: "Write some code", description: "Work on a coding project, whether it's a personal project or professional work. Challenge yourself to learn something new.", completed: false }
];

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const { task, description } = req.body;

  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }

  const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  
  const newTodo = {
    id: newId,
    task,
    description: description || 'No description provided',
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const { task, description, completed } = req.body;
  
  if (task) todos[todoIndex].task = task;
  if (description) todos[todoIndex].description = description;
  if (completed !== undefined) todos[todoIndex].completed = completed;

  res.json(todos[todoIndex]);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  
  todos = todos.filter(t => t.id !== id);
  
  if (todos.length === initialLength) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`CORS configured for: ${corsOptions.origin}`);
});
