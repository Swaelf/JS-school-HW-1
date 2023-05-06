import { useState, useEffect } from 'react';
import LocateMe from '../../Functions/LocateMe';
import { Label } from '../Label';
import { Icon } from '../Icon'
import Interface from './Interface';

import './index.css';

const config = require ('../../config.json');

export const WeatherWidget = () => {

	const [temperature, setTemperature] = useState('??');
	const [location, setLocation] = useState(config.defaultCity)
	const [icon, setIcon] = useState(config.weathericon)

   useEffect(() => {
    	let isMounted = true;

		LocateMe().then((pos: unknown) => {
	      if (isMounted && pos) {
	      	let weather = pos as Interface;
	      	setTemperature(weather.current.temp_c);
	      	setLocation(weather.location.name);
	      	setIcon(weather.current.condition.icon);
	      }
	    });

	    return () => {
      		isMounted = false;
    	}

  	}, []); //we call it only once

	
	return (
	<div className='widget'> 
		<Icon 
			className='widget__icon' 
			icon={ `url(${icon})` }/>
		<Label 
			className='text text--temperature'
			text={ temperature}/>
		<Label 
			className='text text--city'
			text={ location }/>
	</div>)
}