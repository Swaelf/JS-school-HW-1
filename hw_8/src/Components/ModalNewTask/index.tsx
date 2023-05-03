import React from 'react';
import { TagHolder } from '../TagHolder';
import { useState, useCallback, useRef } from 'react';
import ItemInterface from '../../Interfaces/ItemInterface';
import { NewTaskInput } from '../NewTaskInput'

import PostNewDataIntoServer from '../../Functions/PostNewDataIntoServer';

import './index.css';

export const ModalNewTask = (
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
		setTask: React.Dispatch<React.SetStateAction<ItemInterface[]>>
	} = {
		modalWindowState: 0,
		setModalWindowState: (() => {}),
		currentDate: '',
		taskList: [],
		setTask: (() => {})
	}) => {

	const [currentTag, setCurrentTag] = useState('other');
	const [selectedTag, setSelectedTag] = useState('');
	const [currentName, setCurrentName] = useState('');

	const inputRef = useRef<HTMLInputElement>(null);
	const dateInputRef = useRef<HTMLInputElement>(null);
	const dateLabelRef = useRef<HTMLLabelElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	let newTaskWindowClass: string;

	if (modalWindowState === 2) {
		newTaskWindowClass = 'new_task_window';
	} else {
		newTaskWindowClass = 'new_task_window new_task_window--hidden';
	}

    const restoreButtonState = () => {
		buttonRef.current!.className = 'button button--apply button--disabled';
		buttonRef.current!.disabled = true;
	}

    if (inputRef.current) {

		inputRef.current.value = currentName;
		if (inputRef.current.value === '') {
			restoreButtonState();
		}
	}


	const showDatePicker = useCallback(() => {

		if (dateInputRef.current) {
      		dateInputRef.current.showPicker();
    	}
  	}, []);

  	const selectDate = useCallback(() => {

		if (dateLabelRef.current && dateInputRef.current) {
      		dateLabelRef.current.innerHTML = dateInputRef.current.value.slice(0, 10).split("-").reverse().join(".");
    	}
  	}, []);

  	const cancelClick = useCallback(() => {
  		setCurrentName('');
  		restoreButtonState();
  		setSelectedTag('');
    	setModalWindowState(0);
  	}, [setSelectedTag, setModalWindowState, setCurrentName]);

  	const aprooveNewTask = useCallback(() => {

  		let name: string = inputRef.current!.value;
		setCurrentName(name);

    	if (name) {
    		buttonRef.current!.className = 'button button--apply button--enabled';
    		buttonRef.current!.disabled = false;
    	} else {
    		restoreButtonState();
    	}
  	}, [setCurrentName]);

  	const applyClick = useCallback(() => {

  		const searchPattern: string = localStorage.getItem('searchPattern')||'';
  		const newItemData: string = dateLabelRef.current!.innerHTML||'';
  		let newId: number = taskList.length + 1;
        
	    for (let index: number = 0; index <= taskList.length - 1; index++) {
	        if ((taskList.find(task => task.id === index + 1)) === undefined) {
	            newId = index + 1; 
	            break;
	        }
	    }

    	if (inputRef.current) {

    		let newTask: ItemInterface = {
    			id: newId, 
    			name: inputRef.current.value,
    			isCompleted: false,
    			tag: currentTag,
    			plannedDate: newItemData,
    			filter: false
    		}

    		if (newTask.name?.match(searchPattern)) {
            	newTask.filter = true;
        	}

        	setCurrentName('')
        	setSelectedTag('');
			restoreButtonState();
      		PostNewDataIntoServer(newTask);
      		setTask([...taskList, newTask]);
    	}

    	setModalWindowState(0);

  	}, [taskList, currentTag, setSelectedTag, setModalWindowState, setTask, setCurrentName]);

	const result = 
	<div className={ newTaskWindowClass }> 
		<label 
			className='head__label'>
			Add New Item
		</label>
		<NewTaskInput 
			aprooveNewTask={ aprooveNewTask } 
			inputRef={ inputRef }/>
		<TagHolder 
			setTag={ setCurrentTag } 
			selectedTag={ selectedTag } 
			setSelectedTag={ setSelectedTag }/>
		<label 
			htmlFor="date-input"
			className='date'
			ref={ dateLabelRef }
			onClick={ showDatePicker }>
			{ currentDate }
		</label>
		<input 
			id='date-input'
			className='date_input'
			type='date'
			onChange={ selectDate }
			ref={ dateInputRef }/>
		<button 
			className='button button--cancel' 
			onClick={ cancelClick }>
			Cancel
		</button>
		<button 
			className='button button--apply button--disabled'
			onClick={ applyClick }
			disabled={ false }
			ref={ buttonRef }>
			Add Task
		</button>
	</div>
	
	return result;
}