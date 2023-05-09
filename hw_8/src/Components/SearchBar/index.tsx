import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../Button';
import { Search } from '../Search';
import { ModalNewTask } from '../ModalNewTask';

import SearchByPattern from '../../Functions/SearchByPattern';

import ItemInterface from '../../Interfaces/ItemInterface';

import { updateTasks } from '../../actions/updateTasks';

import Interface from './Interface';

import './index.css';

export const SearchBar = (props: Interface) => {

	const searchRef = useRef<HTMLInputElement>(null);

	const dispatch = useDispatch();
	const tasks: any = useSelector((state: any) => state.tasks);


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
	</div>)
};

SearchBar.defaultProps = {
	currentDate: '',
  	modalWindowState: 0,
  	setModalWindowState: (() => {}), 
  	taskList: [],
  	setTaskList: (() => {}),
  	searchPattern: '',
  	setSearchPattern: (() => {})
};