import './App.css'
import {useEffect, useState } from 'react';
import type { todo } from './todos';

function App() {
  const [pending, setPending] = useState<todo[]>([]);
  const [completed, setCompleted] = useState<todo[]>([]);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            data = data.map((element: todo) => {
                if(element.completed) {
                    return { ...element, date: new Date(2026, 2, 18).toISOString().split('T')[0] };
                }
                return element;
            });
            setPending(data.filter((element: todo) => !element.completed))
            setCompleted(data.filter((element: todo) => element.completed))
        });
  },[]);

  function changeStatus(id: number, status: boolean): void {
    if(status)
    {
      setPending(pending => {
        return pending.filter(task => {
          if(task.id !== id)
          {
            return task;
          }
          else
          {
            task.completed = true;
            task.date = new Date().toISOString().split('T')[0];
            setCompleted([...completed, task]);
          }
        });
      })
    }
    else
    {
      setCompleted(completed => {
        return completed.filter(task => {
          if(task.id !== id)
          {
            return task;
          }
          else
          {
            task.completed = false;
            task.date = undefined;
            setPending([...pending, task]);
          }
        });
      })
    }
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
        <div id="pagination-btn">
          {page > 0 ? <button onClick={() => setPage(page - 1)}>Previous Page</button> : null}
          {(page+1)*10 < pending.length ? <button onClick={() => setPage(page + 1)}>Next Page</button> : null}
        </div>
        <ul>
          {
            pending.slice(10*page,10*page+10).map((data) => (
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
        <div id="pagination-btn">
          {page > 0 ? <button onClick={() => setPage(page - 1)}>Previous Page</button> : null}
          {(page+1)*10 < completed.length ? <button onClick={() => setPage(page + 1)}>Next Page</button> : null}
        </div>
        <ul>
          {
            completed.slice(10*page,10*page+10).map((data) => (
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
