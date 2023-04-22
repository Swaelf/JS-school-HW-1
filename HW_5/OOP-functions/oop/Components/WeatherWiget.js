import Component from './base.js';  
import Label from './Label.js';  
import DivElement from './DivElement.js';   
import './WeatherWiget.css';

export default class WeatherWiget extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');      
    }

    render(props) {

        return super.render({
            id: 'topLabelWidget',
            class: 'toplabelbox__widget',
            style: props.style,
            children: [
                new DivElement().render({
                    id: 'topLabelIcon',
                    class: 'widget__icon',
                    style: 'background-image: url(' + props.weather.icon + ');',
                    children: []
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