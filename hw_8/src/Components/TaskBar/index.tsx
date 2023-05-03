import React from 'react';

import { TaskRow } from '../TaskRow';
import ItemInterface from '../../Interfaces/ItemInterface'
import SearchByPattern from '../../Functions/SearchByPattern';

import './index.css';

export const TaskBar = (
	{ 
		taskList,
		setTask,
		searchRef
	 }: { 
	 	taskList: ItemInterface[],
	 	setTask: React.Dispatch<React.SetStateAction<ItemInterface[]|null>>,
	 	searchRef: React.RefObject<HTMLInputElement>|null
	 } = {
	 	taskList: [],
	 	setTask: (() => {}),
	 	searchRef: null
	 }) => {

	const result = 	
	<div className='taskbar'> 
		<div className='tasklist'>
			All Tasks

			{ taskList.map((task) => {

			    if (!task.isCompleted) {

			      	return <TaskRow 
			      		key={task.id} 
			      		task={ task } 
			      		taskList={ taskList } 
			      		setTask={ setTask }/>;
			    } else {

			      	return null;
			    }
			 })}
		</div>
		<div className='tasklist'>
			Completed tasks

			{ taskList.map((task) => {

			    if (task.isCompleted) {
			    	
			      	return <TaskRow 
			      		key={task.id} 
			      		task={ task } 
			      		taskList={ taskList } 
			      		setTask={ setTask }/>;
			    } else {

			      return null;
			    }
			 }) }
		</div>
	</div>

	return result
}