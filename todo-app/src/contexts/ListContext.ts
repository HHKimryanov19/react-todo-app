import { createContext } from "react";
import type { todo } from '../types/todo';
import type { user } from '../types/user'

type ListContext = {
    pending: todo[],
    completed: todo[],
    setPending: (prop: React.SetStateAction<todo[]>) => void,
    setCompleted: (prop: React.SetStateAction<todo[]>) => void,
    person: number,
    setPerson: (prop: React.SetStateAction<number>) => void,
    pendingSortType: number,
    completedSortType: number,
    setPendingSortType: (prop: React.SetStateAction<number>) => void,
    setCompletedSortType: (prop: React.SetStateAction<number>) => void,
    users: user[]
}

export const ListContext = createContext<ListContext | null>(null)