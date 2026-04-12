import './App.css'
import {useEffect, useState } from 'react';
import type { todo } from './types/todo.ts';
import PendingList from './components/lists/PendingList.tsx'
import CompletedList from './components/lists/CompletedList.tsx'
import type { user } from './types/user.ts'
import { ListContext } from './contexts/listContext.ts'

function App() {
  const [users, setUsers] = useState<user[]>([]);
  const [pending, setPending] = useState<todo[]>([]);
  const [completed, setCompleted] = useState<todo[]>([]);
  const [pendingPage, setPendingPage] = useState<number>(0);
  const [completedPage, setCompletedPage] = useState<number>(0);
  const [person, setPerson] = useState(-1);
  const [sortP, setSortP] = useState(0);
  const [sortC, setSortC] = useState(0);
  function sortPending(newList:todo[])
  {
    if(sortP === 0)
    {
      setPending([...newList].sort((a,b) => {
      return a.title > b.title ? 1 : a.title < b.title ? -1 : 0;
      }))
    }
    else
    {
      setPending([...newList].sort((a,b) => {
      return a.title > b.title ? -1 : a.title < b.title ? 1 : 0;
      }))
    }
  }

  function sortCompleted(newList:todo[])
  {
    if(sortC === 0)
    {
      setCompleted([...newList].sort((a,b) => {
      return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
      }))
    }
    else
    {
      setCompleted([...newList].sort((a,b) => {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
      }))
    } 
  }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            data = data.map((element: todo) => {
                if(element.completed) {
                    return { ...element, date: new Date(2026, 2, 18).toISOString().split('T')[0] };
                }
                return element;
            });
            setPending(data.filter((element: todo) => !element.completed).sort((a:todo,b:todo) => {
      return a.title > b.title ? 1 : a.title < b.title ? -1 : 0;
    }))
            setCompleted(data.filter((element: todo) => element.completed).sort((a:todo,b:todo) => {
      return (a.date > b.date) ? 1 : (a.date < b.date) ? -1 : 0;
    }))
        });

      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => setUsers(data))
  },[]);

  useEffect(() => {
    setPendingPage(0);
    setCompletedPage(0);
  },[person])

  useEffect(() =>{
    sortPending(pending);
  },[sortP])

  useEffect(() =>{
    sortCompleted(completed);
  },[sortC])

  return (
    <>
    <section>
      <div id='pending-selections'>
        <div>
          <label htmlFor="people">Filter by:</label>
          <select id='people' onChange = {e => setPerson(parseInt(e.target.value))}>
            <option value={-1}></option>
            {
              users.map((item) => (
                <option value={item.id}>{item.username}</option>
              ))
            }
          </select>
        </div>
        <div>
          <label htmlFor="pending-tasks-sort">Sort:</label>
          <select id="pending-tasks-sort" onChange = {e => setSortP(parseInt(e.target.value))}>
            <option value='0'>Titles(asc)</option>
            <option value="1">Titles(desc)</option>
          </select>
        </div>
      </div>
      <ListContext.Provider value={{pending, completed, setPending, setCompleted,person,page:pendingPage,
        setPage:setPendingPage,sort:sortCompleted}}>
        <PendingList></PendingList>
      </ListContext.Provider>
    </section>
    <section>
      <div id='completed-selection'>
        <label htmlFor="completed-tasks-sort">Sort:</label>
        <select id="completed-tasks-sort" onChange = {e => setSortC(parseInt(e.target.value))}>
          <option value="0">Date(asc)</option>
          <option value="1">Date(desc)</option>
        </select>
      </div>
      <ListContext.Provider value={{pending, completed, setPending, setCompleted,person,page:completedPage,
        setPage:setCompletedPage,sort:sortPending}}>
         <CompletedList></CompletedList>
      </ListContext.Provider>
    </section>
    </>
  )
}

export default App