import './App.css'
import {useEffect, useState } from 'react';
import type { todo } from './types/todos.ts';
import CompleteButton from './components/buttons/CompleteButton.tsx'
import UndoButton from './components/buttons/UndoButton.tsx'

function App() {
  const [pending, setPending] = useState<todo[]>([]);
  const [completed, setCompleted] = useState<todo[]>([]);
  const [pendingPage, setPendingPage] = useState<number>(0);
  const [completedPage, setCompletedPage] = useState<number>(0);
  const [person, setPerson] = useState(-1);
  const [sortP, setSortP] = useState(0);
  const [sortC, setSortC] = useState(0);
  const names: string[] = ['person1','person2','person3','person4','person5','person6','person7','person8','person9','person10']
  function sortPending(newList:todo[])
  {
    console.log('sort');
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
            names.map((name,id) => (
              <option value={id+1}>{name}</option>
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
      <div id='pending-tasks'>
        <p>Pending:</p>
        <div id="pagination-btn">
          {pendingPage > 0 ? <button onClick={() => setPendingPage(pendingPage - 1)}>Previous</button> : null}
          {(pendingPage+1)*6 < (person == -1 ? pending.length:pending.filter((data) => data.userId == person).length) ? <button onClick={() => setPendingPage(pendingPage + 1)}>Next</button> : null}
        </div>
        <ul>
          {
            person == -1 ?
            pending.slice(6*pendingPage,6*pendingPage+6).map((data) => (
            <li key={data.id}>
              <p>{data.title}</p>
              <CompleteButton item={data} sort={sortCompleted} states = {{pending, completed, setPending, setCompleted}}></CompleteButton>
            </li>
            )):
              pending.filter((data) => data.userId == person).slice(6*pendingPage,6*pendingPage+6).map((data) => (
              <li key={data.id}>
                <p>{data.title}</p>
                <CompleteButton item={data} sort={sortCompleted} states = {{pending, completed, setPending, setCompleted}}></CompleteButton>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
    <section>
      <div id='completed-selection'>
        <label htmlFor="completed-tasks-sort">Sort:</label>
        <select id="completed-tasks-sort" onChange = {e => setSortC(parseInt(e.target.value))}>
          <option value="0">Date(asc)</option>
          <option value="1">Date(desc)</option>
        </select>
      </div>
      <div id='completed-tasks'>
        <p>Completed: </p>
        <div id="pagination-btn">
          {completedPage > 0 ? <button onClick={() => setCompletedPage(completedPage - 1)}>Previous</button> : null}
          {(completedPage+1)*6 < (person == -1 ?completed.length:completed.filter((data) => data.userId == person).length) ? <button onClick={() => setCompletedPage(completedPage + 1)}>Next</button> : null}
        </div>
        <ul>
          {
            person == -1 ?
            completed.slice(6*completedPage,6*completedPage+6).map((data) => (
              <li id="completed-task-data" key={data.id}>
                <div id="completed-task">
                  <p>{data.title}</p>
                  <UndoButton item={data} states = {{pending, completed, setPending, setCompleted}} sort={sortPending}></UndoButton>
                </div>
                <p className="completed-date">Completed on: {data.date}</p>
              </li>
            ))
            :
            completed.filter((data) => data.userId == person).slice(6*completedPage,6*completedPage+6).map((data) => (
              <li id="completed-task-data" key={data.id}>
                <div id="completed-task">
                  <p>{data.title}</p>
                  <UndoButton item={data} states = {{pending, completed, setPending, setCompleted}} sort={sortPending}></UndoButton>
                </div>
                <p className="completed-date">Completed on: {data.date}</p>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
    </>
  )
}


export default App
