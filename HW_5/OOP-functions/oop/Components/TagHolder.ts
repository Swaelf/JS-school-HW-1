import Component from './base.ts';  
import Label from './Label.ts'; 

import Properities from '../Interfaces/Properities'; 

import './css/TagHolder.css';

export default class TagHolder extends Component {
    element: HTMLDivElement;      

    constructor() {
        super();
        this.element = document.createElement('div') as HTMLDivElement;
    }

    render(props: Properities) {
        return super.render({
            class: 'tasks__tagholder',
            htmltext: props.htmltext,
            children: [
                new Label().render({
                    text: props.item.tag,
                    class: 'tags__item' + props.tagState
                }),
                new Label().render({
                    text: props.item.plannedDate,
                    class: 'tags__item tags__item--time'
                })
            ]   
        });
    }
}
