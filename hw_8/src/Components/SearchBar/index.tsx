import { useCallback, useRef } from 'react';

import { Button } from '../Button';
import { Search } from '../Search';

import { ModalNewTask } from '../ModalNewTask';

import Interface from './Interface';

import './index.css';

export const SearchBar = (props: Interface) => {

	const searchRef = useRef<HTMLInputElement>(null);

	const handleClick = useCallback(() => {
    	props.setModalWindowState(2);
    	// eslint-disable-next-line
  	}, []); //setModalWindowState is a function and shall not change

  	const handleSearch = useCallback(() => {

  		if (searchRef && searchRef.current) {
  			props.setSearchPattern(searchRef.current.value);
		} 
		// eslint-disable-next-line
  	}, []); //setSearchPattern is a function and shall not change

	return (
	<div className='searchbar'> 
		<Search 
			className='search__string' 
			onChange={ handleSearch } 
			placeholder='Search Task'
			inputRef={ searchRef }/>
		<Button 
			className='button__add' 
			onClick={ handleClick }
			text='+ New Task'/>
		<ModalNewTask 
        	modalWindowState={ props.modalWindowState } 
        	setModalWindowState={ props.setModalWindowState } 
        	taskList={ props.taskList } 
        	setTaskList={ props.setTaskList }/> 
	</div>)
};

SearchBar.defaultProps = {
  	modalWindowState: 0,
  	setModalWindowState: (() => {}), 
  	taskList: [],
  	setTaskList: (() => {}),
  	searchPattern: '',
  	setSearchPattern: (() => {})
};