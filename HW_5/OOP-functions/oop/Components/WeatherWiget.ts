import Component from './base.ts';  
import Label from './Label.ts';  
import DivElement from './DivElement.ts'; 

import Properities from '../Interfaces/Properities'; 

import './css/WeatherWiget.css';

const config = require ('../appconfig.json');

export default class WeatherWiget extends Component {
    element: HTMLDivElement;   

    constructor() {
        super();
        this.element = document.createElement('div') as HTMLDivElement;   
    }

    render(props: Properities) {

        return super.render({
            id: 'topLabelWidget',
            class: 'toplabelbox__widget',
            children: [
                new DivElement().render({
                    id: 'topLabelIcon',
                    class: 'widget__icon',
                    style: 'background-image: url(' + props.weather.icon + ');',
                }),
                new Label().render({
                    id: 'topLabelTemperature',
                    text: props.weather.temperature + '&#176',
                    class: 'toplabelbox__text widget__text--temperature'
                }),
                new Label().render({
                    id: 'topLabelCity',
                    text: props.weather.position,
                    class: 'toplabelbox__text widget__text--city'
                }),

            ]
        });
    }
}