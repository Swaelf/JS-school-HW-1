import React from 'react';
import { NewTaskAddition } from '../NewTaskAddition';
import { useState, useCallback, useRef, RefObject, useMemo } from 'react';
import ItemInterface from '../../Interfaces/ItemInterface';
import { NewItemInput } from '../NewItemInput'

import PostNewDataIntoServer from '../../Functions/PostNewDataIntoServer';

import './index.css';

export const NewTaskWindow = (
	{ 
		setFlag, 
		className,
		currentDate,
		taskList,
		setTask
	}: { 
		setFlag: React.Dispatch<React.SetStateAction<number>>, 
		className: string,
		currentDate: string,
		taskList: ItemInterface[],
		setTask: React.Dispatch<React.SetStateAction<ItemInterface[]|null>>
	} = {
		setFlag: (() => {}),
		className: '',
		currentDate: '',
		taskList: [],
		setTask: (() => {})
	}) => {

	//console.log('NewTaskWindow rendered!');

	const [currentTag, setCurrentTag] = useState('other');
	const [selectedTag, setSelectedTag] = useState('');

	let newTask: ItemInterface;

	let currentName: string = '';

	let newId: number = taskList.length + 1;
        
    for (let index: number = 0; index <= taskList.length - 1; index++) {
        if ((taskList.find(task => task.id == index + 1)) == undefined) {
            newId = index + 1; 
            break;
        }
    }

	const inputRef = useRef<HTMLInputElement>(null);
	const dateInputRef = useRef<HTMLInputElement>(null);
	const dateLabelRef = useRef<HTMLLabelElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

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

	const restoreButtonState = () => {
  		    buttonRef.current!.className = 'button button--apply button--disabled';
    		buttonRef.current!.disabled = true;
  	}

	if (inputRef.current) {
		inputRef.current.value = localStorage.getItem('currentName')||'';
		if (inputRef.current.value == '') {
			restoreButtonState();
		}
	}

  	const cancelClick = useCallback(() => {
  		localStorage.setItem('currentName', '');
  		restoreButtonState();
  		setSelectedTag('');
    	setFlag(0);
  	}, []);

  	const aprooveNewTask = useCallback(() => {
    	console.log('aproove');
		currentName = inputRef.current!.value;
		localStorage.setItem('currentName', currentName);
    	if (currentName) {
    		buttonRef.current!.className = 'button button--apply button--enabled';
    		buttonRef.current!.disabled = false;
    	} else {
    		restoreButtonState();
    	}
  	}, []);

  	const applyClick = useCallback(() => {
  		setFlag(0);
  		let searchPattern: string = localStorage.getItem('searchPattern')||'';
  		const newItemData: string = dateLabelRef.current!.innerHTML||'';

    	if (inputRef.current) {
    		newTask = {
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
        	localStorage.setItem('currentName', '');
        	setSelectedTag('');
			restoreButtonState();
      		console.log(newTask);
      		PostNewDataIntoServer(newTask);
      		setTask([...taskList, newTask]);
    	}
  	}, [taskList, currentTag]);

	const result = 
	<div className={ className }> 
		<label 
			className='head__label'>
			Add New Item
		</label>
		<NewItemInput 
			aprooveNewTask={ aprooveNewTask } 
			inputRef={ inputRef }/>
		<NewTaskAddition 
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