import { useCallback } from 'react';
import ItemInterface from '../../Interfaces/ItemInterface';
import SearchByPattern from '../../Functions/SearchByPattern';

import './index.css';

export const SearchBar = (
	{ 
		setModalWindowState, 
		taskList,
		setTask,
		searchRef
	}: { 
		setModalWindowState: React.Dispatch<React.SetStateAction<number>>, 
		taskList: ItemInterface[],
		setTask: React.Dispatch<React.SetStateAction<ItemInterface[]|null>>,
		searchRef: React.RefObject<HTMLInputElement>|null
	} = {
		setModalWindowState: (() => {}),
		taskList: [],
		setTask: (() => {}),
		searchRef: null
	}) => {

	const handleClick = useCallback(() => {
    	setModalWindowState(2);
  	}, [setModalWindowState]);

  	const handleSearch = useCallback(() => {
  		let searchPattern: string = '';

  		if (searchRef && searchRef.current) {
  			searchPattern = searchRef.current.value
			localStorage.setItem('searchPattern', searchPattern);
		} 

  		let newTaskList: ItemInterface[] = SearchByPattern(taskList, searchPattern);
  		setTask([...newTaskList]);
  	}, [taskList, setTask, searchRef]);

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