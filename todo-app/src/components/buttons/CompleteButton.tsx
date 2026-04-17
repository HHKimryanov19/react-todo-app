import type { Todo } from '../../types/todo'
import { ButtonContext } from '../../contexts/ButtonContext'
import { useContext } from 'react'

type Props = {
    item: Todo
}
export default function CompleteButton({ item }: Props) {
    const context = useContext(ButtonContext)
    if (context != null) {
        function sort(newList: Todo[]) {
            if (context != null) {
                context.setCompleted([...newList].sort((a, b) => {
                    return a.date > b.date ? 1 * context.sortType : a.date < b.date ? -1 * context.sortType : 0;
                }))
            }
        }

        function changeStatus(id: number): void {
            context?.setPending(pending => {
                return pending.filter(task => {
                    if (task.id !== id) {
                        return task;
                    }
                    else {
                        task.completed = true;
                        const dateTime = new Date().toISOString().split('T');
                        task.date = dateTime[0] + ' ' + dateTime[1].split('.')[0];
                        sort([...context.completed, task]);
                    }
                });
            })
        }

        return (<>
            <button onClick={() => changeStatus(item.id)} className="complete-btn">Complete</button>
        </>)
    }
}