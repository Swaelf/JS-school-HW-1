import { useCallback, useRef } from 'react';
import ItemInterface from '../../Interfaces/ItemInterface';

import './index.css';

export const SearchBar = (
	{ 
		setModalWindowState, 
		taskList,
		setTask,
		searchPattern,
		setSearchPattern
	}: { 
		setModalWindowState: React.Dispatch<React.SetStateAction<number>>, 
		taskList: ItemInterface[],
		setTask: React.Dispatch<React.SetStateAction<ItemInterface[]>>,
		searchPattern: string,
		setSearchPattern: React.Dispatch<React.SetStateAction<string>>
	} = {
		setModalWindowState: (() => {}),
		taskList: [],
		setTask: (() => {}),
		searchPattern: '',
		setSearchPattern: (() => {})
	}) => {

	const searchRef = useRef<HTMLInputElement>(null);

	const handleClick = useCallback(() => {
    	setModalWindowState(2);
  	}, [setModalWindowState]);

  	const handleSearch = useCallback(() => {

  		if (searchRef && searchRef.current) {
  			setSearchPattern(searchRef.current.value);
		} 

  	}, [ setSearchPattern]);

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