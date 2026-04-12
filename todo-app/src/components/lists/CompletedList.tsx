import type {todo} from '../../types/todos'
import type {taskStates} from '../../types/taskStates'
import UndoButton from '../buttons/UndoButton'

type props = {
  person: number
  states: taskStates
  page: number
  setPage: (prop: React.SetStateAction<number>) => void
  sort: (prop: todo[]) => void
}

export default function CompletedList({person, states, page, setPage, sort}:props)
{
    let pending = states.pending;
    let completed = states.completed;
    let setPending = states.setPending
    let setCompleted = states.setCompleted

    return (
    <div id='completed-tasks'>
        <p>Completed: </p>
        <div id="pagination-btn">
          {page > 0 ? <button onClick={() => setPage(page - 1)}>Previous</button> : null}
          {(page+1)*6 < (person == -1 ?completed.length:completed.filter((data) => data.userId == person).length) ? 
          <button onClick={() => setPage(page + 1)}>Next</button> : null}
        </div>
        <ul>
          {
            completed.filter((data) => data.userId == person || person == -1).slice(6*page,6*page+6).map((data) => (
              <li id="completed-task-data" key={data.id}>
                <div id="completed-task">
                  <p>{data.title}</p>
                  <UndoButton item={data} states = {{pending, completed, setPending, setCompleted}} sort={sort}></UndoButton>
                </div>
                <p className="completed-date">Completed on: {data.date}</p>
              </li>
            ))
          }
        </ul>
    </div>
    )
}