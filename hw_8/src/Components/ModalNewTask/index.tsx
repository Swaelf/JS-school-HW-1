import React from 'react';
import { TagHolder } from '../TagHolder';
import { useState, useCallback, useRef } from 'react';
import ItemInterface from '../../Interfaces/ItemInterface';
import { NewTaskInput } from '../NewTaskInput';
import { DateSelect } from '../DateSelect';

import PostNewDataIntoServer from '../../Functions/PostNewDataIntoServer';

import './index.css';

export const ModalNewTask = (
	{ 
		modalWindowState,
		setModalWindowState, 
		currentDate,
		taskList,
		setTaskList
	}: { 
		modalWindowState: number,
		setModalWindowState: React.Dispatch<React.SetStateAction<number>>, 
		currentDate: string,
		taskList: ItemInterface[],
		setTaskList: React.Dispatch<React.SetStateAction<ItemInterface[]>>
	} = {
		modalWindowState: 0,
		setModalWindowState: (() => {}),
		currentDate: '',
		taskList: [],
		setTaskList: (() => {})
	}) => {

	const [currentTag, setCurrentTag] = useState('other');
	const [selectedTag, setSelectedTag] = useState('');
	const [currentName, setCurrentName] = useState('');

	const inputRef = useRef<HTMLInputElement>(null);
	const labelRef = useRef<HTMLLabelElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	let newTaskWindowClass: string;

	if (modalWindowState === 2) {
		newTaskWindowClass = 'new_task_window';
	} else {
		newTaskWindowClass = 'new_task_window new_task_window--hidden';
	}

    const buttonDisable = () => {
		buttonRef.current!.className = 'button button--apply button--disabled';
		buttonRef.current!.disabled = true;
	}

	const buttonEnable = () => {
		buttonRef.current!.className = 'button button--apply button--enabled';
		buttonRef.current!.disabled = false;
	}

    if (inputRef.current) {

		inputRef.current.value = currentName;
		if (inputRef.current.value === '') {
			buttonDisable();
		}
	}

  	const cancelClick = useCallback(() => {
  		setCurrentName('');
  		buttonDisable();
  		setSelectedTag('');
    	setModalWindowState(0);
  	}, [setSelectedTag, setModalWindowState, setCurrentName]);


  	const aprooveName = useCallback(() => {

  		let name: string = inputRef.current!.value;
		setCurrentName(name);

    	if (name) {
    		buttonEnable();
    	} else {
    		buttonDisable();
    	}
  	}, [setCurrentName]);


  	const addTask = useCallback(() => {

  		let id: number = taskList.length + 1;

	    for (let index: number = 0; index <= taskList.length - 1; index++) {
	        if ((taskList.find(task => task.id === index + 1)) === undefined) {
	            id = index + 1; 
	            break;
	        }
	    }

    	if (inputRef.current) {

    		let newTask: ItemInterface = {
    			id: id, 
    			name: inputRef.current.value,
    			isCompleted: false,
    			tag: currentTag,
    			plannedDate: labelRef.current!.innerHTML||'',
    			filter: false
    		}

        	setCurrentName('')
        	setSelectedTag('');
			buttonDisable();
      		PostNewDataIntoServer(newTask);
      		setTaskList([...taskList, newTask]);
    	}

    	setModalWindowState(0);

  	}, [taskList, currentTag, setSelectedTag, setModalWindowState, setTaskList, setCurrentName]);


	return ( 
	<div className={ newTaskWindowClass }> 
		<label 
			className='head__label'>
			Add New Item
		</label>
		<NewTaskInput 
			aprooveName={ aprooveName } 
			inputRef={ inputRef }/>
		<TagHolder 
			setTag={ setCurrentTag } 
			selectedTag={ selectedTag } 
			setSelectedTag={ setSelectedTag }/>
		<DateSelect
			currentDate={ currentDate }
			inputRef={ inputRef }
			labelRef={ labelRef }
			/>
		<button 
			className='button button--cancel' 
			onClick={ cancelClick }>
			Cancel
		</button>
		<button 
			className='button button--apply button--disabled'
			onClick={ addTask }
			disabled={ false }
			ref={ buttonRef }>
			Add Task
		</button>
	</div>)
}