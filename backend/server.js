import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000; // Changed from 3001 to 3000

// Enhanced CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// In-memory store for todos
let todos = [
  { id: 1, task: "Buy groceries", description: "Purchase essential food items, including vegetables, fruits, dairy products, and snacks.", completed: false },
  { id: 2, task: "Do laundry", description: "Wash clothes and other household laundry. Don't forget to fold and organize after drying.", completed: false },
  { id: 3, task: "Read a book", description: "Set aside time to read your favorite book or a new one to expand your knowledge and relax.", completed: false },
  { id: 4, task: "Go for a walk", description: "Take a walk around the neighborhood or at a local park to get some fresh air and clear your mind.", completed: false },
  { id: 5, task: "Write some code", description: "Work on a coding project, whether it's a personal project or professional work. Challenge yourself to learn something new.", completed: false },
  { id: 6, task: "Cook dinner", description: "Prepare a healthy and delicious dinner for yourself or your family. Try a new recipe or a favorite dish.", completed: false },
  { id: 7, task: "Call a friend", description: "Catch up with an old friend or family member. A quick call can lift your spirits and strengthen connections.", completed: false },
  { id: 8, task: "Clean the house", description: "Tidy up the living spaces, vacuum, dust, and organize. This will make your environment more pleasant.", completed: false },
  { id: 9, task: "Finish project work", description: "Complete any pending tasks or assignments for work or school. Stay focused to meet deadlines.", completed: false },
  { id: 10, task: "Exercise", description: "Engage in physical activity, such as running, yoga, or a workout session, to stay fit and healthy.", completed: false }
];

// Route to get the list of todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Route to add a new todo
app.post('/todos', (req, res) => {
  const { task, description } = req.body;

  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }

  const newTodo = {
    id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
    task,
    description: description || 'No description provided',
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Route to update a todo's completion status
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  if (req.body.completed !== undefined) {
    todos[todoIndex].completed = req.body.completed;
  }

  if (req.body.task) {
    todos[todoIndex].task = req.body.task;
  }

  if (req.body.description) {
    todos[todoIndex].description = req.body.description;
  }

  res.json(todos[todoIndex]);
});

// Get a specific todo by ID
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  res.json(todo);
});

// Route to delete a todo
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
  console.log(`Server is running on http://localhost:${port}`);
});
