import Component from './base.ts';  
import Label from './Label.ts';  
import WeatherWiget from './WeatherWiget.ts'; 

import Properities from '../Interfaces/Properities'; 

import './css/TopLabelBoxElement.css';

export default class TopLabelBoxElement extends Component {
    element: HTMLDivElement;     

    constructor() {
        super();
        this.element = document.createElement('div') as HTMLDivElement;
    }

    render(props: Properities) {

        return super.render({
            id: 'topLabelBox',
            class: 'toplabelbox__container',
            children: [
                new Label().render({
                    id: 'ToDoLabel',
                    text: 'To Do List',
                    class: 'toplabelbox__label'
                }),
                new WeatherWiget().render({
                    id: 'topLabelWidget',
                    class: 'toplabelbox__widget',
                    weather: props.weather
                })
            ]
        });
    }
}