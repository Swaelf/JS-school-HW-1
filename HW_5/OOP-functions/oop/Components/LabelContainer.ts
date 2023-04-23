import Component from './base.ts';   
import Label from './Label.ts';  
import TagHolder from './TagHolder.ts';
import Properities from './Properities.ts'; 
import './LabelContainer.css';

export default class LabelContainer extends Component {
    props: Properities;
    element: HTMLDivElement;      

    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props: Properities) {
        return super.render({
            class: 'tasks__labelcontainer',
            htmltext: props.htmltext,
            id: props.id,
            i: props.i,
            item: props.item,
            style: props.style,
            tagState: props.tagState,
            children: [
                new Label().render({
                    id: props.prefix + 'Label_' + props.i,
                    text: props.item.name,
                    class: 'task__text' + props.labelState
                }),
                new TagHolder().render({
                    id: props.prefix + 'TagHolder_' + props.i,
                    class: 'tasks__tagholder',
                    prefix: props.prefix,
                    tagState: props.tagState,
                    i: props.i,
                })
            ]
        });
    }
}