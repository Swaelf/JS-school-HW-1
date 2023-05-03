import React from 'react';

import { TaskRow } from '../TaskRow';
import ItemInterface from '../../Interfaces/ItemInterface'
import SearchByPattern from '../../Functions/SearchByPattern';

import './index.css';

export const TaskBar = (
	{ 
		taskList,
		setTask,
		searchPattern
	 }: { 
	 	taskList: ItemInterface[],
	 	setTask: React.Dispatch<React.SetStateAction<ItemInterface[]>>,
	 	searchPattern: string
	 } = {
	 	taskList: [],
	 	setTask: (() => {}),
	 	searchPattern: ''
	 }) => {

	
	let filteredTaskList: ItemInterface[] = SearchByPattern(taskList, searchPattern);

	return (
	  <div className='taskbar'> 
	    <div className='tasklist'>
	      All Tasks

	      { filteredTaskList.map((task) => {

	        if (!task.isCompleted) {

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
	    <div className='tasklist'>
	      Completed tasks

	      { filteredTaskList.map((task) => {

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
	);
}