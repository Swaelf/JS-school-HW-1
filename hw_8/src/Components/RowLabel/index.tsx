import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Label } from '../Label';
import { TagElement } from '../TagElement';
import Interface from './Interface';

import './index.css';

export const RowLabel = ( props: Interface ) => {

	const location = useLocation();
	const navigate = useNavigate();

	const handleClick = useCallback(() => {
		if (decodeURIComponent(location.search.substring(location.search.lastIndexOf('&') + 1, location.search.length)) !== '') {
			navigate(
	    		location.pathname + 
	    		'?q=' +
	    		decodeURIComponent(location.search.substring(3, location.search.lastIndexOf('&'))) + 
	    		'&' + 
	    		''
	    		);
		} else {
	    	navigate(
	    		location.pathname + 
	    		'?q=' +
	    		decodeURIComponent(location.search.substring(3, location.search.lastIndexOf('&'))) + 
	    		'&' + 
	    		props.task.tag
	    		);
    	}
    	// eslint-disable-next-line
  	}, [location]); //setSelectedTag and setTag are functions and shall not change, tag is static parameter and shall not change
	
	return (
	<div className='taskcontent'>
		<Label 
			className={ props.task.isCompleted ? 'taskname taskname--inactive' : 'taskname' }
			text={ props.task.name as string }/>
		<TagElement 
			tag={ props.task.isCompleted ? 'inactive' : props.task.tag as string } 
			text={ props.task.tag }
			onClick={ handleClick }
			/>
		<TagElement 
			tag='time' 
			text={ props.task.plannedDate }/>
	</div>)
};

RowLabel.defaultProps = {
  	task: { filter: false, isCompleted: false, name: '', id: 0, tag: 'other'},
};