import Interface from './Interface';

import './index.css';

export const CurrentTaskList = (props: Interface) => {

	const currentDate: string = new Date().toJSON().slice(0, 10).split("-").reverse().join(".");
	
	return (
	<div className="currenttasklist">
		{ props.taskList.map((task) => {
		    if (task.plannedDate === currentDate && task.isCompleted === false) {
		      	return <label key={task.id} >{ task.name }</label>;
		    } else {
		      	return null;
		    }
		 })}
	</div>

	)
};

CurrentTaskList.defaultProps = {
    taskList: []
};