import Component from './base.ts';  
import Label from './Label.ts';  
import WeatherWiget from './WeatherWiget.ts'; 
import Properities from './Properities.ts'; 
import './TopLabelBoxElement.css';

export default class TopLabelBoxElement extends Component {
    props: Properities;
    element: HTMLDivElement;     

    constructor() {
        super();
        this.element = document.createElement('div');
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
                    class: 'toplabelbox__widget'
                })
            ]
        });
    }
}