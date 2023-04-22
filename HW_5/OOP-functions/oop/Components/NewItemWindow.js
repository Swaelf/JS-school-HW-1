import Component from './base.js';  
import Label from './Label.js';  
import DivElement from './DivElement.js';  
import Input from './Input.js';  
import Button from './Button.js'; 
import NewItemAddition from './NewItemAddition.js'; 
import NewItemButtonsContainerElement from './NewItemButtonsContainerElement.js'; 
import './NewItemWindow.css';

export default class NewItemWindow extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render(props) {
        return super.render({
            id: 'NewItemBox',
            class: 'newitembox',
            style: props.style,
            children: [
                new Label().render({
                    id: 'NewItemLabel',
                    text: 'Add New Item',
                    class: 'newitembox__label',
                    children: []
                }),
                new Input().render({
                    id: 'NewItemInput',
                    children: [],
                    class: 'newitembox__input',
                    text: 'New Task',
                    type: 'search',
                    onSearch: this.NewTaskOnEnter,
                    onInput: this.AproveNewItem
                }),
                new NewItemAddition().render({
                    currentDate: props.currentDate,
                }),
                new NewItemButtonsContainerElement().render({
                    buttonOnClick_cancel: props.buttonOnClick_cancel,
                    buttonOnClick_apply: props.buttonOnClick_apply
                })
            ]
        });
    }

    AproveNewItem = () => {
        const newItemInput = document.getElementById("NewItemInput");
        const newItemButtonApply = document.getElementById("NewItemButtonApply");
        if (newItemInput.value) {
            if (newItemButtonApply.classList.contains("newitembox__button--disabled") == true) {
                newItemButtonApply.classList.remove("newitembox__button--disabled");
            }
            if (newItemButtonApply.classList.contains("newitembox__button--enabled") == false) {
             newItemButtonApply.classList.add("newitembox__button--enabled");                      
            }
            newItemButtonApply.disabled = false;
        } else {
            if (newItemButtonApply.classList.contains("newitembox__button--disabled") == false) {
                newItemButtonApply.classList.add("newitembox__button--disabled");
            }
            if (newItemButtonApply.classList.contains("newitembox__button--enabled") == true) {
             newItemButtonApply.classList.remove("newitembox__button--enabled");                      
            }
            newItemButtonApply.disabled = true;
        }
    }

    NewTaskOnEnter = () => {
        const newItemBox = document.getElementById('NewItemButtonApply');
        newItemBox.disabled == false ? newItemBox.onclick.apply() : '';
    }
}