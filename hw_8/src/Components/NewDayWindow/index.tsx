import { useCallback } from 'react';
import ItemInterface from '../../Interfaces/ItemInterface'

import './index.css';

export const NewDayWindow = (
	{ 
		setModalWindowState,
		currentDate, 
		className,
		taskList
	}: { 
		setModalWindowState: React.Dispatch<React.SetStateAction<number>>, 
		currentDate: string,
		className: string,
		taskList: ItemInterface[]
	} = {
		setModalWindowState: (() => {}),
		currentDate: '',
		className: '',
		taskList: []
	}) => {

  	const handleClick = useCallback(() => {
    	setModalWindowState(0);
    	localStorage.setItem('currentDate', currentDate);
  	}, [setModalWindowState, currentDate]);
	
	const result = 
	<div className={ className }> 
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