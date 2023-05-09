import React from 'react';
import { useState, useEffect } from 'react';

import { ScreenLock } from './Components/ScreenLock';
import { ModalNewDay } from './Components/ModalNewDay';
import { TopBar } from './Components/TopBar';
import { SearchBar } from './Components/SearchBar';
import { TaskBar } from './Components/TaskBar';

import ItemInterface from './Interfaces/ItemInterface';

import GetDataFromServer from './Functions/GetDataFromServer';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { addItem } from './actions/addItem';
import { printItem } from './actions/printItem';

import './App.css';

function App() {

  const currentDate: string = new Date().toJSON().slice(0, 10).split("-").reverse().join(".");
  const dispatch = useDispatch();
  const tasks: any = useSelector((state: any) => state.tasks);

  const [modalWindowState, setModalWindowState] = useState((localStorage.getItem('currentDate') !== currentDate) ? 1 : 0);
  //const [taskList, setTaskList] = useState<ItemInterface[]>([]);
  const [searchPattern, setSearchPattern] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    let isMounted = true;
    GetDataFromServer()
      .then((data: ItemInterface[]) => {
        if (isMounted) {
          //setTaskList(data);
          dispatch(addItem(data));
          setIsLoading(true);
        }
      })
      .catch((error) => {window.alert(error.message)});

    return () => {
        isMounted = false;
    }

  }, []); //we call it only once

 
  const data = useSelector(state => state);
  console.log(data);


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
        searchPattern={ searchPattern } 
        setSearchPattern={ setSearchPattern }
        />
      <TaskBar 
        searchPattern={ searchPattern }
        currentDate={ currentDate }      
        modalWindowState={ modalWindowState } 
        setModalWindowState={ setModalWindowState }/>
      <ScreenLock 
        modalWindowState={ modalWindowState }/>
      <ModalNewDay 
        currentDate={ currentDate }
        modalWindowState={ modalWindowState } 
        setModalWindowState={ setModalWindowState } /> 
      </div>
  );
}

export default App;
