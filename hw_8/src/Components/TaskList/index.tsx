import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import SearchByPattern from '../../Functions/SearchByPattern';

import { TaskRow } from '../TaskRow';

import ItemInterface from '../../Interfaces/ItemInterface'
import Interface from './Interface';

import './index.css';

export const TaskList = (props: Interface) => {

	const tasks: any = useSelector((state: any) => state.tasks);
	const location = useLocation();

	let filteredTaskList: ItemInterface[] = SearchByPattern(
		tasks, 
		decodeURIComponent(location.search.replace('?q=', '')),
		location.pathname.substring(location.pathname.lastIndexOf('tasks') + 6, location.pathname.length)
		);

	return (
	<div className="tasklist">
		{ props.listName }

	    { filteredTaskList.map((task: any) => {

	        if (task.isCompleted === props.isCompleted) {

	        	return <TaskRow 
	            	key={ task.id } 
	            	task={ task }
	            	setModalWindowState={ props.setModalWindowState }/>;
	        	} else {

	          	return null;
	        	}
	      }) }
	</div>

	)
};

TaskList.defaultProps = {
  taskList: [],
  setTaskList: (() => {}),
  listName: '',
  isCompleted: false,
  setModalWindowState: (() => {}),
  searchPattern: ''
};// 