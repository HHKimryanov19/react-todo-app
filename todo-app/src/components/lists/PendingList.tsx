import CompleteButton from '../buttons/CompleteButton'
import { ListContext } from '../../contexts/ListContext'
import { ButtonContext } from '../../contexts/ButtonContext'
import { useContext, useEffect, useState } from 'react'

export default function PendingList() {
    const [page, setPage] = useState<number>(0);
    const context = useContext(ListContext)
    if (context != null) {

        useEffect(() => {
            setPage(0);
        },[context.person])

        useEffect(() => {
            let sort = context.pendingSortType;

            context?.setPending([...context.pending].sort((a, b) => {
                return a.title > b.title ? 1 * sort : a.title < b.title ? -1 * sort : 0;
            }))
        }, [context.pendingSortType])

        if (context != null) {
            return (
                <>
                    <div id='pending-selections'>
                        <div>
                            <label htmlFor="people">Filter by:</label>
                            <select id='people' onChange={e => context.setPerson(parseInt(e.target.value))}>
                                <option value={-1}>All users</option>
                                {
                                    context.users.map((item) => (
                                        <option value={item.id}>{item.username}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="pending-tasks-sort">Sort:</label>
                            <select id="pending-tasks-sort" onChange={e => context.setPendingSortType(parseInt(e.target.value))}>
                                <option value='1'>Titles(asc)</option>
                                <option value="-1">Titles(desc)</option>
                            </select>
                        </div>
                    </div>
                    <div id='pending-tasks'>
                        <p>Pending:</p>
                        <div className="pagination-btn">
                            {page > 0 ? <button onClick={() => setPage(page - 1)}>Previous</button> : 
                            <button className="unactive-btn">Previous</button>}
                            {(page + 1) * 6 < context.pending.filter((data) => data.userId == context.person || context.person == -1).length ?
                                <button onClick={() => setPage(page + 1)}>Next</button> : 
                                <button className="unactive-btn">Next</button>}
                        </div>
                        <ul>
                            {
                                context.pending.filter((data) => data.userId == context.person || context.person == -1).slice(6 * page, 6 * page + 6).map((data) => (
                                    <li key={data.id}>
                                        <p>{data.title}</p>
                                        <ButtonContext.Provider value={{
                                            pending: context.pending, completed: context.completed,
                                            setPending: context.setPending, setCompleted: context.setCompleted,
                                            sortType: context.completedSortType
                                        }}>
                                            <CompleteButton item={data}></CompleteButton>
                                        </ButtonContext.Provider>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </>
            )
        }
    }
}