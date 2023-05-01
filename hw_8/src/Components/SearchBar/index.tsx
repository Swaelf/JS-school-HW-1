import { useCallback, useRef, RefObject } from 'react';
import ItemInterface from '../../Interfaces/ItemInterface';
import SearchByPattern from '../../Functions/SearchByPattern';

import './index.css';

export const SearchBar = (
	{ 
		setFlag, 
		taskList,
		setTask
	}: { 
		setFlag: React.Dispatch<React.SetStateAction<number>>, 
		taskList: ItemInterface[],
		setTask: React.Dispatch<React.SetStateAction<ItemInterface[]|null>>
	} = {
		setFlag: (() => {}),
		taskList: [],
		setTask: (() => {})
	}) => {
	
	const handleClick = useCallback(() => {
    	setFlag(2);
  	}, []);

  	const searchRef = useRef<HTMLInputElement>(null);

  	const handleSearch = useCallback(() => {
  		console.log('search')
  		if (searchRef.current != null) {
  			localStorage.setItem('searchPattern', searchRef.current.value);
		} else {
			localStorage.setItem('searchPattern', '');
		}
  		let newTaskList: ItemInterface[] = SearchByPattern(taskList);
  		setTask([...newTaskList]);
  	}, [taskList]);

	const result = 
	<div className='searchbar'> 
		<input 
			className='search__string' 
			onChange={ handleSearch } 
			ref={ searchRef }/>
		<button 
			className='button__add' 
			onClick={handleClick}>
			+ New Task
		</button>
	</div>
	
	return result;
}