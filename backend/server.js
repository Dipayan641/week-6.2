import express from 'express';
import cors from 'cors';
const app = express();
const port = 3001;

// Middleware to handle CORS and parse incoming JSON bodies
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// In-memory store for todos (this will reset every time the server restarts)
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
  res.json(todos);  // Return the array of todos
});

// Route to add a new todo
app.post('/todos', (req, res) => {
  const { task, description } = req.body;

  // Validate input
  if (!task || !description) {
    return res.status(400).json({ error: 'Task and description are required' });
  }

  const newTodo = {
    id: todos.length + 1,
    task: task,
    description: description,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);  // Return the created todo
});

// Route to update a todo's completion status
app.put('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find(t => t.id === todoId);

  if (todo) {
    todo.completed = req.body.completed;
    res.json(todo);  // Return the updated todo
  } else {
    res.status(404).send('Todo not found');
  }
});
// Get a specific todo by ID
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).send('Todo not found');
  }
  res.json(todo);
});
// Route to delete a todo
app.delete('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== todoId);
  res.status(204).end();  // Respond with no content after deletion
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
