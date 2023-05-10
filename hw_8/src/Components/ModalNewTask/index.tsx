import React from 'react';
import { TagHolder } from '../TagHolder';
import { useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ItemInterface from '../../Interfaces/ItemInterface';
import { Input } from '../Input';
import { DateSelect } from '../DateSelect';
import { Button } from '../Button';
import { Label } from '../Label';
import { addItem } from '../../actions/addItem';

import { Routes, Route, useLocation } from 'react-router-dom';

import Interface from './Interface';

import PostNewDataIntoServer from '../../Functions/PostNewDataIntoServer';

import './index.css';

export const ModalNewTask = (props: Interface) => {

	const dispatch = useDispatch();
	const data: any = useSelector(state => state);
	const tasks: ItemInterface[] = data.tasks as ItemInterface[];

	const location = useLocation();

	const [selectedTag, setSelectedTag] = useState('other');
	const [currentName, setCurrentName] = useState('');

	const inputRef = useRef<HTMLInputElement>(null);
	const labelRef = useRef<HTMLLabelElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

    if (inputRef.current) {
		inputRef.current.value = currentName;
	}


  	const cancelClick = useCallback(() => {
  		setCurrentName('');
  		setSelectedTag('other');
    	// eslint-disable-next-line
  	}, []); //setModalWindowState, setCurrentTag and setCurrentName are functions and shall not change


  	const aprooveName = useCallback(() => {
		setCurrentName(inputRef.current ? inputRef.current.value: '');
    	// eslint-disable-next-line
  	}, []); //setCurrentName is a function and shall not change


  	const addTask = useCallback(() => {

  		let id: number = tasks.length + 1;

	    for (let index: number = 0; index <= tasks.length - 1; index++) {
	        if ((tasks.find(task => task.id === index + 1)) === undefined) {
	            id = index + 1; 
	            break;
	        }
	    }

    	if (inputRef.current) {

    		let newTask: ItemInterface = {
    			name: inputRef.current.value,
    			id: id,
    			isCompleted: false,
    			plannedDate: labelRef.current!.innerHTML||'',
    			tag: selectedTag,
    			filter: false
    		}

      		PostNewDataIntoServer(newTask);
      		dispatch(addItem(newTask));
      		setCurrentName('');
        	setSelectedTag('other');
    	}
		// eslint-disable-next-line
  	}, [ selectedTag, tasks ]); //setModalWindowState, setCurrentTag, setTaskList, setSelectedTag and setCurrentName are functions and shall not change

//<div className={ (props.modalWindowState === 2) ? 'new_task_window' : 'new_task_window new_task_window--hidden' }> 
			
	return ( 
	<Routes>
	  	<Route path='/NewTask/*' element={
	  		<div className='screenlock'>
			<div className='new_task_window'> 
				<Label 
					className='head__label'
					text='Add New Item'/>
				<Input 
					onChange={ aprooveName } 
					inputRef={ inputRef }/>
				<TagHolder 
					selectedTag={ selectedTag } 
					setSelectedTag={ setSelectedTag }/>
				<DateSelect
					currentDate={ props.currentDate }
					inputRef={ inputRef }
					labelRef={ labelRef }
					/>
				<Button 
					className='button button--cancel' 
					to={ location.pathname.replace('/NewTask', '') + location.search}
					onClick={ cancelClick }
					text='Cancel'/>
				<Button 
					className={ (currentName === '') ? 'button button--apply button--disabled' : 'button button--apply button--enabled' }
					onClick={ addTask }
					to={ location.pathname.replace('/NewTask', '') + location.search}
					disabled={ (currentName === '') ? true : false }
					buttonRef={ buttonRef }
					text='Add Task'/>
			</div>
			</div>}/>
	</Routes>)
};

ModalNewTask.defaultProps = {
	currentDate: '',
  	modalWindowState: 0,
  	setModalWindowState: (() => {}), 
  	taskList: [],
  	setTaskList: (() => {})
};