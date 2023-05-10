import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';

import { TagHolder } from '../TagHolder';
import { Input } from '../Input';
import { DateSelect } from '../DateSelect';
import { Button } from '../Button';
import { Label } from '../Label';

import { updateTasks } from '../../actions/updateTasks';

import ItemInterface from '../../Interfaces/ItemInterface';
import Interface from './Interface';

import PostNewDataIntoServer from '../../Functions/PostNewDataIntoServer';
import UpdateDataOnServer from '../../Functions/UpdateDataOnServer';

import './index.css';

export const ModalTask = (props: Interface) => {

	const dispatch = useDispatch();
	const data: any = useSelector(state => state);
	const tasks: ItemInterface[] = data.tasks as ItemInterface[];

	const location = useLocation();
	const channel = new BroadcastChannel("ToDoApp");

	const [selectedTag, setSelectedTag] = useState('other');
	const [currentName, setCurrentName] = useState('');
	const [plannedDate, setPlannedDate] = useState(props.currentDate);
	const [labelName, setLabelName] = useState('Add New Item');

	const inputRef = useRef<HTMLInputElement>(null);
	const labelRef = useRef<HTMLLabelElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {

	    if ((location.pathname.indexOf('/ModalTask') !== -1) && (location.pathname.indexOf('/ModalTask') + 11 < location.pathname.indexOf('/tasks'))) {

			let index: number = location.pathname.substring(11, location.pathname.indexOf('/tasks')) as unknown as number - 1;

			setLabelName('Edit Task');
			
			setCurrentName(tasks[index].name as string);
			setSelectedTag(tasks[index].tag as string);	 
			setPlannedDate(tasks[index].plannedDate as string)

			if (inputRef.current) {
				inputRef.current.value = tasks[index].name as string;
			}
		}

	    // eslint-disable-next-line
	}, [location]); 
 

  	const cancelClick = useCallback(() => {
  		setCurrentName('');
  		setSelectedTag('other');
  		setPlannedDate(props.currentDate);
  		setLabelName('Add New Item');

  		channel.postMessage({ path: location.pathname.substring(location.pathname.indexOf('/tasks'), location.pathname.length) + location.search, tasks: tasks });
    	// eslint-disable-next-line
  	}, [ props.currentDate, location, tasks ]);


  	const aprooveName = useCallback(() => {
		setCurrentName(inputRef.current ? inputRef.current.value: '');

    	// eslint-disable-next-line
  	}, []); //setCurrentName is a function and shall not change


  	const editTask = useCallback(() => {

  		let index: number = location.pathname.substring(11, location.pathname.indexOf('/tasks')) as unknown as number - 1;

    	if (inputRef.current) {

    		tasks[index].name = inputRef.current.value;
    		tasks[index].plannedDate = labelRef.current!.innerHTML||'';
    		tasks[index].tag = selectedTag;

      		UpdateDataOnServer(tasks[index]);
      		dispatch(updateTasks([...tasks]));
      		setCurrentName('');
        	setSelectedTag('other');
        	setPlannedDate(props.currentDate);
        	setLabelName('Add New Item');
        	channel.postMessage({ path: location.pathname.substring(location.pathname.indexOf('/tasks'), location.pathname.length) + location.search, tasks: tasks });
    	}

    	// eslint-disable-next-line
  	}, [ selectedTag, tasks, location ]); 



  	const addTask = useCallback(() => {

  		let id: number = tasks.length + 1;

	    for (let idIndex: number = 0; idIndex <= tasks.length - 1; idIndex++) {
	        if ((tasks.find(task => task.id === idIndex + 1)) === undefined) {
	            id = idIndex + 1; 
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
      		dispatch(updateTasks([...tasks, newTask]));
      		setCurrentName('');
        	setSelectedTag('other');
        	setPlannedDate(props.currentDate);
        	setLabelName('Add New Item');
        	channel.postMessage({ path: location.pathname.substring(location.pathname.indexOf('/tasks'), location.pathname.length) + location.search, tasks: [...tasks, newTask] });

    	}

    			// eslint-disable-next-line
  	}, [ selectedTag, tasks, location ]);
			
	return ( 
	<Routes>
	  	<Route path={ '/ModalTask/*' } element={
	  		<div className='screenlock'>
			<div className='new_task_window'> 
				<Label 
					className='head__label'
					text={ labelName }/>
				<Input 
					onChange={ aprooveName } 
					inputRef={ inputRef }/>
				<TagHolder 
					selectedTag={ selectedTag } 
					setSelectedTag={ setSelectedTag }/>
				<DateSelect
					currentDate={ plannedDate }
					inputRef={ inputRef }
					labelRef={ labelRef }
					/>
				<Button 
					className='button button--cancel' 
					to={ location.pathname.substring(location.pathname.indexOf('/tasks'), location.pathname.length) + location.search }
					onClick={ cancelClick }
					text='Cancel'/>
				<Button 
					className={ (currentName === '') ? 'button button--apply button--disabled' : 'button button--apply button--enabled' }
					onClick={ labelName === 'Add New Item' ? addTask : editTask }
					to={ location.pathname.substring(location.pathname.indexOf('/tasks'), location.pathname.length) + location.search}
					disabled={ (currentName === '') ? true : false }
					buttonRef={ buttonRef }
					text={ labelName === 'Add New Item' ? 'Add Task' : 'Edit Task'}/>
			</div>
			</div>}/>
	</Routes>)
};

ModalTask.defaultProps = {
	currentDate: '',
  	modalWindowState: 0,
  	setModalWindowState: (() => {}), 
  	taskList: [],
  	setTaskList: (() => {})
};