import type { todo } from '../../types/todo'

type prop = {
    list: todo[],
    page: number,
    setPage: (prop: React.SetStateAction<number>) => void,
    person: number
}

export default function PaginationButtons({ list, page, setPage, person, }: prop) {

    return (<div className="pagination-btn">
        {page > 0 ? <button onClick={() => setPage(page - 1)}>Previous</button> :
            <button className="unactive-btn">Previous</button>}
        {(page + 1) * 6 < list.filter((data) => data.userId == person || person == -1).length ?
            <button onClick={() => setPage(page + 1)}>Next</button> :
            <button className="unactive-btn">Next</button>}
    </div>)
}