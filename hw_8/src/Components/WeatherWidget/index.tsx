import { useRef, useState, useEffect } from 'react';
import LocateMe from '../../Functions/LocateMe';

import './index.css';

export const WeatherWidget = () => {

	const [weather, setWeather] = useState(
		{
			temperature: '??',
			location: 'Tbilisi',
			icon: "icons/weather/64x64/day/113.png"
		});

   useEffect(() => {
    	console.error('weather load!');
		LocateMe().then((pos: any) => {
	      if (pos) {
	        setWeather({ 
	        		temperature: pos.current.temp_c,
	        		location: pos.location.name,
	        		icon: pos.current.condition.icon
	        	}
	        );
	      }
	    });
  	}, []);

  	//console.log("WeatherWidget!");
	
	const result = 
	<div className='widget'> 
		<div 
			className='widget__icon' 
			style={{ backgroundImage: `url(${weather.icon})` }}/>
		<label className='text text--temperature'>
			{ weather.temperature}
		</label>
		<label className='text text--city'>
			{ weather.location }
		</label>
	</div>
	
	return result;
}