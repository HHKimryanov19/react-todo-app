import './components/buttons/buttonStyle.css'
import './components/sections/sectionStyle.css'
import './App.css'
import { useEffect, useState } from 'react';
import type { Todo } from './types/todo.ts';
import PendingSection from './components/sections/PendingSection.tsx'
import CompletedSection from './components/sections/CompletedSection.tsx'
import type { User } from './types/user.ts'
import { SectionContext } from './contexts/SectionContext.ts'

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [pending, setPending] = useState<Todo[]>([]);
  const [completed, setCompleted] = useState<Todo[]>([]);
  const [person, setPerson] = useState(-1);
  const [pendingSortType, setPendingSortType] = useState(0);
  const [completedSortType, setCompletedSortType] = useState(0);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        data = data.map((element: Todo) => {
          if (element.completed) {
            const dateTime = new Date(2026, 2, 18).toISOString().split('T');
            return { ...element, date: dateTime[0] + ' ' +dateTime[1].split('.')[0] };
          }
          return element;
        });
        setPending(data.filter((element: Todo) => !element.completed).sort((a: Todo, b: Todo) => {
          return a.title > b.title ? 1 : a.title < b.title ? -1 : 0;
        }))
        setCompleted(data.filter((element: Todo) => element.completed).sort((a: Todo, b: Todo) => {
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
          pending, completed, setPending, setCompleted, person, setPerson, pendingSortType: pendingSortType, 
          completedSortType: completedSortType, setPendingSortType: setPendingSortType,
          setCompletedSortType: setCompletedSortType, users
        }}>
          <PendingSection></PendingSection>
        </SectionContext.Provider>
     
        <SectionContext.Provider value={{
          pending, completed, setPending, setCompleted, person, setPerson, pendingSortType: pendingSortType, completedSortType: completedSortType, setPendingSortType: setPendingSortType,
          setCompletedSortType: setCompletedSortType, users
        }}>
          <CompletedSection></CompletedSection>
        </SectionContext.Provider>
      
    </>
  )
}

export default App