import UndoButton from '../buttons/UndoButton'
import { SectionContext } from '../../contexts/SectionContext'
import { ButtonContext } from '../../contexts/ButtonContext'
import { useContext, useEffect, useState } from 'react'
import PaginationButtons from '../buttons/PaginationButtons'

export default function CompletedSection() {
  const [page, setPage] = useState<number>(0);
  const context = useContext(SectionContext)

  if (context != null) {
    useEffect(() => {
      setPage(0);
    }, [context.person])

    useEffect(() => {
      context?.setCompleted([...context.completed].sort((a, b) => {
        return a.date > b.date ? 1 * context.completedSortType : a.date < b.date ? -1 * context.completedSortType : 0;
      }))
    }, [context.completedSortType])

    return (
      <section>
        <div id='completed-selection'>
          <label htmlFor="completed-tasks-sort">Sort:</label>
          <select id="completed-tasks-sort" onChange={e => context.setCompletedSortType(parseInt(e.target.value))}>
            <option value="1">Date(asc)</option>
            <option value="-1">Date(desc)</option>
          </select>
        </div>
        <div id='completed-tasks'>
          <p>Completed: </p>
          <PaginationButtons page={page} list={context.completed} person={context.person} setPage={setPage}></PaginationButtons>
          <ul>
            {
              context.completed
                .filter((data) => data.userId == context.person || context.person == -1)
                .slice(6 * page, 6 * page + 6).map((data) => (
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
      </section>
    )
  }
}