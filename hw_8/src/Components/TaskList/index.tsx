import Interface from './Interface';
import { useDispatch, useSelector } from 'react-redux';
import ItemInterface from '../../Interfaces/ItemInterface'
import { ModalNewTask } from '../ModalNewTask';
import SearchByPattern from '../../Functions/SearchByPattern';

import { TaskRow } from '../TaskRow';

import './index.css';

export const TaskList = (props: Interface) => {

	const dispatch = useDispatch();
	const tasks: any = useSelector((state: any) => state.tasks);

	let filteredTaskList: ItemInterface[] = SearchByPattern(tasks, props.searchPattern);
	/*console.log('filtered:', filteredTaskList);
  dispatch(updateTasks(filteredTaskList));*/

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