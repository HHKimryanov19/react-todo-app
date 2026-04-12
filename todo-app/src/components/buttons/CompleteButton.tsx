import type {todo} from '../../types/todos'
import type {taskStates} from '../../types/taskStates'

type props = {
  item: todo
  states: taskStates
  sort: (prop: todo[]) => void
}

export default function CompleteButton({item, states, sort}:props)
{
    let completed = states.completed
    let setPending = states.setPending

    function changeStatus(id: number): void {
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
                    sort([...completed, task]);
                }
            });
        })
    }

    return (<>
        <button onClick={() => changeStatus(item.id)} className = "complete-btn">Complete</button>
    </>)
}