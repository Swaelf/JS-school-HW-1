import { useCallback, useRef } from 'react';

import { Button } from '../Button';
import { Search } from '../Search';

import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Interface from './Interface';

import './index.css';

export const SearchBar = (props: Interface) => {

	const searchRef = useRef<HTMLInputElement>(null);
	const location = useLocation();
	const navigate = useNavigate();
	const handleClick = useCallback(() => {
    	// eslint-disable-next-line
  	}, []); //setModalWindowState is a function and shall not change

  	const handleSearch = useCallback(() => {
  		if (searchRef && searchRef.current) {
  			
  			navigate(
  				'/tasks?q=' + 
  				encodeURIComponent(searchRef.current.value) + 
  				'&' + 
  				decodeURIComponent(location.search.substring(location.search.lastIndexOf('&') + 1, location.search.length))
  				);
  			//console.log(decodeURIComponent(location.search.substring(0, location.search.lastIndexOf('&'))))
		} 

		// eslint-disable-next-line
  	}, [location]); //setSearchPattern is a function and shall not change

  	return (
	<Routes>
	  	<Route path={'*'} element={
			<div className='searchbar'> 
				<Search 
					className='search__string' 
					onChange={ handleSearch } 
					placeholder='Search Task'
					inputRef={ searchRef }
					value={ decodeURIComponent(location.search.substring(0, location.search.lastIndexOf('&'))).replace('?q=', '') }/>
				<Button 
					className='button__add' 
					to={ location.search ? '/NewTask' + location.pathname + location.search: '/NewTask' }
					onClick={ handleClick }
					text='+ New Task'/>
			</div>}/>
		 </Routes>
	);
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