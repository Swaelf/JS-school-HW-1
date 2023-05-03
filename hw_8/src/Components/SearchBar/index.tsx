import { useCallback, useRef } from 'react';
import ItemInterface from '../../Interfaces/ItemInterface';

import './index.css';

export const SearchBar = (
	{ 
		setModalWindowState, 
		taskList,
		searchPattern,
		setSearchPattern
	}: { 
		setModalWindowState: React.Dispatch<React.SetStateAction<number>>, 
		taskList: ItemInterface[],
		searchPattern: string,
		setSearchPattern: React.Dispatch<React.SetStateAction<string>>
	} = {
		setModalWindowState: (() => {}),
		taskList: [],
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

	return (
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
	</div>)
}