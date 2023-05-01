import { TopBar } from '../TopBar';
import { SearchBar } from '../SearchBar';
import { TaskBar } from '../TaskBar';
import { useRef, RefObject } from 'react';
import ItemInterface from '../../Interfaces/ItemInterface';


import './index.css';

export const Container = (
	{ 
		flag,
		setFlag, 
		taskList, 
		setTask
	}: { 
		flag: number,
		setFlag: React.Dispatch<React.SetStateAction<number>>, 
		taskList: ItemInterface[], 
		setTask: React.Dispatch<React.SetStateAction<ItemInterface[]|null>>
	} = {
		flag: 0, 
		setFlag: (() => {}), 
		taskList: [],
		setTask: (() => {})
	}) => {

	//console.log('Container rendered!');
	//console.log('task image container = ', JSON.stringify(taskList));

	const result = 
	<div className='container'> 
		<TopBar/>
		<SearchBar 
			setFlag={ setFlag } 
			taskList={ taskList } 
			setTask={ setTask }/>
		<TaskBar 
			taskList={ taskList } 
			setTask={ setTask }/>
	</div>
	
	return result;
}