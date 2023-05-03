import React, { useCallback, useRef } from 'react';

import './index.css';

export const DateSelect = (
	{ 
		currentDate,
		inputRef,
		labelRef
	}: { 
		currentDate: string,
		inputRef?: React.RefObject<HTMLInputElement>|null,
		labelRef?: React.RefObject<HTMLLabelElement>|null
	} = {
		currentDate: '',
		inputRef: null,
		labelRef: null
	}) => {

	const dateInputRef = useRef<HTMLInputElement>(null);

	const showDatePicker = useCallback(() => {

		if (dateInputRef.current) {
      		dateInputRef.current.showPicker();
    	}
  	}, []);

  	const selectDate = useCallback(() => {

		if (labelRef && labelRef.current && dateInputRef.current) {
      		labelRef.current.innerHTML = dateInputRef.current.value.slice(0, 10).split("-").reverse().join(".");
    	}
  	}, [labelRef]);

	return (
	<div className='input__container'> 
		<label 
			htmlFor="date-input"
			className='date'
			ref={ labelRef }
			onClick={ showDatePicker }>
			{ currentDate }
		</label>
		<input 
			id='date-input'
			className='date_input'
			type='date'
			onChange={ selectDate }
			ref={ dateInputRef }/>
	</div>)
}