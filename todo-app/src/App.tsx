import './App.css'

function App() {
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
      <div>
        <p>Pending:</p>
        <ul>
          <li>
            <p>Task</p>
            <button className='complete-btn'>Complete</button>
          </li>
          <li>
            <p>Task</p>
            <button className='complete-btn'>Complete</button>
          </li>
          <li>
            <p>Task</p>
            <button className='complete-btn'>Complete</button>
          </li>
        </ul>
      </div>
    </section>
    <section>
      <div>
        <label htmlFor="completed-tasks-sort">Sort:</label>
        <select id="completed-tasks-sort">
          <option value="option1">Date(asc)</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      <div>
        <p>Completed: </p>
        <ul>
          <li id="completed-task-data">
            <div id="completed-task">
              <p>Completed task 1</p>
              <button className = 'undo-btn'>Undo</button>
            </div>
            <p className="completed-date">Completed on: 2023-10-01</p>
          </li>
          <li id="completed-task-data">
            <div id="completed-task">
              <p>Completed task 2</p>
              <button className = 'undo-btn'>Undo</button>
            </div>
            <p className="completed-date">Completed on: 2023-10-01</p>
          </li>
          <li id="completed-task-data">
            <div id="completed-task">
              <p>Completed task 3</p>
              <button className = 'undo-btn'>Undo</button>
            </div>
            <p className="completed-date">Completed on: 2023-10-01</p>
          </li>
        </ul>
      </div>
    </section>
    </>
  )
}


export default App
