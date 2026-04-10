import './App.css'
import { use, useEffect, useState } from 'react';
import type { todo } from './todos';

function App() {
  const [todos, setTodos] = useState<todo[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => setTodos(data))
  },[]);

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
          <option value="option1">Titles(asc)</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      </div>
      <div id='pending-tasks'>
        <p>Pending:</p>
        <ul>
          {
            todos?.map((data) => (
              <li>
                <p>{data.title}</p>
                <button className='complete-btn'>Complete</button>
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
            todos?.map((data) => (
              <li id="completed-task-data">
                <div id="completed-task">
                  <p>{data.title}</p>
                  <button className = 'undo-btn'>Undo</button>
                </div>
                <p className="completed-date">Completed on: 2023-10-01</p>
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
