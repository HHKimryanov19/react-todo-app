import { createContext } from "react";
import type {Todo} from '../types/todo'

type ButtonContextType = {
    pending: Todo[],
    completed: Todo[],
    setPending: (prop: React.SetStateAction<Todo[]>) => void,
    setCompleted: (prop: React.SetStateAction<Todo[]>) => void,
    sortType: number,
}

export const ButtonContext = createContext<ButtonContextType | null>(null)