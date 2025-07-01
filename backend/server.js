import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

// Configure CORS to allow requests from your frontend's origin
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type'], // Allow specific headers
}));

// Middleware to parse incoming JSON bodies
app.use(express.json());

// In-memory todos (resets when the server restarts)
let todos = [
  { id: 1, task: "Buy groceries", description: "Purchase essential food items.", completed: false },
  { id: 2, task: "Do laundry", description: "Wash clothes and fold them.", completed: false },
];

// Routes
app.get('/todos', (req, res) => {
  res.json(todos);
});

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
  res.status(201).json(newTodo);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
