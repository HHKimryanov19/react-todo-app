import './App.css'
import { useEffect, useState } from 'react';
import type { todo } from './types/todo.ts';
import PendingSection from './components/sections/PendingSection.tsx'
import CompletedSection from './components/sections/CompletedSection.tsx'
import type { user } from './types/user.ts'
import { SectionContext } from './contexts/SectionContext.ts'

function App() {
  const [users, setUsers] = useState<user[]>([]);
  const [pending, setPending] = useState<todo[]>([]);
  const [completed, setCompleted] = useState<todo[]>([]);
  const [person, setPerson] = useState(-1);
  const [sortP, setSortP] = useState(0);
  const [sortC, setSortC] = useState(0);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        data = data.map((element: todo) => {
          if (element.completed) {
            let dateTime = new Date(2026, 2, 18).toISOString().split('T');
            return { ...element, date: dateTime[0] + ' ' +dateTime[1].split('.')[0] };
          }
          return element;
        });
        setPending(data.filter((element: todo) => !element.completed).sort((a: todo, b: todo) => {
          return a.title > b.title ? 1 : a.title < b.title ? -1 : 0;
        }))
        setCompleted(data.filter((element: todo) => element.completed).sort((a: todo, b: todo) => {
          return (a.date > b.date) ? 1 : (a.date < b.date) ? -1 : 0;
        }))
      });

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
  }, []);

  return (
    <>
        <SectionContext.Provider value={{
          pending, completed, setPending, setCompleted, person, setPerson, pendingSortType: sortP, completedSortType: sortC, setPendingSortType: setSortP,
          setCompletedSortType: setSortC, users
        }}>
          <PendingSection></PendingSection>
        </SectionContext.Provider>
     
        <SectionContext.Provider value={{
          pending, completed, setPending, setCompleted, person, setPerson, pendingSortType: sortP, completedSortType: sortC, setPendingSortType: setSortP,
          setCompletedSortType: setSortC, users
        }}>
          <CompletedSection></CompletedSection>
        </SectionContext.Provider>
      
    </>
  )
}

export default App