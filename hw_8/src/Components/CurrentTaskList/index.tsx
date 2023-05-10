import { useSelector } from 'react-redux';

import Interface from './Interface';
import ItemInterface from '../../Interfaces/ItemInterface';

import './index.css';

export const CurrentTaskList = (props: Interface) => {

	const data: any = useSelector(state => state);
	const tasks: ItemInterface[] = data.tasks as ItemInterface[];

	return (
	<div className="currenttasklist">
		{ tasks.map((task) => {

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