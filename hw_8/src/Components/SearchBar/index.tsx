import { useCallback, useRef } from 'react';

import { Button } from '../Button';
import { Search } from '../Search';

import { useLocation, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Interface from './Interface';

import './index.css';

export const SearchBar = (props: Interface) => {

	const searchRef = useRef<HTMLInputElement>(null);
	const location = useLocation();
	const navigate = useNavigate();

  	const handleSearch = useCallback(() => {
  		if (searchRef && searchRef.current) {
  			if (searchRef.current.value) {
  				navigate(location.pathname + '?q=' + encodeURIComponent(searchRef.current.value));
  			} else {
  				navigate(location.pathname);
  			}
  		};

		// eslint-disable-next-line
  	}, [location]); 

  	return (
	<Routes>
	  	<Route path={'*'} element={
			<div className='searchbar'> 
				<Search 
					className='search__string' 
					onChange={ handleSearch } 
					placeholder='Search Task'
					inputRef={ searchRef }
					value={ decodeURIComponent(location.search).replace('?q=', '') }/>
				<Button 
					className='button__add' 
					to={ location.search ? '/ModalTask' + location.pathname + location.search: '/ModalTask' + location.pathname }
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