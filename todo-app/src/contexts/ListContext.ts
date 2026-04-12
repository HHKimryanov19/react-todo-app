import { createContext } from "react";
import type {todo} from '../types/todo'

type ListContext = {
    pending: todo[],
    completed: todo[],
    setPending: (prop: React.SetStateAction<todo[]>) => void,
    setCompleted: (prop: React.SetStateAction<todo[]>) => void,
    person: number,
    page: number,
    setPage: (prop: React.SetStateAction<number>) => void,
    sort: (prop: todo[]) => void
}

export const ListContext = createContext<ListContext | null>(null)