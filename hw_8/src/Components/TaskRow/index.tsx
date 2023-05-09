import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Checkbox } from '../Checkbox';
import { Button } from '../Button';
import { RowLabel } from '../RowLabel';

import Interface from './Interface';
import { updateTasks } from '../../actions/updateTasks';

import DeleteDataFromServer from '../../Functions/DeleteDataFromServer'
import UpdateDataOnServer from '../../Functions/UpdateDataOnServer'

import './index.css';

export const TaskRow = (props: Interface) => {

	//const index: number = props.task ? props.taskList.indexOf(props.task): 0;

	const dispatch = useDispatch();
	const tasks: any = useSelector((state: any) => state.tasks);
	const index: number = props.task ? tasks.indexOf(props.task): 0;
	
	const changeCompleteState = useCallback(() => {
    	tasks[index].isCompleted = !(tasks[index].isCompleted);
    	console.log('update =',tasks[index])
    	UpdateDataOnServer(tasks[index]);
    	dispatch(updateTasks([...tasks]));
    	// eslint-disable-next-line
  	}, []); //setTaskList is a function and shall not change

	const deleteTask = useCallback(() => {
    	
     	console.log('delete =',tasks[index])
     	DeleteDataFromServer(tasks[index]);
     	tasks.splice(index, 1);
     	dispatch(updateTasks([...tasks]));
    	// eslint-disable-next-line
  	}, []); //setTaskList is a function and shall not change

  	const editTask = useCallback(() => {
 		//props.setModalWindowState(3);

    	// eslint-disable-next-line
  	}, [props.setModalWindowState]); //setTaskList is a function and shall not change

  	
  	return (
	<div className={ tasks[index].filter ? 'taskrow' : 'taskrow taskrow--hidden' }> 
		<Checkbox 
			defaultChecked={ tasks[index].isCompleted } 
			onChange={ changeCompleteState }/>
		<RowLabel 
			task={ tasks[index] }/>
		<Button 
			className={ tasks[index].isCompleted ? 'button__edit button__icon--disabled': 'button__edit' } 
			onClick={ editTask }/>
		<Button 
			className={ tasks[index].isCompleted ? 'button__delete button__icon--disabled': 'button__delete' } 
			onClick={ deleteTask }/>
	</div>)
};

TaskRow.defaultProps = {
	task: { filter: false, isCompleted: false, name: '', id: 0, tag: 'other'},
  	taskList: [],
  	setTaskList: (() => {}),
  	setModalWindowState: (() => {})
};