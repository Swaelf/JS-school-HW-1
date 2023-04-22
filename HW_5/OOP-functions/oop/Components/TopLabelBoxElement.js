import Component from './base.js';  
import Label from './Label.js';  
import WeatherWiget from './WeatherWiget.js';  
import './TopLabelBoxElement.css';

export default class TopLabelBoxElement extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props) {
        return super.render({
            id: 'topLabelBox',
            class: 'toplabelbox__container',
            children: [
                new Label().render({
                    id: 'ToDoLabel',
                    text: 'To Do List',
                    class: 'toplabelbox__label'
                }),
                new WeatherWiget().render()
            ]
        });
    }
}