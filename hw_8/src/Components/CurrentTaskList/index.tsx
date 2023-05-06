import Interface from './Interface';

import './index.css';

export const CurrentTaskList = (props: Interface) => {

	return (
	<div className="currenttasklist">
		{ props.taskList.map((task) => {
		    if (task.plannedDate === props.currentDate && task.isCompleted === false) {
		      	return <label key={task.id} >{ task.name }</label>;
		    } else {
		      	return null;
		    }
		 })}
	</div>

	)
};

CurrentTaskList.defaultProps = {
	currentDate: '',
    taskList: []
};