import { useCallback, useRef, RefObject } from 'react';
import ItemInterface from '../../Interfaces/ItemInterface'

import './index.css';

export const NewDayWindow = (
	{ 
		setFlag,
		currentDate, 
		className,
		taskList
	}: { 
		setFlag: React.Dispatch<React.SetStateAction<number>>, 
		currentDate: string,
		className: string,
		taskList: ItemInterface[]
	} = {
		setFlag: (() => {}),
		currentDate: '',
		className: '',
		taskList: []
	}) => {

	//console.log('NewDayWindow rendered!');

  	const handleClick = useCallback(() => {
    	setFlag(0);
    	localStorage.setItem('currentDate', currentDate);
  	}, []);

  	


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
			    if (task.plannedDate == currentDate) {
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