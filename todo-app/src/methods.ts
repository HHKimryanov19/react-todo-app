import type { todo } from './todos';

type dataMethods = {
    todos: todo[];
    getAll: () => todo[];
    getPagination: (func: any, page: number) => void;
    getById: (func: any, id: number) => void;
    sortByDate: (func: any, type: boolean) => void;
}

export const methods: dataMethods = {
    todos: [],
    getAll: function (): todo[] {
        let temp: todo[] = [];
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            data.map((element: todo) => {
                if(element.completed) {
                    return { ...element, date: new Date(2026, 2, 18).toISOString().split('T')[0] };
                }
                return element;
            });
        });
        return temp;
    },
    getPagination: function (func: any, page: number): void {
        
    },
    getById: function (func: any, id: number): void {
        throw new Error('Function not implemented.');
    },
    sortByDate: function (func: any, type: boolean): void {
        throw new Error('Function not implemented.');
    }
}