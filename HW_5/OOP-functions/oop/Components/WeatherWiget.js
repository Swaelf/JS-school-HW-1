import Component from './base.js';  
import Label from './Label.js';  
import DivElement from './DivElement.js';   
import './WeatherWiget.css';

export default class WeatherWiget extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');   
        this.state = {
            weatherUrl: 'https://api.weatherapi.com/v1',
            weatherKey: 'd9e8739732f24f7f942112753231504'
        };   
    }

    render(props) {

        this.WeatherCall();

        const weather = {
            position: localStorage.getItem('positionGPS'),
            temperature: localStorage.getItem('temperature'),
            icon: localStorage.getItem('weathericon')
        }

        return super.render({
            id: 'topLabelWidget',
            class: 'toplabelbox__widget',
            children: [
                new DivElement().render({
                    id: 'topLabelIcon',
                    class: 'widget__icon',
                    style: 'background-image: url(' + weather.icon + ');',
                    children: []
                }),
                new Label().render({
                    id: 'topLabelTemperature',
                    text: weather.temperature + '&#176',
                    class: 'toplabelbox__text widget__text--temperature'
                }),
                new Label().render({
                    id: 'topLabelCity',
                    text: weather.position,
                    class: 'toplabelbox__text widget__text--city'
                }),

            ]
        });
    }

    WeatherCall = async () => {
        if (localStorage.getItem("weatherForLoad") == 'true') {
            localStorage.setItem("weatherForLoad", false);
            const response = await fetch(
                this.state.weatherUrl + '/current.json?key=' + this.state.weatherKey + '&q=' + localStorage.getItem("positionGPS")
                )
                .then(response => response.json())
                .then(response => {
                    localStorage.setItem("positionGPS", response.location.name);   
                    localStorage.setItem('temperature', response.current.temp_c);
                    localStorage.setItem('icon', response.current.condition.icon.replace('//cdn.weatherapi.com', 'icons'));
                    console.log('weatherLoad = ok'); 
                    this.update(); 
                });
        } else {
            console.log('weatherLoad = skip')
        }
    }
}