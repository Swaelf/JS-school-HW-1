import Component from './base.js';  
import Label from './Label.js';  
import NewItemTags from './NewItemTags.js';  
import './NewItemAddition.css';

export default class NewItemAddition extends Component {
    constructor() {
        super();
        this.element = document.createElement('div');      
    }

    render(props) {

        return super.render({
            id: 'NewItemAddition',
            class: 'newitembox__addition',
            style: props.style,
            children: [
                new NewItemTags().render({}),
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