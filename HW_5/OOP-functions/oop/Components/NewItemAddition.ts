import Component from './base.ts';  
import Label from './Label.ts'; 
import Input from './Input.ts';  
import NewItemTags from './NewItemTags.ts';

import Properities from '../Interfaces/Properities'; 

import './css/NewItemAddition.css';

export default class NewItemAddition extends Component {
    element: HTMLDivElement;     

    constructor() {
        super();
        this.element = document.createElement('div') as HTMLDivElement;      
    }

    render(props: Properities) {

        return super.render({
            id: 'NewItemAddition',
            class: 'newitembox__addition',
            children: [
                new NewItemTags().render({
                    id: 'NewItemTagNewItemTags',
                    class: 'newitembox__tags',
                }),
                new Label().render({
                    id: 'NewItemDate',
                    class: 'newitembox__date',
                    text: props.currentDate,
                    onClick: this.DateTimeFormat
                }),
                new Input().render({
                    id: 'NewItemInputDate',
                    class: 'newitembox__inputdate',
                    type: 'date',
                    onChange: this.SetDate   
                })
            ]
        });
    }

    SetDate = () => {
        const newItemInputDate: HTMLInputElement = document.getElementById('NewItemInputDate') as HTMLInputElement;
        const newItemDate: HTMLLabelElement = document.getElementById('NewItemDate') as HTMLLabelElement;
        const formattedDate: string = new Date(newItemInputDate.value).toJSON().slice(0, 10).split("-").reverse().join(".");      
        newItemDate.innerHTML = formattedDate;   
    }


    DateTimeFormat = () => {
        const newItemInputDate: HTMLInputElement = document.getElementById('NewItemInputDate') as HTMLInputElement;
        newItemInputDate.showPicker();
    }
  
    
}