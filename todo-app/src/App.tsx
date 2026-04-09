import './App.css'

function App() {
  return (
    <>
    <section>
      <select>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <select>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <div>
        <p>Pending</p>
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
      <select>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <div>
        <p>Pending</p>
        <ul>
          <li id="completed-task-data">
            <div id="completed-task">
              <p>Tasffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffk</p>
              <button className = 'undo-btn'>Undo</button>
            </div>
            <p>Completed on: 2023-10-01</p>
          </li>
          <li id="completed-task-data">
            <div id="completed-task">
              <p>fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffk</p>
              <button className = 'undo-btn'>Undo</button>
            </div>
            <p>Completed on: 2023-10-01</p>
          </li>
          <li id="completed-task-data">
            <div id="completed-task">
              <p>Tasffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffk</p>
              <button className = 'undo-btn'>Undo</button>
            </div>
            <p>Completed on: 2023-10-01</p>
          </li>
        </ul>
      </div>
    </section>
    </>
  )
}


export default App
