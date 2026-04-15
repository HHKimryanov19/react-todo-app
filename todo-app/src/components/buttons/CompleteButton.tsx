import type { todo } from '../../types/todo'
import { ButtonContext } from '../../contexts/ButtonContext'
import { useContext } from 'react'

type prop = {
    item: todo
}

export default function CompleteButton({ item }: prop) {
    const context = useContext(ButtonContext)
    if (context != null) {
        function sortCompleted(newList: todo[]) {
            if (context != null) {
                let sortType: number = context.sortType;

                context.setCompleted([...newList].sort((a, b) => {
                    return a.date > b.date ? 1 * sortType : a.date < b.date ? -1 * sortType : 0;
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
                        let dateTime = new Date().toISOString().split('T');
                        task.date = dateTime[0] + ' ' + dateTime[1].split('.')[0];
                        sortCompleted([...context.completed, task]);
                    }
                });
            })
        }

        return (<>
            <button onClick={() => changeStatus(item.id)} className="complete-btn">Complete</button>
        </>)
    }
}