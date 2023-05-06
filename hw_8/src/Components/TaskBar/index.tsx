import React from 'react';

import { TaskList} from '../TaskList';
import ItemInterface from '../../Interfaces/ItemInterface';
import SearchByPattern from '../../Functions/SearchByPattern';

import Interface from './Interface';

import './index.css';

export const TaskBar = (props: Interface) => {
	
	let filteredTaskList: ItemInterface[] = SearchByPattern(props.taskList, props.searchPattern);

	return (
	  <div className='taskbar'> 
	  	<TaskList
	  		listName='All Tasks'
	  		taskList={ filteredTaskList } 
	        setTaskList={ props.setTaskList }
	        isCompleted={ false }/>
	    <TaskList
	  		listName='Completed tasks'
	  		taskList={ filteredTaskList } 
	        setTaskList={ props.setTaskList }
	        isCompleted={ true }/>
	  </div>
	);
};

TaskBar.defaultProps = {
  taskList: [],
  setTaskList: (() => {}),
  searchPattern: ''
};