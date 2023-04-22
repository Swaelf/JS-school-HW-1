import Component from './base.js';   
import Label from './Label.js';  
import TagHolder from './TagHolder.js';  
import './LabelContainer.css';

export default class LabelContainer extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props) {
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
                    prefix: props.prefix,
                    tagState: props.tagState,
                    i: props.i,
                })
            ]
        });
    }
}