import { createContext } from "react";
import type { Todo } from '../types/todo';
import type { User } from '../types/user'

type SectionContextType = {
    pending: Todo[],
    completed: Todo[],
    setPending: (prop: React.SetStateAction<Todo[]>) => void,
    setCompleted: (prop: React.SetStateAction<Todo[]>) => void,
    person: number,
    setPerson: (prop: React.SetStateAction<number>) => void,
    pendingSortType: number,
    completedSortType: number,
    setPendingSortType: (prop: React.SetStateAction<number>) => void,
    setCompletedSortType: (prop: React.SetStateAction<number>) => void,
    users: User[]
}

export const SectionContext = createContext<SectionContextType | null>(null)