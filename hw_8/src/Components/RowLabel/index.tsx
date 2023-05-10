import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Label } from '../Label';
import { TagElement } from '../TagElement';

import Interface from './Interface';

import './index.css';

export const RowLabel = ( props: Interface ) => {

	const location = useLocation();
	const navigate = useNavigate();
	const channel = new BroadcastChannel("ToDoApp");

	const handleClick = useCallback(() => {
		
		if (location.pathname.indexOf(props.task.tag as string) !== -1) {
			navigate( location.pathname.replace('/' + props.task.tag as string, '') + location.search );
			channel.postMessage({ path: location.pathname.replace('/' + props.task.tag as string, '') + location.search });
		} else {
	    	navigate( location.pathname + '/' + props.task.tag + location.search );
	    	channel.postMessage({ path: location.pathname + '/' + props.task.tag + location.search });
    	}

    	// eslint-disable-next-line
  	}, [location]); 
	

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