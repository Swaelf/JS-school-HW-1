import React from 'react';
import { TagHolder } from '../TagHolder';
import { useState, useCallback, useRef } from 'react';
import ItemInterface from '../../Interfaces/ItemInterface';
import { Input } from '../Input';
import { DateSelect } from '../DateSelect';
import { Button } from '../Button';
import { Label } from '../Label';

import Interface from './Interface';

import PostNewDataIntoServer from '../../Functions/PostNewDataIntoServer';

import './index.css';

export const ModalNewTask = (props: Interface) => {

	const [currentTag, setCurrentTag] = useState('other');
	const [selectedTag, setSelectedTag] = useState('');
	const [currentName, setCurrentName] = useState('');

	const inputRef = useRef<HTMLInputElement>(null);
	const labelRef = useRef<HTMLLabelElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	let newTaskWindowClass: string;

	if (props.modalWindowState === 2) {
		newTaskWindowClass = 'new_task_window';
	} else {
		newTaskWindowClass = 'new_task_window new_task_window--hidden';
	}

    if (inputRef.current) {
		inputRef.current.value = currentName;
	}

  	const cancelClick = useCallback(() => {
  		setCurrentName('');
  		setCurrentTag('other');
  		setSelectedTag('');
    	props.setModalWindowState(0);
    	// eslint-disable-next-line
  	}, []); //setModalWindowState, setCurrentTag and setCurrentName are functions and shall not change


  	const aprooveName = useCallback(() => {
		setCurrentName(inputRef.current ? inputRef.current.value: '');
    	// eslint-disable-next-line
  	}, []); //setCurrentName is a function and shall not change


  	const addTask = useCallback(() => {

  		let id: number = props.taskList.length + 1;

	    for (let index: number = 0; index <= props.taskList.length - 1; index++) {
	        if ((props.taskList.find(task => task.id === index + 1)) === undefined) {
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

        	setCurrentName('');
        	setSelectedTag('');
        	setCurrentTag('other');
      		PostNewDataIntoServer(newTask);
      		props.setTaskList([...props.taskList, newTask]);
    	}

    	props.setModalWindowState(0);
		// eslint-disable-next-line
  	}, [ props.taskList, currentTag ]); //setModalWindowState, setCurrentTag, setTaskList, setSelectedTag and setCurrentName are functions and shall not change


	return ( 
	<div className={ newTaskWindowClass }> 
		<Label 
			className='head__label'
			text='Add New Item'/>
		<Input 
			onChange={ aprooveName } 
			inputRef={ inputRef }/>
		<TagHolder 
			setTag={ setCurrentTag } 
			selectedTag={ selectedTag } 
			setSelectedTag={ setSelectedTag }/>
		<DateSelect
			inputRef={ inputRef }
			labelRef={ labelRef }
			/>
		<Button 
			className='button button--cancel' 
			onClick={ cancelClick }
			text='Cancel'/>
		<Button 
			className={ (inputRef.current && inputRef.current.value === '') ? 'button button--apply button--disabled': 'button button--apply button--enabled' }
			onClick={ addTask }
			disabled={ (inputRef.current && inputRef.current.value === '') ? true: false }
			buttonRef={ buttonRef }
			text='Add Task'/>
	</div>)
};

ModalNewTask.defaultProps = {
  	modalWindowState: 0,
  	setModalWindowState: (() => {}), 
  	taskList: [],
  	setTaskList: (() => {})
};