import { createContext } from "react";
import type {todo} from '../types/todo'

type buttonContext = {
    pending: todo[],
    completed: todo[],
    setPending: (prop: React.SetStateAction<todo[]>) => void,
    setCompleted: (prop: React.SetStateAction<todo[]>) => void,
    sort: (prop: todo[]) => void
}

export const ButtonContext = createContext<buttonContext | null>(null)