import { useCallback } from 'react';
import { Button } from '../Button';
import { Label } from '../Label';
import { CurrentTaskList } from '../CurrentTaskList';
import Interface from './Interface';

import './index.css';

export const ModalNewDay = (props: Interface) => {

  	const handleClick = useCallback(() => {
    	props.setModalWindowState(0);
    	localStorage.setItem('currentDate', props.currentDate);
    	// eslint-disable-next-line
  	}, [ props.currentDate ]); //setModalWindowState is a function and shall not change
	
	return (
	<div className={ (props.modalWindowState === 1) ? 'new_day_window': 'new_day_window new_day_window--hidden' }> 
		<Label 
			className="head__label"
			text='Good Morning'/>
		<Label 
			className="tasklist__label"
			text='You have the next planned tasks for today:'/>
		<CurrentTaskList
			currentDate={ props.currentDate }
			taskList={ props.taskList }/>
		<Button 
			className="button__ok" 
			onClick={ handleClick }
			text='OK'/>
	</div>)
};

ModalNewDay.defaultProps = {
	currentDate: '',
  	modalWindowState: 0,
  	setModalWindowState: (() => {}), 
  	taskList: []
};