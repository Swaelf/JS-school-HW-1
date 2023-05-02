import { useCallback, useRef } from 'react';
import ItemInterface from '../../Interfaces/ItemInterface';
import SearchByPattern from '../../Functions/SearchByPattern';

import './index.css';

export const SearchBar = (
	{ 
		setModalWindowState, 
		taskList,
		setTask
	}: { 
		setModalWindowState: React.Dispatch<React.SetStateAction<number>>, 
		taskList: ItemInterface[],
		setTask: React.Dispatch<React.SetStateAction<ItemInterface[]|null>>
	} = {
		setModalWindowState: (() => {}),
		taskList: [],
		setTask: (() => {})
	}) => {

	const searchRef = useRef<HTMLInputElement>(null);


	const handleClick = useCallback(() => {
    	setModalWindowState(2);
  	}, [setModalWindowState]);

  	const handleSearch = useCallback(() => {

  		if (searchRef.current != null) {
  			localStorage.setItem('searchPattern', searchRef.current.value);
		} else {
			localStorage.setItem('searchPattern', '');
		}
  		let newTaskList: ItemInterface[] = SearchByPattern(taskList);
  		setTask([...newTaskList]);
  	}, [taskList, setTask]);

	const result = 
	<div className='searchbar'> 
		<input 
			className='search__string' 
			onChange={ handleSearch } 
			placeholder='Search Task'
			ref={ searchRef }/>
		<button 
			className='button__add' 
			onClick={handleClick}>
			+ New Task
		</button>
	</div>
	
	return result;
}