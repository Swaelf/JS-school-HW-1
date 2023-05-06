import { useCallback } from 'react';
import Interface from './Interface';
import { Label } from '../Label'

import './index.css';

export const TagElement = (props: Interface) => {
	
	let tagClass: string = 'tag tag--' + props.tag;

	if (props.tag === props.selectedTag) {
		tagClass = tagClass + ' tag--selected';
	}
	
	const handleClick = useCallback(() => {
    	if (props.setTag && props.tag) {props.setTag(props.tag)};
    	if (props.setSelectedTag && props.tag) {props.setSelectedTag(props.tag)};
    	// eslint-disable-next-line
  	}, []); //setSelectedTag and setTag are functions and shall not change, tag is static parameter and shall not change
	
	return (
	<Label 
		className={ tagClass } 
		onClick={ handleClick }
		text={ props.text }/>
	);
};

TagElement.defaultProps = {
  	setTag: (() => {}),
  	selectedTag: '',
  	setSelectedTag: (() => {}),
  	tag: 'other', 
  	text: 'other'	
};