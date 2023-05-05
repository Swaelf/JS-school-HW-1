import React from 'react';
import { useState, useEffect } from 'react';

import { ScreenLock } from './Components/ScreenLock';
import { ModalNewDay } from './Components/ModalNewDay';
import { TopBar } from './Components/TopBar';
import { SearchBar } from './Components/SearchBar';
import { TaskBar } from './Components/TaskBar';

import ItemInterface from './Interfaces/ItemInterface';

import GetDataFromServer from './Functions/GetDataFromServer';

import './App.css';

function App() {

  const [modalWindowState, setModalWindowState] = useState(
    (localStorage.getItem('currentDate') !== new Date().toJSON().slice(0, 10).split("-").reverse().join(".")) ? 1: 0
    );

  const [taskList, setTaskList] = useState<ItemInterface[]|null>(null);
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
        modalWindowState={ modalWindowState } 
        setModalWindowState={ setModalWindowState } 
        taskList={ taskList } 
        setTaskList={ setTaskList }
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
        taskList={ taskList }/> 
      </div>
  );
}

export default App;
