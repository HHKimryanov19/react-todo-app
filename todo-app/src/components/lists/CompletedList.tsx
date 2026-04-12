import UndoButton from '../buttons/UndoButton'
import { ListContext } from '../../contexts/listContext'
import { ButtonContext } from '../../contexts/ButtonContext'
import { useContext } from 'react'


export default function CompletedList()
{
    const context = useContext(ListContext)

    if(context != null)
    {
    return (
    <div id='completed-tasks'>
        <p>Completed: </p>
        <div id="pagination-btn">
          {context.page > 0 ? <button onClick={() => context.setPage(context.page - 1)}>Previous</button> : null}
          {(context.page+1)*6 < context.completed.filter((data) => data.userId == context.person || context.person == -1).length ? 
          <button onClick={() => context.setPage(context.page + 1)}>Next</button> : null}
        </div>
        <ul>
          {
            context.completed.filter((data) => data.userId == context.person || context.person == -1).slice(6*context.page,6*context.page+6).map((data) => (
              <li id="completed-task-data" key={data.id}>
                <div id="completed-task">
                  <p>{data.title}</p>
                  <ButtonContext.Provider value={{pending: context.pending, completed: context.completed, 
                    setPending: context.setPending, setCompleted: context.setCompleted, sort: context.sort}}>
                      <UndoButton item={data}></UndoButton>
                  </ButtonContext.Provider>
                  
                </div>
                <p className="completed-date">Completed on: {data.date}</p>
              </li>
            ))
          }
        </ul>
    </div>
    )
    }
}