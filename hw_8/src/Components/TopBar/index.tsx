import { WeatherWidget } from '../WeatherWidget';

import './index.css';

export const TopBar = () => {
	
	const result = 
	<div className='topbar'> 
		To Do List
		<WeatherWidget/>
	</div>
	
	return result;
}