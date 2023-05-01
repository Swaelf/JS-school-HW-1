import React from 'react';
import logo from './logo.svg';
import { ScreenLock } from './Components/ScreenLock';
import { Container } from './Components/Container';
import { useRef, useState, useEffect } from 'react';

import ItemInterface from './Interfaces/ItemInterface';

import GetDataFromServer from './Functions/GetDataFromServer';
import LocateMe from './Functions/LocateMe';

import './App.css';

function App() {

  const currentDate: string = new Date().toJSON().slice(0, 10).split("-").reverse().join(".");

  let flagstate: number;

  if (localStorage.getItem('currentDate') != currentDate) {
    console.log('good morning')
    flagstate = 1;
  } else {
    console.log('continued')
    flagstate = 0;
  }

  const [flag, setFlag] = useState(flagstate);
  const [taskList, setTask] = useState<ItemInterface[]|null>(null);
  
  useEffect(() => {
    console.log('get Data!');
    GetDataFromServer()
      .then((data: ItemInterface[]) => {
        setTask(data);
      });
  }, []);
  
  console.log('App rendered!');

  if (!taskList) {
    return <div>Loading...</div>;
  }
 
  return (
    <div className="App">
      <Container 
        flag={ flag } 
        setFlag={ setFlag } 
        taskList={ taskList } 
        setTask={ setTask }/>
      <ScreenLock 
        flag={ flag } 
        setFlag={ setFlag } 
        taskList={ taskList } 
        setTask={ setTask } 
        currentDate={ currentDate }/>
    </div>
  );
}

export default App;
