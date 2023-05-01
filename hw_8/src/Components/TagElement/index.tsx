import { useState, useCallback, useRef, RefObject } from 'react';

import './index.css';

export const TagElement = (
	{ 
		tag, 
		text,
		setTag,
		selectedTag,
		setSelectedTag
	}: { 
		tag?: string, 
		text?: string,
		setTag?: React.Dispatch<React.SetStateAction<string>>,
		selectedTag?: string,
		setSelectedTag?: any
	} = {
		tag: 'other', 
		text: 'other',
		setTag: (() => {}),
		selectedTag: '',
		setSelectedTag: (() => {})
	}) => {
	
	let tagClass: string = 'tag tag--' + tag;

	if (tag == selectedTag) {
		tagClass = tagClass + ' tag--selected';
	}
	
	//console.log(tagClass)

 
	const handleClick = useCallback(() => {
    	if (setTag && tag) {setTag(tag)};
    	if (setSelectedTag && tag) {setSelectedTag(tag)};
  	}, []);
	
	const result = 
	<label 
		className={ tagClass } 
		onClick={ handleClick }>
		{text}
	</label> 
	
	return result;
}