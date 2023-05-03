import React from 'react';

import { TaskRow } from '../TaskRow';
import ItemInterface from '../../Interfaces/ItemInterface'
import SearchByPattern from '../../Functions/SearchByPattern';

import './index.css';

export const TaskBar = (
	{ 
		taskList,
		setTaskList,
		searchPattern
	 }: { 
	 	taskList: ItemInterface[],
	 	setTaskList: React.Dispatch<React.SetStateAction<ItemInterface[]>>,
	 	searchPattern: string
	 } = {
	 	taskList: [],
	 	setTaskList: (() => {}),
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
	            setTaskList={ setTaskList }/>;
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
	            setTaskList={ setTaskList }/>;
	        } else {

	          return null;
	        }
	      }) }
	    </div>
	  </div>
	);
}