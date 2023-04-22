import Component from './base.js';  
import Label from './Label.js';   
import './TagHolder.css';

export default class TagHolder extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props) {
        return super.render({
            class: 'tasks__tagholder',
            htmltext: props.htmltext,
            id: props.id,
            style: props.style,
            children: [
                new Label().render({
                    id: props.prefix + 'Tag_' + props.i,
                    text: 'tag',
                    class: 'tags__item' + props.tagState
                }),
                new Label().render({
                    id: props.prefix + 'Time_' + props.i,
                    text: 'time',
                    class: 'tags__item tags__item--time'
                })
            ]   
        });
    }
}