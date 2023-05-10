import React from 'react';
import { useState, useEffect } from 'react';

import { ModalNewDay } from './Components/ModalNewDay';
import { TopBar } from './Components/TopBar';
import { SearchBar } from './Components/SearchBar';
import { TaskBar } from './Components/TaskBar';

import ItemInterface from './Interfaces/ItemInterface';

import GetDataFromServer from './Functions/GetDataFromServer';

import { useDispatch } from 'react-redux';

import { addItem } from './actions/addItem';

import { Routes, Route } from 'react-router-dom';

import { useNavigate } from "react-router-dom";


import './App.css';

function App() {

  const currentDate: string = new Date().toJSON().slice(0, 10).split("-").reverse().join(".");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  
  
  useEffect(() => {
    let isMounted = true;
    navigate("/tasks");
    GetDataFromServer()
      .then((data: ItemInterface[]) => {
        if (isMounted) {
          dispatch(addItem(data));
          setIsLoading(true);
          if (localStorage.getItem('currentDate') !== currentDate) {
            navigate("/NewDay");
          }
        }
      })
      .catch((error) => {window.alert(error.message)});

    return () => {
        isMounted = false;
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
