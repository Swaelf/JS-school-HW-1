import React from 'react';

import { TaskList} from '../TaskList';
import ItemInterface from '../../Interfaces/ItemInterface';
import SearchByPattern from '../../Functions/SearchByPattern';
import { ModalEditTask } from '../ModalEditTask';
import { ModalNewTask } from '../ModalNewTask';
import { useDispatch, useSelector } from 'react-redux';
import { updateTasks } from '../../actions/updateTasks';

import Interface from './Interface';

import './index.css';

export const TaskBar = (props: Interface) => {

	return (
	  <div className='taskbar'> 
	  	<TaskList
	  		listName='All Tasks'
	      isCompleted={ false }
	      searchPattern={ props.searchPattern }
	      setModalWindowState={ props.setModalWindowState }/>
	    <TaskList
	  		listName='Completed tasks'
	      isCompleted={ true }
	      searchPattern={ props.searchPattern }
	      setModalWindowState={ props.setModalWindowState }/>
	    <ModalNewTask 
				currentDate={ props.currentDate }
        modalWindowState={ props.modalWindowState } 
        setModalWindowState={ props.setModalWindowState }/> 
	  </div>
	);
	
};

TaskBar.defaultProps = {
  taskList: [],
  setTaskList: (() => {}),
  searchPattern: '',
  currentDate: '',   
  modalWindowState: 0, 
  setModalWindowState: (() => {})
};