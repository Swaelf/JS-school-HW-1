import { useState, useEffect } from 'react';
import LocateMe from '../../Functions/LocateMe';
import WetherResponseInterface from '../../Interfaces/WetherResponseInterface'


import './index.css';

export const WeatherWidget = () => {

	const [temperature, setTemperature] = useState('??');
	const [location, setLocation] = useState('Tbilisi')
	const [icon, setIcon] = useState('icons/weather/64x64/day/113.png')

   useEffect(() => {
    	let isMounted = true;

		LocateMe().then((pos: unknown) => {
	      if (isMounted && pos) {
	      	let weather = pos as WetherResponseInterface;
	      	setTemperature(weather.current.temp_c);
	      	setLocation(weather.location.name);
	      	setIcon(weather.current.condition.icon);
	      }
	    });

	    return () => {
      		isMounted = false;
    	}

  	}, []);

	
	const result = 
	<div className='widget'> 
		<div 
			className='widget__icon' 
			style={{ backgroundImage: `url(${icon})` }}/>
		<label className='text text--temperature'>
			{ temperature}
		</label>
		<label className='text text--city'>
			{ location }
		</label>
	</div>
	
	return result;
}