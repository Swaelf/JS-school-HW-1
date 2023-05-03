import { useCallback } from 'react';
import ItemInterface from '../../Interfaces/ItemInterface'

import './index.css';

export const ModalNewDay = (
	{ 
		modalWindowState,
		setModalWindowState,
		currentDate, 
		taskList
	}: { 
		modalWindowState: number,
		setModalWindowState: React.Dispatch<React.SetStateAction<number>>, 
		currentDate: string,
		taskList: ItemInterface[]
	} = {
		modalWindowState: 0,
		setModalWindowState: (() => {}),
		currentDate: '',
		taskList: []
	}) => {

	let newDayWindowClass: string;

	if (modalWindowState === 1) {
		newDayWindowClass = 'new_day_window';
	} else {
		newDayWindowClass = 'new_day_window new_day_window--hidden';
	}

  	const handleClick = useCallback(() => {
    	setModalWindowState(0);
    	localStorage.setItem('currentDate', currentDate);
  	}, [setModalWindowState, currentDate]);
	
	const result = 
	<div className={ newDayWindowClass }> 
		<label 
			className="head__label">
			Good Morning
		</label>
		<label 
			className="tasklist__label">
			You have the next planned tasks for today:
		</label>
		<div className="tasklist__core">
			{ taskList.map((task) => {
			    if (task.plannedDate === currentDate) {
			      	return <label key={task.id} >{ task.name }</label>;
			    } else {
			      	return null;
			    }
			 })}
		</div>
		<button 
			className="button__ok" 
			onClick={handleClick}>
			OK
		</button>
	</div>
	
	return result;
}