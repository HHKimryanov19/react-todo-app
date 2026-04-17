import CompleteButton from '../buttons/CompleteButton'
import { SectionContext } from '../../contexts/SectionContext'
import { ButtonContext } from '../../contexts/ButtonContext'
import PaginationButtons from '../buttons/PaginationButtons'
import { useContext, useEffect, useState } from 'react'

export default function PendingSection() {
    const [page, setPage] = useState<number>(0);
    const context = useContext(SectionContext)
    if (context != null) {

        useEffect(() => {
            setPage(0);
        }, [context.person])

        useEffect(() => {
            context?.setPending([...context.pending].sort((a, b) => {
                return a.title > b.title ? 1 * context.pendingSortType : a.title < b.title ? -1 * context.pendingSortType : 0;
            }))
        }, [context.pendingSortType])

        if (context != null) {
            return (
                <section>
                    <div id='pending-selections'>
                        <div>
                            <label htmlFor="people">Filter by:</label>
                            <select id='people' onChange={e => context.setPerson(parseInt(e.target.value))}>
                                <option key={-1} value={-1}>All users</option>
                                {
                                    context.users.map((item) => (
                                        <option key={item.id} value={item.id}>{item.username}</option>
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
                        <PaginationButtons page={page} list={context.pending} person={context.person} setPage={setPage}></PaginationButtons>
                        <ul>
                            {
                                context.pending
                                    .filter((data) => data.userId == context.person || context.person == -1)
                                    .slice(6 * page, 6 * page + 6).map((data) => (
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
                </section>
            )
        }
    }
}