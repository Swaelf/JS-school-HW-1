import { useCallback } from 'react';
import { Button } from '../Button';
import { Label } from '../Label';
import { CurrentTaskList } from '../CurrentTaskList';
import Interface from './Interface';

import './index.css';

export const ModalNewDay = (props: Interface) => {

	const currentDate: string = new Date().toJSON().slice(0, 10).split("-").reverse().join(".");

	let newDayWindowClass: string;

	if (props.modalWindowState === 1) {
		newDayWindowClass = 'new_day_window';
	} else {
		newDayWindowClass = 'new_day_window new_day_window--hidden';
	}

  	const handleClick = useCallback(() => {
    	props.setModalWindowState(0);
    	localStorage.setItem('currentDate', currentDate);
    	// eslint-disable-next-line
  	}, [ currentDate ]); //setModalWindowState is a function and shall not change
	
	return (
	<div className={ newDayWindowClass }> 
		<Label 
			className="head__label"
			text='Good Morning'/>
		<Label 
			className="tasklist__label"
			text='You have the next planned tasks for today:'/>
		<CurrentTaskList
			taskList={ props.taskList }/>
		<Button 
			className="button__ok" 
			onClick={ handleClick }
			text='OK'/>
	</div>)
};

ModalNewDay.defaultProps = {
  	modalWindowState: 0,
  	setModalWindowState: (() => {}), 
  	taskList: []
};