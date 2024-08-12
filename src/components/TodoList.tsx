import React, { useState } from "react";

// todo - id (number), task (string), completed (boolean)
type Todo = {
  id: number;
  task: string;
  completed: boolean;
  dueDate?: string; // ? indicates this is an optional property
};

// React.FC - React.FunctionComponent, the default type of our functional component
const TodoList: React.FC = () => {
  // typescript can infer the type of our state by utilizing its default value
  // in this case, because we set task to be an empty string '' by default, typescript will infer that our task state is a string
  // we can also type state ourselves with <(whatever type)>, in this case<string>
  const [task, setTask] = useState<string>("");
  // our todos state will be an array of Todo objects
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const newTodo: Todo = {
        id: Date.now(),
        task: task,
        completed: false
    }
    // creating a new todos array
    // consisting of everything currently in our todos array (...todos)
    // plus, the new todo we just created (newTodo)
    // we have to modify our array state like this in React, because our arrays are treated as immutable, meaning we cannot directly modify our arrays in state but we CAN overwrite them with new arrays (that's just how it works, unfortunately :/)
    //todos.push(newTodo) BAD!!!
    setTodos([...todos, newTodo])

  };

  const toggleCheckmark = (id: number) => {

    const prevTodos: Todo[] = [...todos];
    const selectedTodo: Todo | undefined = prevTodos.find((todo) => todo.id === id);

    if(selectedTodo){ //selectedTodo has been found
        selectedTodo.completed = !selectedTodo.completed
        setTodos(prevTodos);
    }
    

    /*
    use ! to flip the value of your booleans
    this way, you can prevent having to set something to only true or only false
    let isHotOutside = true;
    isHotOutside = !isHotOutside; // now it's equal to false

    isHotOutside = !isHotOutside; //flips it back to true if you run it again
    */

  }

  return (
    <>
      <h2>Your Todo List:</h2>
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.task}
            </span>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleCheckmark(todo.id)}/>
          </li>
        ))}
      </ul>
      <h4>Add your todo: </h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default TodoList;
