import { NewDayWindow } from '../NewDayWindow';
import { NewTaskWindow } from '../NewTaskWindow';
import { useRef, RefObject } from 'react';
import ItemInterface from '../../Interfaces/ItemInterface';

import './index.css';

export const ScreenLock = (
	{ 
		flag,
		setFlag, 
		currentDate,
		taskList, 
		setTask
	}: { 
		flag: number,
		setFlag: React.Dispatch<React.SetStateAction<number>>, 
		currentDate: string,
		taskList: ItemInterface[], 
		setTask: React.Dispatch<React.SetStateAction<ItemInterface[]|null>>
	} = {
		flag: 0, 
		setFlag: (() => {}), 
		currentDate: '',
		taskList: [],
		setTask: (() => {})
	}) => {

	//console.log('screenlock rendered!', 'flag = ', flag);
	
	let screenLockClass: string;
	let newDayWindowClass: string;
	let newTaskWindowClass: string;
	switch (flag) {
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
			setFlag={ setFlag } 
			className={ newDayWindowClass} 
			taskList={ taskList } 
			currentDate={ currentDate }/> 
		<NewTaskWindow 
			setFlag={ setFlag } 
			className={ newTaskWindowClass } 
			taskList={ taskList } 
			setTask={ setTask } 
			currentDate={ currentDate }/> 
	</div>

	return result
}