import Component from './base.ts';   
import Label from './Label.ts';  
import TagHolder from './TagHolder.ts';

import Properities from '../Interfaces/Properities'; 

import './css/LabelContainer.css';

export default class LabelContainer extends Component {
    element: HTMLDivElement;      

    constructor() {
        super();
        this.element = document.createElement('div') as HTMLDivElement;
    }

    render(props: Properities) {
        return super.render({
            class: 'tasks__labelcontainer',
            htmltext: props.htmltext,
            children: [
                new Label().render({
                    text: props.item.name,
                    class: 'task__text' + props.labelState
                }),
                new TagHolder().render({
                    class: 'tasks__tagholder',
                    tagState: props.tagState,
                    item: props.item
                })
            ]
        });
    }
}