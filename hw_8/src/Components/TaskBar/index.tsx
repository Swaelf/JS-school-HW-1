import React from 'react';

import { TaskList} from '../TaskList';

import { Routes, Route } from 'react-router-dom';

//import { ModalEditTask } from '../ModalEditTask';
import { ModalTask } from '../ModalTask';

import Interface from './Interface';

import './index.css';

export const TaskBar = (props: Interface) => {

	return (
		<Routes>
	  	<Route path='*' element={
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
			    <ModalTask 
						currentDate={ props.currentDate }
		        modalWindowState={ props.modalWindowState } 
		        setModalWindowState={ props.setModalWindowState }/> 
		  	</div>}/>
		 </Routes>
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