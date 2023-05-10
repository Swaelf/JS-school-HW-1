import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { ModalNewDay } from './Components/ModalNewDay';
import { TopBar } from './Components/TopBar';
import { SearchBar } from './Components/SearchBar';
import { TaskBar } from './Components/TaskBar';

import ItemInterface from './Interfaces/ItemInterface';

import GetDataFromServer from './Functions/GetDataFromServer';

import { addItem } from './actions/addItem';
import { updateTasks } from './actions/updateTasks';

import './App.css';

function App() {

  const currentDate: string = new Date().toJSON().slice(0, 10).split("-").reverse().join(".");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const channel = new BroadcastChannel("ToDoApp");

    channel.onmessage = (event) => {
      if (event.data.tasks) { dispatch(updateTasks(event.data.tasks)) };
      if (event.data.path) {navigate(event.data.path)};
    };

    location.pathname.indexOf('/tasks') === -1 ? navigate("/tasks") : navigate( location.pathname + location.search );
    GetDataFromServer()
      .then((data: ItemInterface[]) => {
        if (isMounted) {
          dispatch(addItem(data));
          setIsLoading(true);
          if (localStorage.getItem('currentDate') !== currentDate) {
            navigate("/NewDay");
            channel.postMessage({ path: '/NewDay' });
          }
        }
      })
      .catch((error) => {window.alert(error.message)});

    return () => {
        isMounted = false;
        channel.close();
    }

    // eslint-disable-next-line
  }, []); //we call it only once

  if (!isLoading) {
    return <div>Loading...</div>;
  }


  return (
    
      <Routes>
        <Route path='*' element={
          <div className="App">
            <TopBar/>
            <SearchBar 
              currentDate={ currentDate }      
              />
            <TaskBar 
              currentDate={ currentDate }/>
            <ModalNewDay 
              currentDate={ currentDate }/> 
          </div>}/>
      </Routes>
  );
}

export default App;
