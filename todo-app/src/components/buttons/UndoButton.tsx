import type {todo} from '../../types/todos'
import type {taskStates} from '../../types/taskStates'

type props = {
  item: todo
  sort: (prop: todo[]) => void
  states: taskStates
}

export default function UndoButton({item, states, sort}:props)
{
    let pending = states.pending
    let setCompleted = states.setCompleted

    function changeStatus(id: number): void {
        setCompleted(completed => {
            return completed.filter(task => {
                if(task.id !== id)
                {
                    return task;
                }
                else
                {
                    task.completed = false;
                    task.date = '';
                    sort([...pending, task]);
                }
            });
        })
    }

    return (<>
        <button onClick={() => changeStatus(item.id)} className = "undo-btn">Undo</button>
    </>)
}