import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;  // Use environment variable for port

// Configure CORS properly
app.use(cors({
  origin: 'http://localhost:5173',  // Explicitly allow your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  credentials: true  // Enable if using cookies/authentication
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// In-memory todos with better structure
let todos = [
  { id: 1, task: "Buy groceries", description: "Purchase essential food items.", completed: false },
  { id: 2, task: "Do laundry", description: "Wash clothes and fold them.", completed: false },
];

// Routes
// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Create new todo
app.post('/todos', (req, res) => {
  const { task, description } = req.body;

  if (!task || !description) {
    return res.status(400).json({ error: 'Both task and description are required.' });
  }

  const newTodo = {
    id: Date.now(),  // Better ID generation
    task,
    description,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update todo
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const { task, description, completed } = req.body;
  
  // Update only provided fields
  if (task) todos[todoIndex].task = task;
  if (description) todos[todoIndex].description = description;
  if (completed !== undefined) todos[todoIndex].completed = completed;
  
  res.json(todos[todoIndex]);
});

// Delete todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  
  todos = todos.filter(todo => todo.id !== id);
  
  if (todos.length === initialLength) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  res.status(204).send();  // No content
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`CORS configured for: http://localhost:5173`);
});
