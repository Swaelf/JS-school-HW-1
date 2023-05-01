import React, { useState, useCallback, useRef, RefObject } from 'react';
import { TagElement } from '../TagElement';

import './index.css';

export const NewTaskAddition = (
	{ 
		setTag,
		selectedTag,
		setSelectedTag
	}: { 
		setTag?: React.Dispatch<React.SetStateAction<string>>,
		selectedTag?: any,
		setSelectedTag?: any
	} = {
		setTag: (() => {}),
		selectedTag: '',
		setSelectedTag: (() => {})
	}) => {
	const tagNames: string[] = ['home', 'work', 'health', 'other']; 

	const result = 
	<div className='additions'> 
		{tagNames.map((tag, index) => {
        	return <TagElement 
        		key={ tag } 
        		tag={ tag }
        		text={ tagNames[index] }
        		setTag={ setTag }
        		selectedTag={ selectedTag }
        		setSelectedTag={ setSelectedTag }/>
			}
      	)}
		
	</div>
	
	return result;
}