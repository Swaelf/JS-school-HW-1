import { useCallback } from 'react';

import { Checkbox } from '../Checkbox';
import { Button } from '../Button';
import { RowLabel } from '../RowLabel';

import Interface from './Interface';

import DeleteDataFromServer from '../../Functions/DeleteDataFromServer'
import UpdateDataOnServer from '../../Functions/UpdateDataOnServer'

import './index.css';

export const TaskRow = (props: Interface) => {

	const index: number = props.task ? props.taskList.indexOf(props.task): 0;
	
	const changeCompleteState = useCallback(() => {
    	props.taskList[index].isCompleted = !(props.taskList[index].isCompleted);
    	UpdateDataOnServer(props.taskList[index]);
    	props.setTaskList([...props.taskList]);
    	// eslint-disable-next-line
  	}, [props.taskList]); //setTaskList is a function and shall not change

	const deleteTask = useCallback(() => {
    	DeleteDataFromServer(props.taskList[index]);
     	props.taskList.splice(index, 1);
    	props.setTaskList([...props.taskList]);
    	// eslint-disable-next-line
  	}, [props.taskList]); //setTaskList is a function and shall not change

  	
	return (
	<div className={ props.task.filter ? 'taskrow' : 'taskrow taskrow--hidden' }> 
		<Checkbox 
			defaultChecked={ props.task.isCompleted } 
			onChange={ changeCompleteState }/>
		<RowLabel 
			task={ props.task }/>
		<Button 
			className={ props.task.isCompleted ? 'button__delete button__delete--disabled': 'button__delete' } 
			onClick={ deleteTask }/>
	</div>)
};

TaskRow.defaultProps = {
	task: { filter: false, isCompleted: false, name: '', id: 0, tag: 'other'},
  	taskList: [],
  	setTaskList: (() => {})
};