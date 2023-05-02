import { NewDayWindow } from '../NewDayWindow';
import { NewTaskWindow } from '../NewTaskWindow';
import React from 'react';
import ItemInterface from '../../Interfaces/ItemInterface';

import './index.css';

export const ScreenLock = (
	{ 
		modalWindowState,
		setModalWindowState, 
		currentDate,
		taskList, 
		setTask
	}: { 
		modalWindowState: number,
		setModalWindowState: React.Dispatch<React.SetStateAction<number>>, 
		currentDate: string,
		taskList: ItemInterface[], 
		setTask: React.Dispatch<React.SetStateAction<ItemInterface[]|null>>
	} = {
		modalWindowState: 0, 
		setModalWindowState: (() => {}), 
		currentDate: '',
		taskList: [],
		setTask: (() => {})
	}) => {
	
	let screenLockClass: string;
	let newDayWindowClass: string;
	let newTaskWindowClass: string;

	switch (modalWindowState) {
		case 0: 
			screenLockClass = 'screenlock screenlock--hidden';
			newDayWindowClass = 'new_day_window new_day_window--hidden';
			newTaskWindowClass = 'new_task_window new_task_window--hidden';
			break;
		case 1: 
			screenLockClass = 'screenlock';
			newDayWindowClass = 'new_day_window';
			newTaskWindowClass = 'new_task_window new_task_window--hidden';
			break;
		case 2: 
			screenLockClass = 'screenlock';
			newDayWindowClass = 'new_day_window new_day_window--hidden';
			newTaskWindowClass = 'new_task_window';
			break;
		default: 
			screenLockClass = 'screenlock screenlock--hidden';
			newDayWindowClass = 'new_day_window new_day_window--hidden';
			newTaskWindowClass = 'new_task_window new_task_window--hidden';
	}

	const result = 	
	<div className={ screenLockClass }> 
		<NewDayWindow 
			setModalWindowState={ setModalWindowState } 
			className={ newDayWindowClass} 
			taskList={ taskList } 
			currentDate={ currentDate }/> 
		<NewTaskWindow 
			setModalWindowState={ setModalWindowState } 
			className={ newTaskWindowClass } 
			taskList={ taskList } 
			setTask={ setTask } 
			currentDate={ currentDate }/> 
	</div>

	return result
}