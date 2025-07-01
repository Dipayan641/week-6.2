import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // State for selected ID
  const [selectID, setSelectID] = useState(1);

  return (
    <div>
      <button onClick={() => setSelectID(1)}>1</button>
      <button onClick={() => setSelectID(2)}>2</button>
      <button onClick={() => setSelectID(3)}>3</button>
      <button onClick={() => setSelectID(4)}>4</button>

      {/* Passing the selected ID as a prop */}
      <Todo id={selectID} />
    </div>
  );
}

function Todo({ id }) {
  const [todo, setTodo] = useState(null);  // Initialize state to null

  useEffect(() => {
    setTimeout(()=>{
      axios.get(`http://localhost:4000/todos/${id}`)  // Use URL parameters correctly
      .then(response => {
        setTodo(response.data);  // The response contains the data directly
      })
      .catch(error => {
        console.error("Error fetching todo:", error);
      });
  }
    ,5000)
, [id]});  // Re-fetch whenever the selected ID changes

  // If todo is still loading, display a loading state
  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Id: {id}</h2>
      <h1>{todo.task}</h1>  {/* Assuming task is the title */}
      <h4>{todo.description}</h4>
    </div>
  );
}

export default App;
