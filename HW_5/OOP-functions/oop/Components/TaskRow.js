import Component from './base.js';   
import Input from './Input.js';  
import Button from './Button.js'; 
import LabelContainer from './LabelContainer.js'; 
import './TaskRow.css';

export default class TaskRow extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props) {
        return super.render({
            class: 'tasks__row',
            htmltext: props.htmltext,
            id: props.id,
            i: props.i,
            style: props.style,
            children: [
                new Input().render({
                    id: props.prefix +'CheckBox_' + props.i,
                    children: [],
                    text: props.item,
                    class: 'task__checkbox',
                    type: 'checkbox',
                    onChange: props.onChange,
                    checked: props.checked
                }),
                new LabelContainer().render({
                    id: props.prefix + 'LabelContainer_' + props.i,
                    labelState: props.labelState,
                    tagState: props.tagState,
                    prefix: props.prefix,
                    i: props.i,
                    item: props.item
                }),
                new Button().render({
                    id: props.prefix + 'Button_' + props.i,
                    class: 'button__remove ',
                    onClick: props.buttonOnClick,
                    htmltext: '',
                    style: props.buttonBacground
                })
            ]
        });
    }
}