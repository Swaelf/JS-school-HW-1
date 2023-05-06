import Interface from './Interface';

import { TaskRow } from '../TaskRow';

import './index.css';

export const TaskList = (props: Interface) => {

	return (
	<div className="tasklist">
		{ props.listName }

	    { props.taskList.map((task) => {

	        if (task.isCompleted === props.isCompleted) {

	        	return <TaskRow 
	            	key={task.id} 
	            	task={ task }
	            	taskList={ props.taskList } 
	            	setTaskList={ props.setTaskList }/>;
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
  isCompleted: false
};// 