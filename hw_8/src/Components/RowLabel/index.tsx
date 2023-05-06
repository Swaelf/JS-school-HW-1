import { Label } from '../Label';
import { TagElement } from '../TagElement';
import Interface from './Interface';

import './index.css';

export const RowLabel = ( props: Interface ) => {
	
	return (
	<div className='taskcontent'>
		<Label 
			className={ props.task.isCompleted ? 'taskname taskname--inactive' : 'taskname' }
			text={ props.task.name as string }/>
		<TagElement 
			tag={ props.task.isCompleted ? 'inactive' : props.task.tag as string } 
			text={ props.task.tag }/>
		<TagElement 
			tag='time' 
			text={ props.task.plannedDate }/>
	</div>)
};

RowLabel.defaultProps = {
  	task: { filter: false, isCompleted: false, name: '', id: 0, tag: 'other'},
};