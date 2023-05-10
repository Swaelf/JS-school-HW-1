import { useCallback } from 'react';
import { Button } from '../Button';
import { Label } from '../Label';
import { CurrentTaskList } from '../CurrentTaskList';
import Interface from './Interface';
import { Routes, Route } from 'react-router-dom';


import './index.css';

export const ModalNewDay = (props: Interface) => {

  	const handleClick = useCallback(() => {

    	localStorage.setItem('currentDate', props.currentDate);
    	
    	// eslint-disable-next-line
  	}, [ props.currentDate ]); //setModalWindowState is a function and shall not change
	
	return (
		<Routes>
		  	<Route path='/NewDay' element={
				<div className='screenlock'>
				<div className='new_day_window'> 
				<Label 
					className="head__label"
					text='Good Morning'/>
				<Label 
					className="tasklist__label"
					text='You have the next planned tasks for today:'/>
				<CurrentTaskList
					currentDate={ props.currentDate }
					taskList={ props.taskList }/>
				<Button 
					className="button__ok" 
					to='/tasks'
					onClick={ handleClick }
					text='OK'/>
				</div>
				</div>}/>
		</Routes>)
};

ModalNewDay.defaultProps = {
	currentDate: '',
  	modalWindowState: 0,
  	setModalWindowState: (() => {}), 
  	taskList: []
};