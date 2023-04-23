import Component from './base.ts';   
import Input from './Input.ts';  
import Button from './Button.ts'; 
import LabelContainer from './LabelContainer.ts'; 
import Properities from './Properities.ts'; 
import './TaskRow.css';

export default class TaskRow extends Component {
    props: Properities;
    element: HTMLDivElement;    

    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props: Properities) {
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
                    class: 'tasks__labelcontainer',
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