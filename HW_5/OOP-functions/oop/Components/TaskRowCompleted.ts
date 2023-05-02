import Component from './base.ts';   
import Input from './Input.ts';  
import Button from './Button.ts'; 
import LabelContainer from './LabelContainer.ts'; 

import Properities from '../Interfaces/Properities'; 

import './css/TaskRow.css';

export default class TaskRowCompeted extends Component {
    element: HTMLDivElement;    

    constructor() {
        super();
        this.element = document.createElement('div') as HTMLDivElement;
    }

    render(props: Properities) {
        return super.render({
            class: 'tasks__row',
            htmltext: props.htmltext,
            children: [
                new Input().render({
                    text: props.item.name,
                    class: 'task__checkbox',
                    type: 'checkbox',
                    onChange: props.onChange,
                    checked: true
                }),
                new LabelContainer().render({
                    class: 'tasks__labelcontainer',
                    labelState: ' task--complete',
                    tagState: ' tags__item--inactive',
                    prefix: 'Complete',
                    item: props.item
                }),
                new Button().render({
                    class: 'button__remove button--disabled',
                })
            ]
        });
    }
}