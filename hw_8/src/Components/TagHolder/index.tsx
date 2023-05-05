import React from 'react';
import { TagElement } from '../TagElement';
import Interface from './Interface';

import './index.css';

export const TagHolder = (props: Interface) => {

	const tagNames: string[] = ['home', 'work', 'health', 'other']; 

	return (
	<div className='tagholder'> 
		{ tagNames.map((tag, index) => {
        	return <TagElement 
        		key={ tag } 
        		tag={ tag }
        		text={ tagNames[index] }
        		setTag={ props.setTag }
        		selectedTag={ props.selectedTag }
        		setSelectedTag={ props.setSelectedTag }/>
			}
      	) }
		
	</div>)
};

TagHolder.defaultProps = {
  	setTag: (() => {}),
  	selectedTag: 'other',
  	setSelectedTag: (() => {})
};