import React from 'react';
import { useState, useEffect, useRef } from 'react';

import { ScreenLock } from './Components/ScreenLock';
import { ModalNewDay } from './Components/ModalNewDay';
import { ModalNewTask } from './Components/ModalNewTask';
import { TopBar } from './Components/TopBar';
import { SearchBar } from './Components/SearchBar';
import { TaskBar } from './Components/TaskBar';

import ItemInterface from './Interfaces/ItemInterface';

import GetDataFromServer from './Functions/GetDataFromServer';

import './App.css';

const config = require ('./config.json');

function App() {

  localStorage.setItem('server_url', config.localurl);

  const currentDate: string = new Date().toJSON().slice(0, 10).split("-").reverse().join(".");
  const searchRef = useRef<HTMLInputElement>(null);

  let initialModalWindowState: number;

  if (localStorage.getItem('currentDate') !== currentDate) {
    initialModalWindowState = 1;
  } else {
    initialModalWindowState = 0;
  }

  const [modalWindowState, setModalWindowState] = useState(initialModalWindowState);
  const [taskList, setTask] = useState<ItemInterface[]|null>(null);
  
  useEffect(() => {
    let isMounted = true;

    GetDataFromServer()
      .then((data: ItemInterface[]) => {
        if (isMounted) {
          setTask(data);
        }
      });

    return () => {
        isMounted = false;
    }

  }, []);
  

  if (!taskList) {
    return <div>Loading...</div>;
  }
 
  return (
    <div className="App">
      <TopBar/>
      <SearchBar 
        setModalWindowState={ setModalWindowState } 
        taskList={ taskList } 
        setTask={ setTask }
        searchRef={ searchRef }/>
      <TaskBar 
        taskList={ taskList } 
        setTask={ setTask }
        searchRef={ searchRef }/>
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
        setTask={ setTask } 
        currentDate={ currentDate }/> 
      </div>
  );
}

export default App;
