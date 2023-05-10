import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Checkbox } from '../Checkbox';
import { Button } from '../Button';
import { RowLabel } from '../RowLabel';

import Interface from './Interface';
import { updateTasks } from '../../actions/updateTasks';

import DeleteDataFromServer from '../../Functions/DeleteDataFromServer'
import UpdateDataOnServer from '../../Functions/UpdateDataOnServer'

import './index.css';

export const TaskRow = (props: Interface) => {

	const dispatch = useDispatch();
	const tasks: any = useSelector((state: any) => state.tasks);
	const index: number = props.task ? tasks.indexOf(props.task): 0;
	const location = useLocation();
	const channel = new BroadcastChannel("ToDoApp");
	
	const changeCompleteState = useCallback(() => {

    	tasks[index].isCompleted = !(tasks[index].isCompleted);
    	UpdateDataOnServer(tasks[index]);
    	dispatch(updateTasks([...tasks]));
    	channel.postMessage({ path: location.pathname + location.search, tasks: tasks });

    	// eslint-disable-next-line
  	}, [ tasks, location ]); 

	const deleteTask = useCallback(() => {

     	DeleteDataFromServer(tasks[index]);
     	tasks.splice(index, 1);
     	dispatch(updateTasks([...tasks]));
     	channel.postMessage({ path: location.pathname + location.search, tasks: tasks });

    	// eslint-disable-next-line
  	}, [ tasks, location ]); 

  	const editTask = useCallback(() => {
  		
  		channel.postMessage({ path: '/ModalTask/' + tasks[index].id + location.pathname + location.search });

    	// eslint-disable-next-line
  	}, [ tasks, location ]); 

  	
  	return (
	<div className={ tasks[index].filter ? 'taskrow' : 'taskrow taskrow--hidden' }> 
		<Checkbox 
			defaultChecked={ tasks[index].isCompleted } 
			onChange={ changeCompleteState }/>
		<RowLabel 
			task={ tasks[index] }/>
		<Button 
			className={ tasks[index].isCompleted ? 'button__edit button__icon--disabled': 'button__edit' } 
			to={ '/ModalTask/' + tasks[index].id + location.pathname + location.search }
			onClick={ editTask }/>
		<Button 
			className={ tasks[index].isCompleted ? 'button__delete button__icon--disabled': 'button__delete' } 
			to={ location.pathname + location.search }
			onClick={ deleteTask }/>
	</div>)
};

TaskRow.defaultProps = {
	task: { filter: false, isCompleted: false, name: '', id: 0, tag: 'other'},
  	taskList: [],
  	setTaskList: (() => {}),
  	setModalWindowState: (() => {})
};