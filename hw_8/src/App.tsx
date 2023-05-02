import React from 'react';
import { ScreenLock } from './Components/ScreenLock';
import { Container } from './Components/Container';
import { useState, useEffect } from 'react';

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
      <Container 
        modalWindowState={ modalWindowState } 
        setModalWindowState={ setModalWindowState } 
        taskList={ taskList } 
        setTask={ setTask }/>
      <ScreenLock 
        modalWindowState={ modalWindowState } 
        setModalWindowState={ setModalWindowState } 
        taskList={ taskList } 
        setTask={ setTask } 
        currentDate={ currentDate }/>
    </div>
  );
}

export default App;
