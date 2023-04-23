import Component from './base.ts';  
import Label from './Label.ts';  
import NewItemTags from './NewItemTags.ts';
import Properities from './Properities.ts'; 
import './NewItemAddition.css';

export default class NewItemAddition extends Component {
    props: Properities;
    element: HTMLDivElement;     

    constructor() {
        super();
        this.element = document.createElement('div');      
    }

    render(props: Properities) {

        return super.render({
            id: 'NewItemAddition',
            class: 'newitembox__addition',
            style: props.style,
            children: [
                new NewItemTags().render({
                    id: 'NewItemTagNewItemTags',
                    class: 'newitembox__tags',
                }),
                new Label().render({
                    id: 'NewItemDate',
                    class: 'newitembox__date',
                    text: props.currentDate,
                    children: []
                })
            ]
        });
    }
}