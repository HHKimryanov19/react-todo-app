import UndoButton from '../buttons/UndoButton'
import { ListContext } from '../../contexts/ListContext'
import { ButtonContext } from '../../contexts/ButtonContext'
import { useContext, useEffect, useState } from 'react'


export default function CompletedList() {
  const [page, setPage] = useState<number>(0);
  const context = useContext(ListContext)

  if (context != null) {
    useEffect(() => {
      setPage(0);
    }, [context.person])

    useEffect(() => {
      let sort = context.completedSortType;

      context?.setCompleted([...context.completed].sort((a, b) => {
        return a.date > b.date ? 1 * sort : a.date < b.date ? -1 * sort : 0;
      }))
    }, [context.completedSortType])

    return (
      <>
        <div id='completed-selection'>
          <label htmlFor="completed-tasks-sort">Sort:</label>
          <select id="completed-tasks-sort" onChange={e => context.setCompletedSortType(parseInt(e.target.value))}>
            <option value="1">Date(asc)</option>
            <option value="-1">Date(desc)</option>
          </select>
        </div>
        <div id='completed-tasks'>
          <p>Completed: </p>
          <div className="pagination-btn">
            {page > 0 ? <button onClick={() => setPage(page - 1)}>Previous</button> : 
            <button className="unactive-btn">Previous</button>}
            {(page + 1) * 6 < context.completed.filter((data) => data.userId == context.person || context.person == -1).length ?
              <button onClick={() => setPage(page + 1)}>Next</button> : 
              <button className="unactive-btn">Next</button>}
          </div>
          <ul>
            {
              context.completed.filter((data) => data.userId == context.person || context.person == -1).slice(6 * page, 6 * page + 6).map((data) => (
                <li id="completed-task-data" key={data.id}>
                  <div id="completed-task">
                    <p>{data.title}</p>
                    <ButtonContext.Provider value={{
                      pending: context.pending, completed: context.completed,
                      setPending: context.setPending, setCompleted: context.setCompleted, sortType: context.pendingSortType
                    }}>
                      <UndoButton item={data}></UndoButton>
                    </ButtonContext.Provider>

                  </div>
                  <p className="completed-date">Completed on: {data.date}</p>
                </li>
              ))
            }
          </ul>
        </div>
      </>
    )
  }
}