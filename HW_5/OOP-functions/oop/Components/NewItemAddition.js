import Component from './base.js';  
import Label from './Label.js';  
import DivElement from './DivElement.js';  
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
                new DivElement().render({
                    id: 'NewItemTags',
                    class: 'newitembox__tags',
                    children: [
                        new Label().render({
                            id: 'NewItemTag0',
                            class: 'tags__item tags__item--health',
                            text: 'health',
                            children: []
                        }),
                        new Label().render({
                            id: 'NewItemTag1',
                            class: 'tags__item tags__item--work',
                            text: 'work',
                            children: []
                        }),
                        new Label().render({
                            id: 'NewItemTag2',
                            class: 'tags__item tags__item--home',
                            text: 'home',
                            children: []
                        }),
                        new Label().render({
                            id: 'NewItemTag3',
                            class: 'tags__item tags__item--other',
                            text: 'other',
                            children: []
                        })
                    ]
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