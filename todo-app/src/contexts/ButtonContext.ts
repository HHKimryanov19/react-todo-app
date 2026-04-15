import { createContext } from "react";
import type {todo} from '../types/todo'

type buttonContext = {
    pending: todo[],
    completed: todo[],
    setPending: (prop: React.SetStateAction<todo[]>) => void,
    setCompleted: (prop: React.SetStateAction<todo[]>) => void,
    sortType: number,
}

export const ButtonContext = createContext<buttonContext | null>(null)