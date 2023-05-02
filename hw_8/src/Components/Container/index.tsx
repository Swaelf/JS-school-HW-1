import { TopBar } from '../TopBar';
import { SearchBar } from '../SearchBar';
import { TaskBar } from '../TaskBar';
import React from 'react';
import ItemInterface from '../../Interfaces/ItemInterface';


import './index.css';

export const Container = (
	{ 
		modalWindowState,
		setModalWindowState, 
		taskList, 
		setTask
	}: { 
		modalWindowState: number,
		setModalWindowState: React.Dispatch<React.SetStateAction<number>>, 
		taskList: ItemInterface[], 
		setTask: React.Dispatch<React.SetStateAction<ItemInterface[]|null>>
	} = {
		modalWindowState: 0, 
		setModalWindowState: (() => {}), 
		taskList: [],
		setTask: (() => {})
	}) => {

	const result = 
	<div className='container'> 
		<TopBar/>
		<SearchBar 
			setModalWindowState={ setModalWindowState } 
			taskList={ taskList } 
			setTask={ setTask }/>
		<TaskBar 
			taskList={ taskList } 
			setTask={ setTask }/>
	</div>
	
	return result;
}