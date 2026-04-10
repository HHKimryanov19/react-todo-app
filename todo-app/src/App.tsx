import './App.css'
import { use, useEffect, useState } from 'react';
import type { todo } from './todos';
import { methods } from './methods';

function App() {
  const [todos, setTodos] = useState<todo[]>([]);
  const [pending, setPending] = useState<todo[]>([]);
  const [completed, setCompleted] = useState<todo[]>([]);

  useEffect(() => {
    methods.getAll(setTodos);
    setPending(todos.filter((todo) => !todo.completed));
    setCompleted(todos.filter((todo) => todo.completed));
    setTodos(todos);
  },[]);

  function changeStatus(id: number, status: boolean): void {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        if(status) {
          return { ...todo, completed: status, date: new Date().toISOString().split('T')[0] };
        }
        return { ...todo, completed: status, date: undefined };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <>
    <section>
      <div id='pending-selections'>
        <div>
        <label htmlFor="people">Filter by:</label>
        <select id='people'>
          <option value="option1">Names</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      <div>
        <label htmlFor="pending-tasks-sort">Sort:</label>
        <select id="pending-tasks-sort">
          <option value="titleA">Titles(asc)</option>
          <option value="titleD">Titles(desc)</option>
          <option value="option3"></option>
        </select>
      </div>
      </div>
      <div id='pending-tasks'>
        <p>Pending:</p>
        <ul>
          {
            todos?.filter((todo) => !todo.completed).map((data) => (
              <li key={data.id}>
                <p>{data.title}</p>
                <button onClick={() => changeStatus(data.id, true)} className='complete-btn'>Complete</button>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
    <section>
      <div id='completed-selection'>
        <label htmlFor="completed-tasks-sort">Sort:</label>
        <select id="completed-tasks-sort">
          <option value="option1">Date(asc)</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      <div id='completed-tasks'>
        <p>Completed: </p>
        <ul>
          {
            todos?.filter((todo) => todo.completed).map((data) => (
              <li id="completed-task-data" key={data.id}>
                <div id="completed-task">
                  <p>{data.title}</p>
                  <button onClick={() => changeStatus(data.id, false)} className = 'undo-btn'>Undo</button>
                </div>
                <p className="completed-date">Completed on: {data.date}</p>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
    </>
  )
}


export default App
