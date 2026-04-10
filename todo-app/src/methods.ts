import type { todo } from './todos';

type dataMethods = {
    getAll: (func: any) => void;
    getPagination: (func: any, page: number) => void;
    getById: (func: any, id: number) => void;
    sortByDate: (func: any, type: boolean) => void;
}

export const methods: dataMethods = {
    getAll: function (func: any): void {
        let data1: todo[] = [];
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            data.map((element: todo) => {
                if(element.completed) {
                    element.date = new Date(2026, 2, 18).toISOString().split('T')[0];
                    data1 = [...data1, element];
                }
            });
            func(data);   
        });
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