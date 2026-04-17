import type { Todo } from '../../types/todo'

type Props = {
    list: Todo[],
    page: number,
    setPage: (prop: React.SetStateAction<number>) => void,
    person: number
}

export default function PaginationButtons({ list, page, setPage, person, }: Props) {

    return (<div className="pagination-btn">
        {page > 0 ? <button onClick={() => setPage(page - 1)}>Previous</button> :
            <button className="inactive-btn">Previous</button>}
        {(page + 1) * 6 < list.filter((data) => data.userId == person || person == -1).length ?
            <button onClick={() => setPage(page + 1)}>Next</button> :
            <button className="inactive-btn">Next</button>}
    </div>)
}