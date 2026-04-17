import type { Todo } from '../../types/todo'
import { ButtonContext } from '../../contexts/ButtonContext'
import { useContext } from 'react'


type Props = {
    item: Todo
}

export default function UndoButton({ item }: Props) {
    const context = useContext(ButtonContext)

    if (context != null) {

        function sort(newList: Todo[]) {
            if (context != null) {
                console.log(context.sortType)
                context.setPending([...newList].sort((a, b) => {
                    return a.title > b.title ? 1 * context.sortType : a.title < b.title ? -1 * context.sortType : 0;
                }))
            }
        }

        function changeStatus(id: number): void {
            context?.setCompleted(completed => {
                return completed.filter(task => {
                    if (task.id !== id) {
                        return task;
                    }
                    else {
                        task.completed = false;
                        task.date = '';
                        sort([...context.pending, task]);
                    }
                });
            })
        }

        return (<>
            <button onClick={() => changeStatus(item.id)} className="undo-btn">Undo</button>
        </>)
    }
}