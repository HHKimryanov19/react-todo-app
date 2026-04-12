import CompleteButton from '../buttons/CompleteButton'
import { ListContext } from '../../contexts/listContext'
import { ButtonContext } from '../../contexts/ButtonContext'
import { useContext } from 'react'

export default function PendingList()
{
    const context = useContext(ListContext)

    if(context != null)
    {
    return (
    <div id='pending-tasks'>
        <p>Pending:</p>
        <div id="pagination-btn">
                  {context.page > 0 ? <button onClick={() => context.setPage(context.page - 1)}>Previous</button> : null}
                  {(context.page + 1)*6 < context.pending.filter((data) => data.userId == context.person || context.person == -1).length ? 
                  <button onClick={() => context.setPage(context.page + 1)}>Next</button> : null}
        </div>
        <ul>
            {
                context.pending.filter((data) => data.userId == context.person || context.person == -1).slice(6*context.page,6*context.page+6).map((data) => (
                    <li key={data.id}>
                        <p>{data.title}</p>
                        <ButtonContext.Provider value={{pending: context.pending, completed: context.completed, 
                            setPending: context.setPending, setCompleted: context.setCompleted, sort: context.sort}}>
                            <CompleteButton item={data}></CompleteButton>
                        </ButtonContext.Provider>
                    </li>
                ))
            }
        </ul>
    </div>
    )
    }
}