import type {todo} from '../../types/todos'
import type {taskStates} from '../../types/taskStates'
import CompleteButton from '../buttons/CompleteButton'

type props = {
  person: number
  states: taskStates
  page: number
  setPage: (prop: React.SetStateAction<number>) => void
  sort: (prop: todo[]) => void
}

export default function PendingList({person, states, page, setPage, sort}:props)
{
    let pending = states.pending;
    let completed = states.completed;
    let setPending = states.setPending
    let setCompleted = states.setCompleted

    return (
    <div id='pending-tasks'>
        <p>Pending:</p>
        <div id="pagination-btn">
                  {page > 0 ? <button onClick={() => setPage(page - 1)}>Previous</button> : null}
                  {(page+1)*6 < (person == -1 ? pending.length:pending.filter((data) => data.userId == person).length) ? 
                  <button onClick={() => setPage(page + 1)}>Next</button> : null}
        </div>
        <ul>
            {
                pending.filter((data) => data.userId == person || person==-1).slice(6*page,6*page+6).map((data) => (
                    <li key={data.id}>
                        <p>{data.title}</p>
                        <CompleteButton item={data} sort={sort} states = {{pending, completed, setPending, setCompleted}}></CompleteButton>
                    </li>
                ))
            }
        </ul>
    </div>
    )
}