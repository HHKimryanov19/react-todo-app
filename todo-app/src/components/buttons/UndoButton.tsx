import type { todo } from '../../types/todo'
import { ButtonContext } from '../../contexts/ButtonContext'
import { useContext } from 'react'


type props = {
    item: todo
}

export default function UndoButton({ item }: props) {
    const context = useContext(ButtonContext)

    if (context != null) {

        function sortPending(newList: todo[]) {
            if (context != null) {
                let sortType: number = context.sortType;

                context.setPending([...newList].sort((a, b) => {
                    return a.title > b.title ? 1 * sortType : a.title < b.title ? -1 * sortType : 0;
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
                        sortPending([...context.pending, task]);
                    }
                });
            })
        }

        return (<>
            <button onClick={() => changeStatus(item.id)} className="undo-btn">Undo</button>
        </>)
    }
}