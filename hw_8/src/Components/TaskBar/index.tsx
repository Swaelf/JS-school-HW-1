import { TaskRow } from '../TaskRow';
import ItemInterface from '../../Interfaces/ItemInterface'
import React, { useState, useCallback, useRef } from 'react';

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

	//console.log('task image = ', JSON.stringify(taskList));


	//setTask([...taskList]);

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