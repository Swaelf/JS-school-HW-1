import React from 'react';
import { useState, useEffect } from 'react';

import { ScreenLock } from './Components/ScreenLock';
import { ModalNewDay } from './Components/ModalNewDay';
import { ModalNewTask } from './Components/ModalNewTask';
import { TopBar } from './Components/TopBar';
import { SearchBar } from './Components/SearchBar';
import { TaskBar } from './Components/TaskBar';

import ItemInterface from './Interfaces/ItemInterface';

import GetDataFromServer from './Functions/GetDataFromServer';

import './App.css';

function App() {

  const currentDate: string = new Date().toJSON().slice(0, 10).split("-").reverse().join(".");

  let initialModalWindowState: number;

  if (localStorage.getItem('currentDate') !== currentDate) {
    initialModalWindowState = 1;
  } else {
    initialModalWindowState = 0;
  }

  const [modalWindowState, setModalWindowState] = useState(initialModalWindowState);
  const [taskList, setTaskList] = useState<ItemInterface[]>([]);
  const [searchPattern, setSearchPattern] = useState('');
  
  useEffect(() => {
    let isMounted = true;

    GetDataFromServer()
      .then((data: ItemInterface[]) => {
        if (isMounted) {
          setTaskList(data);
        }
      });

    return () => {
        isMounted = false;
    }

  }, []); //we call it only once


  if (!taskList) {
    return <div>Loading...</div>;
  }
 
  return (
    <div className="App">
      <TopBar/>
      <SearchBar 
        setModalWindowState={ setModalWindowState } 
        taskList={ taskList } 
        searchPattern={ searchPattern } 
        setSearchPattern={ setSearchPattern }
        />
      <TaskBar 
        taskList={ taskList } 
        setTaskList={ setTaskList }
        searchPattern={ searchPattern }/>
      <ScreenLock 
        modalWindowState={ modalWindowState }/>
      <ModalNewDay 
        modalWindowState={ modalWindowState } 
        setModalWindowState={ setModalWindowState } 
        taskList={ taskList } 
        currentDate={ currentDate }/> 
      <ModalNewTask 
        modalWindowState={ modalWindowState } 
        setModalWindowState={ setModalWindowState } 
        taskList={ taskList } 
        setTaskList={ setTaskList } 
        currentDate={ currentDate }/> 
      </div>
  );
}

export default App;
