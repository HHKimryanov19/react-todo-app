import type {todo} from '../../types/todo'
import { ButtonContext } from '../../contexts/ButtonContext'
import { useContext } from 'react'

type prop = {
    item: todo
}

export default function CompleteButton({item}:prop)
{
    const context = useContext(ButtonContext)

    if(context!=null)
    {
    function changeStatus(id: number): void {
        context?.setPending(pending => {
            return pending.filter(task => {
                if(task.id !== id)
                {
                    return task;
                }
                else
                {
                    task.completed = true;
                    task.date = new Date().toISOString().split('T')[0];
                    context.sort([...context.completed, task]);
                }
            });
        })
    }

    return (<>
        <button onClick={() => changeStatus(item.id)} className = "complete-btn">Complete</button>
    </>)
    }
}