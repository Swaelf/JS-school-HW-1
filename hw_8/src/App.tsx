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

  const currentDate: string = new Date().toJSON().slice(0, 10).split("-").reverse().join(".");

  const [modalWindowState, setModalWindowState] = useState((localStorage.getItem('currentDate') !== currentDate) ? 1 : 0);
  const [taskList, setTaskList] = useState<ItemInterface[]>([]);
  const [searchPattern, setSearchPattern] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    let isMounted = true;

    GetDataFromServer()
      .then((data: ItemInterface[]) => {
        if (isMounted) {
          setTaskList(data);
          setIsLoading(true);
        }
      })
      .catch((error) => {window.alert(error.message)});

    return () => {
        isMounted = false;
    }

  }, []); //we call it only once


  if (!isLoading) {
    return <div>Loading...</div>;
  }
 
  return (
    <div className="App">
      <TopBar/>
      <SearchBar 
        currentDate={ currentDate }      
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
        currentDate={ currentDate }
        modalWindowState={ modalWindowState } 
        setModalWindowState={ setModalWindowState } 
        taskList={ taskList }/> 
      </div>
  );
}

export default App;
