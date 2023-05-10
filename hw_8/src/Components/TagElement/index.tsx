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

    	if (props.onClick && props.onClickParameter) {
    		props.onClick(props.onClickParameter)
    	} else {
    		props.onClick();
    	};
    	// eslint-disable-next-line
  	}, [props.onClick, props.onClickParameter]); //setSelectedTag and setTag are functions and shall not change, tag is static parameter and shall not change
	
	return (
	<Label 
		className={ tagClass } 
		onClick={ handleClick }
		text={ props.text }/>
	);
};

TagElement.defaultProps = {
  	selectedTag: '',
  	onClick: (() => {}),
  	tag: 'other', 
  	text: 'other',
  	onClickParameter: ''	
};