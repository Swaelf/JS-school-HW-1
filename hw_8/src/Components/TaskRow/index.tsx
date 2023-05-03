import { TagElement } from '../TagElement';
import ItemInterface from '../../Interfaces/ItemInterface'
import { useCallback } from 'react';

import DeleteDataFromServer from '../../Functions/DeleteDataFromServer'
import UpdateDataOnServer from '../../Functions/UpdateDataOnServer'

import './index.css';

export const TaskRow = (
	{ 
		task,
		taskList,
		setTaskList
	}: { 
		task: ItemInterface,
		taskList: ItemInterface[], 
		setTaskList: React.Dispatch<React.SetStateAction<ItemInterface[]>>
	} = {
		task: {},
		taskList: [],
		setTaskList: (() => {})
	}) => {

	const index: number = taskList.indexOf(task);
	const buttonClass = taskList[index].isCompleted ? 'button__delete button__delete--disabled': 'button__delete';
	const rowClassName: string = task.filter ? 'taskrow' : 'taskrow taskrow--hidden';
  	const actualTag: string = task.isCompleted ? 'inactive' : taskList[index].tag as string;
  	const labelClassName: string = task.isCompleted ? 'taskname taskname--inactive' : 'taskname';

	
	const changeCompleteState = useCallback(() => {
    	taskList[index].isCompleted = !taskList[index].isCompleted;
    	UpdateDataOnServer(taskList[index]);
    	setTaskList([...taskList]);
  	}, [taskList, setTaskList, index]);

	const deleteTask = useCallback(() => {
    	DeleteDataFromServer(taskList[index]);
     	taskList.splice(index, 1);
    	setTaskList([...taskList]);
  	}, [taskList, setTaskList, index]);

  	
	return (
	<div className={ rowClassName }> 
		<input 
			className='checkbox' 
			type='checkbox' 
			defaultChecked={ taskList[index].isCompleted } 
			onChange={ changeCompleteState }/>
		<div className='taskcontent'>
			<label 
				className={ labelClassName }>
				{ taskList[index].name }</label>
			<TagElement 
				tag={ actualTag } 
				text={ taskList[index].tag }/>
			<TagElement 
				tag='time' 
				text={ taskList[index].plannedDate }/>
		</div>
		<button 
			className={ buttonClass } 
			onClick={ deleteTask }/>
	</div>)
}
