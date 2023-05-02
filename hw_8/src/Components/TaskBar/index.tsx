import { TaskRow } from '../TaskRow';
import ItemInterface from '../../Interfaces/ItemInterface'
import React from 'react';

import './index.css';

export const TaskBar = (
	{ 
		taskList,
		setTask
	 }: { 
	 	taskList: ItemInterface[],
	 	setTask: React.Dispatch<React.SetStateAction<ItemInterface[]|null>>
	 } = {
	 	taskList: [],
	 	setTask: (() => {})
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